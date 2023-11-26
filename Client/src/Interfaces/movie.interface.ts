export interface IMovie {
  id: string;
  name: string;
  image_url: string;
  runtime: number;
  genre: string;
  rating: number;
  show_timings: Array<string>;
  description: string;
}
