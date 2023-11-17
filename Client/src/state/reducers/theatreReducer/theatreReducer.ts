import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITheater } from "../../../Interfaces/theatre.interface";

type theatresState = { theatres: Array<ITheater> };
const initialState = { theatres: [] };

const theatreSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    allTheatres: (state: theatresState, action: PayloadAction<any>) => {
      console.log("calling!", action.payload);
      state.theatres = action.payload;
    },
  },
});
export const { allTheatres } = theatreSlice.actions;
export default theatreSlice.reducer;
