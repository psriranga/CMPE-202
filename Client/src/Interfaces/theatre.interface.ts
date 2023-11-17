export interface ITheater {
  id: string;
  name: string;
  area: string;
  distance: string;
}

export interface TheatreFilter {
  title: string;
  options: Array<string>;
}
