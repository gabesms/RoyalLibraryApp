import { CALL_API } from '../../middleware/api'

export const GET_BOOKS_USERS = "GET_BOOKS_USERS";
export const GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS";
export const GET_BOOKS_FAILURE = "GET_BOOKS_FAILURE";

export const listBooks = (params) => ({
  [CALL_API]: {
    types: [GET_BOOKS_USERS, GET_BOOKS_SUCCESS, GET_BOOKS_FAILURE],
    endpoint: `books${params}`,
    method: "GET",
  },
});

