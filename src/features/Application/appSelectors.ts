import { Nullable } from "../../types/types";
import { RootState } from "../../app/store";

export const selectorIsProgress = (state: RootState): boolean => state.app.isProgress;

export const selectorIsLoadingApp = (state: RootState): boolean => state.app.isLoading;

export const selectorIsAuthRequest = (stat: RootState): boolean => stat.app.isAuthRequest;

export const selectorErrorMessage = (stat: RootState): Nullable<string> =>
  stat.app.errorMessage;
