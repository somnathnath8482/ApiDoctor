import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Grid2,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  TextField,
  Switch,
  List,
  ListItem,
  Divider,
  Box,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Flex } from "antd";
import TaskToolbar from "../common/TaskToolbar";
import { useTheme } from "@emotion/react";
import { useTheme as useCustomTheme } from "../context/ThemeContext";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {  GetRequest, PostRequestFormData } from "../Network/ApiRequests";
import { ApiUrls, ProfilePath } from "../Network/ApiUrls";
import { UserContext } from "../context/MyContext";
import { storeJsonData } from "../utill/Storage";
import { FormateDate } from "../utill/Helper";
const ProfilePage = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const roles = [
    { value: "INDIVIDUAL", label: "Individual" },
    { value: "COMPANY", label: "Company" },
  ];
  const [avatarSrc, setAvatarSrc] = useState("https://i.pravatar.cc/300");
  const [hover, setHover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const { token, mUser,setmUser } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateData = useCallback(()=>{

    setName(mUser?.name);
    setRole(mUser?.role);
    setAvatarSrc(mUser?.profilePic?ProfilePath+mUser.profilePic:"https://i.pravatar.cc/300")

  },[mUser]);

  useEffect(()=>{
    updateData();
    getLoginHistory();
  },[])

  const editProfile = () => {
    const formData = new FormData();
    if (selectedFile != null) {
      formData.append("pic", selectedFile);
    }

    formData.append("name", name); // Include other fields as needed
    formData.append("role", role);

    PostRequestFormData(
      ApiUrls.updateProfile,
      formData,
      null,
      token,
      null,
      null,
      (res) => {

        if(res){
          storeJsonData("user",res.data);
          setmUser(res?.data);
          setIsEditing(false);
        }

      },
      null
    );
  }; 
  
  const getLoginHistory = () => {
    

    GetRequest(
      ApiUrls.getLoginHistory,{},
      null,
      token,
      null,
      null,
      (res) => {

        if(res){
          setLoginHistory(res?.data);
        }

      },
      null
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRole(value);
  };
  return (
    <div style={{ backgroundColor: theme.palette.background.default }}>
      {/* Toolbar for menu icon */}
      <TaskToolbar setState={false} backenabled={true} />
      <Grid2 container spacing={3} style={{ padding: "20px" }}>
        {/* Profile Info */}
        <Grid2 item xs={12} size={6} height={300}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box
                position="relative"
                width={80}
                height={80}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <Avatar alt={mUser?.name} src={avatarSrc} style={{ width: 80, height: 80 }} />

                {hover && (
                  <IconButton
                    component="label"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                    }}
                  >
                    <CameraAltIcon />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </IconButton>
                )}
              </Box>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* Editable Name */}
                {isEditing ? (
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: 250, marginTop: 15 }}
                    autoFocus
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="h5" style={{ cursor: "pointer" }}>
                    {mUser?.name}
                  </Typography>
                )}

                {/* Editable Role */}
                {isEditing ? (
                  <TextField
                    value={role}
                    onChange={handleChange}
                    style={{ width: 250, marginTop: 10 }}
                    autoFocus
                    variant="outlined"
                    size="small"
                    select
                  >
                    {roles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <Typography variant="subtitle1" style={{ cursor: "pointer" }}>
                    {mUser?.role}
                  </Typography>
                )}
              </div>
              <Typography variant="subtitle2">{mUser?.email}</Typography>
              <Button
                variant="outlined"
                style={{ marginTop: 10 }}
                onClick={() => {
                  if (isEditing) {
                    editProfile();
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                {isEditing ? "Save changes" : "Edit Profile"}
              </Button>
            </CardContent>
          </Card>
        </Grid2>

        {/* Customization */}
        <Grid2 item xs={12} size={6} height={300}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Personalization</Typography>
              <TextField
                label="Timezone"
                select
                SelectProps={{ native: true }}
                fullWidth
                margin="normal"
                disabled
              >
                <option value="GMT">GMT</option>
                <option value="PST">PST</option>
                {/* Add more options */}
              </TextField>
              <TextField
                label="Language"
                select
                SelectProps={{ native: true }}
                fullWidth
                margin="normal"
                disabled
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                {/* Add more options */}
              </TextField>
              <Switch checked={isDarkMode} onChange={toggleTheme} /> Dark Theme
            </CardContent>
          </Card>
        </Grid2>
        {/* Activity Log */}
        <Grid2 item xs={12} size={12}>
          <Card sx={{ height: "100%", width: "100%" }}>
            <CardContent>
              <Typography variant="h6">Activity Log</Typography>
              <List>
                {loginHistory.map((item=>{
                  return (<div>
                  <ListItem>Login {item?.status?.toLowerCase()} From Location- {item?.city}, From {item?.userAgent} Device, IP - {item?.ipAddress
                  } At - {FormateDate(item?.loginTimestamp)}</ListItem>
                  <Divider />
                  </div>)
                }))}
                
               
               
                {/* More activity logs */}
              </List>
              <Button variant="outlined" style={{ marginTop: 10 }}>
                Download Log
              </Button>
            </CardContent>
          </Card>
        </Grid2>

        {/* Account Security */}
        <Grid2 item xs={12} size={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Account Security</Typography>
              <Button variant="outlined" style={{ marginBottom: 10 }}>
                Change Password
              </Button>
              <Typography variant="subtitle2">
                Two-Factor Authentication
              </Typography>
              <Switch />
              
            </CardContent>
          </Card>
        </Grid2>

        {/* Notification Settings */}
        <Grid2 item xs={12} size={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Notification Settings</Typography>
              <List>
                <ListItem>
                  Email Notifications <Switch />
                </ListItem>
                <ListItem>
                  In-app Notifications <Switch />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default ProfilePage;
