import React, { useCallback, useEffect } from "react";
import "./App.css";
import { Routers } from "../common/Routers";
import { useAppDispatch, useAppSelector } from "../common/hooks/hooks";
import {
  selectorIsAuthRequest,
  selectorIsLoadingApp
} from "../features/Application/appSelectors";
import { selectorUserAuthName } from "../features/auth/bll/authSelectors";
import { fetchAuthMe, resetAuth } from "../features/auth/bll/authSlices";
import { startApp } from "../features/Application/appSlice";
import { AppBar, LinearProgress, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import { ErrorSnackbar } from "../common/components/Snackbar";

function App() {
  const dispatch = useAppDispatch();
  const isAuthRequest = useAppSelector(selectorIsAuthRequest);
  const isLoadingApp = useAppSelector(selectorIsLoadingApp);
  const isAuth = useAppSelector(selectorUserAuthName);

  useEffect(() => {
    if (isLoadingApp && isAuthRequest) {
      dispatch(startApp());
    }
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(resetAuth());
  }, []);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          {isAuth ? (
            <Button color="inherit" onClick={logoutHandler}>
              Log out account {isAuth || ""}
            </Button>
          ) : null}
        </Toolbar>
        {isLoadingApp && !isAuthRequest && <LinearProgress />}
      </AppBar>
      <Routers />
    </div>
  );
}

export default App;
