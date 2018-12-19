import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { recordReducer } from "./records";
import { commentReducer } from "./comments";

export default (history: History) =>
  combineReducers({
    records: recordReducer,
    comments: commentReducer,
    router: connectRouter(history)
  });
