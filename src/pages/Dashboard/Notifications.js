import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Badge,
  Button,
  IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MarkAsReadIcon from "@mui/icons-material/DoneAll";
import { useTheme } from "@emotion/react";
import { Fonts } from "../../assets/fonts/Fonts";

const notificationList = [
  {
    id: 1,
    title: 'New Comment on API "Get Users"',
    description: "A new comment was added to the API by John Doe.",
    date: "2024-09-14 10:30 AM",
    type: "Comment",
    isRead: false,
  },
  {
    id: 2,
    title: "API Status Update",
    description: 'API "Create User" has been set to Active.',
    date: "2024-09-13 09:15 AM",
    type: "Status",
    isRead: true,
  },
  {
    id: 3,
    title: "New API Access",
    description: 'You have been granted access to the API "Update Profile".',
    date: "2024-09-12 08:00 AM",
    type: "Access",
    isRead: false,
  },
  // Add more notifications as needed
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationList);

  const [hasActive, setHasActive] = useState(true);

  const theme = useTheme();
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
    setHasActive(false);
  };

  return (
    <div
      style={{
        padding: 20,
        minHeight: 700,
        backgroundColor: theme.palette.background.default,
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
        Notification
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

      <div
        style={{
          marginTop: 16,
          display: "flex",
          flex: 1,
          justifyContent: "end",
        }}
      >
        <Button
          onClick={markAllAsRead}
          startIcon={<MarkAsReadIcon />}
          variant={hasActive ? "contained" : "outlined"}
          color="primary"
        >
          Mark All as Read
        </Button>
      </div>

      <List>
        {notifications.map((notification) => (
          <Card key={notification.id} style={{ marginBottom: 16 }}>
            <CardContent>
              <ListItem>
                <ListItemText
                  primary={notification.title}
                  secondary={`${notification.description} - ${notification.date}`}
                />
                <Badge
                  color="secondary"
                  variant="dot"
                  invisible={notification.isRead}
                >
                  <NotificationsIcon />
                </Badge>
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </div>
  );
};

export default Notifications;
