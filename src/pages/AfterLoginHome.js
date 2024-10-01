import React, { useContext, useState } from "react";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApiIcon from "@mui/icons-material/Api";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";

import ApiManagement from "./Dashboard/ApiManagement";
import Notifications from "./Dashboard/Notifications";
import TaskToolbar from "../common/TaskToolbar";
import Settings from "./Dashboard/Stettings";
import Dashboard from "./Dashboard/Dashboard";
import ApiTesting from "./Dashboard/ApiTesting";
import InviteUsers from "./Dashboard/InviteUsers";
import { UserContext } from "../context/MyContext";

// Drawer Width
const drawerWidth = 240;

// Styled components
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const DrawerContent = styled("div")(({ theme }) => ({
  width: drawerWidth,
  backgroundColor: theme.palette.background.paper,
}));

const ListItemStyled = styled(ListItem)(({ theme, selected }) => ({
  "&:hover": {
    backgroundColor: selected
      ? theme.palette.primary.light
      : theme.palette.action.hover,
  },
  backgroundColor: selected ? theme.palette.primary.light : "inherit",
  borderTopRightRadius: 30,
  borderBottomRightRadius: 30,
  width:200
}));

// Functional Component
const AfterLoginHome = () => {
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [data, setData] = useState(null);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // Page change handler
  const handlePageChange = (page,access) => {
    setData(access);
    setSelectedPage(page);
  };

  // Render content based on selected page
  const renderContent = (data) => {
    switch (selectedPage) {
      case "dashboard":
        return <Dashboard setSelectedPage={handlePageChange} />;
      case "api-management":
        return <ApiManagement data={data} setSelectedPage={handlePageChange} />;
      case "notifications":
        return <Notifications />;
      case "settings":
        return <Settings />;
      case "test-api":
        return <ApiTesting data={data} setSelectedPage={handlePageChange}/>;
      case "invite-user":
        return <InviteUsers />;
      default:
        return <Dashboard setSelectedPage={setSelectedPage} />;
    }
  };

  return (
    <div>
      {/* Toolbar for menu icon */}
      <TaskToolbar setState={setOpen} />
      {/* Drawer for navigation */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        style={{ width: drawerWidth, flexShrink: 0 }}
        sx={{ width: drawerWidth, flexShrink: 0 }}
      >
        <DrawerContent>
          <DrawerHeader style={{ height: 32 }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton
              onClick={handleDrawerToggle}
              edge="start"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </DrawerHeader>
          {/*  <Divider /> */}
          <List
            style={{
              backgroundColor: theme.palette.primary.main,
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Dashboard */}
            <ListItemStyled
              onClick={() => handlePageChange("dashboard")}
              selected={selectedPage === "dashboard"}
            >
              <DashboardIcon style={{ color: theme.palette.common.white }} />
              <ListItemText
                primary="Dashboard"
                style={{ marginLeft: 10, color: theme.palette.common.white }}
              />
            </ListItemStyled>
          
            {/* Notifications */}
            <ListItemStyled
              onClick={() => handlePageChange("notifications")}
              selected={selectedPage == "notifications"}
            >
              <NotificationsIcon
                style={{ color: theme.palette.common.white }}
              />
              <ListItemText
                primary="Notifications"
                style={{ marginLeft: 10, color: theme.palette.common.white }}
              />
            </ListItemStyled>
            {/* Settings */}
            <ListItemStyled
              onClick={() => handlePageChange("settings")}
              selected={selectedPage == "settings"}
            >
              <SettingsIcon style={{ color: theme.palette.common.white }} />
              <ListItemText
                primary="Settings"
                style={{ marginLeft: 10, color: theme.palette.common.white }}
              />
            </ListItemStyled>
          
            {/* Invite User */}
            {/* <ListItemStyled
              onClick={() => handlePageChange("invite-user")}
              selected={selectedPage == "invite-user"}
            >
              <SettingsIcon style={{ color: theme.palette.common.white }} />
              <ListItemText
                primary="Invite User"
                style={{ marginLeft: 10, color: theme.palette.common.white }}
              />
            </ListItemStyled> */}
          </List>
        </DrawerContent>
      </Drawer>
      {/* Main content area */}
      <main style={{ flexGrow: 1, paddingLeft: open ? drawerWidth : 0 }}>
        {renderContent(data)}
      </main>
    </div>
  );
};

export default AfterLoginHome;
