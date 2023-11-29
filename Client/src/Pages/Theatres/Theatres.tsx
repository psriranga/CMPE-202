import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { Checkbox, Select, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../env";
import { useAppSelector } from "../../state/hooks";
import { ITheater, TheaterFilter } from "../../Interfaces/theater.interface";
import { allTheaters } from "../../state/reducers/theatreReducer/theatreReducer";
import { filters } from "../../data/Theatres/filters_data";

const Theaters = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theaters = useAppSelector((state: any) => state.theaters);
  const [tempTheaters, setTemptheaters] = useState<Array<ITheater>>();
  const getFilteredtheaters = (data: Array<ITheater>, searchString: string) => {
    const regex = new RegExp(searchString, "i");
    console.log(data.filter((theater) => regex.test(theater.name)));
    setTemptheaters(data.filter((theater) => regex.test(theater.name)));
  };
  const [zipcode, setZipcode] = useState("");
  const [longitude, setLongitude] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");

  const gettheaters = (params: any) => {
    axios
      .get(BASE_URL + "/theater/theater", {
        params: params,
      })
      .then((res) => {
        console.log("getting res", res.data);
        dispatch(allTheaters(res.data.theaters));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    setTemptheaters(theaters.theaters);
  }, [theaters]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(latitude, longitude, "latlong", position);
    });
  }, []);

  const getZipCode = () => {
    message.loading({
      type: "loading",
      content: "Loading...",
      key: "loading_msg",
    });
    if (latitude !== "" && longitude !== "")
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
        .then((response) => {
          if (
            response.data &&
            response.data.address &&
            response.data.address.postcode
          ) {
            const zipCode = response.data.address.postcode;
            setZipcode(zipCode);
            message.destroy("loading_msg");
          } else {
            message.destroy("loading_msg");
            setZipcode("ZIP code not found");
          }
        })
        .catch((error) => {
          // message.destroy("loading_msg");
          message.error("Error fetching ZIP code");
          console.error("Error fetching ZIP code:", error);
          setZipcode("Error fetching ZIP code");
        });
  };
  useEffect(() => {
    getZipCode();
    if (latitude && longitude)
      gettheaters({ latitude: latitude, longitude: longitude });
  }, [latitude, longitude]);

  return (
    <div>
      <div className="py-4 flex  items-center justify-between">
        <div className="font-semibold text-[24px] flex items-center">
          Theaters Near <span className="ml-2">{zipcode}</span>{" "}
          <Select
            allowClear
            showSearch
            placeholder="Search by ZIP code"
            optionFilterProp="children"
            onChange={(e) => {
              console.log(e, "event");
              if (e === undefined) {
                gettheaters({ latitude: latitude, longitude: longitude });
              } else {
                gettheaters({ zip_code: e });
              }
            }}
            bordered={false}
            className="ml-2"
            options={[
              {
                value: "95112",
                label: "95112",
              },
              {
                value: "95126",
                label: "95126",
              },
              {
                value: "95128",
                label: "95128",
              },
            ]}
          />
        </div>
        <div>
          <Search
            placeholder="Search for theater"
            enterButton
            onChange={(e: any) => {
              getFilteredtheaters(theaters.theaters, e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex">
        <div className="w-[70%] pr-2 mr-2 grid grid-cols-2 gap-x-2">
          {tempTheaters?.map((theater: ITheater) => {
            return (
              <div
                className="mb-2 mr-2  h-fit rounded-md border-[1px] border-l-[4px] border-l-[#6BE9FA] border-[#e0e0e0] border-solid p-2 hover:shadow-md cursor-pointer"
                onClick={() => {
                  navigate(`/theaters/${theater.id}`, { state: theater });
                }}
              >
                <div>
                  {theater?.name.length > 30
                    ? theater.name.substring(0, 25) + "..."
                    : theater.name}
                </div>
                <div className="my-2 text-[gray]">
                  {theater?.short_address.length > 34
                    ? theater.short_address.substring(0, 30) + "..."
                    : theater.short_address}
                </div>
                <div className="flex items-center justify-between mt-1">
                  {" "}
                  <span className="text-gray-400 text-[12px]">
                    {theater.zip_code}
                  </span>
                  <span className="text-gray-400 text-[12px]">
                    {theater.distance} miles
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-[30%]  pl-2 ml-2">
          <div className="font-semibold text-[18px]">Narrow Your Selection</div>
          <div className="mt-2">
            {filters.map((filter: TheaterFilter) => {
              return (
                <div className="mb-2">
                  <span className="font-semibold">{filter.title}</span>
                  <div className="mt-2">
                    {filter.options.map((option: string) => {
                      return (
                        <div className="ml-2">
                          <Checkbox>{option}</Checkbox>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theaters;
