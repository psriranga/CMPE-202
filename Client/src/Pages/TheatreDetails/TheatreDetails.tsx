import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ITheater } from "../../Interfaces/theatre.interface";
import { Tabs, TabsProps, message } from "antd";
import FeaturedMovies from "./Tabs/FeaturedMovies";
import MoviesListByDate from "./Tabs/MoviesListByDate";
import dayjs from "dayjs";
import axios from "axios";

const TheatreDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [theater, setTheater] = useState<ITheater>();

  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const showDateParam = searchParams.get("showDate");

    if (showDateParam) {
      setSelectedDate(showDateParam);
    } else {
      setSelectedDate(dayjs(new Date()).format("DD-MM-YYYY"));
    }
  }, [selectedDate]);

  const getTheaterById = () => {
    message.loading({
      type: "loading",
      content: "Loading...",
      key: "loading_msg",
    });
    axios
      .get(
        "https://ac5576e0-fe23-471d-b8dd-f07120c3cd38.mock.pstmn.io/theaters/6b6ccaae-3a9d-4c14-9b8d-3652ab3f28ed"
      )
      .then((res) => {
        setTheater(res.data);
        message.destroy("loading_msg");
      })
      .catch((e) => {
        message.destroy("loading_msg");
        console.log(e);
      });
  };

  useEffect(() => {
    getTheaterById();
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Theatre Info",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Featured Movies",
      children: <FeaturedMovies />,
    },
  ];

  const today = new Date();
  const initialDates = [];
  const initialDateItems = [];

  for (let i = 0; i < 20; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    if (i === 0) {
      initialDates.push("Today");
      initialDateItems.push({
        key: dayjs(date).format("DD-MM-YYYY"),
        label: <span className="font-semibold">Today</span>,
        children: <MoviesListByDate date={dayjs(date).format("DD-MM-YYYY")} />,
      });
    } else {
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      });
      initialDates.push(formattedDate);
      initialDateItems.push({
        key: dayjs(date).format("DD-MM-YYYY"),
        label: <span className="font-semibold">{formattedDate}</span>,
        children: <MoviesListByDate date={dayjs(date).format("DD-MM-YYYY")} />,
      });
    }
  }

  const [dateItems, setDateItems] = useState(initialDateItems);

  const handleTabChange = (activeKey: string) => {
    setSelectedDate(activeKey);

    const newQueryParams = new URLSearchParams();
    newQueryParams.set("showDate", activeKey);

    navigate({ search: `?${newQueryParams.toString()}` });
  };

  return (
    <div>
      <div className="font-semibold text-[24px] mt-4">{theater?.name}</div>
      <Tabs items={items} />
      <div className="font-semibold text-[24px] mt-4">Showtimes</div>
      <Tabs
        items={dateItems}
        activeKey={selectedDate}
        onChange={(e) => {
          handleTabChange(e);
        }}
      />
    </div>
  );
};

export default TheatreDetails;
