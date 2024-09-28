import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  styled,
  useTheme,
  FormControlLabel,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme as useCustomTheme } from '../context/ThemeContext';
import { Images } from '../assets/images/Images';
import { MaterialUISwitch } from './MaterialUISwitch';
import { storeData, storeJsonData } from '../utill/Storage';
import { useNavigate } from 'react-router-dom';

// Styled components for toolbar
const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});


const TaskToolbar: React.FC<{ setState: Dispatch<SetStateAction<any>> }> = ({ setState }) => {
  const { isDarkMode, toggleTheme } = useCustomTheme(); // From your context
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const updatedrawer = () => {
    setState((prevOpen: boolean) => !prevOpen);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: theme.palette.primary.main }}>
      <StyledToolbar>
        {/* Left Section - Drawer and Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={updatedrawer}>
            <MenuIcon style={{ color: '#FFFFFF' }} />
          </IconButton>
          <img src={Images.Logo} alt="App Logo" style={{ height: 50, width: 80, marginLeft: 10 }} />
        </div>

        {/* Right Section - Profile Picture and Theme Switch */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Custom Image Toggle Switch */}
          <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked={false} onChange={toggleTheme}/>}
        label="Change Theme"
        
      />
       

          {/* Profile Picture */}
          <IconButton onClick={handleMenuClick} style={{ marginLeft: 15 }}>
            <Avatar
              alt="Profile Picture"
              src="https://i.pravatar.cc/300" /* Replace with dynamic URL if needed */
              style={{ cursor: 'pointer', width: 40, height: 40 }}
            />
          </IconButton>

          {/* Dropdown Menu for Profile Options */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                backgroundColor: theme.palette.background.paper,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Change Password</MenuItem>
            <MenuItem onClick={()=>{
               storeJsonData("user","");
               storeData("token","");
               handleMenuClose();
               navigate("/")
            }}>Logout</MenuItem>
          </Menu>
        </div>
      </StyledToolbar>
    </AppBar>
  );
};

export default TaskToolbar;
