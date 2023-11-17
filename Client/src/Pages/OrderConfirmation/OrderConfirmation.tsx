import { Button, Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useAppSelector } from "../../state/hooks";
import { ITicket } from "../../Interfaces/ticket.interface";
import { useEffect } from "react";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data: ITicket = location.state;

  return (
    <div className="flex pt-10 justify-between">
      <div className="w-[50%] flex flex-col gap-5 p-3">
        <span className="font-bold text-2xl">Order Confirmation</span>
      </div>
      <div className="w-[50%] flex flex-col p-3">
        <div>
          <div className="font-semibold text-[24px]">{data?.movie.name}</div>
          <div className="mt-2">{data?.theater.name}</div>
          <div className="mt-2">
            {dayjs(data?.show_date).format("MMMM D, YYYY")} at {data?.show_time}
          </div>
        </div>
        <Divider />
        <div className="flex flex-col">
          <span className="font-bold text-xl">Summary</span>
          <div className="flex pt-4 gap-x-20">
            <div className="w-[50%]">Tickets({data?.seats.length})</div>
            <div className="w-[50%]">${data?.seats.length * 15}</div>
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
          <div className="w-[50%] font-bold text-xl">Total</div>
          <div className="w-[50%]">${data?.seats.length * 15}</div>
        </div>
        <Divider />
        <div>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              navigate("/checkout");
            }}
            className="w-full"
          >
            Continue to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
