import { FETCH_FAILURE, FETCH_SUCCESS, LOADING } from "./dataActionTypes";
import axios from "axios";
export const fetchRequest = () => {
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
export const fetchCategory = category => {
  // alert(1)
  return async function (dispatch) {
    dispatch(fetchRequest());
    await axios
      .get(`${global.config.backendURL}/api/commons/fetchCategory/${category}`)
      .then(async res => {

        dispatch(fetchSuccess(res.data));

      })
      .catch(err => {
        console.log("fetch error", err);
        dispatch(fetchFailure(err));
      });
  };
};

export const fetchData = data => {
  return async function (dispatch) {
    dispatch(fetchRequest());
    await axios
      .get(`${global.config.backendURL}/api/commons/fetch/`)
      .then(async res => {

        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        console.log("fetch error", err);
        dispatch(fetchFailure(err));
      });
  };
};
