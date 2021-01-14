import { combineReducers } from "redux";
import userReducer from './user'
import { UserState } from "./user/types";

export interface ApplicationState {
  userReducer: UserState
}

const rootReducer = combineReducers({
  userReducer
})

export default rootReducer