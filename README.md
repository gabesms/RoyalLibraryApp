
### React Book Library App ###
This repository contains the frontend solution for a little book library system implemented using React. The application allows users to search and display books based on title and author.
### App.js ###
The main component that sets up the routing for the application using react-router-dom. It also provides a Redux store to the components using react-redux.

### Books.js ### 
This component is responsible for displaying a list of books with pagination. It fetches book data from the backend API and provides search functionality based on book title and author.

### bookReducer.js ###
The Redux reducer responsible for managing the state related to book data. It handles actions such as fetching book data, updating the store with the fetched data, and handling loading and error states.

### bookActions.js ###
Contains action creators for fetching book data from the backend API. It defines action types for requesting book data, receiving successful responses, and handling errors.

### RootReducer.js ###
Combines all reducers into a single root reducer using combineReducers from Redux. It also includes an error message reducer to handle error messages in the application.

### Dependencies ###
The application uses the following dependencies:

react-router-dom: For routing within the application.

material-ui/core: Provides UI components for building the search interface and displaying book data.
redux: State management library for managing application state.
react-redux: Provides bindings for using Redux with React.
redux-thunk: Middleware for handling asynchronous actions in Redux.
axios: HTTP client for making requests to the backend API.
