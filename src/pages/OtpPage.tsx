// src/pages/OtpPage.tsx
import React, { useState, useRef, useEffect } from "react";
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
import MainToolbar from "../common/MainToolbar";
import { Email } from "@mui/icons-material";
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

const OtpInput = styled(TextField)({
  width: "50px",
  height: "50px",
  margin: "0 5px",
  textAlign: "center",
});

const OtpPage: React.FC = () => {
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();
  const { from, mail } = location.state;
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(6).fill(null)
  );

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [progress, setProgress] = useState(false);

  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(timer);
    } else {
      // Time's up, show the resend button
      setTimeLeft(0);
    }
  }, [timeLeft]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const otpValue = otp.join("");
    const formDatas = new FormData();
    // Append fields to the FormData object
    formDatas.append("email", mail);
    formDatas.append("otp", otpValue);

    PostRequestFormData(
      ApiUrls.verifyOtp,
      formDatas,
      setProgress,
      null,
      setSuccess,
      setError,
      (res: any) => {
        if (from == "register") {
          navigate("/login");
        } else {
          navigate("/set-password", {
            state: {mail: mail },
          });
        }
      },
      null
    );

    // Navigate to a new page after successful verification
    // Change '/success' to the path of the page you want to navigate to
  };

  const ResendOtp = () => {
    const formDatas = new FormData();

    // Append fields to the FormData object
    formDatas.append("email", mail);
    formDatas.append("type", "Verify OTP");

    PostRequestFormData(
      ApiUrls.sendOtp,
      formDatas,
      setProgress,
      null,
      setSuccess,
      setError,
      (res: any) => {
        setTimeLeft(30);
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
          Enter OTP
        </Typography>
        <Typography
          variant="body1"
          align="center"
          paragraph
          style={{ color: theme.palette.text.secondary }}
        >
          Enter the 6-digit OTP sent to your email or phone.
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ alignSelf: "center", marginBottom: 15 }}>
            {otp.map((value, index) => (
              <OtpInput
                key={index}
                value={value}
                onChange={(event) =>
                  handleChange(
                    event as React.ChangeEvent<HTMLInputElement>,
                    index
                  )
                }
                inputProps={{ maxLength: 1 }}
                variant="outlined"
                margin="normal"
                ref={(el: HTMLInputElement | null) =>
                  (inputRefs.current[index] = el)
                }
              />
            ))}
          </div>

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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}
          >
            Verify OTP
          </Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              margin: 10,
              gap: 5,
            }}
          >
            <Typography
              variant="body1"
              align="center"
              style={{ color: theme.palette.text.secondary }}
            >
              Didn't recive OTP?
            </Typography>
            <Typography
              variant="body1"
              align="center"
              style={{ color: "blue" }}
              onClick={() => {
                timeLeft == 0 && ResendOtp();
              }}
            >
              Resend {timeLeft == 0 ? "Now" : " In " + timeLeft + " Second"}
            </Typography>
          </div>
        </form>
      </StyledContainer>
    </div>
  );
};

export default OtpPage;
