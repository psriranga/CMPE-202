import React, { useEffect, useRef, useState } from "react";
import SeatMap from "./SeatMap";
import { Button, message } from "antd";
import axios from "axios";
import { BASE_URL } from "../../env";
import { ISeatmap } from "../../Interfaces/seatmap.interface";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const MovieSeatmap = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

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
      .get(BASE_URL + "/shows/show/" + id)
      .then((res) => {
        console.log("show data", res.data);
        setSeatmapData(res.data.show);
        message.destroy("loading_msg");
      })
      .catch((e) => {
        message.error("Something gone wrong!");
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getSeatmap();
  }, [id]);

  return (
    <div>
      <div className="mb-8">
        <div className="w-full flex mb-4">
          <span className="text-[32px] font-semibold m-auto">
            {seatmapData?.movie?.name}
          </span>
        </div>
        <div className="w-full flex mb-4">
          <span className="text-[16px] font-semibold m-auto">
            {seatmapData?.theater.name}
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
            preBookedSeats={seatmapData?.seat_matrix || []}
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
                  {selectedSeats.length * seatmapData?.discounted_price!} $
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
                    navigate("/order-confirmation", {
                      state: {
                        seatmapData: { ...seatmapData, id: id },
                        selectedSeats: selectedSeats,
                      },
                    });
                  }}
                >
                  Checkout
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
