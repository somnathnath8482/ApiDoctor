// src/pages/Login.tsx
import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  useTheme,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { useTheme as useCustomTheme } from "../context/ThemeContext";
import MainToolbar from "../common/MainToolbar";
import { PostRequestFormData, PostRequestJson } from "../Network/ApiRequests";

import { useNavigate } from "react-router-dom";
import { ApiUrls } from "../Network/ApiUrls";
import { UserContext } from "../context/MyContext";
import { storeData, storeJsonData } from "../utill/Storage";

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "8px",
  width: "500px",
  marginTop: "30px",
}));

const Login: React.FC = () => {
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();

  const {token, setToken,setmUser} = useContext(UserContext); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

   // navigate('/home');

    const formDatas = new FormData();

    // Append fields to the FormData object
    formDatas.append("username", formData.username);
    formDatas.append("password", formData.password);

    PostRequestFormData(
      ApiUrls.login,
      formDatas,
      setProgress,
      null,
      setSuccess,
      setError,
      (res: any) => {
        if (res.data.status == "error") {
          navigate("/otp", {
            state: { from: "register", mail: res.data.user.email },
          });
        } else  if (res.data.status == "warning") {
          setError(res.data.message);
          setSuccess(null);
        }else{
          console.log(res.data.user)

          setToken(res.data.token);
          setmUser(res.data.user);
          storeJsonData("user",res.data.user);
          storeData("token",res.data.token);


           navigate('/home');
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
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
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
            Login
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <Link
              href="/forgot-password"
              variant="body2"
              style={{ color: theme.palette.text.primary }}
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </StyledContainer>
    </div>
  );
};

export default Login;
