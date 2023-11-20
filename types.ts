export interface UserType {
  id: number;
  email: string;
  password: string;
  canModifyUsers: boolean;
  name: string;
  lastName: string;
}

export interface UserSecure {
  id: number;
  email: string;
  canModifyUsers: boolean;
  name: string;
  lastName: string;
}
