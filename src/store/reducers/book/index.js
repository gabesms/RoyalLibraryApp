const bookReducer = ({ types, mapActionToKey }) => {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected types to be an array of three elements.");
  }
  if (!types.every((t) => typeof t === "string")) {
    throw new Error("Expected types to be strings.");
  }
  if (typeof mapActionToKey !== "function") {
    throw new Error("Expected mapActionToKey to be a function.");
  }
  const initialState = {
    data: [],
    total: 0,
    loading: false,
  };
  const [requestType, successType, failureType] = types;
  return (state = initialState, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          loading: true,
          sent: initialState.sent,
        };
      case successType:
        return {
          ...state,

          data: action.response ? action.response.data : [],
          total: action.response ? action.response.total : 0,

          loading: false,
        };
      case failureType:
        return {
          ...initialState,
        };
      default:
        return state;
    }
  };
};

export default bookReducer;
