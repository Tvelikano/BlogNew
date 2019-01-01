import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import recordReducer from "Reducers/Records";
import userReducer from "Reducers/Users";
import rolesReducer from "Reducers/Roles";

export default (history: History) =>
  combineReducers({
    records: recordReducer,
    users: userReducer,
    roles: rolesReducer,
    router: connectRouter(history),
  });
