import { IMovie } from "./movie.interface";
import { ITheater } from "./theater.interface";

export interface ISeatmap {
  movie: IMovie;
  theatre: ITheater;
  show_time: string;
  show_date: string;
  preoccupied_seats: Array<string>;
}
