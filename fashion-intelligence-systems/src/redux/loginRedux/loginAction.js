import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REDIRECT_TO_JOIN,
} from "./loginActionTypes";
import axios from "axios";

import Notifications from "react-notification-system-redux";

const notificationOpts = {
  // uid: 'once-please', // you can specify your own uid if required
  title: "Error",
  message: "Invalid Username or Password",
  position: "tr",
  autoDismiss: 2,
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = username => {
  return {
    type: LOGIN_SUCCESS,
    username: username,
  };
};

export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    error: error,
  };
};

export const redirectToJoinPage = () => {
  return {
    type: REDIRECT_TO_JOIN,
  };
};

export const logout = () => {
  localStorage.clear();
  return {
    type: LOGOUT,
  };
};

export const login = data => {
  return function (dispatch) {
    dispatch(loginRequest());
    axios
      .post(`${global.config.backendURL}/api/users/auth`, data)
      .then(res => {
        localStorage.setItem("flipkart-grid-auth-token", res.data.token);
        localStorage.setItem("username", data.email);
        dispatch(loginSuccess(data.email));
        dispatch(
          Notifications.success({
            title: "Login Success",
            message: "Welcome to Dashboard",
            position: "tr",
            autoDismiss: 2,
          })
        );
      })
      .catch(err => {
        dispatch(loginFailure(err));
        dispatch(Notifications.error(notificationOpts));
      });
  };
};
