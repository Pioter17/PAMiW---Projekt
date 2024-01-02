import { Movie } from "./movie";

export interface Director {
  id: number;
  name: string;
  nationality: string;
  age: number;
}

export interface DirectorDialogData extends Omit<Director, "id"> {
  isEdit: boolean;
}