import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "./moviesReducer/moviesReducer";
import theatreReducer from "./theatreReducer/theatreReducer";
import cartReducer from "./cartReducer/cartReducer";
import orderConfirmation from "./orderConfirmation/orderConfirmation";

const reducers = combineReducers({
  movies: moviesReducer,
  theatres: theatreReducer,
  cart: cartReducer,
  orderConfirmation: orderConfirmation,
});

export default reducers;
