import {
  CrownTwoTone,
  LoginOutlined,
  LogoutOutlined,
  MailTwoTone,
  MenuOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setLogOut,
  setUserInfo,
} from "../../state/reducers/authReducer/authReducer";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      key: "1",
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
  return (
    <div className="py-4 bg-[#6BE9FA] flex justify-between px-60 z-40 sticky top-0 shadow-lg">
      <div className="flex items-center">
        <div
          className="text-[32px] font-semibold cursor-pointer"
          onClick={() => {
            navigate("/movies");
          }}
        >
          CineSquare
        </div>{" "}
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

      <div className="flex items-center">
        <Button
          className="mr-4"
          onClick={() => {
            navigate("/signup");
          }}
        >
          <UserAddOutlined /> Join Us
        </Button>

        <Button
          className="mr-16"
          onClick={() => {
            navigate("/");
          }}
        >
          <LoginOutlined />
          Sign In
        </Button>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <MenuOutlined className="text-[18px] cursor-pointer" />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
