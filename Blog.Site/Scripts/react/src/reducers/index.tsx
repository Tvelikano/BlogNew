import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import recordReducer from "reducers/Records";

export default (history: History) =>
  combineReducers({
    records: recordReducer,
    router: connectRouter(history)
  });
