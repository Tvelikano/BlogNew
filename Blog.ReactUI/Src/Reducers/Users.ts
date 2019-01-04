import * as roleConstants from "Actions/Constants/AdminUsers";
import { UserActions } from "Actions/AdminUsersActions";
import { IUserState } from "Types/Index";
import { CommentActions } from "Actions/CommentActions";
import ListViewModel from "Types/ListViewModel";
import UserViewModel from "Types/UserViewModel";

const initialState: IUserState = {
  data: new ListViewModel<UserViewModel>(),
  error: "",
  isLoading: false,
};

export default function roleReducer(
  state: IUserState = initialState,
  action: UserActions | CommentActions
) {
  switch (action.type) {
    case roleConstants.GET_USERS_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case roleConstants.GET_USERS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        error: "",
        isLoading: false,
      };
    }

    case roleConstants.GET_USERS_FAIL:
      return {
        ...state,
        error: action.data.message,
        isLoading: false,
      };

    case roleConstants.GET_USER_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case roleConstants.GET_USER_SUCCESS: {
      let user = initialState;
      user.data.List.push(Object.assign(action.data));

      return {
        ...state,
        data: user,
        error: "",
        isLoading: false,
      };
    }

    case roleConstants.GET_USER_FAIL:
      return {
        ...state,
        error: action.data.message,
        isLoading: false,
      };

    case roleConstants.ADD_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
      };

    case roleConstants.ADD_USERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: "",
      };
    }

    case roleConstants.ADD_USERS_FAIL:
      return {
        ...state,
        error: action.data.message,
        isLoading: false,
      };

    default:
      return state;
  }
}
