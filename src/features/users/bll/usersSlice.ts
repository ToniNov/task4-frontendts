import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Nullable,
  UserSendType,
  UsersIdType,
  UsersResponseType,
  UsersUpdateType
} from "../../../types/types";
import { errorResponse } from "../../../common/utils/errorRsponse";
import { usersApi } from "../../../api/usersApi";
import { RootState } from "../../../app/store";

export const fetchUsers = createAsyncThunk(
  "usersSlice/fetchUsers",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const token = `Bearer ${state.auth.data?.token || ""}`;
      return await usersApi.fetchUsers(token);
    } catch (e) {
      return errorResponse(e, rejectWithValue, dispatch);
    }
  }
);

export const removeUsers = createAsyncThunk(
  "usersSlice/removeUsers",
  async (payload: UsersIdType, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const token = `Bearer ${state.auth.data?.token || ""}`;
      return await usersApi.removeUsers(payload, token);
    } catch (e) {
      return errorResponse(e, rejectWithValue, dispatch);
    }
  }
);

export const updateUsers = createAsyncThunk(
  "usersSlice/updateUsers",
  async (payload: UsersUpdateType, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const token = `Bearer ${state.auth.data?.token || ""}`;
      return await usersApi.updateUsers(payload, token);
    } catch (e) {
      return errorResponse(e, rejectWithValue, dispatch);
    }
  }
);

type InitStateType = {
  users: Nullable<UserSendType[]>;
};

export const initialState: InitStateType = { users: null };

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    resetUsersSlice: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const payload = action.payload as unknown as UsersResponseType;
      state.users = payload.users;
    });

    builder.addCase(removeUsers.fulfilled, (state, action) => {
      const payload = action.payload as unknown as UsersResponseType;
      state.users = payload.users;
    });

    builder.addCase(updateUsers.fulfilled, (state, action) => {
      const payload = action.payload as unknown as UsersResponseType;
      state.users = payload.users;
    });
  }
});

export const { resetUsersSlice } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
