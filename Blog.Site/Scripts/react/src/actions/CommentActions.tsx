import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "./constants/comment";

export interface IGetCommentsRequest {
  type: Constants.GET_COMMENTS_REQUEST;
}

export interface IGetCommentsSuccess {
  data: ReturnListDTO<CommentDTO>;
  type: Constants.GET_COMMENTS_SUCCESS;
}

export interface IGetCommentsFail {
  data: Error;
  type: Constants.GET_COMMENTS_FAIL;
}

export type CommentActions =
  | IGetCommentsRequest
  | IGetCommentsSuccess
  | IGetCommentsFail;

export function getComments(
  recordId: number
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({
      type: Constants.GET_COMMENTS_REQUEST
    });
    fetch(`http://localhost:62051/Home/GetComments?recordId=${recordId}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({
          data,
          type: Constants.GET_COMMENTS_SUCCESS
        });
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.GET_COMMENTS_FAIL
        });
      });
  };
}

export function GetNewsRequest(): IGetCommentsRequest {
  return {
    type: Constants.GET_COMMENTS_REQUEST
  };
}

export function GetNewsSuccess(
  data: ReturnListDTO<CommentDTO>
): IGetCommentsSuccess {
  return {
    data,
    type: Constants.GET_COMMENTS_SUCCESS
  };
}

export function GetNewsFail(data: Error): IGetCommentsFail {
  return {
    data,
    type: Constants.GET_COMMENTS_FAIL
  };
}
