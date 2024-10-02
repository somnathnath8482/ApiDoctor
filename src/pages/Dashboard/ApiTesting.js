// ApiTesting.js

import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List,
  ListItem,
  IconButton,
  Divider,
  Box,
  Paper,
  Grid,
  Tooltip,
  FormControlLabel,
  Switch,
  ListItemText,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useTheme } from "@emotion/react";
import "../../css/ConsoleBlock.css";
import { Fonts } from "../../assets/fonts/Fonts";

import AddIcon from "@mui/icons-material/Add";
import { UserContext } from "../../context/MyContext";
import {
  DeleteRequestJson,
  GetRequest,
  PostRequestJson,
} from "../../Network/ApiRequests";
import { ApiUrls } from "../../Network/ApiUrls";
const ApiTesting = ({ setSelectedPage, data }) => {

  console.log(data);

  const { env, projectId, projectName, selectedApipt } = data;

  const [selectedApi, setSelectedApi] = useState(selectedApipt);

  const [method, setMethod] = useState(
    selectedApi?.method ? selectedApi.method : "GET"
  );
  const [endpoint, setEndPoint] = useState(
    selectedApi ? selectedApi.endpoint : ""
  );
  const [url, setUrl] = useState("");
  const [name, setName] = useState(selectedApi ? selectedApi.name : "");
  const [description, setDescription] = useState(
    selectedApi ? selectedApi.description : ""
  );
  const [headers, setHeaders] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (selectedApi?.headers) {
      const modifiedheader = selectedApi?.headers.map((hdr) => {
        const { headerKey, headerValue } = hdr;
        return { key: headerKey, value: headerValue };
      });

      setHeaders(modifiedheader);
    }

    if (selectedApi?.formdatas) {
      const modifiedFormData = selectedApi?.formdatas.map((frmdt) => {
        const { formKey, formValue } = frmdt;
        return { key: formKey, value: formValue };
      });

      setFormData(modifiedFormData);
    }
  }, [selectedApi]);

  const [body, setBody] = useState(
    selectedApi?.jsonString ? JSON.parse(selectedApi.jsonString) : ""
  );

  const [contentType, setContentType] = useState(
    selectedApi
      ? selectedApi.requestType == "JSON"
        ? "application/json"
        : "multipart/form-data"
      : "application/json"
  );
  const [response, setResponse] = useState("");
  const [req, setReq] = useState("");
  const [errors, setErrors] = useState("");
  const [viewMode, setViewMode] = useState("raw");

  const [headerkey, setHeaderkey] = useState("");
  const [headervalue, setHeaderValue] = useState("");

  const [formDataKey, setFormDataKey] = useState("");
  const [formDataValue, setFormDataValue] = useState("");

  const theme = useTheme();

  const { token } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    setUrl(env?.baseUrl + endpoint);
  }, [endpoint]);

  const handleAddHeader = () => {
    setHeaders([...headers, { key: headerkey, value: headervalue }]);
    setHeaderkey("");
    setHeaderValue("");
  };

  const handleChangeHeader = (key, value) => {
    if (key == "key") {
      setHeaderkey(value);
    } else {
      setHeaderValue(value);
    }
  };

  const handleRemoveHeader = (index) => {
    const updatedHeaders = headers.filter((_, i) => i !== index);
    setHeaders(updatedHeaders);
  };

  const handleAddFormData = () => {
    setFormData([...formData, { key: formDataKey, value: formDataValue }]);
    setFormDataKey("");
    setFormDataValue("");
  };

  const handleRemoveFormData = (index) => {
    const updatedFormData = formData.filter((_, i) => i !== index);
    setFormData(updatedFormData);
  };

  const handleSendRequest = async () => {
    try {
      const requestData = {
        url: url,
        method: method,
        headers: headers,
        type: contentType,
        body: contentType == "application/json" ? body : formData,
      };

      setReq(formatRequest(requestData));
    } catch (e) {
      console.log(e.message);
    }

    try {
      const headersObject = headers.reduce((acc, header) => {
        if (header.key) acc[header.key] = header.value;
        return acc;
      }, {});

      const data =
        contentType === "application/json"
          ? JSON.parse(body)
          : formData.reduce((acc, field) => {
              if (field.key) acc[field.key] = field.value;
              return acc;
            }, {});

      const config = {
        method,
        url,
        headers: headersObject,
        data,
      };

      console.log(config);

      const res = await axios(config);
      setResponse(JSON.stringify(res.data, null, 2));
      setErrors("");
    } catch (err) {
      setErrors(err.message);
      setResponse("");
    }
  };

  const handleAddApi = () => {
    /* private String name;
    private String endpoint;
    private String method;
    private List<HeaderRequest> headers;
    private List<FormDataRequest> formdatas;
    private AuthRequest authentication;
    private Long projectId; */

    const modifiedheader = headers.map((hdr) => {
      const { key, value } = hdr;
      return { headerKey: key, headerValue: value };
    });

    const modifiedFormData = formData.map((frmdt) => {
      const { key, value } = frmdt;
      return { formKey: key, formValue: value };
    });

    const requestData = {
      id: selectedApi ? selectedApi.id : 0,
      name: name,
      description: description,
      endpoint: endpoint,
      projectId: projectId,
      method: method,
      authentication: {
        authType: "NONE",
        credentials: "",
      },

      headers: modifiedheader,
      formdatas: modifiedFormData,
      jsonString: JSON.stringify(body),
      requestType: contentType == "application/json" ? "JSON" : "FORMDATA",
    };

    /*   console.log(requestData)
   GetRequest(
      ApiUrls.getApi+"33",
      requestData,
      setProgress,
      token,
      setSuccess,
      setError,
      (res) => {
        
      },
      null
    ); */

    PostRequestJson(
      ApiUrls.createApi,
      requestData,
      setProgress,
      token,
      setSuccess,
      setError,
      (res) => {
        setSelectedApi(res?.data);
      },
      null
    );
  };

  const handleSaveResponse = () => {
    const blob = new Blob([response], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "response.txt";
    a.click();
  };

  const formatRequest = ({ method, url, headers, type, body }) => {
    // Start by formatting the method and URL
    let formattedRequest = `-X '${method.toUpperCase()}' \n  '${url}' \n`;

    // Format headers (loop through key-value pairs in the headers array)
    headers.forEach(({ key, value }) => {
      formattedRequest += `  -H '${key}: ${value}' \n`;
    });

    // Format formData if present and it is key-value pairs
    if (type != "application/json" && body.length > 0) {
      const formDataEntries = body.map(
        ({ key, value }) => `"${key}": "${value}"`
      );
      formattedRequest += `  -d '{\n    ${formDataEntries.join(
        ",\n    "
      )}\n  }'`;
    } else {
      formattedRequest += `  -d '${body}'`;
    }

    return formattedRequest;
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: theme.palette.background.default,
        minHeight: 700,
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
        Api Testing
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
          marginTop: 10,
        }}
      >
        <Typography
          gutterBottom
          style={{
            color: theme.palette.text.primary,
            fontFamily: Fonts.roboto_mono,

            marginBottom: 0,
            fontSize: 20,
            markerStart: 15,
          }}
        >
          {projectName}
        </Typography>

        <Typography
          gutterBottom
          style={{
            color: theme.palette.text.primary,
            fontFamily: Fonts.roboto_mono,

            marginBottom: 0,
            fontSize: 15,
            markerStart: 15,
          }}
        >
          Enviromewnt: {env.name}
        </Typography>
      </div>

      <Paper
        elevation={3}
        sx={{
          marginTop: 5,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          marginBottom: 2,
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth={false}
          variant="outlined"
          required
          style={{ flex: 1, fontFamily: Fonts.roboto_mono }}
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth={false}
          variant="outlined"
          required
          style={{ flex: 1, fontFamily: Fonts.roboto_mono }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControl fullWidth style={{ flex: 0.1 }}>
            <InputLabel
              style={{ fontFamily: Fonts.roboto_mono }}
              id="demo-simple-select-label"
            >
              HTTP Method
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={method}
              label="Request Method"
              style={{ fontFamily: Fonts.roboto_mono }}
              onChange={(e) => setMethod(e.target.value)}
            >
              <MenuItem value="GET" style={{ fontFamily: Fonts.roboto_mono }}>
                GET
              </MenuItem>
              <MenuItem value="POST" style={{ fontFamily: Fonts.roboto_mono }}>
                POST
              </MenuItem>
              <MenuItem value="PUT" style={{ fontFamily: Fonts.roboto_mono }}>
                PUT
              </MenuItem>
              <MenuItem
                value="DELETE"
                style={{ fontFamily: Fonts.roboto_mono }}
              >
                DELETE
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="API Endpoint URL"
            value={endpoint}
            onChange={(e) => {
              setEndPoint(e.target.value);
            }}
            fullWidth={false}
            variant="outlined"
            placeholder={env?.baseUrl + "/**"}
            style={{ flex: 0.895, fontFamily: Fonts.roboto_mono }}
          />
        </div>
      </Paper>

      <Paper
        elevation={3}
        sx={{ padding: 2, marginBottom: 2, borderRadius: 3 }}
      >
        <Typography
          style={{
            color: theme.palette.text.primary,
            fontFamily: Fonts.roboto_mono,
            marginBottom: 0,
            fontSize: 20,
          }}
        >
          Headers
        </Typography>
        <List
          style={{
            marginTop: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <TextField
            label="Header Key"
            value={headerkey}
            onChange={(e) => handleChangeHeader("key", e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ marginRight: 1 }}
            style={{ flex: 0.22 }}
          />
          <TextField
            label="Header Value"
            value={headervalue}
            onChange={(e) => handleChangeHeader("value", e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ marginRight: 1 }}
            style={{ flex: 1 }}
          />
          <Tooltip title="Add Header" placement="left" style={{ flex: 1 }}>
            <AddIcon
              style={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: 5,
                padding: 5,
                alignSelf: "center",
                color: theme.palette.common.white,
                width: 45,
                height: 50,
              }}
              onClick={handleAddHeader}
            />
          </Tooltip>
        </List>

        <List>
          {headers.map((header, index) => (
            <ListItem
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 0,
              }}
            >
              <ListItemText
                secondary={`${header.key} : ${header.value}`}
                style={{
                  display: "flex",
                  fontSize: "0.9rem", // Correct font size
                  marginBottom: -11,
                  fontFamily: "cursive",
                  overflowX: "auto", // Enables horizontal scrolling
                  whiteSpace: "nowrap", // Keeps the text in a single line
                  maxWidth: "100%", // Adjust the width for the text container
                }}
              />
              <IconButton onClick={() => handleRemoveHeader(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper
        elevation={3}
        sx={{ padding: 2, marginBottom: 2, borderRadius: 3 }}
      >
        <FormControl fullWidth style={{ flex: 0.2 }}>
          <InputLabel
            style={{ fontFamily: Fonts.roboto_mono }}
            id="demo-simple-select-label"
          >
            Content-Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={contentType}
            label="Request Method"
            style={{ fontFamily: Fonts.roboto_mono }}
            onChange={(e) => setContentType(e.target.value)}
          >
            <MenuItem
              value="application/json"
              style={{ fontFamily: Fonts.roboto_mono }}
            >
              Application/json
            </MenuItem>
            <MenuItem
              value="multipart/form-data"
              style={{ fontFamily: Fonts.roboto_mono }}
            >
              Multipart/form-data
            </MenuItem>
          </Select>
        </FormControl>
        {contentType === "application/json" ? (
          <TextField
            label="Request Body (JSON)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            fullWidth
            multiline
            rows={6}
            margin="normal"
            variant="outlined"
          />
        ) : (
          <Box style={{ marginTop: 20 }}>
            <Typography
              style={{
                color: theme.palette.text.primary,
                fontFamily: Fonts.roboto_mono,
                marginBottom: 0,
                fontSize: 20,
              }}
            >
              FormData Parameters
            </Typography>

            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <TextField
                label="Key"
                value={formDataKey}
                onChange={(e) => setFormDataKey(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ marginRight: 1, flex: 0.2 }}
              />
              <TextField
                label="Value"
                value={formDataValue}
                onChange={(e) => setFormDataValue(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ marginRight: 1, flex: 1 }}
              />
              <Tooltip title="Add Param" placement="left" style={{ flex: 1 }}>
                <AddIcon
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 5,
                    padding: 5,
                    alignSelf: "center",
                    color: theme.palette.common.white,
                    width: 45,
                    height: 50,
                  }}
                  onClick={handleAddFormData}
                />
              </Tooltip>
            </div>

            <List>
              {formData.map((field, index) => (
                <ListItem
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 0,
                  }}
                >
                  <ListItemText
                    primary={`${field.key} : ${field.value}`}
                    style={{
                      display: "flex",
                      fontSize: "0.9rem", // Correct font size
                      marginBottom: -11,
                      fontFamily: "cursive",
                      overflowX: "auto", // Enables horizontal scrolling
                      whiteSpace: "nowrap", // Keeps the text in a single line
                      maxWidth: "100%", // Adjust the width for the text container
                    }}
                  />
                  <IconButton onClick={() => handleRemoveFormData(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
      <div style={{ flexDirection: "row", alignItems: "center" }}>
        <Button
          onClick={handleSendRequest}
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2 }}
        >
          Send Request
        </Button>

        <Button
          onClick={handleAddApi}
          variant="contained"
          color="primary"
          sx={{ marginBottom: 2, marginStart: 10 }}
        >
          {selectedApi ? "Update Api" : "Add Api"}
        </Button>
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

      {req && (
        <Paper elevation={3} sx={{ padding: 2, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            Request
          </Typography>

          <div className="console-container">
            <pre
              className="console-content"
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {req}
            </pre>
          </div>
        </Paper>
      )}

      {response && (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 5, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            Response
          </Typography>
          <Button
            onClick={handleSaveResponse}
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            sx={{ marginBottom: 2, marginRight: 5 }}
          >
            Save Response
          </Button>
          <FormControlLabel
            control={
              <Switch
                checked={viewMode === "formatted"}
                onChange={() =>
                  setViewMode(viewMode === "formatted" ? "raw" : "formatted")
                }
              />
            }
            label={`View as ${viewMode === "formatted" ? "Raw" : "Formatted"}`}
            sx={{ marginBottom: 2 }}
          />

          <div className="console-container">
            <pre
              className="console-content"
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {viewMode === "formatted"
                ? response
                : JSON.stringify(JSON.parse(response), null, 2)}
            </pre>
          </div>
        </Paper>
      )}

      {errors && (
        <Typography color="error" variant="body1">
          {errors}
        </Typography>
      )}
    </Box>
  );
};

export default ApiTesting;
