export type UserType = {
  id: number;
  email: string;
  password: string;
  canModifyUsers: boolean;
  name: string;
  lastName: string;
};

export type UserSecure = {
  id: number;
  email: string;
  canModifyUsers: boolean;
  name: string;
  lastName: string;
};

export type UserErrors = {
  email: string;
  password: string;
  oldPassword: string;
  name: string;
  lastName: string;
};
