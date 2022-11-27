import { UserLoginType, UserRegistrationType, UserResponseType } from "../types/types";
import axios from "./axios";
import { Path } from "../common/enum/path";
import { AxiosResponse } from "axios";

export const authApi = {
  signup: async (payload: UserRegistrationType) => {
    const res = await axios.post<
      any,
      AxiosResponse<UserResponseType, UserRegistrationType>,
      UserRegistrationType
    >(`${Path.Signup}`, { ...payload });
    return res.data;
  },
  login: async (payload: UserLoginType) => {
    const res = await axios.post<
      any,
      AxiosResponse<UserResponseType, UserLoginType>,
      UserLoginType
    >(`${Path.Login}`, { ...payload });
    return res.data;
  },
  auth: async (token: string) => {
    const res = await axios.get<UserResponseType>(`${Path.Auth}`, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  }
};
