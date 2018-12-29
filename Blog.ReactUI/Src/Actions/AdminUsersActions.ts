import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "Actions/Constants/AdminUsers";
import querystring from "querystring";
import UserDTO from "Types/UserDTO";
import ListViewModel from "Types/ListViewModel";
import SearchQuery from "Types/SearchQuery";
import UserViewModel from "Types/UserViewModel";

interface IGetUsersRequest {
  type: Constants.GET_USERS_REQUEST;
}

interface IGetUsersSuccess {
  data: ListViewModel<UserViewModel>;
  type: Constants.GET_USERS_SUCCESS;
}

interface IGetUsersFail {
  data: Error;
  type: Constants.GET_USERS_FAIL;
}

interface IAddUserRequest {
  type: Constants.ADD_USERS_REQUEST;
}

interface IAddUserSuccess {
  type: Constants.ADD_USERS_SUCCESS;
}

interface IAddUserFail {
  type: Constants.ADD_USERS_FAIL;
  data: Error;
}

interface IUpdateUserRequest {
  type: Constants.UPDATE_USERS_REQUEST;
}

interface IUpdateUserSuccess {
  type: Constants.UPDATE_USERS_SUCCESS;
}

interface IUpdateUserFail {
  type: Constants.UPDATE_USERS_FAIL;
  data: Error;
}

interface IDeleteUserRequest {
  type: Constants.DELETE_USERS_REQUEST;
}

interface IDeleteUserSuccess {
  type: Constants.DELETE_USERS_SUCCESS;
}

interface IDeleteUserFail {
  type: Constants.DELETE_USERS_FAIL;
  data: Error;
}

export type UserActions =
  | IGetUsersRequest
  | IGetUsersSuccess
  | IGetUsersFail
  | IAddUserRequest
  | IAddUserSuccess
  | IAddUserFail
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFail
  | IDeleteUserRequest
  | IDeleteUserSuccess
  | IDeleteUserFail;

export function GetUsers(
  searchQuery: SearchQuery
): ThunkAction<Promise<void>, {}, {}, UserActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, UserActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.GET_USERS_REQUEST
    });
    fetch(
      `http://localhost:59525/api/admin/users?${querystring.stringify(
        searchQuery
      )}`,
      { credentials: "include" }
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({
          data,
          type: Constants.GET_USERS_SUCCESS
        });
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.GET_USERS_FAIL
        });
      });
  };
}

export function AddUser(
  data: UserViewModel
): ThunkAction<Promise<void>, {}, {}, UserActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, UserActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.ADD_USERS_REQUEST
    });
    fetch(`http://localhost:59525/api/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.ADD_USERS_SUCCESS
          });
          dispatch(GetUsers(new SearchQuery()));
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.ADD_USERS_FAIL
        });
      });
  };
}

export function UpdateUser(
  data: UserViewModel
): ThunkAction<Promise<void>, {}, {}, UserActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, UserActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.UPDATE_USERS_REQUEST
    });
    fetch(`http://localhost:59525/api/admin/users`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.UPDATE_USERS_SUCCESS
          });
          dispatch(GetUsers(new SearchQuery()));
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.UPDATE_USERS_FAIL
        });
      });
  };
}

export function DeleteUser(
  id: number
): ThunkAction<Promise<void>, {}, {}, UserActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, UserActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.DELETE_USERS_REQUEST
    });
    fetch(`http://localhost:59525/api/admin/users`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(id)
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.DELETE_USERS_SUCCESS
          });
          dispatch(GetUsers(new SearchQuery()));
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.DELETE_USERS_FAIL
        });
      });
  };
}
