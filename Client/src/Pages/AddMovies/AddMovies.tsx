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

const AddMovies = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [movies, setMovies] = useState<Array<IMovie>>();
  const [moviesOptions, setMoviesOptions] =
    useState<Array<{ label: string; value: number }>>();
  const [selectedMovie, setSelectedMovie] = useState<IMovie>();
  const getMovieOptions = (movies: Array<IMovie>) => {
    let tempOptions: any = [];
    movies.map((movie: IMovie) => {
      tempOptions.push({ label: movie.name, value: movie.id });
    });
    setMoviesOptions(tempOptions);
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
  const CreateMovie = (data: any) => {
    console.log(data, "create movie");
    if (selectedMovie?.id === undefined) {
      axios
        .post(BASE_URL + "movie/movie", {
          ...data,
          start_date: dayjs(data?.start_date).format("YYYY-MM-DD"),
        })
        .then((res) => {
          message.success("Movie added successfully");
          console.log(res);
          //   handleCancel("movies");
          navigate("/configurations");
          //   getMovies();
        })
        .catch((e) => {
          console.log(e);
          message.error(e.message);
          //   handleCancel("movies");
        });
    } else {
      axios
        .patch(BASE_URL + "movie/movie/" + selectedMovie.id, {
          ...data,
          start_date: dayjs(data?.start_date).format("YYYY-MM-DD"),
        })
        .then((res) => {
          console.log(res);
          message.success("Movie edited successfully");
          //   handleCancel("movies");
          navigate("/configurations");
          setSelectedMovie({} as IMovie);
          //   getMovies();
        })
        .catch((e) => {
          console.log(e);
          message.error(e.message);
          //   handleCancel("movies");
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
        Add Movie
      </div>
      <Form name="basic" autoComplete="off" form={form} layout="vertical">
        <Form.Item
          label="Movie Name"
          name="name"
          rules={[{ required: true, message: "Please input movie name!" }]}
        >
          <Input placeholder="Movie name" />
        </Form.Item>
        <Form.Item
          label="Movie Image URL"
          name="image_url"
          rules={[{ required: true, message: "Please input movie image!" }]}
        >
          <Input placeholder="Movie image url" />
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
          <Select
            allowClear
            className="w-full my-2"
            placeholder="Select Genre"
            options={[
              { value: "action", label: "Action" },
              { value: "thriller", label: "Thriller" },
              { value: "rom_com", label: "Rom Com" },
              { value: "horror", label: "Horror" },
              { value: "feel_good", label: "Feel Good" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Release date"
          name="start_date"
          rules={[
            { required: true, message: "Please input movie release date!" },
          ]}
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
    </div>
  );
};

export default AddMovies;
