export interface UserRequest {
  userName: string;
  password?: string;
  email: string;
  image: File;
  authType: string;
  state: number;
}
