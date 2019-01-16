import { RouterState } from "connected-react-router";
import ReturnModelDTO from "Types/ReturnModelDTO";
import RecordDTO from "Types/Records/RecordDTO";
import ListViewModel from "Types/ListViewModel";
import RoleDTO from "../Account/RoleDTO";
import UserViewModel from "../Account/UserViewModel";
import UserDTO from "../Account/UserDTO";
import ClientWeather from "../Weather/ClientWeather";

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
  user: UserDTO;
}

export interface IRecordState {
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  currentRecord: ReturnModelDTO<RecordDTO>;
  isLoading: boolean;
  isCommentsLoading: boolean;
  error: string;
}

export interface IUserState {
  data: ListViewModel<UserViewModel>;
  isLoading: boolean;
  error: string;
}

export interface IRoleState {
  data: RoleDTO[];
  isLoading: boolean;
  error: string;
}

export interface IWeatherState {
  data: ClientWeather;
  isLoading: boolean;
  error: string;
}
