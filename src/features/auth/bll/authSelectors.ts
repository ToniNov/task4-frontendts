import { RootState } from "../../../app/store";

export const selectorUserAuthName = (state: RootState): string | undefined =>
  state.auth.data?.name;
