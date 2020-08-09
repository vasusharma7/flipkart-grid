import { combineReducers } from "redux";
import { reducer as notifications } from "react-notification-system-redux";

import { loginReducer } from "./loginRedux/loginReducer";

import { registerReducer } from "./registerRedux/registerReducer";
import { dataReducer } from "./dataRedux/dataReducer";
export const rootReducer = combineReducers({
  notifications,
  loginReducer,
  registerReducer,
  dataReducer
});
