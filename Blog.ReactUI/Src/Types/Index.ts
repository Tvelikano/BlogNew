import { RouterState } from "connected-react-router";
import ReturnModelDTO from "Types/ReturnModelDTO";
import RecordDTO from "Types/RecordDTO";
import ListViewModel from "Types/ListViewModel";
import RoleDTO from "./RoleDTO";
import UserViewModel from "./UserViewModel";
import UserDTO from "./UserDTO";

export interface IStoreState {
  account: IAccountState;
  records: IRecordState;
  users: IUserState;
  roles: IRoleState;
  router: RouterState;
}

export interface IAccountState {
  isAuthenticated: boolean;
  user: UserDTO;
}

export interface IRecordState {
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
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
