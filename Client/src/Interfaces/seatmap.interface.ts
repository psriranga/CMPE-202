import { IMovie } from "./movie.interface";
import { ITheater } from "./theater.interface";

export interface ISeatmap {
  id?: any;
  price: number;
  movie: IMovie;
  theater: ITheater;
  show_time: string;
  show_date: string;
  show_timing: string;
  preoccupied_seats: Array<string>;
}
