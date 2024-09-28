// src/theme/index.ts
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0471A6",
      light:"#529DC2"
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF", // Add paper color if using Paper component
    },
    text: {
      primary: "#000000", // Text color for primary text
      secondary: "#333333", // Text color for secondary text
    },
    common: {
      white: "#FFFFFF",
    },

  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3685B5",
      light:"#529DC2"
    },
    background: {
      default: "#061826",
      paper: "#233F57", // Add paper color if using Paper component
    },
    text: {
      primary: "#FFFFFF", // Text color for primary text
      secondary: "#CCCCCC", // Text color for secondary text
    },
    common: {
      white: "#FFFFFF",
    },
  },
});
