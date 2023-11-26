export interface ITheater {
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  zip_code: string;
  technologies: Array<string>;
  cuisines: Array<string>;
  shows: Array<string>;
  no_of_rows: number;
  no_of_cols: number;
  id: number;
}

export interface TheatreFilter {
  title: string;
  options: Array<string>;
}
