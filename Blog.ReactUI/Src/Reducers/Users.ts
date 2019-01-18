import * as roleConstants from "Actions/Constants/AdminUsers";
import { UserActions } from "Actions/AdminUsersActions";
import { IUserState } from "Types/Store/Index";
import { CommentActions } from "Actions/CommentActions";
import ListViewModel from "Types/ListViewModel";
import UserViewModel from "Types/Account/UserViewModel";

const initialState: IUserState = {
  data: new ListViewModel<UserViewModel>(),
  error: null,
  isLoading: false,
};

export default function roleReducer(
  state: IUserState = initialState,
  action: UserActions | CommentActions
) {
  switch (action.type) {
    case roleConstants.GET_USERS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case roleConstants.GET_USERS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    }

    case roleConstants.GET_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.data,
      };

    case roleConstants.GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };

    case roleConstants.GET_USER_SUCCESS: {
      let user = initialState;
      user.data.List.push(Object.assign(action.data));

      return {
        ...state,
        data: user,
        isLoading: false,
      };
    }

    case roleConstants.GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.data,
      };

    case roleConstants.ADD_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case roleConstants.ADD_USERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case roleConstants.ADD_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.data,
      };

    default:
      return state;
  }
}
