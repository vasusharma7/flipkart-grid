import { FETCH_FAILURE, FETCH_SUCCESS, LOADING } from "./dataActionTypes";
import axios from "axios";
export const registerRequest = () => {
  return {
    type: LOADING,
  };
};

export const fetchSuccess = data => {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  };
};

export const fetchFailure = error => {
  return {
    type: FETCH_FAILURE,
    error: error,
  };
};

export const register = data => {
  return function (dispatch) {
    dispatch(registerRequest());
    axios
      .post(`${global.config.backendURL}/api/commons/fetch/`)
      .then(async res => {
        console.log(res);
        dispatch(fetchSuccess(data));
      })
      .catch(err => {
        console.log("fetch error", err);
        dispatch(fetchFailure(err));
      });
  };
};
