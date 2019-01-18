import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "Actions/Constants/AdminUsers";
import querystring from "querystring";
import ListViewModel from "Types/ListViewModel";
import SearchQuery from "Types/SearchQuery";
import UserViewModel from "Types/Account/UserViewModel";
import ModelState from "Types/ModelState";

interface IGetUsersRequest {
  type: Constants.GET_USERS_REQUEST;
}

interface IGetUsersSuccess {
  type: Constants.GET_USERS_SUCCESS;
  data: ListViewModel<UserViewModel>;
}

interface IGetUsersFail {
  type: Constants.GET_USERS_FAIL;
  data: ModelState;
}

interface IGetUserRequest {
  type: Constants.GET_USER_REQUEST;
}

interface IGetUserSuccess {
  data: UserViewModel;
  type: Constants.GET_USER_SUCCESS;
}

interface IGetUserFail {
  type: Constants.GET_USER_FAIL;
  data: ModelState;
}

interface IAddUserRequest {
  type: Constants.ADD_USERS_REQUEST;
}

interface IAddUserSuccess {
  type: Constants.ADD_USERS_SUCCESS;
}

interface IAddUserFail {
  type: Constants.ADD_USERS_FAIL;
  data: ModelState;
}

interface IUpdateUserRequest {
  type: Constants.UPDATE_USERS_REQUEST;
}

interface IUpdateUserSuccess {
  type: Constants.UPDATE_USERS_SUCCESS;
}

interface IUpdateUserFail {
  type: Constants.UPDATE_USERS_FAIL;
  data: ModelState;
}

interface IDeleteUserRequest {
  type: Constants.DELETE_USERS_REQUEST;
}

interface IDeleteUserSuccess {
  type: Constants.DELETE_USERS_SUCCESS;
}

interface IDeleteUserFail {
  type: Constants.DELETE_USERS_FAIL;
  data: ModelState;
}

export type UserActions =
  | IGetUsersRequest
  | IGetUsersSuccess
  | IGetUsersFail
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFail
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
      type: Constants.GET_USERS_REQUEST,
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
          type: Constants.GET_USERS_SUCCESS,
        });
      })
      .catch(ex => {
        dispatch({
          type: Constants.GET_USERS_FAIL,
          data: new ModelState(),
        });
      });
  };
}

export function GetUser(
  id: number
): ThunkAction<Promise<void>, {}, {}, UserActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, UserActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.GET_USER_REQUEST,
    });
    fetch(`http://localhost:59525/api/admin/users/${id}`, {
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
          type: Constants.GET_USER_SUCCESS,
        });
      })
      .catch(ex => {
        dispatch({
          type: Constants.GET_USER_FAIL,
          data: new ModelState(),
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
      type: Constants.ADD_USERS_REQUEST,
    });
    fetch(`http://localhost:59525/api/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.ADD_USERS_SUCCESS,
          });
          dispatch(GetUsers(new SearchQuery()));
        } else {
          return response.json();
        }
      })
      .then(error => {
        dispatch({
          data: error,
          type: Constants.ADD_USERS_FAIL,
        });
      })
      .catch(ex => {
        dispatch({
          type: Constants.ADD_USERS_FAIL,
          data: new ModelState(),
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
      type: Constants.UPDATE_USERS_REQUEST,
    });
    fetch(`http://localhost:59525/api/admin/users`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.UPDATE_USERS_SUCCESS,
          });
          dispatch(GetUsers(new SearchQuery()));
        } else {
          return response.json();
        }
      })
      .then(error => {
        dispatch({
          data: error,
          type: Constants.UPDATE_USERS_FAIL,
        });
      })
      .catch(ex => {
        dispatch({
          type: Constants.UPDATE_USERS_FAIL,
          data: new ModelState(),
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
      type: Constants.DELETE_USERS_REQUEST,
    });
    fetch(`http://localhost:59525/api/admin/users`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.DELETE_USERS_SUCCESS,
          });
          dispatch(GetUsers(new SearchQuery()));
        } else {
          return response.json();
        }
      })
      .then(error => {
        dispatch({
          data: error,
          type: Constants.DELETE_USERS_FAIL,
        });
      })
      .catch(ex => {
        dispatch({
          type: Constants.DELETE_USERS_FAIL,
          data: new ModelState(),
        });
      });
  };
}
