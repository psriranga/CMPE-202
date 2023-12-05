import React, { useState, useEffect } from "react";
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
import { IShow } from "../../Interfaces/show.interface";

const AddShows = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [movies, setMovies] = useState<Array<IMovie>>();
  const [shows, setShows] = useState<Array<IShow>>();
  const [theaters, setTheaters] = useState<Array<ITheater>>();
  const [theaterOptions, setTheaterOptions] =
    useState<Array<{ label: string; value: number }>>();
  const [moviesOptions, setMoviesOptions] =
    useState<Array<{ label: string; value: number }>>();
  const getTheaterOptions = (theaters: Array<ITheater>) => {
    let tempOptions: any = [];
    theaters.map((theater: ITheater) => {
      tempOptions.push({ label: theater.name, value: theater.id });
    });
    setTheaterOptions(tempOptions);
  };
  const getMovieOptions = (movies: Array<IMovie>) => {
    let tempOptions: any = [];
    movies.map((movie: IMovie) => {
      tempOptions.push({ label: movie.name, value: movie.id });
    });
    setMoviesOptions(tempOptions);
  };
  const CreateShow = (data: any) => {
    console.log({
      ...data,
      start_date: dayjs(data.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(data.end_date).format("YYYY-MM-DD"),
    });
    axios
      .post(BASE_URL + "shows/create/shows", {
        ...data,
        start_date: dayjs(data.start_date).format("YYYY-MM-DD"),
        end_date: dayjs(data.end_date).format("YYYY-MM-DD"),
      })
      .then((res) => {
        message.success("Show created successfully");
        // handleCancel("shows");
        navigate("/configurations");
      })
      .catch((e) => {
        navigate("/configurations");
        message.error(e.message);
      });
  };
  const getMovies = () => {
    axios
      .get(BASE_URL + "movie/movie")
      .then((res) => {
        setMovies(res.data.movies);
        getMovieOptions(res.data.movies);
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
        setTheaters(res.data.theaters);
        getTheaterOptions(res.data.theaters);
      })
      .catch((e) => {
        message.error(e.message);
        console.log(e);
      });
  };

  useEffect(() => {
    getTheatres();
  }, []);
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
        Add show
      </div>
      <Form name="basic" form={form} layout="vertical">
        <Form.Item
          label="Movie"
          name="movie_id"
          rules={[{ required: true, message: "Please input movie name!" }]}
        >
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            options={moviesOptions}
          />
        </Form.Item>

        <Form.Item
          label="Theaters"
          name="theater_id_list"
          rules={[
            { required: true, message: "Please input theater technologies!" },
          ]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            options={theaterOptions}
          />
        </Form.Item>
        <Form.Item
          label="Start date"
          name="start_date"
          rules={[{ required: true, message: "Please input start date!" }]}
        >
          <DatePicker
            placeholder="Select date"
            className="w-full"
            format={"YYYY-MM-DD"}
          />
        </Form.Item>
        <Form.Item
          label="End date"
          name="end_date"
          rules={[{ required: true, message: "Please input end date!" }]}
        >
          <DatePicker
            placeholder="Select date"
            className="w-full"
            format={"YYYY-MM-DD"}
          />
        </Form.Item>
        <Form.Item
          label="Ticket Price ($)"
          name="price"
          rules={[{ required: true, message: "Please input end date!" }]}
        >
          <InputNumber placeholder="Ticket Price" className="w-full" />
        </Form.Item>
        <Form.Item
          label="Discounted Ticket Price ($)"
          name="discounted_price"
          rules={[{ required: true, message: "Please input end date!" }]}
        >
          <InputNumber
            placeholder="Discounted Ticket Price"
            className="w-full"
          />
        </Form.Item>

        <div className="w-full">
          <Button
            className="w-full"
            type="primary"
            onClick={() => {
              console.log(form.getFieldsValue());
              CreateShow(form.getFieldsValue());
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddShows;
