import React, { useEffect, useRef, useState } from "react";
import SeatMap from "./SeatMap";
import { Button, message } from "antd";
import axios from "axios";
import { BASE_URL } from "../../env";
import { ISeatmap } from "../../Interfaces/seatmap.interface";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state/reducers/cartReducer/cartReducer";
import { IMovie } from "../../Interfaces/movie.interface";
import { ITheater } from "../../Interfaces/theater.interface";
import { useAppSelector } from "../../state/hooks";
import { setOrderConfirmation } from "../../state/reducers/orderConfirmation/orderConfirmation";

const MovieSeatmap = () => {
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const theaterId = searchParams.get("theaterId");
  const movieId = searchParams.get("movieId");
  const showDate = searchParams.get("showDate");
  const showTime = searchParams.get("showTime");
  const theaters = useAppSelector((state: any) => state.theaters);
  const movies = useAppSelector((state: any) => state.movies);
  const [selectedMovie, setSelectedMovie] = useState<IMovie>();
  const [selectedTheater, setSelectedTheater] = useState<ITheater>();
  const [selectedSeats, setSelectedSeats] = useState<Array<string>>([]);
  const [preBookedSeats, setPreBookedSeats] = useState<Array<string>>([]);
  const [seatmapData, setSeatmapData] = useState<ISeatmap>();
  const navigate = useNavigate();

  const getSeatmap = () => {
    message.loading({
      type: "loading",
      content: "Loading...",
      key: "loading_msg",
    });
    axios
      .get(BASE_URL + "/seatmap")
      .then((res) => {
        setSeatmapData(res.data);
        message.destroy("loading_msg");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSeatmap();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <div className="w-full flex mb-4">
          <span className="text-[32px] font-semibold m-auto">
            {seatmapData?.movie.name}
          </span>
        </div>
        <div className="w-full flex mb-4">
          <span className="text-[16px] font-semibold m-auto">
            {seatmapData?.theatre.name}
          </span>
        </div>
        <div className="w-full flex mb-4">
          <div className="m-auto">
            <span className="text-[16px] font-semibold m-auto">
              {dayjs(seatmapData?.show_date).format("MMMM D, YYYY")}
            </span>
            <span className="text-[16px] font-semibold m-auto ml-2">
              {seatmapData?.show_time}
            </span>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-[70%]  mr-4">
          <SeatMap
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            preBookedSeats={seatmapData?.preoccupied_seats || []}
          />
        </div>
        <div className="rounded-md shadow-lg w-[30%] p-3">
          <div className="flex justify-center mb-4 font-semibold">
            <span className="text-[24px]">
              Selected {selectedSeats.length} tickets
            </span>
          </div>
          {selectedSeats.length > 0 && (
            <div className="h-full">
              <div className="h-[80%] text-[16px]">
                <div className="mb-4">
                  <span className="font-semibold">Seats :</span>
                  {selectedSeats.map((selectedSeat) => {
                    return selectedSeat + " ";
                  })}
                </div>
                <div>
                  <span className="font-semibold">Price : </span>
                  {selectedSeats.length * 15} $
                </div>
              </div>
              <div className="w-full flex justify-center h-[20%]">
                <Button
                  type="primary"
                  onClick={() => {
                    // dispatch(
                    //   addToCart({
                    //     seats: selectedSeats,
                    //     show_time: seatmapData?.show_time,
                    //     show_date: seatmapData?.show_date,
                    //     movie: seatmapData?.movie,
                    //     theater: seatmapData?.theatre,
                    //   })
                    // );
                    // dispatch(
                    //   setOrderConfirmation({
                    //     seats: selectedSeats,
                    //     show_time: seatmapData?.show_time!,
                    //     show_date: seatmapData?.show_date!,
                    //     movie: seatmapData?.movie!,
                    //     theater: seatmapData?.theatre!,
                    //   })
                    // );
                    navigate("/order-confirmation");
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieSeatmap;
