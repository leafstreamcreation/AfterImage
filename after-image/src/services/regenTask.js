import axios from "axios";

const apiHandle = axios.create({
  baseURL: `${process.env.VUE_APP_DB_URL}/regenTask`,
});

const regenTaskService = {
  index(auth, params) {
    return apiHandle
      .get("/index", {
        headers: {
          authorization: auth,
        },
        params,
      })
      .then(successStatus)
      .catch(internalServerError);
  },
  create(auth, { text, regenInterval, scheduleDate }, params) {
    return apiHandle
      .post(
        "/create",
        { text, regenInterval, scheduleDate },
        {
          headers: {
            authorization: auth,
          },
          params,
        }
      )
      .then(successStatus)
      .catch(internalServerError);
  },
  update(auth, resource, { regenInterval, scheduleDate }, params) {
    return apiHandle
      .post(
        `/update/${resource}`,
        { regenInterval, scheduleDate },
        {
          headers: {
            authorization: auth,
          },
          params,
        }
      )
      .then(successStatus)
      .catch(internalServerError);
  },
  delete(auth, resource, params) {
    return apiHandle
      .post(
        `/delete/${resource}`,
        {},
        {
          headers: {
            authorization: auth,
          },
          params,
        }
      )
      .then(successStatus)
      .catch(internalServerError);
  },
};

export default regenTaskService;

// here we are just maing our code look more DRY. With every backend call we must deal with errors and success states. The idea of creating these kinds of services is to make our lives easier in the components
function internalServerError(err) {
  console.log("err:", err.response.data);
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: err.response.status,
      errorMessage: err.response.data.errorMessage,
    };
  }
  return {
    status: err.response.status,
    errorMessage: "Internal server error. Please check your server",
  };
}

function successStatus(res) {
  return {
    status: res.status,
    data: res.data,
  };
}
