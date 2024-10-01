import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Collapse,
  Grid2,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ApiIcon from "@mui/icons-material/Api";
import TestIcon from "@mui/icons-material/PlayArrow";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Fonts } from "../../assets/fonts/Fonts";
import BiotechIcon from "@mui/icons-material/Biotech";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteRequestJson, GetRequest } from "../../Network/ApiRequests";
import { ApiUrls } from "../../Network/ApiUrls";
import { UserContext } from "../../context/MyContext";
import { FormateDate } from "../../utill/Helper";
import BlockIcon from "@mui/icons-material/Block";
import InviteUserDialoug from "./InviteUserDialoug";
const apiList = [
  {
    name: "Get Users",
    description: "Fetches a list of users from the database.",
    endpoint: "/api/v1/users",
    requestType: "GET",
    contentType: "JSON",
    headersCount: 3,
    createdDate: "2024-09-15",
    status: "Active",
  },
  {
    name: "Create User",
    description: "Creates a new user and stores it in the database.",
    endpoint: "/api/v1/users/create",
    requestType: "POST",
    contentType: "FormData",
    headersCount: 2,
    createdDate: "2024-09-10",
    status: "Inactive",
  },
  {
    name: "Create User",
    description: "Creates a new user and stores it in the database.",
    endpoint: "/api/v1/users/create",
    requestType: "POST",
    contentType: "FormData",
    headersCount: 2,
    createdDate: "2024-09-10",
    status: "Inactive",
  },
  {
    name: "Create User",
    description: "Creates a new user and stores it in the database.",
    endpoint: "/api/v1/users/create",
    requestType: "POST",
    contentType: "FormData",
    headersCount: 2,
    createdDate: "2024-09-10",
    status: "Inactive",
  },
  {
    name: "Create User",
    description: "Creates a new user and stores it in the database.",
    endpoint: "/api/v1/users/create",
    requestType: "POST",
    contentType: "FormData",
    headersCount: 2,
    createdDate: "2024-09-10",
    status: "Inactive",
  },
  // Add more API details as needed
];

const APIManagement = ({ setSelectedPage, data }) => {
  const [expanded, setExpanded] = useState(null);
  const [env, setEnv] = useState(data?.project?.environments);
  const [users, setUsers] = useState([]);
  const [selectedEnv, setSelectedEnv] = useState(
    data?.project?.environments[0].id
  );
  const { token } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const handleToggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigateToApi =()=>{
    let obj = {
      env:env.find(item => item.id ===selectedEnv),
      projectId: data?.project?.id,
      projectName: data?.project?.name
    }
    setSelectedPage("test-api",obj);
  }

  const getAllUsers = () => {
    GetRequest(
      ApiUrls.getProjectsAccess + data?.project?.id,
      {},
      setProgress,
      token,
      null,
      setError,
      (res) => {
        setUsers(res?.data);
      },
      null
    );
  };

  const deleteAccess = (id) => {
    DeleteRequestJson(
      ApiUrls.getProjectsAccess + id,
      {},
      setProgress,
      token,
      null,
      setError,
      (res) => {
        getAllUsers();
      },
      null
    );
  };

  useEffect(() => {
    if (data != null || data != "") {
    } else {
      setSelectedPage("dashboard");
    }

    getAllUsers();
  }, []);

  const handleChangeEnv = (e) => {
    setSelectedEnv(e.target.value);
  };

  const RenderItem = useCallback(
    (user) => (
      <Grid2
        item
        key={user.id}
        style={{
          borderWidth: 1,
          borderColor: theme.palette.primary.light,
          borderStyle: "solid",
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          display: "flex",
        }}
        size={4}
      >
        <div style={{ flex: 1 }}>
          <Typography variant="h7" style={{ fontFamily: Fonts.roboto_mono }}>
            {user?.user?.name}
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            style={{
              marginTop: 5,
              fontSize: 12,
              fontFamily: Fonts.roboto_mono,
            }}
          >
            AccessLevel: {user?.accessLevel}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
            style={{ marginTop: 5, fontFamily: Fonts.roboto_mono }}
          >
            GrantedBy: {user?.grantedBy?.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
            style={{ fontFamily: Fonts.roboto_mono }}
          >
            Assigned On: {FormateDate(user?.grantedAt)}
          </Typography>
        </div>
        {user?.accessLevel != "OWNER" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Tooltip title="Edit Access" placement="left">
              <EditIcon
                style={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 5,
                  padding: 5,
                  color: theme.palette.common.white,
                  width: 25,
                }}
              />
            </Tooltip>

            <Tooltip title="Remove Access" placement="left">
              <DeleteIcon
                style={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 5,
                  padding: 5,
                  alignSelf: "center",
                  color: theme.palette.common.white,
                  width: 25,
                }}
                onClick={() => {
                  deleteAccess(user?.id);
                }}
              />
            </Tooltip>
          </div>
        )}
      </Grid2>
    ),
    []
  );

  return (
    <div
      style={{
        padding: 20,
        minHeight: 700,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography
        gutterBottom
        style={{
          color: theme.palette.text.primary,
          fontFamily: Fonts.roboto_mono,
          fontWeight: "bold",
          marginBottom: 0,
          fontSize: 30,
        }}
      >
        API Management
      </Typography>

      <div
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <div
          style={{
            backgroundColor: theme.palette.primary.main,
            height: 5,
            width: 30,
          }}
        />
        <div
          style={{
            backgroundColor: theme.palette.text.primary,
            height: 1,
            width: 135,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Typography
          gutterBottom
          style={{
            color: theme.palette.text.primary,
            fontFamily: Fonts.roboto_mono,
            fontWeight: "bold",
            marginBottom: 0,
            fontSize: 20,
            markerStart: 15,
          }}
        >
          {data?.project?.name}
        </Typography>

        <FormControl sx={{ m: 1, minWidth: 110, maxHeight: 40 }}>
          <InputLabel
            id="demo-simple-select-autowidth-label"
            sx={{ maxHeight: 40, paddingTop: 0, marginTop: 0 }}
          >
            Enviroment
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedEnv}
            onChange={handleChangeEnv}
            autoWidth
            label="Enviroment"
            sx={{ maxHeight: 40 }}
          >
            {env.map((envir) => {
              return <MenuItem value={envir.id}>{envir.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      {!!error && (
        <Alert variant="outlined" severity="error" sx={{ marginBottom: 3 }}>
          {error}
        </Alert>
      )}

      {!!success && (
        <Alert variant="outlined" severity="success" sx={{ marginBottom: 3 }}>
          {success}
        </Alert>
      )}

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Card style={{ padding: 10, marginTop: 30, borderRadius: 10 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            gutterBottom
            style={{
              color: theme.palette.text.primary,
              fontFamily: Fonts.roboto_mono,
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 0,
              fontSize: 15,
            }}
          >
            Project Users :
          </Typography>

          <Button
            onClick={() => {
              setOpen(true);
            }}
            variant="contained"
            color="primary"
            sx={{ marginBottom: 1 }}
          >
            Invite New User
          </Button>
        </div>
        <InviteUserDialoug
          onClose={handleClose}
          open={open}
          token={token}
          refresh={getAllUsers}
          projectId={data?.project?.id}
        />
        {/* user Cards */}
        <Grid2 container spacing={3}>
          {users.map(RenderItem)}
        </Grid2>
      </Card>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop:15,
          marginBottom:0
        }}
      >
        <Typography
          gutterBottom
          style={{
            color: theme.palette.text.primary,
            fontFamily: Fonts.roboto_mono,
            fontWeight: "bold",
            marginBottom: 10,
            marginTop: 0,
            fontSize: 15,
          }}
        >
          Project APIS :
        </Typography>

        <Button
          onClick={navigateToApi}
          variant="contained"
          color="primary"
          sx={{ marginBottom: 1 }}
        >
          Add Apis
        </Button>
      </div>

      <Grid2 container spacing={1} style={{ padding: 10, marginTop: 2 }}>
        {apiList.map((api, index) => (
          <Grid2 item key={index} size={6}>
            <Card
              style={{ padding: 10, display: "flex", flexDirection: "row" }}
            >
              <div style={{ flex: 1 }}>
                <Typography
                  variant="h7"
                  style={{ fontFamily: Fonts.roboto_mono }}
                >
                  {api.name}
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  style={{
                    marginTop: 5,
                    fontSize: 12,
                    fontFamily: Fonts.roboto_mono,
                  }}
                >
                  {api.description}
                </Typography>
                <Typography
                  variant="h7"
                  style={{
                    fontFamily: Fonts.roboto_mono,
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Endpoint :
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    style={{
                      marginTop: 5,
                      fontSize: 12,
                      fontFamily: Fonts.roboto_mono,
                      color: "blue",
                    }}
                  >
                    {api.endpoint}
                  </Typography>
                </Typography>
                <Button
                  onClick={() => handleToggleExpand(index)}
                  startIcon={<ApiIcon />}
                  color="primary"
                >
                  {expanded === index ? "Hide Details" : "View Details"}
                </Button>
                <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                  <div style={{ marginTop: 10 }}>
                    <Typography
                      variant="h7"
                      style={{
                        fontFamily: Fonts.roboto_mono,
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        fontSize: 12,
                      }}
                    >
                      Request Type :
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        style={{
                          marginTop: 5,
                          fontSize: 12,
                          fontFamily: Fonts.roboto_mono,
                        }}
                      >
                        {api.requestType}
                      </Typography>
                    </Typography>

                    <Typography
                      variant="h7"
                      style={{
                        fontFamily: Fonts.roboto_mono,
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        fontSize: 12,
                      }}
                    >
                      Content Type :
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        style={{
                          marginTop: 5,
                          fontSize: 12,
                          fontFamily: Fonts.roboto_mono,
                        }}
                      >
                        {api.contentType}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="h7"
                      style={{
                        fontFamily: Fonts.roboto_mono,
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        fontSize: 12,
                      }}
                    >
                      Number of Headers :
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        style={{
                          marginTop: 5,
                          fontSize: 12,
                          fontFamily: Fonts.roboto_mono,
                        }}
                      >
                        {api.headersCount}
                      </Typography>
                    </Typography>

                    <Typography
                      variant="h7"
                      style={{
                        fontFamily: Fonts.roboto_mono,
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        fontSize: 12,
                      }}
                    >
                      Created Date :
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        style={{
                          marginTop: 5,
                          fontSize: 12,
                          fontFamily: Fonts.roboto_mono,
                        }}
                      >
                        {api.createdDate}
                      </Typography>
                    </Typography>

                    <Typography
                      variant="h7"
                      style={{
                        fontFamily: Fonts.roboto_mono,
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        fontSize: 12,
                      }}
                    >
                      Status :
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        style={{
                          marginTop: 5,
                          fontSize: 12,
                          fontFamily: Fonts.roboto_mono,
                        }}
                      >
                        {api.status}
                      </Typography>
                    </Typography>
                  </div>
                </Collapse>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <Tooltip title="Test APIS" placement="left">
                  <BiotechIcon
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 5,
                      padding: 5,
                      color: theme.palette.common.white,
                      width: 20,
                    }}
                    onClick={navigateToApi}
                  />
                </Tooltip>
                <Tooltip title="Edit API" placement="left">
                  <EditIcon
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 5,
                      padding: 5,
                      color: theme.palette.common.white,
                      width: 20,
                    }}
                  />
                </Tooltip>

                <Tooltip title="Delete API" placement="left">
                  <DeleteOutlineIcon
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 5,
                      padding: 5,
                      color: theme.palette.common.white,
                      width: 20,
                    }}
                  />
                </Tooltip>
              </div>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default APIManagement;
