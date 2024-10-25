import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Chip,
  MenuItem,
  Select,
  Avatar,
  Box,
} from "@mui/material";
import TaskToolbar from "../../common/TaskToolbar";
import { useTheme } from "@emotion/react";

import "../../css/ConsoleBlock.css";
import { useLocation } from "react-router-dom";
import { GetRequest, PostRequestFormData } from "../../Network/ApiRequests";
import { ApiUrls } from "../../Network/ApiUrls";
import { UserContext } from "../../context/MyContext";
import { FormateDate } from "../../utill/Helper";
const bugData = {
  id: 1,
  title: "API endpoint returning incorrect response",
  description:
    "The `/api/v1/data` endpoint returns a 500 error when sending valid data.",
  status: "New",
  reportedBy: { name: "John Doe", email: "john.doe@example.com" },
  assignedTo: { name: "Jane Smith", email: "jane.smith@example.com" },
  request: {
    method: "POST",
    url: "/api/v1/data",
    headers: { "Content-Type": "application/json" },
    body: '{"name": "test"}',
  },
  response: {
    status: 500,
    body: '{"error": "Internal Server Error"}',
  },
  history: [
    { date: "2023-10-10", action: "Bug created", author: "John Doe" },
    {
      date: "2023-10-11",
      action: "Assigned to Jane Smith",
      author: "John Doe",
    },
  ],
  comments: [
    { author: "Jane Smith", text: "I will look into it.", date: "2023-10-12" },
    { author: "John Doe", text: "Please prioritize this.", date: "2023-10-13" },
  ],
};

const BugDetails = () => {
  const location = useLocation();
  const { selectedBug } = location.state;

  const [bug, setBug] = useState(selectedBug);
  const [status, setStatus] = useState(bug?.status);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(bugData.comments);
  const [timeLine, setTimeLine] = useState([]);
  const [selectTedEditor, setSelectTedEditor] = useState(null);

  const { token, mUser } = useContext(UserContext);
  console.log(bug?.editor)

  // console.log('Selected Bug:', bug); // This could trigger a navigation to the details page
  const theme = useTheme();
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const updatedComments = [
        ...comments,
        {
          author: "You",
          text: newComment,
          date: new Date().toISOString().split("T")[0],
        },
      ];
      setComments(updatedComments);
      setNewComment("");
    }
  };

  const getTimeline = () => {
    GetRequest(
      ApiUrls.getBugTimeline + bug?.id,
      {},
      null,
      token,
      null,
      null,
      (res) => {
        setTimeLine(res?.data);
      },
      null
    );
  };
  
  const updateStatus = (sta) => {

    const formDatas = new FormData();

    // Append fields to the FormData object
    formDatas.append("bugId", bug?.id);
    formDatas.append("status", sta);
    formDatas.append("editorId", selectTedEditor?selectTedEditor?.id:"");


    PostRequestFormData(
      ApiUrls.updateBugStatus,
      formDatas,
      null,
      token,
      null,
      null,
      (res) => {
        setBug(res?.data);
        getTimeline();
      },
      null
    );
  };

  useEffect(() => {
    getTimeline();
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        minHeight: 700,
      }}
    >
      <TaskToolbar setState={false} backenabled={true} />
      <Card sx={{ margin: "auto", overflowY: "auto", padding: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {bug.title}
          </Typography>

          {/* Bug Description */}
          <Typography
            variant="body1"
            color="text.secondary"
            gutterBottom
            sx={{ mt: 2 }}
          >
            {bug.description}
          </Typography>

          {/* Request/Response Scenario */}
          <Typography variant="h6" gutterBottom>
            Scenario
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Request:</strong>
              </Typography>

              <div className="console-container" style={{ borderRadius: 10 }}>
                <pre
                  className="console-content"
                  style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {JSON.parse(bug?.stacktrace).req}
                </pre>
              </div>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Response:</strong>
              </Typography>
              <div className="console-container" style={{ borderRadius: 10 }}>
                <pre
                  className="console-content"
                  style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {JSON.parse(bug?.stacktrace)?.res}
                </pre>
              </div>
            </Box>
          </Box>

          {/* Reported By and Assigned To */}
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Reported by:</strong>
              </Typography>
              <Chip
                avatar={<Avatar>{bug?.reporter?.name.charAt(0)}</Avatar>}
                label={bug?.reporter?.name}
                color="default"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                <strong>Assigned to:</strong>
              </Typography>
              {bug?.editor != null ? (
                <Chip
                  avatar={<Avatar>{bug?.editor?.name?.charAt(0)}</Avatar>}
                  label={bug?.editor?.name}
                  color="primary"
                />
              ) : (
                <Typography variant="subtitle1" style={{ color: "#F56F70" }}>
                  <strong>Not Assigned</strong>
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Status */}
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={5}>
              <Typography variant="subtitle1">
                <strong>Status:</strong>
              </Typography>
              <Select
                value={status}
                onChange={handleStatusChange}
                fullWidth
                variant="outlined"
                size="small"
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="InProgress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={5}>
              <Typography variant="subtitle1">
                <strong>Assign the Bug To:</strong>
              </Typography>
              <Select
                value={status}
                onChange={handleStatusChange}
                fullWidth
                variant="outlined"
                size="small"
              >
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="InProgress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={2}>
            <Typography variant="subtitle1">
                <strong>Update Status:</strong>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 2 }}
                onClick={()=>{updateStatus(status)}}
              >
                Update
              </Button>
            </Grid>
          </Grid>

          {/* Timeline */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            Timeline
          </Typography>
          {timeLine.map((entry, index) => (
            <Typography key={index} variant="body2" color="text.secondary">
              {FormateDate(entry.createdAt)} - {entry.description}
            </Typography>
          ))}

          {/* Comments Section */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            Comments
          </Typography>
          <div style={{ overflowY: "auto", padding: 10 }}>
            {comments.map((comment, index) => (
              <Card key={index} sx={{ mb: 2, p: 2 }}>
                <Typography variant="subtitle1">{comment.author}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {comment.date}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {comment.text}
                </Typography>
              </Card>
            ))}
          </div>
          {/* Add Comment */}
          <TextField
            label="Add Comment"
            fullWidth
            multiline
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
            sx={{ mt: 2 }}
          >
            Add Comment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BugDetails;
