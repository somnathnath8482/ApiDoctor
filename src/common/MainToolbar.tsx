import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, useTheme, Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled, keyframes } from '@mui/system';
import { useTheme as useCustomTheme } from '../context/ThemeContext';

// Define keyframe animations
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const toggleSwitchAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(20px); /* Adjust as needed for switch position */
  }
`;

// Styled components for toolbar and buttons
const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const NavButton = styled(Button)({
  color: '#FFFFFF',
  textTransform: 'none',
  marginLeft: '15px',
  animation: `${slideIn} 1s ease-out`,
});

const AnimatedSwitch = styled(Switch)({
  '& .MuiSwitch-switchBase': {
    animation: `${toggleSwitchAnimation} 0.5s ease-in-out`,
  },
});

const MainToolbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const theme = useTheme();

  return (
    <>
      {/* Navigation Toolbar */}
      <AppBar position="static">
        <StyledToolbar>
          <Typography variant="h6">APIFlow</Typography>
          <div>
            <Button component={Link} to="/register" color="inherit">Register</Button>
            <Button component={Link} to="/login" color="inherit">Login</Button>
            <Button component={Link} to="/about" color="inherit">About Us</Button>
            <Button component={Link} to="/contact" color="inherit">Contact Us</Button>
            <AnimatedSwitch
              checked={isDarkMode}
              onChange={toggleTheme}
              color="default"
              inputProps={{ 'aria-label': 'theme toggle switch' }}
            />
          </div>
        </StyledToolbar>
      </AppBar>

  
    </>
  );
};

export default MainToolbar;
