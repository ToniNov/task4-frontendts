import { Status } from "../common/enum/status";

export type Nullable<T> = T | null;

export type UserSendType = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  timeLastLogin: string;
  status: StatusType;
  _v: number;
};

export type UserAuthType = UserSendType & {
  token: string;
};

export type StatusType = Status.Unblock | Status.Block;

export type UserRegistrationType = UserLoginType & {
  name: string;
};

export type UserLoginType = {
  email: string;
  password: string;
};

export type UserResponseType = {
  user: UserAuthType;
};

export type UsersIdType = {
  id: string[];
};

export type UsersUpdateType = UsersIdType & {
  data: string;
};

export type UsersResponseType = {
  users: UserSendType[];
};
