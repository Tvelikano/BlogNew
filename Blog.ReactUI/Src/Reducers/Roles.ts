import * as roleConstants from "Actions/Constants/AdminRoles";
import { RoleActions } from "Actions/AdminRolesActions";
import { IRoleState } from "Types/Index";
import { CommentActions } from "Actions/CommentActions";
import RoleDTO from "Types/RoleDTO";

const initialState: IRoleState = {
  data: new Array<RoleDTO>(),
  error: "",
  isLoading: false,
};

export default function roleReducer(
  state: IRoleState = initialState,
  action: RoleActions | CommentActions
) {
  switch (action.type) {
    case roleConstants.GET_ROLES_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case roleConstants.GET_ROLES_SUCCESS: {
      return {
        ...state,
        data: action.data,
        error: "",
        isLoading: false,
      };
    }

    case roleConstants.GET_ROLES_FAIL:
      return {
        ...state,
        error: action.data.message,
        isLoading: false,
      };

    case roleConstants.ADD_ROLES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
      };

    case roleConstants.ADD_ROLES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: "",
      };
    }

    case roleConstants.ADD_ROLES_FAIL:
      return {
        ...state,
        error: action.data.message,
        isLoading: false,
      };

    default:
      return state;
  }
}
