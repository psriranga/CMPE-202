import {
  CrownTwoTone,
  LoginOutlined,
  LogoutOutlined,
  MailTwoTone,
  MenuOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setLogOut,
  setUserInfo,
} from "../../state/reducers/authReducer/authReducer";
import { useAppSelector } from "../../state/hooks";
import logo from "../../assets/images/logo.jpg";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    console.log(isLoggedIn, userInfo);
  }, [isLoggedIn, userInfo]);

  const items: MenuProps["items"] = [
    {
      label: (
        <span
          className="text-blue-600"
          onClick={() => {
            navigate("/contact");
          }}
        >
          <MailTwoTone className="mr-1" /> Contact Us
        </span>
      ),
      key: "0",
    },
    {
      label: (
        <span className="text-blue-600">
          <CrownTwoTone className="mr-1" />
          Get Premium
        </span>
      ),
      key: "1",
    },
    {
      label: (
        <span
          className="text-blue-600"
          onClick={() => {
            navigate("/configurations");
          }}
        >
          <SettingOutlined className="mr-1" />
          Configurations
        </span>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <span className="text-blue-600">
          <LogoutOutlined className="mr-1" />
          Log Out
        </span>
      ),
      key: "3",
      onClick: () => {
        localStorage.clear();
        dispatch(setLogOut({}));
        dispatch(setUserInfo(null));
        navigate("/");
      },
    },
  ];
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div className="py-4 bg-[#3597c4] flex justify-between items-center px-10 z-40 sticky top-0 shadow-lg">
      <div className="flex items-center justify-between w-[90%]">
        <div
          className="text-[32px] font-semibold cursor-pointer"
          onClick={() => {
            navigate("/movies");
          }}
        >
        <img width={40} height={40} src={logo} alt={"logo"} className="mr-2"/>
          Movieflix
        </div>{" "}
        <div className="flex items-center">
          <div
            className="ml-14 mr-4 font-semibold hover:text-white cursor-pointer"
            onClick={() => {
              navigate("/movies");
            }}
          >
            Movies
          </div>
          <div
            className="mr-4 font-semibold hover:text-white cursor-pointer"
            onClick={() => {
              navigate("/theatres");
            }}
          >
            Theatres
          </div>
        </div>
      </div>
      <div className="flex items-center ">
        {!isLoggedIn && (
          <div className="flex items-center">
            <Button
              className="mr-2"
              onClick={() => {
                navigate("/signup");
              }}
            >
              <UserAddOutlined /> Join Us
            </Button>

            <Button
              
              onClick={() => {
                navigate("/");
              }}
            >
              <LoginOutlined />
              Sign In
            </Button>
          </div>
        )}
        {isLoggedIn == true && (
          <Dropdown menu={{ items }} trigger={["click"]} className="w-full">
            <div className="flex items-center mr-2 font-semibold cursor-pointer">
              <Avatar className="mr-2 uppercase">
                {userInfo?.username[0]}
              </Avatar>{" "}
              <div className="w-full">
                Hi,&nbsp;{" "}
                <span> {capitalizeFirstLetter(userInfo.username)}</span>
              </div>
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Header;
