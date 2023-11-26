import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IMovie } from "../../Interfaces/movie.interface";
import { Card, Divider, Select } from "antd";
import Meta from "antd/es/card/Meta";
import { StarTwoTone } from "@ant-design/icons";
import { useAppSelector } from "../../state/hooks";
import { useDispatch } from "react-redux";
import axios from "axios";
import { allMovies } from "../../state/reducers/moviesReducer/moviesReducer";
import { BASE_URL } from "../../env";

const Movies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const movies = useAppSelector((state: any) => state.movies);
  const [tab, setTab] = useState<string>("");

  const [tempMovies, setTempMovies] = useState<Array<IMovie>>();

  const getMovies = () => {
    axios
      .get(BASE_URL + "movie/movie")
      .then((res) => {
        dispatch(allMovies(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    console.log(movies, "movies");
    setTempMovies(movies.movies);
  }, [movies]);

  useEffect(() => {
    console.log("hash", location.hash);
    if (location.hash === "") {
      setTab("featured");
    } else if (location.hash === "#now-playing") {
      setTab("now-playing");
    } else if (location.hash === "#coming-soon") {
      setTab("coming-soon");
    }
  }, [location]);

  const getFilteredMovies = (data: Array<IMovie>, searchString: string) => {
    const regex = new RegExp(searchString, "i");
    console.log(data.filter((movie) => regex.test(movie.name)));
    setTempMovies(data.filter((movie) => regex.test(movie.name)));
  };

  return (
    <div>
      <div className="py-4 flex  items-center justify-between">
        <div className="font-semibold text-[24px]">Featured Movies</div>

        <div className="font-semibold flex items-center">
          <span
            className={`mx-[6px] cursor-pointer hover:text-blue-400 ${
              tab === "featured" ? "text-blue-400" : ""
            }`}
            onClick={() => {
              navigate("/movies");
            }}
          >
            Featured
          </span>
          <span
            className={`mx-[6px] cursor-pointer hover:text-blue-400 ${
              tab === "now-playing" ? "text-blue-400" : ""
            }`}
            onClick={() => {
              window.location.hash = "now-playing";
            }}
          >
            Now Playing
          </span>
          <span
            className={`mx-[6px] cursor-pointer hover:text-blue-400 ${
              tab === "coming-soon" ? "text-blue-400" : ""
            }`}
            onClick={() => {
              window.location.hash = "coming-soon";
            }}
          >
            Coming Soon
          </span>
        </div>
        <div>
          <Search
            placeholder="Search for movie"
            enterButton
            onChange={(e) => {
              getFilteredMovies(movies.movies, e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex">
        <div className="w-[70%] pr-2 mr-2 grid grid-cols-2 gap-4">
          {tempMovies?.map((movie: IMovie) => (
            // <div className="flex items-start mb-4 ">
            //   <div className="w-1/3">
            //     <img
            //       src={movie.image_url}
            //       alt=""
            //       className="w-full max-h-40 object-cover"
            //     />
            //   </div>
            //   <div className="w-2/3 pl-4 py-4">
            //     <div className="mb-2 font-semibold text-lg">{movie.name}</div>
            //     <div className="mr-4 mb-2">{movie.description}</div>
            //     <div className="flex flex-wrap items-start">
            //       <div className="mr-4 mb-2">{movie.genre}</div>

            //       <div className="mr-4 mb-2">{movie.runtime} min</div>
            //       <div>{movie.rating}/10</div>
            //     </div>
            //   </div>
            // </div>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title={movie.name}
                description={
                  <div className="flex justify-between">
                    <div>{movie.genre}</div>
                    <div>{movie.rating}/10</div>
                  </div>
                }
              />
            </Card>
          ))}
        </div>

        <div className="w-[30%]  pl-2 ml-2 ">
          <div className="font-semibold text-[18px]">Sort By</div>
          <Select
            className="w-full my-2"
            placeholder="Sort By"
            options={[
              { value: "recent", label: "Most Recent" },
              { value: "popular", label: "Most Popular" },
              { value: "alphabetical", label: "Alphabetical Order" },
            ]}
          />
          <div className="font-semibold text-[18px] mt-4">
            Narrow Your Selection
          </div>
          <Divider className="my-2" />
          <div>Movie type</div>
          <Select
            className="w-full my-2"
            placeholder="Select Movie Type"
            options={[
              { value: "recent", label: "Most Recent" },
              { value: "popular", label: "Most Popular" },
              { value: "alphabetical", label: "Alphabetical Order" },
            ]}
          />
          <div>Genre</div>
          <Select
            className="w-full my-2"
            placeholder="Select Genre"
            options={[
              { value: "recent", label: "Most Recent" },
              { value: "popular", label: "Most Popular" },
              { value: "alphabetical", label: "Alphabetical Order" },
            ]}
          />
          <div>Rating</div>
          <Select
            className="w-full my-2"
            placeholder="Select Rating"
            options={[
              { value: "recent", label: "Most Recent" },
              { value: "popular", label: "Most Popular" },
              { value: "alphabetical", label: "Alphabetical Order" },
            ]}
          />
          <div>Release Month</div>
          <Select
            className="w-full my-2"
            placeholder="Select Release Month"
            options={[
              { value: "recent", label: "Most Recent" },
              { value: "popular", label: "Most Popular" },
              { value: "alphabetical", label: "Alphabetical Order" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
