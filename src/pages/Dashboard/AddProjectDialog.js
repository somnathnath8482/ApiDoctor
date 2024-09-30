import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { PostRequestJson } from "../../Network/ApiRequests";
import { ApiUrls } from "../../Network/ApiUrls";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddProjectDialog = ({ open, onClose, token , refresh}) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEnvironments, setSelectedEnvironments] = useState([]);
  const [baseUrls, setBaseUrls] = useState({});
  const [customEnv, setCustomEnv] = useState("");
  const maxEnvLimit = 4;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [progress, setProgress] = useState(false);
  const predefinedEnvironments = ["Test", "Prod", "Preprod", "UAT"];
  const handleAddEnvironment = (env) => {
    if (selectedEnvironments.length >= maxEnvLimit) {
      alert("Max limit reached");
      return;
    }

    if (!selectedEnvironments.includes(env)) {
      setSelectedEnvironments([...selectedEnvironments, env]);
      setBaseUrls({ ...baseUrls, [env]: "" });
    }
  };

  const handleRemoveEnvironment = (env) => {
    setSelectedEnvironments(selectedEnvironments.filter((e) => e !== env));
    const updatedBaseUrls = { ...baseUrls };
    delete updatedBaseUrls[env];
    setBaseUrls(updatedBaseUrls);
  };

  const handleBaseUrlChange = (env, url) => {
    setBaseUrls({ ...baseUrls, [env]: url });
  };

  const handleCustomEnvChange = (event) => {
    setCustomEnv(event.target.value);
  };

  const handleCustomEnvAdd = (event) => {
    if (event.key === "Enter" && customEnv) {
      handleAddEnvironment(customEnv);
      setCustomEnv("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const envs = Object.entries(baseUrls).map(([name, baseUrl]) => ({
      name,
      baseUrl,
    }));

    const obj = {
      description: description,
      projectName: projectName,
      env: envs,
    };

    PostRequestJson(
      ApiUrls.createProject,
      obj,
      setProgress,
      token,
      setSuccess,
      setError,
      (res) => {
        refresh();
        onClose();
      },
      null
    );

    
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: "10px",
          height: "80%", // For bottom-sheet-like dialog
        },
      }}
    >
      <DialogTitle>
        Add Project
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            fullWidth
            required
            margin="dense"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
            margin="dense"
            multiline
          />

          {/* Dropdown for selecting environments */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Environments</InputLabel>
            <Select
              value={
                selectedEnvironments.length > 0 ? selectedEnvironments[0] : ""
              }
              required
              onChange={(e) => handleAddEnvironment(e.target.value)}
              renderValue={() => "Select or Add Environments"}
            >
              {predefinedEnvironments.map((env) => (
                <MenuItem key={env} value={env}>
                  {env}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Input for custom environment */}
          <TextField
            label="Add Custom Environment"
            value={customEnv}
            onChange={handleCustomEnvChange}
            onKeyPress={handleCustomEnvAdd}
            fullWidth
            margin="dense"
            placeholder="Type and press Enter"
          />

          {/* Display selected environments as chips */}
          <div style={{ marginTop: "16px" }}>
            {selectedEnvironments.map((env) => (
              <Chip
                key={env}
                label={env}
                onDelete={() => handleRemoveEnvironment(env)}
                style={{ marginRight: "8px", marginBottom: "8px" }}
              />
            ))}
          </div>

          {/* Base URL fields for each environment */}
          {selectedEnvironments.map((env) => (
            <TextField
              key={env}
              label={`Base URL for ${env}`}
              value={baseUrls[env]}
              onChange={(e) => handleBaseUrlChange(env, e.target.value)}
              fullWidth
              margin="dense"
              required
              placeholder={`www.Example.com/${env}/api/`}
            />
          ))}

          {!!error && (
            <Alert variant="outlined" severity="error" sx={{ marginBottom: 3 }}>
              {error}
            </Alert>
          )}

          {!!success && (
            <Alert
              variant="outlined"
              severity="success"
              sx={{ marginBottom: 3 }}
            >
              {success}
            </Alert>
          )}

          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={progress}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          {/* Submit button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: "16px" }}
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectDialog;
