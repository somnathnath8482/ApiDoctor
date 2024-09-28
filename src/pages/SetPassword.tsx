// src/pages/SetPasswordPage.tsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  useTheme,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { useTheme as useCustomTheme } from "../context/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";
import { PostRequestFormData } from "../Network/ApiRequests";
import { ApiUrls } from "../Network/ApiUrls";

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "20px",
  borderRadius: "8px",
  width: "500px",
  marginTop: "30px",
}));

const SetPassword: React.FC = () => {
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();
  const navigate = useNavigate();

  const location = useLocation();
  const { mail } = location.state;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(null);
  const [progress, setProgress] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      setApiError("Passwords do not match");
      return;
    }

    const formDatas = new FormData();
    // Append fields to the FormData object
    formDatas.append("email", mail);
    formDatas.append("newPassword", password);

    PostRequestFormData(
      ApiUrls.setPassword,
      formDatas,
      setProgress,
      null,
      setSuccess,
      setApiError,
      (res: any) => {
        navigate("/login");
      },
      null
    );

    // Navigate to login page after successful password reset
    navigate("/login"); // Adjust the path to your login page
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StyledContainer>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: theme.palette.text.primary }}
        >
          Set New Password
        </Typography>
        <Typography
          variant="body1"
          align="center"
          paragraph
          style={{ color: theme.palette.text.secondary }}
        >
          Enter and confirm your new password.
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
          />

          {!!apiError && (
            <Alert variant="outlined" severity="error" sx={{ marginBottom: 3 }}>
              {apiError}
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Set Password
          </Button>
        </form>
      </StyledContainer>
    </div>
  );
};

export default SetPassword;
