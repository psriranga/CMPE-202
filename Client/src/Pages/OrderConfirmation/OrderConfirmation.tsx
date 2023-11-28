import { Button, Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useAppSelector } from "../../state/hooks";
import { ITicket } from "../../Interfaces/ticket.interface";
import { useEffect } from "react";
import { ISeatmap } from "../../Interfaces/seatmap.interface";
import axios from "axios";
import { BASE_URL } from "../../env";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const data: { seatmapData: ISeatmap; selectedSeats: Array<string> } =
    location.state;

  useEffect(() => {
    console.log(data, "page data");
  }, [data]);

  const BookTicket = () => {
    axios
      .post(BASE_URL + "booking/ticket", {
        user: 1,
        show: parseInt(data.seatmapData.id),
        seats: data.selectedSeats,
      })
      .then((res) => {
        navigate("/ticket", { state: data });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex pt-10 justify-between">
      <div className="w-[50%] flex flex-col gap-5 p-3">
        <span className="font-bold text-2xl">Order Confirmation</span>
      </div>
      <div className="w-[50%] flex flex-col p-3">
        <div>
          <div className="font-semibold text-[24px]">
            {data?.seatmapData?.movie.name}
          </div>
          <div className="mt-2">{data?.seatmapData?.theater?.name}</div>
          <div className="mt-2">
            {dayjs(data?.seatmapData?.show_timing).format("MMMM D, YYYY")} at{" "}
            {dayjs(data?.seatmapData?.show_timing).format("h:mm A")}
          </div>
        </div>
        <Divider />
        <div className="flex flex-col">
          <div className="mb-2">
            <div className="w-full flex items-center">
              {" "}
              <div className="font-semibold mr-2 text-xl">Selected Seats </div>
              <div>
                {data.selectedSeats.map((seat: string) => {
                  return seat + " ";
                })}
              </div>
            </div>
          </div>
          <span className="font-bold text-xl">Summary</span>
          <div className="flex pt-4 gap-x-20">
            <div className="w-[50%]">
              Tickets({data?.selectedSeats?.length})
            </div>
            <div className="w-[50%]">
              ${data?.selectedSeats?.length * data.seatmapData.price}
            </div>
          </div>
          <div className="flex pt-4 gap-x-20">
            <div className="w-[50%] flex flex-col">
              <span>Food & Drink</span>
            </div>
            <div className="w-[50%]">-</div>
          </div>
        </div>
        <Divider />
        <div className="flex gap-x-20">
          <div className="w-[50%] font-bold text-xl">Total</div>$
          {data?.selectedSeats?.length * data.seatmapData.price}
        </div>
        <Divider />
        <div>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              BookTicket();
            }}
            className="w-full"
          >
            Pay now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
