// src/pages/Signup.tsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  useTheme,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { useTheme as useCustomTheme } from "../context/ThemeContext";
import MainToolbar from "../common/MainToolbar";
import { STRINGS } from "../constants/strings";
import { PostRequestJson } from "../Network/ApiRequests";
import { ApiUrls } from "../Network/ApiUrls";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

// Define roles for selection
const roles = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "COMPANY", label: "Company" },
];

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "20px",
  borderRadius: "8px",
  width: "500px",
  marginTop: "30px",
}));

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [progress, setProgress] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
 
    const obj = {
      ...formData,
      passwordHash: formData.password,
    };

    PostRequestJson(
      ApiUrls.register,
      obj,
      setProgress,
      null,
      setSuccess,
      setError,
      (res: any) => {
        if(res.code==200){
          navigate('/otp',{state:{from:"register", mail: formData.email }});
        }
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
          {STRINGS.REGISTER}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            style={{ marginBottom: "16px" }}
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            style={{ marginBottom: "16px" }}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            required
            style={{ marginBottom: "16px" }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            style={{ marginBottom: "16px" }}
          />
          <TextField
            label="Role"
            name="role"
            select
            value={formData.role}
            onChange={handleChange}
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
            Sign Up
          </Button>
        </form>
      </StyledContainer>
    </div>
  );
};

export default Register;
