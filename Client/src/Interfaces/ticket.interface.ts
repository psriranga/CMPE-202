import { IMovie } from "./movie.interface";
import { ITheater } from "./theatre.interface";

export interface ITicket {
  seats: Array<string>;
  show_time: string;
  show_date: string;
  movie: IMovie;
  theater: ITheater;
}
