import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../../api/authApi";
import {
  Nullable,
  UserAuthType,
  UserLoginType,
  UserRegistrationType,
  UserResponseType
} from "../../../types/types";
import { errorResponse } from "../../../common/utils/errorRsponse";
import { RootState } from "../../../app/store";

export const loginIn = createAsyncThunk(
  "authSlice/loginIn",
  async (
    payload: UserLoginType,
    { rejectWithValue, dispatch }
  ): Promise<UserResponseType | Function> => {
    try {
      return await authApi.login(payload);
    } catch (e) {
      return errorResponse(e, rejectWithValue, dispatch);
    }
  }
);

export const createUser = createAsyncThunk(
  "authSlice/createUser",
  async (
    payload: UserRegistrationType,
    { rejectWithValue, dispatch }
  ): Promise<UserResponseType | Function> => {
    try {
      return await authApi.signup(payload);
    } catch (e) {
      return errorResponse(e, rejectWithValue, dispatch);
    }
  }
);

export const fetchAuthMe = createAsyncThunk(
  "authSlice/fetchAuthMe",
  async (
    _,
    { rejectWithValue, dispatch, getState }
  ): Promise<UserResponseType | Function> => {
    try {
      const state = getState() as RootState;
      const token = `Bearer ${state.auth.data?.token || ""}`;
      return await authApi.auth(token);
    } catch (e) {
      return errorResponse(e, rejectWithValue, dispatch);
    }
  }
);

export type InitialAuthStateType = {
  data: Nullable<UserAuthType>;
};

export const initialState: InitialAuthStateType = {
  data: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      const payload = action.payload as unknown as UserResponseType;
      state.data = payload.user;
    });
    builder.addCase(loginIn.fulfilled, (state, action) => {
      const payload = action.payload as unknown as UserResponseType;
      state.data = payload.user;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      const payload = action.payload as unknown as UserResponseType;
      state.data = payload.user;
    });
  }
});

export const { resetAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
