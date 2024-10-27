import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Grid,
  Grid2,
  Tooltip,
} from "@mui/material";
import { ArrowForwardIos as ArrowForwardIosIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Conformation from "../../common/Conformation";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
const BugList = ({ bugs, onBugSelect, DeleteBug }) => {
  const [bugList, setBugList] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
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


  const DeleteActionButton1 = useCallback(() => {
    return (
      <Tooltip title="Delete Bug" placement="left">
        <DeleteIcon
          style={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: 5,
            padding: 5,
            alignSelf: "center",
            color: theme.palette.common.white,
            width: 25,
          }}
         
        />
      </Tooltip>
    );
  }, []);

  return (
    <Grid2 container spacing={3} sx={{ margin: 3 }}>
      {bugList.map((bug) => (
        <Grid2 item size={4} key={bug.id} >
          <Card sx={{ boxShadow: 3, height: 200 }}>
            <CardContent>
            
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <Typography variant="h6" component="div" gutterBottom  onClick = {()=>{onBugSelect(bug)}}> 
                {bug.title}
              </Typography>
            <Conformation
              title={`Delete the bug ?`}
              desc={"Are you sure? Want to Delete the bug ?"}
              negativeText={"Cancle"}
              posativeText={"Delete"}
              ActionButton={<DeleteActionButton1 />}
              posativeClick={() => {
                DeleteBug(bug?.id);
              }}
            />
            </div>
            <div onClick = {()=>{onBugSelect(bug)}}>

           
             
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
               </div>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default BugList;
