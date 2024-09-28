import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    const toggleTheme = () => {
      setIsDarkMode(prevMode => !prevMode);
      document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    };
  
    return (
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          {children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
    );
  };

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
