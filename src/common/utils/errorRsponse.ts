import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { resetAuth } from "../../features/auth/bll/authSlices";
import { resetUsersSlice } from "../../features/users/bll/usersSlice";

export const errorResponse = (
  e: any,
  rejectWithValue: Function,
  dispatch: Dispatch
): Function => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    console.log("res err", err.response?.data?.auth);
    if (err.response?.data?.auth === false) {
      dispatch(resetAuth());
      dispatch(resetUsersSlice());
    }
    const error = err.response?.data ? err.response.data.message : err.message;
    return rejectWithValue(error);
  }
  if (e instanceof Error) {
    return rejectWithValue(err.message);
  }
  return rejectWithValue(err);
};
