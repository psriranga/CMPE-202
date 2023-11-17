import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Tabs, message } from "antd";
import TheatreListByMovie from "./Tabs/TheatreListByMovie";
import dayjs from "dayjs";
import axios from "axios";
import { IMovie } from "../../Interfaces/movie.interface";

const MovieDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<IMovie>();
  const today = new Date();
  const initialDates = [];
  const initialDateItems = [];
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

  for (let i = 0; i < 20; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    if (i === 0) {
      initialDates.push("Today");
      initialDateItems.push({
        key: dayjs(date).format("DD-MM-YYYY"),
        label: <span className="font-semibold">Today</span>,
        children: (
          <TheatreListByMovie date={dayjs(date).format("DD-MM-YYYY")} />
        ),
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
        children: (
          <TheatreListByMovie date={dayjs(date).format("DD-MM-YYYY")} />
        ),
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

  const getMovieById = () => {
    message.loading({
      type: "loading",
      content: "Loading...",
      key: "loading_msg",
    });
    axios
      .get(
        "https://ac5576e0-fe23-471d-b8dd-f07120c3cd38.mock.pstmn.io/movies/e6215582-51d0-4f3e-b16e-0db7f27d7aa9"
      )
      .then((res) => {
        setMovie(res.data);
        message.destroy("loading_msg");
      })
      .catch((e) => {
        message.destroy("loading_msg");
        console.log(e);
      });
  };

  useEffect(() => {
    getMovieById();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-col items-center">
          <figure className="max-w-lg">
            <img
              className="h-auto max-w-xl min-w-full max-h-80 rounded-lg"
              src="https://www.cinemark.com/media/76008938/lg-kotfm-still.jpg"
              alt="image description"
            />
          </figure>
          <div>
            <span className="text-center text-3xl font-bold mx-2 p-2">
              {movie?.name}
            </span>
          </div>
        </div>
        <Tabs
          items={dateItems}
          activeKey={selectedDate}
          onChange={(e) => {
            handleTabChange(e);
          }}
        />
      </div>
    </>
  );
};

export default MovieDetail;
