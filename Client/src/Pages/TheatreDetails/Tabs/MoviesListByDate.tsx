import { StarTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { featured_movies } from "../../../data/FeaturedMovies/FeaturedMovies";
import { IMovie } from "../../../Interfaces/movie.interface";
import { ITheater } from "../../../Interfaces/theater.interface";
export interface MoviesListByDateInterface {
  date: string;
}

const MoviesListByDate = (props: MoviesListByDateInterface) => {
  const location = useLocation();
  const navigate = useNavigate();
  const data: ITheater = location.state;
  const timing = ["09:40am", "11:45am", "2:30pm", "10:00pm"];
  return (
    <div>
      {featured_movies.map((movie: IMovie) => {
        return (
          <div className="p-2 w-full border-[1px] border-solid border-[#e0e0e0] rounded-md my-3 flex">
            <div>
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                style={{ width: "120px", height: "auto" }}
                className="rounded-md"
                onClick={() => {
                  navigate("/movies/id", { state: movie });
                }}
              />
            </div>
            <div className="ml-2 p-4">
              <div className="font-semibold  text-[18px]">{movie.name}</div>
              <div className="flex my-2 items-center justify-between">
                <div>{movie.genre}</div>
                <div className="ml-4">
                  <StarTwoTone className="mr-1" />
                  {movie.rating}
                </div>
              </div>
              <div className="text-gray-400 my-2">Run time 2h 40 min</div>
              <div>
                <div className="flex my-2">
                  {timing.map((time: string) => {
                    return (
                      <Button
                        onClick={() => {
                          navigate(
                            `/seatmap?theaterId=${data.id}&movieId=${movie.id}&showDate=${props.date}&showTime=${time}`,
                            {
                              state: data,
                            }
                          );
                        }}
                        className="mr-2"
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MoviesListByDate;
