import axios from "axios";

export const PostRequestForm = (
  Url,
  params,
  progress = null,
  header = "",
  onResponse,
  navigation = null
) => {
  if (progress) {
    progress(true);
  }

  axios({
    // Endpoint to send files
    url: Url,
    method: "POST",
    headers: {
      Authorization: header,
      "Content-Type": "multipart/form-data",
    },

    // Attaching the form data
    data: params,
  })
    // Handle the response from backend here
    .then((res) => {
      if (progress) {
        progress(false);
      }
      //console.log(res)
      if (res.status == 200) {
        let data = res.data;

        if (data.error) {
          console.log(data.error);

          try {
            onResponse(data);
          } catch (err) {
            console.log(err);
          }
        } else {
          //console.warn(data)
          onResponse(data);
        }
      }
      //let result = res.json();
    })

    // Catch errors if any
    .catch((err) => {
      if (progress) {
        progress(false);
      }

      console.warn(err);
    });
};

export const callPostMultipart = (
  api,
  formData,
  progress,
  header,
  response,
  navigation = null
) => {
  progress(true);
  //console.log(file);
  axios({
    // Endpoint to send files
    url: api,
    method: "POST",
    headers: {
      // Add any auth token her
      Authorization: "Bearer " + header,
      "Content-Type": "multipart/form-data",
    },

    // Attaching the form data
    data: formData,
  })
    // Handle the response from backend here
    .then((res) => {
      progress(false);
      if (res.status == 200) {
        let data = res.data;
        if (data.error) {
          console.log(data.error);
          try {
          } catch (err) {
            console.log(err);
          }
        } else {
          response(data);
        }
      }
      //let result = res.json();
    })

    // Catch errors if any
    .catch((err) => {
      progress(false);
      console.warn(err);
    });
};

export const PostRequestJson = (
  api,
  json,
  progress,
  header,
  setSuccess,
  setError,
  response,
  navigation
) => {
  progress && progress(true);
  //console.log(file);
  axios({
    // Endpoint to send files
    url: api,
    method: "POST",
    headers: {
      // Add any auth token her
      Authorization: "Bearer " + header,
      "Content-Type": "application/json",
    },

    // Attaching the form data
    data: json,
  })
    // Handle the response from backend here
    .then((res) => {
      progress && progress(false);
      console.log(res);

      if (res?.data?.code == 100) {
        setError && setError(res.data?.message);
        setSuccess && setSuccess(null);
      } else {
        setSuccess && setSuccess(res.data.message);
        setError && setError(null);
        response && response(res?.data);
      }
    })

    // Catch errors if any
    .catch((err) => {
      progress && progress(false);
      setError && setError(err.message);
      setSuccess && setSuccess(null);
      console.warn(err);
    });
};

export const PostRequestFormData = (
  api,
  formdata,
  progress,
  header,
  setSuccess,
  setError,
  response,
  navigation
) => {
  progress && progress(true);
  //console.log(file);
  axios({
    // Endpoint to send files
    url: api,
    method: "POST",
    headers: {
      // Add any auth token her
      Authorization: "Bearer " + header,
      "Content-Type": "multipart/form-data",
    },

    data: formdata,
  })
    .then((res) => {
      progress && progress(false);
      console.log(res);

      if (res?.data?.code == 100) {
        setError && setError(res.data?.message);
        setSuccess && setSuccess(null);
      } else {
        setSuccess && setSuccess(res.data.message);
        setError && setError(null);
        response && response(res?.data);
      }
    })

    .catch((err) => {
      progress && progress(false);
      setError && setError(err.message);
      setSuccess && setSuccess(null);
      console.warn(err);
    });
};

export const GetRequest = (
  api,
  formdata,
  progress,
  header,
  setSuccess,
  setError,
  response,
  navigation
) => {
  progress && progress(true);
  //console.log(file);
  axios({
    // Endpoint to send files
    url: api,
    method: "GET",
    headers: {
      // Add any auth token her
      Authorization: "Bearer " + header,
      "Content-Type": "multipart/form-data",
    },

    data: formdata,
  })
    .then((res) => {
      progress && progress(false);
      console.log(res);

      if (res?.data?.code == 100) {
        setError && setError(res.data?.message);
        setSuccess && setSuccess(null);
      } else {
        setSuccess && setSuccess(res.data.message);
        setError && setError(null);
        response && response(res?.data);
      }
    })

    .catch((err) => {
      progress && progress(false);
      setError && setError(err.message);
      setSuccess && setSuccess(null);
      console.warn(err);
    });
};
