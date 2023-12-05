import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import {
  Button,
  Collapse,
  CollapseProps,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  theme,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { BASE_URL } from "../../env";
import { IMovie } from "../../Interfaces/movie.interface";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { ITheater } from "../../Interfaces/theater.interface";

const AddTheaters = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [selectedTheater, setSelectedTheater] = useState<any>();
  const CreateTheater = (data: any) => {
    console.log(selectedTheater, "selected theater");
    if (selectedTheater?.id === undefined) {
      axios
        .post(BASE_URL + "theater/theater", data)
        .then((res) => {
          console.log(res);
          message.success("Theater added successfully");
          //   handleCancel("theaters");
          navigate("/configurations");

          //   getTheatres();
        })
        .catch((e) => {
          console.log(e);
          message.error(e.message);
          //   handleCancel("theaters");
        });
    } else {
      axios
        .patch(BASE_URL + "theater/theater/" + selectedTheater?.id, data)
        .then((res) => {
          console.log(res);
          message.success("Theater edited successfully");
          setSelectedTheater({} as ITheater);
          navigate("/configurations");
          //   handleCancel("theaters");
          //   getTheatres();
        })
        .catch((e) => {
          console.log(e);
          message.error(e.message);
          setSelectedTheater({} as ITheater);
          //   handleCancel("theaters");
        });
    }
  };
  return (
    <div className="w-[60%] m-auto">
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <div className="w-full flex justify-center font-semibold text-[32px] my-4">
        Add Theater
      </div>
      <Form name="basic" autoComplete="off" form={form} layout="vertical">
        <Form.Item
          label="Theater Name"
          name="name"
          rules={[
            { required: true, message: "Please input your theater name!" },
          ]}
        >
          <Input placeholder="Theater name" />
        </Form.Item>

        <Form.Item
          label="Theater Address"
          name="address"
          rules={[{ required: true, message: "Please input theater address!" }]}
        >
          <TextArea placeholder="Theater address" />
        </Form.Item>
        <div className="flex items-center w-full">
          <Form.Item
            label="No of rows"
            name="no_of_rows"
            className="w-full mr-2"
            rules={[
              {
                required: true,
                message: "Please input theater seating rows!",
              },
            ]}
          >
            <InputNumber placeholder="No of rows" className="w-full" />
          </Form.Item>
          <Form.Item
            label="No of columns"
            name="no_of_cols"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Please input theater seating columns!",
              },
            ]}
          >
            <InputNumber placeholder="No of columns" className="w-full" />
          </Form.Item>
        </div>
        <Form.Item
          label="Screens Number"
          name="screen_number"
          className="w-full"
          rules={[
            {
              required: true,
              message: "Please input theater screen number!",
            },
          ]}
        >
          <InputNumber placeholder="Screen Number" className="w-full" />
        </Form.Item>
        <Form.Item
          label="Technologies"
          name="technologies"
          rules={[
            { required: true, message: "Please input theater technologies!" },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            options={[
              {
                label: "IMAX",
                value: "imax",
              },
              {
                label: "XD",
                value: "xd",
              },
              {
                label: "DOLBY ATMOS",
                value: "dolby_atmos",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Cuisines"
          name="cuisines"
          rules={[
            { required: true, message: "Please input theater cuisines!" },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            options={[
              {
                label: "Restaurant",
                value: "restaurant",
              },
              {
                label: "Bar",
                value: "bar",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Shows"
          name="shows"
          rules={[
            { required: true, message: "Please input theater show timings!" },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            options={[
              {
                label: "10:00 AM",
                value: "10:00 AM",
              },
              {
                label: "12:30 PM",
                value: "12:30 PM",
              },
              {
                label: "4:30 PM",
                value: "4:30 PM",
              },
              {
                label: "7:00 PM",
                value: "7:00 PM",
              },
              {
                label: "10:30 PM",
                value: "10:30 PM",
              },
            ]}
          />
        </Form.Item>
        <div className="w-full">
          <Button
            className="w-full"
            type="primary"
            onClick={() => {
              console.log(form.getFieldsValue());
              CreateTheater(form.getFieldsValue());
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddTheaters;
