import axios from "axios";

const apiHandle = axios.create({
  baseURL: `${process.env.VUE_APP_DB_URL}`,
});

const commonService = {
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
};

export default commonService;

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
