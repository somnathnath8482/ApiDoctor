import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Backdrop,
  CircularProgress,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { PostRequestJson } from "../../Network/ApiRequests";
import { ApiUrls } from "../../Network/ApiUrls";
import { useTheme } from "@emotion/react";

import DeleteIcon from "@mui/icons-material/Delete";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InviteUserDialoug = ({ open, onClose, token , refresh,projectId}) => {
 

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [progress, setProgress] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("OWNER");
  const [invites, setInvites] = useState([]);
  const theme = useTheme();
  const handleAddInvite = (event) => {
    event.preventDefault();
    if (email && !invites.some((invite) => invite.email === email)) {
      setInvites([...invites, { email, role }]);
      setEmail("");
      setRole("OWNER");
    }
  };

  const roles = [
    { value: "OWNER", label: "Owner" },
    { value: "EDITOR", label: "Editor" },
    { value: "VIEWER", label: "Viewer" },
  ];

  const handleRemoveInvite = (emailToRemove) => {
    setInvites(invites.filter((invite) => invite.email !== emailToRemove));
  };

  const handleSendInvites = () => {
  
    const obj = {
      projectId: projectId,
      access: invites,
      
    };

 
    PostRequestJson(
      ApiUrls.addProjectsAccess,
      obj,
      setProgress,
      token,
      setSuccess,
      setError,
      (res) => {
       refresh();
        onClose();
      },
      null
    );

  };



  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: "10px",
          height: "80%", // For bottom-sheet-like dialog
        },
      }}
    >
      <DialogTitle>
        Invite User
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
      <form style={{ padding: "16px", }} onSubmit={handleAddInvite}>
        <Typography
          variant="h5"
          gutterBottom
          style={{ color: theme.palette.text.primary }}
        >
          Invite Users
        </Typography>
        <FormControl fullWidth style={{ marginBottom: "16px" }}>
          <TextField
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            type="email"
            variant="outlined"
            style={{ marginBottom: "16px" }}
          />
          <FormControl fullWidth style={{ marginBottom: "16px" }}>
            <TextField
              label="Role"
              name="role"
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              style={{ marginBottom: "16px" }}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Add to List
          </Button>
        </FormControl>

        <Divider style={{ margin: "16px 0" }} />

        <List>
          {invites.map((invite, index) => (
            <ListItem
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemText
                primary={invite.email}
                secondary={`Role: ${invite.role}`}
              />
              <IconButton onClick={() => handleRemoveInvite(invite.email)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        {!!error && (
            <Alert variant="outlined" severity="error" sx={{ marginBottom: 3 }}>
              {error}
            </Alert>
          )}

          {!!success && (
            <Alert
              variant="outlined"
              severity="success"
              sx={{ marginBottom: 3 }}
            >
              {success}
            </Alert>
          )}

          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={progress}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        <Button
          variant="contained"
          color="primary"
         onClick={handleSendInvites}
          style={{ marginTop: "16px" }}
        >
          Send Invitations
        </Button>
      </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserDialoug;
