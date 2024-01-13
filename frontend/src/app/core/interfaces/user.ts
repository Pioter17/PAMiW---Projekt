export interface User {
  sub: string;
  roles: Role[];
}

export interface Role {
  authority: string;
}
