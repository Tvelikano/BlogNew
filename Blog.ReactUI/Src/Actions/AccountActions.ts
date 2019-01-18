import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "Actions/Constants/Account";
import querystring from "querystring";
import LoginViewModel from "Types/Account/LoginViewModel";
import RegisterViewModel from "Types/Account/RegisterViewModel";
import User from "Types/Account/User";
import LoginError from "Types/Account/LoginError";

interface ILoginRequest {
  type: Constants.LOGIN_REQUEST;
}

interface ILoginSuccess {
  type: Constants.LOGIN_SUCCESS;
  data: User;
}

interface ILoginFail {
  data: LoginError;
  type: Constants.LOGIN_FAIL;
}

interface ILogout {
  type: Constants.LOGOUT;
}

interface IRegisterRequest {
  type: Constants.REGISTER_REQUEST;
}

interface IRegisterSuccess {
  type: Constants.REGISTER_SUCCESS;
}

interface IRegisterFail {
  data: Error;
  type: Constants.REGISTER_FAIL;
}

export type AccountActions =
  | ILoginRequest
  | ILoginSuccess
  | ILoginFail
  | ILogout
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterFail;

export function Login(
  data: LoginViewModel
): ThunkAction<Promise<void>, {}, {}, AccountActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, AccountActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.LOGIN_REQUEST,
    });
    fetch("http://localhost:59525/api/token", {
      method: "POST",
      body: querystring.stringify(
        Object.assign(data, { grant_type: "password" })
      ),
      credentials: "include",
    })
      .then(response => {
        if (response.ok) {
          dispatch(GetUserInfo());
        } else {
          return response.json();
        }
      })
      .then(error => {
        dispatch({
          data: error,
          type: Constants.LOGIN_FAIL,
        });
      })
      .catch(ex => {
        let error = new LoginError();
        error.error = ex;
        error.error_description = ex;

        dispatch({
          data: new LoginError(),
          type: Constants.LOGIN_FAIL,
        });
      });
  };
}

export function GetUserInfo(): ThunkAction<
  Promise<void>,
  {},
  {},
  AccountActions
> {
  return async (
    dispatch: ThunkDispatch<{}, {}, AccountActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.LOGIN_REQUEST,
    });
    fetch("http://localhost:59525/api/user/getuserinfo", {
      credentials: "include",
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(user => {
        dispatch({
          type: Constants.LOGIN_SUCCESS,
          data: user,
        });
      })
      .catch(ex => {
        dispatch({
          type: Constants.LOGIN_FAIL,
          data: ex,
        });
      });
  };
}

export function Logout(): ThunkAction<Promise<void>, {}, {}, AccountActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, AccountActions>
  ): Promise<void> => {
    fetch("http://localhost:59525/api/user/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      dispatch({
        type: Constants.LOGOUT,
      });
    });
  };
}

export function Register(
  data: RegisterViewModel
): ThunkAction<Promise<void>, {}, {}, AccountActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, AccountActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.REGISTER_REQUEST,
    });
    fetch(`http://localhost:59525/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.REGISTER_SUCCESS,
          });
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.REGISTER_FAIL,
        });
      });
  };
}
