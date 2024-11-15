// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import HomeBeforeLogin from "./pages/HomeBeforeLogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OtpPage from "./pages/OtpPage";
import SetPassword from "./pages/SetPassword";

import ApiTesting from "./pages/Dashboard/ApiTesting"; // Create this page
import Notifications from "./pages/Dashboard/Notifications"; // Create this page
import AfterLoginHome from "./pages/AfterLoginHome";
import { MyContext } from "./context/MyContext";
import ProfilePage from "./pages/ProfilePage";
import BugPage from "./pages/BugReport/BugPage";
import BugDetails from "./pages/BugReport/BugDetails";
import APIManagement from "./pages/Dashboard/ApiManagement";

const App = () => {
  return (
    <MyContext>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomeBeforeLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/profile" element={<ProfilePage />} />
          <Route path="/project-details" element={<APIManagement />} />
          <Route path="/api-testing" element={<ApiTesting />} />
          <Route path="/notifications" element={<Notifications />} />

            <Route path="/home" element={<AfterLoginHome />} />
            <Route path="/bugs" element={<BugPage />} />
            <Route path="/bug-info" element={<BugDetails />} />
            {/* <Route path="/testApi" element={<ApiTesting />} /> */}

            <Route path="/logout" element={<div>Logout</div>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </MyContext>
  );
};

export default App;
