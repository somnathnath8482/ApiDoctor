import React, { useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  useTheme,
  Switch,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled, keyframes } from "@mui/system";
import { useTheme as useCustomTheme } from "../context/ThemeContext";
import MainToolbar from "../common/MainToolbar";
import { readData } from "../utill/Storage";
import { UserContext } from "../context/MyContext";
import { GetRequest } from "../Network/ApiRequests";
import { ApiUrls } from "../Network/ApiUrls";

const HomeBeforeLogin: React.FC = () => {
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const theme = useTheme();
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);



  const applyTraffic = async() => {
    GetRequest(
      ApiUrls.traffic,
      {},
      null,
      null,
      null,
      null,
      (res:any) => {
      },
      null
    );

  }; 


  useEffect(() => {
    applyTraffic();
    let token = readData("token");
    if (!!token && token != "") {
      setToken(token);
      navigate("/home");
    }
  }, []);




  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navigation Toolbar */}
      <MainToolbar />

      {/* Main Content */}
      <div
        style={{
          backgroundColor: theme.palette.background.default,
          padding: "20px",
          flex: 1, // Allows the Container to take up remaining space
        }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          style={{ color: theme.palette.text.primary }}
        >
          Welcome to API Management Suite
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          paragraph
          style={{ color: theme.palette.text.secondary }}
        >
          A powerful tool to create, test, and manage your APIs with ease!
        </Typography>

        {/* Keyframe Animation */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "300px",
              height: "300px",
              background: "#3685B5",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBeforeLogin;
