export type UserType = {
  id: number;
  email: string;
  password: string;
  role: number;
  name: string;
  lastName: string;
};

export type UserSecure = {
  id: number;
  email: string;
  role: number;
  name: string;
  lastName: string;
};

export type UserErrors = {
  email: string;
  password: string | null;
  oldPassword: string;
  name: string;
  lastName: string;
};

export type MediaType = {
  uuid: string;
  title: string;
};
