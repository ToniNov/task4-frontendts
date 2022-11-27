import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectorErrorMessage } from "../../features/Application/appSelectors";
import { occurredError } from "../../features/Application/appSlice";
import React, { SyntheticEvent } from "react";

const Alert = React.forwardRef((props: AlertProps, ref: any) => {
  return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
  const error = useAppSelector(selectorErrorMessage);
  const dispatch = useAppDispatch();

  const handleClose = (event?: SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(occurredError(null));
  };

  const isOpen = error !== null;

  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}
