import { message } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

interface ISeatMap {
  selectedSeats: Array<string>;
  setSelectedSeats: (selectedSeats: Array<string>) => void;
  preBookedSeats: Array<string>;
}

const SeatMap = ({
  selectedSeats,
  setSelectedSeats,
  preBookedSeats,
}: ISeatMap) => {
  const rows: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columns: Array<string> = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const handleSelectSeats = (seat: string) => {
    let tempSelectedSeats: Array<string> = [...selectedSeats];
    if (tempSelectedSeats.includes(seat)) {
      tempSelectedSeats = tempSelectedSeats.filter(
        (selectedSeat) => selectedSeat !== seat
      );
    } else {
      tempSelectedSeats.push(seat);
    }

    setSelectedSeats(tempSelectedSeats);
  };

  return (
    <div>
      <div className="flex justify-center items-center p-3 bg-[#FFFF99] mb-10">
        <span>Screen</span>
      </div>
      {rows.map((row: string) => {
        return (
          <div className="flex justify-center items-center w-full mb-2 rounded-md">
            {columns.map((column: string) => {
              let tempSeat = row + column;
              return (
                <div
                  className={`${
                    preBookedSeats.includes(tempSeat)
                      ? "bg-gray-300 text-white pointer-none"
                      : ""
                  } ${
                    selectedSeats.includes(tempSeat)
                      ? "bg-green-600 text-white"
                      : "bg-[#FFFF99]"
                  } p-2 px-3 rounded-t-md m-auto text-sm cursor-pointer hover:text-[white]`}
                  onClick={() => {
                    if (preBookedSeats.includes(tempSeat) === false) {
                      if (
                        selectedSeats.includes(tempSeat) ||
                        selectedSeats.length < 8
                      ) {
                        handleSelectSeats(tempSeat);
                      } else {
                        message.warning(
                          "You have reached maximum ticket booking limit!"
                        );
                      }
                    }
                  }}
                >
                  {tempSeat}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SeatMap;
