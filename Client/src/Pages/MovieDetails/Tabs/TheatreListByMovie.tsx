import { Card, Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ITheater } from "../../../Interfaces/theatre.interface";
import { theatres_data } from "../../../data/Theatres/theatres_data";

export interface TheatreListByMovie {
  date: string;
}

const TheatreListByMovie = (props: TheatreListByMovie) => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const timing = ["09:40am", "11:45am", "2:30pm", "10:00pm"];

  return (
    <div className="pt-10 w-[80%] grid grid-cols-2 gap-6">
      {theatres_data.map((theatre: ITheater) => {
        return (
          <Card
            title={
              theatre?.name.length > 30 ? (
                <span className="font-bold">
                  {theatre.name.substring(0, 30) + "..."}
                </span>
              ) : (
                <span className="font-bold">{theatre.name}</span>
              )
            }
            style={{ minWidth: 300 }}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span>{theatre.area}</span>
              <span>{theatre.distance}</span>
            </div>
            <div className="flex flex-wrap gap-3 pt-8">
              {timing.map((time: string) => {
                return (
                  <Button
                    onClick={() => {
                      navigate(
                        `/seatmap?theaterId=${data.id}&movieId=${theatre.id}&showDate=${props.date}&showTime=${time}`,
                        {
                          state: data,
                        }
                      );
                    }}
                  >
                    {time}
                  </Button>
                );
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default TheatreListByMovie;
