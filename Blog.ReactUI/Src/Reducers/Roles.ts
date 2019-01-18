import * as roleConstants from "Actions/Constants/AdminRoles";
import { RoleActions } from "Actions/AdminRolesActions";
import { IRoleState } from "Types/Store/Index";
import { CommentActions } from "Actions/CommentActions";
import Role from "Types/Account/Role";

const initialState: IRoleState = {
  data: new Array<Role>(),
  error: null,
  isLoading: false,
};

export default function roleReducer(
  state: IRoleState = initialState,
  action: RoleActions | CommentActions
) {
  switch (action.type) {
    case roleConstants.GET_ROLES_REQUEST:
      return { ...state, isLoading: true, error: null };

    case roleConstants.GET_ROLES_SUCCESS: {
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    }

    case roleConstants.GET_ROLES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.data,
      };

    case roleConstants.ADD_ROLES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case roleConstants.ADD_ROLES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case roleConstants.ADD_ROLES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.data,
      };

    default:
      return state;
  }
}
