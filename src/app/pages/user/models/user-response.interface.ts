export interface UserResponse {
  userId: number;
  userName: string;
  email: string;
  image: string;
  authType: string;
  state: number;
  stateUser: string;
  badgeColor: string;
  icEdit: object;
  icDelete: object;
}

export interface UserByIdResponse {
  userId: number;
  userName: string;
  password: string;
  email: string;
  image: File;
  authType: string;
  state: number;
}
