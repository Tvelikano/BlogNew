import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import recordReducer from "Reducers/Records";
import userReducer from "Reducers/Users";
import rolesReducer from "Reducers/Roles";
import accountReducer from "Reducers/Account";
import weatherReducer from "Reducers/Weather";

export default (history: History) =>
  combineReducers({
    account: accountReducer,
    records: recordReducer,
    users: userReducer,
    roles: rolesReducer,
    weather: weatherReducer,
    router: connectRouter(history),
  });
