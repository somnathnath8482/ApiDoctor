import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Grid,
  Grid2,
} from "@mui/material";
import { ArrowForwardIos as ArrowForwardIosIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BugList = ({ bugs, onBugSelect }) => {
  const [bugList, setBugList] = useState([]);
  const navigate = useNavigate();
  // Simulate API call to fetch bugs (can be replaced with actual API call)
  useEffect(() => {
    setBugList(bugs);
  }, [bugs]);

  // Status Chip color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "warning";
      case "In Progress":
        return "info";
      case "Closed":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Grid2 container spacing={3} sx={{ margin: 3 }}>
      {bugList.map((bug) => (
        <Grid2 item size={4} key={bug.id} onClick = {()=>{onBugSelect(bug)}}>
          <Card sx={{ boxShadow: 3, height: 200 }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                {bug.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Api Name: Get Api
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reported by: {bug.reporter.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {new Date(bug.timestamp).toLocaleDateString()}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Assigned To: {bug?.editor!=null? bug?.editor?.name:"Not Assigned"}
              </Typography>
              <Chip
                label={bug.status}
                color={getStatusColor(bug.status)}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default BugList;
