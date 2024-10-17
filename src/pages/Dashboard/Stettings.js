import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useTheme } from "@emotion/react";
import { Fonts } from "../../assets/fonts/Fonts";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "",
  });
  const theme = useTheme();
  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailNotifications: true,
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreferencesChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.checked,
    });
  };

  const saveSettings = () => {
    // Add logic to save settings here
    alert("Settings saved!");
  };

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: theme.palette.background.default,
        minHeight: 700,
      }}
    >
      <Typography
        gutterBottom
        style={{
          color: theme.palette.text.primary,
          fontFamily: Fonts.roboto_mono,
          fontWeight: "bold",
          marginBottom: 0,
          fontSize: 30,
        }}
      >
        Settings v4
      </Typography>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <div
          style={{
            backgroundColor: theme.palette.primary.main,
            height: 5,
            width: 30,
          }}
        />
        <div
          style={{
            backgroundColor: theme.palette.text.primary,
            height: 1,
            width: 135,
          }}
        />
      </div>
      <Card style={{ marginBottom: 20, marginTop: 15 }}>
        <CardContent>
          <Typography
            style={{
              color: theme.palette.text.primary,
              fontFamily: Fonts.roboto_mono,
              marginBottom: 0,
              fontSize: 15,
            }}
          >
            Profile Information
          </Typography>
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <TextField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              fullWidth
              margin="normal"
            />
          </div>

          <TextField
            label="Password"
            name="password"
            type="password"
            value={profile.password}
            onChange={handleProfileChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            style={{ marginBottom: "16px" , width:'49.5%'}}
          />
        </CardContent>
      </Card>

      <Card style={{ marginBottom: 20 }}>
        <CardContent>
          <Typography
            style={{
              color: theme.palette.text.primary,
              fontFamily: Fonts.roboto_mono,
              marginBottom: 0,
              fontSize: 15,
            }}
          >
            Preferences
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.darkMode}
                onChange={handlePreferencesChange}
                name="darkMode"
              />
            }
            label="Dark Mode"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.emailNotifications}
                onChange={handlePreferencesChange}
                name="emailNotifications"
              />
            }
            label="Email Notifications"
          />
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={saveSettings}
      >
        Save Settings
      </Button>
    </div>
  );
};

export default Settings;
