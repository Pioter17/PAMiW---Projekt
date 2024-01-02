import { Director } from "./director";

export interface Movie {
  id: number;
  name: string;
  director: Director
  producer: string;
  rating: number;
  length: number;
}

export interface MovieDTO {
  name: string;
  director_id: number;
  producer: string;
  rating: number;
  length: number;
}

export interface MovieDialogData extends MovieDTO {
  isEdit: boolean;
}

export interface MovieResponse {
  data: Movie;
  isSuccess: boolean;
  message: string;
}