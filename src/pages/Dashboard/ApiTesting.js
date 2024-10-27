// ApiTesting.js

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { useTheme } from "@emotion/react";
import "../../css/ConsoleBlock.css";
import { Fonts } from "../../assets/fonts/Fonts";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import AddIcon from "@mui/icons-material/Add";
import { UserContext } from "../../context/MyContext";
import {
  DeleteRequestJson,
  GetRequest,
  PostRequestJson,
} from "../../Network/ApiRequests";
import { ApiUrls } from "../../Network/ApiUrls";
import NoteEditor from "./Helper/NoteEditor";
import FormDialog from "../../common/FormDialoug";
import { useLocation } from "react-router-dom";
import TaskToolbar from "../../common/TaskToolbar";
const ApiTesting = () => {
  const location = useLocation();
  const { data } = location.state;

  const { env, projectId, projectName, selectedApipt, hasAccess } = data;

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

  const [formKeyError, setFormKeyError] = useState(false);
  const [formValueError, setFormValueError] = useState(false);

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
        const { formKey, formValue, formNote } = frmdt;
        return { key: formKey, value: formValue, note: formNote };
      });

      setFormData(modifiedFormData);
    }
  }, [selectedApi]);

  const [body, setBody] = useState(
    selectedApi?.jsonString ? JSON.parse(selectedApi.jsonString) : ""
  );

  const [jsonNote, SetJsonNote] = useState(
    selectedApi?.jsonNote ? selectedApi.jsonNote : ""
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
  const [formDataNote, setFormDataNote] = useState("");

  const theme = useTheme();

  const { token, mUser } = useContext(UserContext);
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
    if (formDataKey === "") {
      setFormKeyError(true);
      return;
    } else if (formDataValue === "") {
      setFormValueError(true);
      return;
    }

    setFormData([
      ...formData,
      { key: formDataKey, value: formDataValue, note: formDataNote },
    ]);
    setFormDataKey("");
    setFormDataValue("");
    setFormDataNote("");
  };

  const handleRemoveFormData = (index) => {
    const updatedFormData = formData.filter((_, i) => i !== index);
    setFormData(updatedFormData);
  };

  const handleEditFormData = (index) => {
    const selectedFormdata = formData.find((_, i) => i == index);
    setFormDataKey(selectedFormdata.key);
    setFormDataValue(selectedFormdata.value);
    setFormDataNote(selectedFormdata.note);

    const updatedFormData = formData.filter((_, i) => i !== index);
    setFormData(updatedFormData);
  };

  const handleSendRequest = async () => {
    if (selectedApi == null || selectedApi == undefined) {
      alert("Please save The Api before Sending Request");
      return;
    }

    try {
      const requestData = {
        url: url,
        method: method,
        headers: headers,
        type: contentType,
        body: contentType == "application/json" ? body : formData,
      };

      setReq(formatRequest(requestData));
    } catch (e) {}

    try {
      const headersObject = headers.reduce((acc, header) => {
        if (header.key) acc[header.key] = header.value;
        return acc;
      }, {});

      const frmdta = new FormData();

      const data =
        contentType === "application/json"
          ? JSON.parse(body)
          : formData.reduce((acc, field) => {
              if (field.key) acc[field.key] = field.value;
              frmdta.append(field.key, field.value);
              return acc;
            }, {});

      const config = {
        method,
        url,
        headers: headersObject,
        data: contentType === "application/json" ? data : frmdta,
      };

      const startTime = new Date().getTime();

      try {
        await axios(config).then((res) => {
          const endTime = new Date().getTime();
          const responseTime = endTime - startTime;
          const statusCode = res.status;

          setResponse(JSON.stringify(res.data, null, 2));
          setErrors("");

          handleAddAnalitics(responseTime, "N", projectId, selectedApi?.id);
        });
      } catch (err) {
        //this is only for newtwork error except 200 code
        setErrors(err.message);
        setResponse("");
        const endTime = new Date().getTime();
        const responseTime = endTime - startTime;
        handleAddAnalitics(responseTime, "Y", projectId, selectedApi?.id);
      }
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
      const { key, value, note } = frmdt;
      return { formKey: key, formValue: value, formNote: note };
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
      jsonNote: jsonNote,
      requestType: contentType == "application/json" ? "JSON" : "FORMDATA",
    };
    console.log(requestData);
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

  const handleAddAnalitics = (time, status, projectId, apiId) => {
    const requestData = {
      response_time: time,
      is_error: status,
      project_id: projectId,
      api_id: apiId,
    };

    PostRequestJson(
      ApiUrls.addApiUsesAnalitics,
      requestData,
      null,
      token,
      null,
      null,
      (res) => {},
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

  const reportError = (msg, severity) => {
    const stackTrace = {
      req: req,
      res: response,
    };
    //Critical, Major, Minor
    const errr = {
      severity: severity,
      apiName: selectedApi?.name,
      apiEndpoint: url,
      stacktrace: JSON.stringify(stackTrace),
      envName: env?.name,
      description: msg,
      reporterId: mUser?.id,
      envId: env?.id,
      title: "New bug reported By " + mUser?.name,
      projectId: projectId,
      apiId: selectedApi?.id,
      status: "Open",
      uId: mUser?.id,
    };

    console.log(errr);

    PostRequestJson(
      ApiUrls.addBug,
      errr,
      null,
      token,
      null,
      null,
      (res) => {},
      null
    );
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

  const ReportActionButton = useCallback(() => {
    return (
      <Button
        variant="contained"
        color="warning"
        startIcon={<SaveIcon />}
        sx={{ marginBottom: 2, marginRight: 5 }}
      >
        Report Error
      </Button>
    );
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: 700,
      }}
    >
      <TaskToolbar setState={false} backenabled={true} />
      <div style={{ padding: 20 }}>
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
            disabled={!hasAccess}
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth={false}
            variant="outlined"
            required
            style={{ flex: 1, fontFamily: Fonts.roboto_mono }}
            disabled={!hasAccess}
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
                disabled={!hasAccess}
              >
                <MenuItem value="GET" style={{ fontFamily: Fonts.roboto_mono }}>
                  GET
                </MenuItem>
                <MenuItem
                  value="POST"
                  style={{ fontFamily: Fonts.roboto_mono }}
                >
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
              disabled={!hasAccess}
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
              disabled={!hasAccess}
            />
            <TextField
              label="Header Value"
              value={headervalue}
              onChange={(e) => handleChangeHeader("value", e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ marginRight: 1 }}
              style={{ flex: 1 }}
              disabled={!hasAccess}
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
              disabled={!hasAccess}
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
            <div style={{ marginTop: 10 }}>
              <NoteEditor
                note={jsonNote}
                setNote={SetJsonNote}
                placeholde="Addational note / message for JSON Body"
              />
              {/* <TextField
              label="Addational Note"
              id="outlined-size-small"
              multiline
              placeholder="Addational note / message for Json Body"
              fullWidth
              value={jsonNote}
              onChange={(e) => SetJsonNote(e.target.value)}
            /> */}
              <TextField
                label="Request Body (JSON)"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                fullWidth
                multiline
                rows={6}
                margin="normal"
                variant="outlined"
                disabled={!hasAccess}
              />
            </div>
          ) : (
            <Box style={{ marginTop: 20 }}>
              <NoteEditor
                note={formDataNote}
                setNote={setFormDataNote}
                placeholde="Addational note / message for below Parameter"
              />
              {/* <TextField
              label="Addational Note"
              id="outlined-size-small"
              multiline
              placeholder="Addational note / message for below Parameter"
              fullWidth
              value={formDataNote}
              onChange={(e) => setFormDataNote(e.target.value)}
            /> */}
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <TextField
                  error={formKeyError}
                  label="Key"
                  value={formDataKey}
                  onChange={(e) => {
                    setFormKeyError(false);
                    setFormDataKey(e.target.value);
                  }}
                  fullWidth
                  variant="outlined"
                  sx={{ marginRight: 1, flex: 0.2 }}
                  disabled={!hasAccess}
                />
                <TextField
                  error={formValueError}
                  label="Value"
                  value={formDataValue}
                  onChange={(e) => {
                    setFormValueError(false);
                    setFormDataValue(e.target.value);
                  }}
                  fullWidth
                  variant="outlined"
                  sx={{ marginRight: 1, flex: 1 }}
                  disabled={!hasAccess}
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
                      secondary={
                        <span
                          style={{
                            color: theme.palette.text.secondary,
                            display: "flex",
                            flexDirection: "row",
                            gap: 30,
                          }}
                        >
                          <Typography
                            gutterBottom
                            style={{
                              color: theme.palette.text.primary,
                              fontFamily: Fonts.roboto_mono,
                              marginBottom: 10,
                              marginTop: 0,
                              fontSize: 16,
                            }}
                          >
                            {`${field.key} : ${field.value}`}
                          </Typography>
                          {field.note && (
                            <span
                              style={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <EditNoteOutlinedIcon />
                              <Typography
                                gutterBottom
                                style={{
                                  color: theme.palette.text.primary,
                                  fontFamily: Fonts.roboto_mono,
                                  marginBottom: 10,
                                  marginTop: 0,
                                  fontSize: 11,
                                }}
                              >
                                {field.note}
                              </Typography>
                            </span>
                          )}
                        </span>
                      }
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
                    <IconButton
                      onClick={() => {
                        handleEditFormData(index);
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => handleRemoveFormData(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Paper>
        <div style={{ flexDirection: "row", alignItems: "center", gap: 50 }}>
          <Button
            onClick={handleSendRequest}
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2 }}
          >
            Send Request
          </Button>

          {hasAccess && (
            <Button
              onClick={handleAddApi}
              variant="contained"
              color="primary"
              sx={{ marginBottom: 2, marginStart: 10 }}
            >
              {selectedApi ? "Update Api" : "Add Api"}
            </Button>
          )}
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
            <dev
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Request
              </Typography>

              <FormDialog
                ActionButton={<ReportActionButton />}
                onClick={reportError}
                title={"Report Bug For " + selectedApi?.name + " Api"}
                desc={
                  "Please add a Description For better understanding of this Bug"
                }
              />
            </dev>

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
          <Paper
            elevation={3}
            sx={{ padding: 2, marginTop: 5, borderRadius: 3 }}
          >
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
              label={`View as ${
                viewMode === "formatted" ? "Raw" : "Formatted"
              }`}
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
      </div>
    </Box>
  );
};

export default ApiTesting;
