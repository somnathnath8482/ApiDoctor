// src/pages/ForgotPassword.tsx
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
import MainToolbar from "../common/MainToolbar";
import { useNavigate } from "react-router-dom";
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

const ForgotPassword: React.FC = () => {
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [progress, setProgress] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formDatas = new FormData();

    formDatas.append("email", email);

    PostRequestFormData(
      ApiUrls.forgotPassword,
      formDatas,
      setProgress,
      null,
      setSuccess,
      setError,
      (res: any) => {
        navigate("/otp", {
          state: { from: "forgot", mail: email },
        });
      },
      null
    );

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
      <MainToolbar />
      <StyledContainer>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: theme.palette.text.primary }}
        >
          Forgot Password
        </Typography>
        <Typography
          variant="body1"
          align="center"
          paragraph
          style={{ color: theme.palette.text.secondary }}
        >
          Enter your email address below to receive a password reset link.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            style={{ marginBottom: "16px" }}
          />

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

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Reset Link
          </Button>
        </form>
      </StyledContainer>
    </div>
  );
};

export default ForgotPassword;
