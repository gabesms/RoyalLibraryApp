import {
  GET_BOOKS_USERS,
  GET_BOOKS_SUCCESS,
  GET_BOOKS_FAILURE,
} from "../actions/book";
import { RESET_ERROR_MESSAGE } from "../actions/error";

import book from "./book";

import { combineReducers } from "redux";

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
};

const reducers = combineReducers({
  bookReducer: book({
    mapActionToKey: (action) => action.book,
    types: [GET_BOOKS_USERS, GET_BOOKS_SUCCESS, GET_BOOKS_FAILURE],
  }),
});

const rootReducer = combineReducers({
  reducers,
  errorMessage,
});

export default rootReducer;
