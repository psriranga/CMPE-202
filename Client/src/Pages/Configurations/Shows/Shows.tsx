import React, { useEffect } from "react";
import { IShow } from "../../../Interfaces/show.interface";
import dayjs from "dayjs";

export interface IShowInterface {
  showModal: (type: string) => void;
  shows: Array<IShow>;
  getShows: () => void;
  form: any;
  setSelectedShow: any;
}

const Shows = ({
  showModal,
  shows,
  getShows,
  form,
  setSelectedShow,
}: IShowInterface) => {
  useEffect(() => {
    console.log(shows, "shows");
  }, [shows]);

  return (
    <div>
      {shows?.map((show: IShow) => {
        return (
          <div
            className="w-[95%] border-[1px] border-solid border-[#e0e0e0] p-3 mb-2 rounded-md border-l-[4px] border-l-[#6BE9FA]"
            onClick={() => {
              console.log(show);
              setSelectedShow(show);
              form.setFieldsValue(show);
              showModal("shows");
            }}
          >
            <div className="flex items-center">
              <div className="mr-4"> Movie :{show.movie.name}</div>{" "}
              <div className="mr-4">Theater :{show.theater.name}</div>
              <div className="mr-4">
                Show Timing :
                {dayjs(show.show_timing).format("dddd, MMMM DD, YYYY, h:mm A ")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Shows;
