import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "../features/Application/appSlice";
import { authReducer } from "../features/auth/bll/authSlices";
import { usersReducer } from "../features/users/bll/usersSlice";
import { loadStateToken, saveState } from "../common/utils/saveLocalStorage";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    users: usersReducer
  },
  preloadedState: {
    auth: loadStateToken()
  }
});

store.subscribe(() => {
  saveState(store.getState().auth.data?.token || "");
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
