// InviteUsers.js

import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";

const InviteUsers = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Developer");
  const [invites, setInvites] = useState([]);
  const theme = useTheme();
  const handleAddInvite = () => {
    if (email && !invites.some((invite) => invite.email === email)) {
      setInvites([...invites, { email, role }]);
      setEmail("");
      setRole("Developer");
    }
  };

  const roles = [
    { value: "ADMIN", label: "Admin" },
    { value: "DEVELOPER", label: "Developer" },
    { value: "TESTER", label: "Tester" },
    { value: "VIEWER", label: "Viewer" },
  ];

  const handleRemoveInvite = (emailToRemove) => {
    setInvites(invites.filter((invite) => invite.email !== emailToRemove));
  };

  const handleSendInvites = () => {
    // Add functionality to send invites
    alert("Invites sent!");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: theme.palette.background.default,
        minHeight: 700,
      }}
    >
      <div style={{ padding: "16px", width: 600 }}>
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
          <Button variant="contained" color="primary" onClick={handleAddInvite}>
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

        <Button
          variant="contained"
          color="primary"
          onClick={handleSendInvites}
          style={{ marginTop: "16px" }}
        >
          Send Invitations
        </Button>
      </div>
    </div>
  );
};

export default InviteUsers;
