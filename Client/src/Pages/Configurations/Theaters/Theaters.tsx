import React, { useEffect } from "react";
import { useAppSelector } from "../../../state/hooks";
import { ITheater } from "../../../Interfaces/theatre.interface";
import { DeleteTwoTone } from "@ant-design/icons";

interface TheaterConfigurations {
  showModal: (type: string) => void;
}

const Theaters = ({ showModal }: TheaterConfigurations) => {
  const theatres = useAppSelector((state: any) => state.theatres);
  useEffect(() => {
    console.log(theatres, "movies");
  }, [theatres]);
  return (
    <div>
      {" "}
      <div className="grid grid-cols-2 gap-4">
        {theatres.theatres?.map((theatre: ITheater) => {
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
