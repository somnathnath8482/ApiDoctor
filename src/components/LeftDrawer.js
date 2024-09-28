import React from 'react';

import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ApiIcon from '@mui/icons-material/Api';
import TestingIcon from '@mui/icons-material/Biotech';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

const LeftDrawer = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{ style: { width: 250 } }}
    >
      <List>
        <ListItem component={Link} to="/dashboard">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/api-management">
          <ListItemIcon>
            <ApiIcon />
          </ListItemIcon>
          <ListItemText primary="API Management" />
        </ListItem>
        <ListItem component={Link} to="/api-testing">
          <ListItemIcon>
            <TestingIcon />
          </ListItemIcon>
          <ListItemText primary="API Testing" />
        </ListItem>
        <ListItem component={Link} to="/notifications">
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem component={Link} to="/edit-profile">
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItem>
        <ListItem component={Link} to="/logout">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LeftDrawer;
