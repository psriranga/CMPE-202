import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { BASE_URL } from "../../env";
import axios from "axios";
import { IUserData } from "../../Interfaces/userInfo.interface";
import dayjs from "dayjs";
import { Avatar, Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../state/reducers/authReducer/authReducer";
import QRCode from "react-qr-code";

const UserProfile = () => {
  let val = Math.floor(1000 + Math.random() * 9000);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [userData, setUserData] = useState<IUserData>();
  const [cancelId, setCancelId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    CancelTicket(cancelId!);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getUserInfo = () => {
    axios
      .get(BASE_URL + "/account/user/" + userInfo.id)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  useEffect(() => {
    getUserInfo();
  }, [userInfo]);
  useEffect(() => {
    console.log(userData, "user data");
  }, [userData]);

  const CancelTicket = (id: number) => {
    axios
      .patch(BASE_URL + "booking/ticket/cancel/" + id, {})
      .then((res) => {
        message.success("Ticket Cancelled Successfully!");
        getUserInfo();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const UpdateMembershipStatus = () => {
    axios
      .patch(BASE_URL + "account/user/" + userInfo.id, {
        membership_type: "regular",
      })
      .then((res) => {
        dispatch(setUserInfo(res.data));
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      })
      .catch((e) => {
        message.success(e.message);
      });
  };
  return (
    <div className="w-full flex flex-col">
      <div className="font-semibold mb-4 text-[28px] m-auto">User Profile</div>
      <div className="m-auto shadow-lg rounded-md flex  items-center p-3 mb-4 px-6">
        <div className="mr-4">
          <Avatar className="bg-[#FA8072] uppercase" size={60}>
            {userInfo?.username[0]}
          </Avatar>
        </div>
        <div className="w-full">
          <div className="mb-2">
            <span className="font-semibold mr-3">Name</span>
            {userInfo.username}
          </div>
          <div className="mb-2">
            <span className="font-semibold mr-3">Email</span>
            {userInfo.email}
          </div>
          <div className="mb-2">
            <span className="font-semibold mr-3">Phone Number</span>
            {userInfo.phoneNumber}
          </div>
          {/* <div className="mb-2">
            <span className="font-semibold mr-3">Reward points</span>
            {userInfo.rewardPoints}
          </div> */}
          {userInfo.membership_type === "premium" && (
            <div
              className="cursor-pointer w-full justify-end flex text-red-500"
              onClick={() => {
                UpdateMembershipStatus();
              }}
            >
              Cancel Premium
            </div>
          )}
        </div>
      </div>
      <div className="font-semibold mb-4 text-[28px]">Bookings</div>
      <div>
        {userData?.tickets.map((ticket) => {
          return (
            <div className="flex w-full justify-between  items-center p-3 border-[#e0e0e0] border-[1px] w-full border-solid rounded-md mb-2 border-l-[4px] border-l-[#FA8072]">
              <div className="flex items-center">
                <div>
                  {" "}
                  <div className="mr-4">
                    <QRCode
                      size={120}
                      value={
                        "Ticket ID :" +
                        val +
                        "Movie :" +
                        ticket.movie.name +
                        " at" +
                        ticket.theater.name +
                        " Timing:" +
                        dayjs(ticket.show.show_timing).format(
                          "YYYY-MM-DD, h:mm A"
                        )
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-2 flex items-center justify-between w-full">
                    <div>
                      <span>Movie : </span>
                      {ticket.movie.name}
                    </div>
                  </div>
                  <div className="font-semibold mb-2">
                    <span>Theater : </span>
                    {ticket.theater.name}
                  </div>
                  <div className="mb-2">
                    <span className="mr-2">Seats</span>
                    {ticket.seats.map((seat: string) => {
                      return seat + " ";
                    })}
                  </div>
                  <div className="mb-2">
                    Date:{" "}
                    {" " + dayjs(ticket.show.show_timing).format("YYYY-MM-DD")},
                    {/* {dayjs(ticket.show.show_timing).format("h:mm A")} */}
                  </div>
                  <div>Status : {ticket.status}</div>
                </div>
              </div>
              {ticket.status !== "cancelled" && (
                <div
                  className="cursor-pointer ml-4"
                  onClick={() => {
                    setCancelId(ticket.id);
                    showModal();
                  }}
                >
                  <span className="text-red-400">Cancel</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Modal
        title="Cancel Ticket"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Do you want to cancel the ticket?
      </Modal>
    </div>
  );
};

export default UserProfile;
function setFinalPrice(arg0: number) {
  throw new Error("Function not implemented.");
}
