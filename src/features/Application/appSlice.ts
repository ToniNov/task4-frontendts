import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Nullable } from "../../types/types";
import { fetchAuthMe } from "../auth/bll/authSlices";

type InitialStateType = {
  errorMessage: Nullable<string>;
  isLoading: boolean;
  isProgress: boolean;
  isAuthRequest: boolean;
};

export const initialState: InitialStateType = {
  errorMessage: "",
  isLoading: false,
  isProgress: false,
  isAuthRequest: false
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    occurredError: (state, action: PayloadAction<Nullable<string>>) => {
      state.errorMessage = action.payload;
    },
    startApp: (state) => {
      state.isLoading = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthMe.fulfilled, (state) => {
      state.isAuthRequest = true;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.isAuthRequest = true;
    });
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.isProgress = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action: PayloadAction<string>) => {
        state.isProgress = false;
        state.errorMessage = action.payload;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/fulfilled"),
      (state) => {
        state.isProgress = false;
      }
    );
  }
});

export const { occurredError, startApp } = appSlice.actions;

export const appReducer = appSlice.reducer;
