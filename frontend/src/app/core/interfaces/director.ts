export interface Director {
  id: number;
  name: string;
  nationality: string;
  age: number;
}

export interface DirectorDialogData extends Omit<Director, "id"> {
  isEdit: boolean;
}

export interface DirectorPaginationResponse {
  content: Director[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: any;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}