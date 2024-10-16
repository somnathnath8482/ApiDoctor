import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Grid2,
  Tooltip,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { List, Avatar } from "antd";
import { PieChartOutlined, PlusOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";
import { Fonts } from "../../assets/fonts/Fonts";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { PieChart } from "@mui/x-charts/PieChart";
import BasicPie from "../../components/BasicPie";
import AddProjectDialog from "./AddProjectDialog";
import { UserContext } from "../../context/MyContext";
import { DeleteRequestJson, GetRequest } from "../../Network/ApiRequests";
import { ApiUrls } from "../../Network/ApiUrls";
import { FormateDate } from "../../utill/Helper";
const Dashboard = ({ setSelectedPage }) => {
  const theme = useTheme();
  const { token } = useContext(UserContext);

  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [progress, setProgress] = useState(false);

  const [apiStaistics, setApiStatistics] = useState([]);

  const [noOfApis, setNoOfApis] = useState([]);
  const [noOfRequest, setNoOfRequest] = useState([]);

  const handleViewApis = (access) => {
    setSelectedPage("api-management", access);
    // Navigate to API management page
  };


  const handleClose = () => {
    setOpen(false);
  };

  const getAllProject = () => {
    GetRequest(
      ApiUrls.getProjects,
      {},
      setProgress,
      token,
      null,
      setError,
      (res) => {
        setProjects(res?.data);
      },
      null
    );
  };

  const getStatistics = () => {
    GetRequest(
      ApiUrls.getStatistics,
      {},
      setProgress,
      token,
      null,
      setError,
      (res) => {
        if(res?.data?.apis?.length>0){
          setApiStatistics(res?.data?.apis);

        let proj = res?.data?.projects;
        let req = [];
        let apis = [];

        proj?.map((item) => {
          req.push({ id: item.id, value: item.requestCount, label: item.name });
          apis.push({ id: item.id, value: item.apiCount, label: item.name });
        });

      

        setNoOfApis(apis);
        setNoOfRequest(req);
        }
      },
      null
    );
  };

  const deleteProject = (id) => {
    DeleteRequestJson(
      ApiUrls.deleteProject + id,
      {},
      setProgress,
      token,
      setSuccess,
      setError,
      (res) => {
        getAllProject();
        getStatistics();
      },
      null
    );
  };

  useEffect(() => {
    getAllProject();
    getStatistics();
  }, []);

  const RenderItem = useCallback((access) => {
    return (
      <Grid2
        item
        key={access.project.id}
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
            {access.project.name}
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
            {access.project.description}
          </Typography>
          <Typography
            variant="body2"
            style={{ marginTop: 5, fontFamily: Fonts.roboto_mono }}
          >
            Environments: {access.project.environments.length}
          </Typography>
          <Typography variant="body2" style={{ fontFamily: Fonts.roboto_mono }}>
            Created On: {FormateDate(access.project.createdAt)}
          </Typography>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Tooltip title="View APIS" placement="left">
            <RemoveRedEyeOutlinedIcon
              style={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: 5,
                padding: 5,
                color: theme.palette.common.white,
                width: 25,
              }}
              onClick={() => {
                handleViewApis(access);
              }}
            />
          </Tooltip>

          <Tooltip title="Delete Project" placement="left">
            <DeleteIcon
              style={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: 5,
                padding: 5,
                alignSelf: "center",
                color: theme.palette.common.white,
                width: 25,
              }}
              onClick={()=>{
                deleteProject(access?.project?.id)
              }}
            />
          </Tooltip>
        </div>
      </Grid2>
    );
  }, []);

  return (
    <div
      style={{ padding: 24, backgroundColor: theme.palette.background.default }}
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
        Dashboard
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
            Your Projects :
          </Typography>

          <Button
            onClick={() => {
              setOpen(true);
            }}
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2 }}
          >
            Add new Project
          </Button>
        </div>
        <AddProjectDialog
          onClose={handleClose}
          open={open}
          token={token}
          refresh={getAllProject}
        />

        {/* Project Cards */}
        <Grid2 container spacing={3}>
          {projects.map(RenderItem)}
        </Grid2>
      </Card>

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
          Your Project Frequency :
        </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1 }}>
            <Typography
              gutterBottom
              style={{
                color: theme.palette.text.primary,
                fontFamily: Fonts.roboto_mono,
                fontWeight: "bold",
                marginBottom: 10,
                marginTop: 0,
                fontSize: 13,
              }}
            >
              Number of Apis:
            </Typography>
            <BasicPie data={noOfApis} />
          </div>
          <div style={{ flex: 1 }}>
            <Typography
              gutterBottom
              style={{
                color: theme.palette.text.primary,
                fontFamily: Fonts.roboto_mono,
                fontWeight: "bold",
                marginBottom: 10,
                marginTop: 0,
                fontSize: 13,
              }}
            >
              Number of Requests:
            </Typography>
            <BasicPie data={noOfRequest} />
          </div>
        </div>
      </Card>

      {/* API Summary - Optional */}

      <Card style={{ padding: 10, marginTop: 30, borderRadius: 10 }}>
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
          Your API Statistics :
        </Typography>

        <List
          itemLayout="horizontal"
          dataSource={apiStaistics}
          renderItem={(item) => (
            <List.Item
              style={{
                gap: 5,
                borderBottom: "1px dashed gray",
                paddingBottom: 10,
              }}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<PieChartOutlined />} />}
                title={
                  <span style={{ color: theme.palette.text.primary }}>
                    {item.name}
                  </span>
                } // Change title color
                description={
                  <span
                    style={{
                      color: theme.palette.text.secondary,
                      display: "flex",
                      flexDirection: "row",
                      gap: 10,
                    }}
                  >
                    <Typography
                      gutterBottom
                      style={{
                        color: theme.palette.text.primary,
                        fontFamily: Fonts.roboto_mono,
                        marginBottom: 10,
                        marginTop: 0,
                        fontSize: 14,
                      }}
                    >
                      Total Requests : {item.totalRequests}
                    </Typography>

                    <Typography
                      gutterBottom
                      style={{
                        color: theme.palette.text.primary,
                        fontFamily: Fonts.roboto_mono,
                        marginBottom: 10,
                        marginTop: 0,
                        fontSize: 14,
                      }}
                    >
                      Avarage Response Time : {item.averageResponseTime} ms
                    </Typography>

                    <Typography
                      gutterBottom
                      style={{
                        color: theme.palette.text.primary,
                        fontFamily: Fonts.roboto_mono,
                        marginBottom: 10,
                        marginTop: 0,
                        fontSize: 14,
                      }}
                    >
                      Errors : {item?.errorCount}
                    </Typography>
                  </span>
                } // Change description color
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
