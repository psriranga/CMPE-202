import React, { useEffect } from "react";
import { useAppSelector } from "../../../state/hooks";
import { DeleteTwoTone, StarTwoTone } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { IMovie } from "../../../Interfaces/movie.interface";

interface MovieConfigurations {
  showModal: (type: string) => void;
}

const Movies = ({ showModal }: MovieConfigurations) => {
  const movies = useAppSelector((state: any) => state.movies);
  useEffect(() => {
    console.log(movies, "movies");
  }, [movies]);

  return (
    <div>
      {" "}
      <div className="grid grid-cols-3 gap-4">
        {movies.movies?.map((movie: IMovie) => {
          return (
            <Meta
              title={
                <div
                  className="flex justify-between items-center"
                  onClick={() => {
                    showModal("movies");
                  }}
                >
                  <div>
                    {movie.name.length > 25
                      ? movie.name.substring(0, 25) + "..."
                      : movie.name}
                  </div>
                  <div className="cursor-pointer">
                    <DeleteTwoTone />
                  </div>
                </div>
              }
              description={
                <div className="flex items-center justify-between">
                  <span>
                    {movie.genre.length > 15
                      ? movie.genre.substring(0, 15) + "..."
                      : movie.genre}
                  </span>
                  <span>
                    <StarTwoTone className="mr-1" />
                    {movie.rating}
                  </span>
                </div>
              }
              className="bg-white p-3 rounded-md border-l-[4px] border-l-[#6BE9FA] border-solid border-[#e0e0e0] border-[1px] cursor-pointer hover:shadow-md"
            />
            // </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;