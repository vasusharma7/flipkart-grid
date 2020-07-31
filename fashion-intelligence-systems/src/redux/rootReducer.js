import { combineReducers } from "redux";
import { reducer as notifications } from "react-notification-system-redux";

import { loginReducer } from "./loginRedux/loginReducer";

import { registerReducer } from "./registerRedux/registerReducer";

export const rootReducer = combineReducers({
  notifications,
  loginReducer,
  registerReducer,
});
