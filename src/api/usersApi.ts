import { Path } from "../common/enum/path";
import { UsersIdType, UsersResponseType, UsersUpdateType } from "../types/types";
import axios from "./axios";

export const usersApi = {
  fetchUsers: async (token: string) => {
    const res = await axios.get<UsersResponseType>(`${Path.Users}`, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  },
  removeUsers: async (payload: UsersIdType, token: string) => {
    const res = await axios.delete<UsersIdType>(`${Path.Users}`, {
      data: payload,
      headers: {
        Authorization: token
      }
    });
    return res.data;
  },
  updateUsers: async (payload: UsersUpdateType, token: string) => {
    const res = await axios.post<UsersResponseType>(`${Path.Users}`, payload, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  }
};
