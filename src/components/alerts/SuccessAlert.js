import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

function SuccessAlert({ children, open, onClose }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "center", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={() => onClose()}
    >
      <Alert onClose={() => onClose()} severity="success">
        {children}
      </Alert>
    </Snackbar>
  );
}

export default SuccessAlert;
