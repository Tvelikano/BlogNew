import { RouterState } from "connected-react-router";
import ReturnModel from "Types/ReturnModel";
import Record from "Types/Records/Record";
import ListViewModel from "Types/ListViewModel";
import Role from "../Account/Role";
import UserViewModel from "../Account/UserViewModel";
import User from "../Account/User";
import ClientWeather from "../Weather/ClientWeather";
import LoginError from "Types/Account/LoginError";
import ModelState from "Types/ModelState";

export interface IStoreState {
  account: IAccountState;
  records: IRecordState;
  users: IUserState;
  roles: IRoleState;
  router: RouterState;
  weather: IWeatherState;
}

export interface IAccountState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User;
  error: LoginError;
}

export interface IRecordState {
  data: ListViewModel<ReturnModel<Record>>;
  currentRecord: ReturnModel<Record>;
  isLoading: boolean;
  isCommentsLoading: boolean;
  error: ModelState;
}

export interface IUserState {
  data: ListViewModel<UserViewModel>;
  isLoading: boolean;
  error: ModelState;
}

export interface IRoleState {
  data: Role[];
  isLoading: boolean;
  error: ModelState;
}

export interface IWeatherState {
  data: ClientWeather;
  isLoading: boolean;
  error: string;
}
