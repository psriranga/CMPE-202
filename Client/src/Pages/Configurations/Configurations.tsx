import { CaretRightOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  CollapseProps,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  message,
  theme,
} from "antd";
import React, { CSSProperties, useEffect, useState } from "react";
import Movies from "./Movies/Movies";
import Theaters from "./Theaters/Theaters";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { BASE_URL } from "../../env";
import axios from "axios";
import { get } from "http";
import { ITheater } from "../../Interfaces/theatre.interface";
import { IMovie } from "../../Interfaces/movie.interface";
import dayjs from "dayjs";

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
  const [theaters, setTheaters] = useState<Array<ITheater>>();
  const [movies, setMovies] = useState<Array<IMovie>>();
  const [form] = useForm();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const getMovies = () => {
    axios
      .get(BASE_URL + "movie/movie")
      .then((res) => {
        setMovies(res.data.movies);
      })
      .catch((e) => {
        message.error(e.message);
        console.log(e);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);
  const getTheatres = () => {
    axios
      .get(BASE_URL + "/theater/theater")
      .then((res) => {
        console.log("getting res", res.data);
        setTheaters(res.data.theaters);
      })
      .catch((e) => {
        message.error(e.message);
        console.log(e);
      });
  };

  useEffect(() => {
    getTheatres();
  }, []);

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
      children: (
        <Movies showModal={showModal} movies={movies!} getMovies={getMovies} />
      ),
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
      children: (
        <Theaters
          showModal={showModal}
          theaters={theaters!}
          getTheaters={getTheatres}
        />
      ),
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
      .post(BASE_URL + "theater/theater", data)
      .then((res) => {
        console.log(res);
        handleCancel("theaters");
        getTheatres();
      })
      .catch((e) => {
        console.log(e);
        handleCancel("theaters");
      });
  };
  const CreateMovie = (data: any) => {
    axios
      .post(BASE_URL + "movie/movie", {
        ...data,
        start_date: dayjs(data?.start_date).format("YYYY-MM-DD"),
        image_url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
      })
      .then((res) => {
        console.log(res);
        handleCancel("movies");
        getMovies();
      })
      .catch((e) => {
        console.log(e);
        handleCancel("movies");
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
            label="Movie Name"
            name="name"
            rules={[{ required: true, message: "Please input movie name!" }]}
          >
            <Input placeholder="Movie name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input movie description!" },
            ]}
          >
            <TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item
            label="Genre"
            name="genre"
            rules={[{ required: true, message: "Please input movie genre!" }]}
          >
            <Input placeholder="Movie genre" />
          </Form.Item>
          <Form.Item
            label="Release date"
            name="start_date"
            rules={[{ required: true, message: "Please input movie genre!" }]}
          >
            <DatePicker
              placeholder="Select date"
              className="w-full"
              format={"YYYY-MM-DD"}
            />
          </Form.Item>
          <Form.Item
            label="Run time"
            name="runtime"
            rules={[{ required: true, message: "Please input movie runtime!" }]}
          >
            <InputNumber placeholder="Movie runtime" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please input movie rating!" }]}
          >
            <InputNumber placeholder="Movie rating" className="w-full" />
          </Form.Item>

          <div className="w-full">
            <Button
              className="w-full"
              type="primary"
              onClick={() => {
                console.log(form.getFieldsValue());
                CreateMovie(form.getFieldsValue());
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
