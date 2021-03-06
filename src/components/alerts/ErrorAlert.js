import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

function ErrorAlert({ children, open, onClose }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={() => onClose()}
    >
      <Alert onClose={() => onClose()} severity="error">
        {children}
      </Alert>
    </Snackbar>
  );
}

export default ErrorAlert;
