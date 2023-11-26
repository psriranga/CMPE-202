import React, { useEffect, useState } from "react";
import { ITheater } from "../../../Interfaces/theatre.interface";
import { DeleteTwoTone } from "@ant-design/icons";

interface TheaterConfigurations {
  showModal: (type: string) => void;
  theaters: Array<ITheater>;
}

const Theaters = ({ showModal, theaters }: TheaterConfigurations) => {
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
                <span className="text-gray-400 text-[12px]">
                  {theatre.zip_code}
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
