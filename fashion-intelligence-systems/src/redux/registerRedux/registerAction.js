import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USERNAME_EXISTS,
} from "./registerActionTypes";
import axios from "axios";
import Notifications from "react-notification-system-redux";

const unameNotificationOpts = {
  // uid: 'once-please', // you can specify your own uid if required
  title: "Error",
  message: "Email already Registered, Try different Email.",
  position: "tr",
  autoDismiss: 3,
};

const failureNotificationOpts = {
  // uid: 'once-please', // you can specify your own uid if required
  title: "Oops",
  message: "Some Error Occured ! Try Again !",
  position: "tr",
  autoDismiss: 3,
};
export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};
export const usernameExists = error => {
  return {
    type: USERNAME_EXISTS,
    error: error,
  };
};
export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

export const registerFailure = error => {
  return {
    type: REGISTER_FAILURE,
    error: error,
  };
};

export const register = data => {
  console.log("registering....");
  return function (dispatch) {
    dispatch(registerRequest());
    axios
      .post(`${global.config.backendURL}/api/users/register/`, data)
      .then(async res => {
        console.log(res);
        dispatch(registerSuccess());
        dispatch(
          Notifications.success({
            title: "Success",
            message: "You are registered ! Login Ahead !!",
            position: "tr",
            autoDismiss: 3,
          })
        );
        // await new Promise(r => setTimeout(r, 3000));
      })
      .catch(err => {
        console.log("Register error", err);
        if (err.response.status === 401) {
          console.log("username exists");
          dispatch(usernameExists("User Exists"));
          dispatch(Notifications.error(unameNotificationOpts));
          return;
        }
        console.log(err);
        dispatch(registerFailure(err));
        dispatch(Notifications.error(failureNotificationOpts));
      });
  };
};
