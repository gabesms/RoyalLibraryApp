const API_ROOT = "https://localhost:5001/api/";

const callApi = (endpoint, data, method, dataType = null) => {
  const type = "application/json";
  const acceptData = "application/json";
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
  let customData = {
    method: method,
    body: JSON.stringify(data),
    headers: {
      Accept: acceptData,
      "Content-Type": type,
    },
  };
  if (dataType) {
    let formData = new FormData();

    formData.append("file", data);
    customData = {
      method: method,
      body: formData,
      headers: {
        Accept: "application/json, application/xml, text/plain, text/html, *.*",
      },
    };
  }
  return fetch(fullUrl, method === "GET" ? {} : customData).then((response) =>
    response.headers.get("content-type") == "text/csv"
      ? response.blob().then((blob) => {
          var file = window.URL.createObjectURL(blob);
          window.location.assign(file);
        })
      : response.json().then((data) => {
          if (!response.ok) {
            return Promise.reject(data);
          }
          if (response.headers.get("X-content-range"))
            return {
              data: data,
              total: response.headers.get("X-content-range"),
            };
          else return data;
        })
  );
};
export const CALL_API = "Call API";

export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types, data, method, dataType } = callAPI;

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.");
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.");
  }
  if (!types.every((type) => typeof type === "string")) {
    throw new Error("Expected action types to be strings.");
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, data, method, dataType).then(
    (response) =>
      next(
        actionWith({
          response,
          type: successType,
          request: data,
        })
      ),
    (error) =>
      next(
        actionWith({
          type: failureType,
          error: error.message || "Error, Try again on a few seconds",
        })
      )
  );
};
