import { FETCH_FAILURE, FETCH_SUCCESS, LOADING } from "./dataActionTypes";

const initalState = {
  loading: false,
  randomData: {},
};

export const registerReducer = (state = initalState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        randomData: action.payload,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export default registerReducer;
