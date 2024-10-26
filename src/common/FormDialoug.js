import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem, Select } from "@mui/material";
import { Fonts } from "../assets/fonts/Fonts";

export default function FormDialog({ ActionButton, onClick,title, desc, placeholder }) {
  const [open, setOpen] = React.useState(false);
  const [severity, setServerity] = React.useState("Critical");

  const handleClickOpen = ({}) => {
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
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            
            handleClose();
            onClick(email,severity);
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           {desc}
          </DialogContentText>
          <div style={{display:'flex', flexDirection:'row' , alignItems:'center', gap:5}}>

          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={severity}
              label="Severity"
              style={{ fontFamily: Fonts.roboto_mono }}
              onChange={(e) => setServerity(e.target.value)}
              sx={{height:40}}
             >
              <MenuItem value="Critical" style={{ fontFamily: Fonts.roboto_mono }}>
              Critical
              </MenuItem>
              <MenuItem value="Major" style={{ fontFamily: Fonts.roboto_mono }}>
              Major
              </MenuItem>
              <MenuItem value="Minor" style={{ fontFamily: Fonts.roboto_mono }}>
              Minor
              </MenuItem>
            
            </Select>

          <TextField
            autoFocus
            required
            margin="dense"
            multiline
            id="name"
            name="email"
            label={placeholder}
            type="email"
            fullWidth
            variant="standard"
          />

          </div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Continue</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
