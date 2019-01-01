import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "Actions/Constants/Account";
import querystring from "querystring";
import LoginViewModel from "Types/LoginViewModel";
import RegisterViewModel from "Types/RegisterViewModel";

interface ILoginRequest {
  type: Constants.LOGIN_REQUEST;
}

interface ILoginSuccess {
  type: Constants.LOGIN_SUCCESS;
}

interface ILoginFail {
  data: Error;
  type: Constants.LOGIN_FAIL;
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

export type CommentActions =
  | ILoginRequest
  | ILoginSuccess
  | ILoginFail
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterFail;

export function login(
  data: LoginViewModel
): ThunkAction<Promise<void>, {}, {}, CommentActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, CommentActions>
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
        return response.json();
      })
      .then(() => {
        dispatch({
          type: Constants.LOGIN_SUCCESS,
        });
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.LOGIN_FAIL,
        });
      });
  };
}

export function register(
  data: RegisterViewModel
): ThunkAction<Promise<void>, {}, {}, CommentActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, CommentActions>
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
      .then(() => {
        console.log(data);
        dispatch({
          type: Constants.REGISTER_SUCCESS,
        });
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.REGISTER_FAIL,
        });
      });
  };
}
