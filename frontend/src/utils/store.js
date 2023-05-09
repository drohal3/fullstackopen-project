import { configureStore } from "@reduxjs/toolkit";
// import blogReducer from "../reducers/blogReducer";
import alertReducer from "../reducers/alertReducer";
import userReducer from '../reducers/userReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    alerts: alertReducer,
  },
});

export default store;