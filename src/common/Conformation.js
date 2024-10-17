import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Conformation = ({
  ActionButton,
  title,
  desc,
  posativeText,
  negativeText,
  negativeClick,
  posativeClick,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div onClick={handleClickOpen}>{ActionButton}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              negativeClick && negativeClick();
            }}
          >
            {negativeText ? negativeText : "Cancle"}
          </Button>
          <Button
            onClick={() => {
              handleClose();
              posativeClick && posativeClick();
            }}
            autoFocus
          >
            {posativeText ? posativeText : "Ok"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Conformation;
