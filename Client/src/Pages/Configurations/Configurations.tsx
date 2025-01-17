import { CaretRightOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  CollapseProps,
  Drawer,
  Form,
  Input,
  Modal,
  Select,
  theme,
} from "antd";
import React, { CSSProperties, useState } from "react";
import Movies from "./Movies/Movies";
import Theaters from "./Theaters/Theaters";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { BASE_URL } from "../../env";
import axios from "axios";

interface CreateTheater {
  name: string;
  address: string;
  technologies: Array<string>;
  cuisines: Array<string>;
  shows: Array<string>;
}

const Configurations = () => {
  const { token } = theme.useToken();
  const [isMoviesModalOpen, setIsMoviesModalOpen] = useState(false);
  const [isTheatersModalOpen, setIsTheatersModalOpen] = useState(false);
  const [form] = useForm();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const showModal = (type: string) => {
    if (type === "movies") setIsMoviesModalOpen(true);
    else setIsTheatersModalOpen(true);
  };

  const handleOk = (type: string) => {
    if (type === "movies") {
      setIsMoviesModalOpen(false);
    } else setIsTheatersModalOpen(false);
  };

  const handleCancel = (type: string) => {
    if (type === "movies") {
      setIsMoviesModalOpen(false);
    } else setIsTheatersModalOpen(false);

    form.resetFields();
  };
  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) => [
    {
      key: "1",
      label: "Movies",
      children: <Movies showModal={showModal} />,
      style: panelStyle,
      extra: (
        <PlusCircleOutlined
          onClick={(e) => {
            e.stopPropagation();
            showModal("movies");
          }}
        />
      ),
    },
    {
      key: "2",
      label: "Theaters",
      children: <Theaters showModal={showModal} />,
      style: panelStyle,
      extra: (
        <PlusCircleOutlined
          onClick={(e) => {
            e.stopPropagation();
            showModal("theaters");
          }}
        />
      ),
    },
  ];

  const CreateTheater = (data: CreateTheater) => {
    axios
      .post(BASE_URL + "theater/theater/create", data)
      .then((res) => {
        console.log(res);
        handleCancel("theaters");
      })
      .catch((e) => {
        console.log(e);
        handleCancel("theaters");
      });
  };

  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={["1", "2"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
      <Drawer
        title="Configure Movies"
        placement="right"
        onClose={() => handleCancel("movies")}
        open={isMoviesModalOpen}
        width={500}
      >
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
            rules={[
              { required: true, message: "Please input theater address!" },
            ]}
          >
            <TextArea placeholder="Theater address" />
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
              }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Drawer>
      <Drawer
        title="Configure Theaters"
        placement="right"
        onClose={() => handleCancel("theaters")}
        open={isTheatersModalOpen}
        width={500}
      >
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
            rules={[
              { required: true, message: "Please input theater address!" },
            ]}
          >
            <TextArea placeholder="Theater address" />
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
      </Drawer>
    </div>
  );
};

export default Configurations;
