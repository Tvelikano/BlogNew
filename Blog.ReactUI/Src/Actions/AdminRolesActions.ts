import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "Actions/Constants/AdminRoles";
import ReturnModelDTO from "Types/ReturnModelDTO";
import RoleDTO from "Types/RoleDTO";
import ListViewModel from "Types/ListViewModel";

interface IGetRolesRequest {
  type: Constants.GET_ROLES_REQUEST;
}

interface IGetRolesSuccess {
  data: ListViewModel<ReturnModelDTO<RoleDTO>>;
  type: Constants.GET_ROLES_SUCCESS;
}

interface IGetRolesFail {
  data: Error;
  type: Constants.GET_ROLES_FAIL;
}

interface IAddRoleRequest {
  type: Constants.ADD_ROLES_REQUEST;
}

interface IAddRoleSuccess {
  type: Constants.ADD_ROLES_SUCCESS;
}

interface IAddRoleFail {
  type: Constants.ADD_ROLES_FAIL;
  data: Error;
}

interface IDeleteRoleRequest {
  type: Constants.DELETE_ROLES_REQUEST;
}

interface IDeleteRoleSuccess {
  type: Constants.DELETE_ROLES_SUCCESS;
}

interface IDeleteRoleFail {
  type: Constants.DELETE_ROLES_FAIL;
  data: Error;
}

export type RoleActions =
  | IGetRolesRequest
  | IGetRolesSuccess
  | IGetRolesFail
  | IAddRoleRequest
  | IAddRoleSuccess
  | IAddRoleFail
  | IDeleteRoleRequest
  | IDeleteRoleSuccess
  | IDeleteRoleFail;

export function GetRoles(): ThunkAction<Promise<void>, {}, {}, RoleActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, RoleActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.GET_ROLES_REQUEST,
    });
    fetch("http://localhost:59525/api/admin/roles", {
      credentials: "include",
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(data => {
        dispatch({
          data,
          type: Constants.GET_ROLES_SUCCESS,
        });
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.GET_ROLES_FAIL,
        });
      });
  };
}

export function AddRole(
  name: string
): ThunkAction<Promise<void>, {}, {}, RoleActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, RoleActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.ADD_ROLES_REQUEST,
    });
    fetch(`http://localhost:59525/api/admin/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(name),
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.ADD_ROLES_SUCCESS,
          });
          dispatch(GetRoles());
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.ADD_ROLES_FAIL,
        });
      });
  };
}

export function DeleteRole(
  id: number
): ThunkAction<Promise<void>, {}, {}, RoleActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, RoleActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.DELETE_ROLES_REQUEST,
    });
    fetch(`http://localhost:59525/api/admin/roles`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(id),
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.DELETE_ROLES_SUCCESS,
          });
          dispatch(GetRoles());
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.DELETE_ROLES_FAIL,
        });
      });
  };
}
