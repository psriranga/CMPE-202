import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../state/hooks";
import { ITheater } from "../../../Interfaces/theatre.interface";
import { DeleteTwoTone } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../env";
import { allTheatres } from "../../../state/reducers/theatreReducer/theatreReducer";

interface TheaterConfigurations {
  showModal: (type: string) => void;
}

const Theaters = ({ showModal }: TheaterConfigurations) => {
  const [theaters, setTheaters] = useState<Array<ITheater>>();
  const getTheatres = () => {
    axios
      .get(BASE_URL + "/theatres")
      .then((res) => {
        console.log("getting res", res.data);
        setTheaters(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTheatres();
  }, []);
  useEffect(() => {
    console.log(theaters, "movies");
  }, [theaters]);
  return (
    <div>
      {" "}
      <div className="grid grid-cols-2 gap-4">
        {theaters?.map((theatre: ITheater) => {
          return (
            <div
              className="rounded-md border-[1px] border-l-[4px] border-l-[#6BE9FA] border-[#e0e0e0] border-solid p-2 hover:shadow-md cursor-pointer"
              onClick={() => {
                showModal("theaters");
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  {theatre?.name.length > 40
                    ? theatre.name.substring(0, 40) + "..."
                    : theatre.name}
                </div>
                <div className="cursor-pointer">
                  <DeleteTwoTone />
                </div>
              </div>
              <div className="flex items-center justify-between mt-1">
                {" "}
                <span className="text-gray-400 text-[12px]">
                  {theatre.area}
                </span>
                <span className="text-gray-400 text-[12px]">
                  {theatre.distance}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Theaters;
