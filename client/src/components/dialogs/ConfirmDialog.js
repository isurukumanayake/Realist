import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ConfirmDialog = ({ title, children, open, setOpen, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog" variant="h5">
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" color="grey" onClick={() => setOpen(false)}>
          No
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
