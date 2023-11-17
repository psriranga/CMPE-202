import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import { ITicket } from "../../Interfaces/ticket.interface";
import { useEffect } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const cart: Array<ITicket> = useAppSelector((state: any) => state.cart);
  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <div className="flex pt-10 justify-between">
      <div className="w-[50%] m-auto">
        <div className="flex gap-10">
          <div className="w-[40%]">
            <img
              className="h-auto max-w-sm max-h-48 rounded-lg"
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          </div>
          <div className="w-[40%] ">
            <span className="font-bold text-xl">Movie Name</span>
            <div className="pt-4"> Timing </div>
            <div className="pt-1">Theater</div>
            <div className="flex pt-4">
              <span className="font-bold">Tickets</span>
              <div
                className="pl-2 cursor-pointer"
                onClick={() => {
                  navigate(`/movies/`);
                }}
              >
                <EditTwoTone />
              </div>
              <div
                className="pl-2 cursor-pointer"
                onClick={() => {
                  navigate(`/movies/`);
                }}
              >
                <DeleteTwoTone />
              </div>
            </div>
            <div className="pt-1">
              <span className="text-sm">Seat : </span>
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col">
          <span className="font-bold text-xl">Summary</span>
          <div className="flex pt-4 gap-x-20">
            <div className="w-[50%]">Tickets</div>
            <div className="w-[50%]">$15.25</div>
          </div>
          <div className="flex pt-4 gap-x-20">
            <div className="w-[50%] flex flex-col">
              <span>Online Tax</span>
              <span className="text-xs">
                online Fees are waived when you are a premium member.
              </span>
            </div>
            <div className="w-[50%]">$1.25</div>
          </div>
        </div>
        <Divider />
        <div className="flex gap-x-20">
          <div className="w-[50%] font-bold text-xl">Total</div>
          <div className="w-[50%]">$15.25</div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
