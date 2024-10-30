import React from "react";
import {
  Grid2,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  TextField,
  Switch,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { Flex } from "antd";
import TaskToolbar from "../common/TaskToolbar";
import { useTheme } from "@emotion/react";
import { useTheme as useCustomTheme } from "../context/ThemeContext";
const ProfilePage = () => {
    const theme = useTheme();
    const { isDarkMode, toggleTheme } = useCustomTheme(); 
  return (
    <div
    style={{backgroundColor: theme.palette.background.default }}
  >
         {/* Toolbar for menu icon */}
      <TaskToolbar setState={false} backenabled={true}/>
    <Grid2 container spacing={3} style={{ padding: "20px" }}>
      {/* Profile Info */}
      <Grid2 item xs={12} size={6} height={300}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Avatar
              src="https://i.pravatar.cc/300" 
              style={{ width: 80, height: 80 }}
            />
            <Typography variant="h5">John Doe</Typography>
            <Typography variant="subtitle1">Developer</Typography>
            <Typography variant="subtitle2">john.doe@example.com</Typography>
            <Button variant="outlined" style={{ marginTop: 10 }}>
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </Grid2>

      {/* Customization */}
      <Grid2 item xs={12} size={6} height={300}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6">Personalization</Typography>
            <TextField
              label="Timezone"
              select
              SelectProps={{ native: true }}
              fullWidth
              margin="normal"
              disabled
            >
              <option value="GMT">GMT</option>
              <option value="PST">PST</option>
              {/* Add more options */}
            </TextField>
            <TextField
              label="Language"
              select
              SelectProps={{ native: true }}
              fullWidth
              margin="normal"
              disabled
              
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              {/* Add more options */}
            </TextField>
            <Switch checked={isDarkMode} onChange={toggleTheme}/> Dark Theme
          </CardContent>
        </Card>
      </Grid2>
      {/* Activity Log */}
      <Grid2 item xs={12} size={12}>
        <Card sx={{ height: "100%", width:"100%" }}>
          <CardContent>
            <Typography variant="h6">Activity Log</Typography>
            <List>
              <ListItem>Login - Oct 21, 2024 10:30 AM</ListItem>
              <Divider />
              <ListItem>Password Change - Oct 20, 2024 08:30 PM</ListItem>
              {/* More activity logs */}
            </List>
            <Button variant="outlined" style={{ marginTop: 10 }}>
              Download Log
            </Button>
          </CardContent>
        </Card>
      </Grid2>

      {/* Account Security */}
      <Grid2 item xs={12} size={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Account Security</Typography>
            <Button variant="outlined" style={{ marginBottom: 10 }}>
              Change Password
            </Button>
            <Typography variant="subtitle2">
              Two-Factor Authentication
            </Typography>
            <Switch />
            <Typography variant="subtitle2">Trusted Devices</Typography>
            <List>
              <ListItem>Device 1 - Last Used: Oct 21, 2024</ListItem>
              <ListItem>Device 2 - Last Used: Oct 20, 2024</ListItem>
            </List>
            <Button variant="outlined" style={{ marginTop: 10 }}>
              Manage Devices
            </Button>
          </CardContent>
        </Card>
      </Grid2>

      {/* Notification Settings */}
      <Grid2 item xs={12} size={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Notification Settings</Typography>
            <List>
              <ListItem>
                Email Notifications <Switch />
              </ListItem>
              <ListItem>
                In-app Notifications <Switch />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
    </div>
  );
};

export default ProfilePage;
