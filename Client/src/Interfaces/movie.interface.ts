export interface IMovie {
  id: number;
  name: string;
  image_url: string;
  runtime: number;
  type: string;
  genre: string;
  rating: number;
  show_timings: Array<string>;
  description: string;
}
