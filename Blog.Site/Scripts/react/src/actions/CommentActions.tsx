import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "./Constants/Comment";

interface IGetCommentsRequest {
  type: Constants.GET_COMMENTS_REQUEST;
}

interface IGetCommentsSuccess {
  data: ReturnListDTO<CommentDTO>;
  type: Constants.GET_COMMENTS_SUCCESS;
}

interface IGetCommentsFail {
  data: Error;
  type: Constants.GET_COMMENTS_FAIL;
}

interface ICreateCommentsRequest {
  type: Constants.CREATE_COMMENTS_REQUEST;
}

interface ICreateCommentsSuccess {
  type: Constants.CREATE_COMMENTS_SUCCESS;
}

interface ICreateCommentsFail {
  data: Error;
  type: Constants.CREATE_COMMENTS_FAIL;
}

export type CommentActions =
  | IGetCommentsRequest
  | IGetCommentsSuccess
  | IGetCommentsFail
  | ICreateCommentsRequest
  | ICreateCommentsSuccess
  | ICreateCommentsFail;

export function getComments(
  recordId: number
): ThunkAction<Promise<void>, {}, {}, CommentActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, CommentActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.GET_COMMENTS_REQUEST
    });
    fetch(`Home/GetComments?recordId=${recordId}`)
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

export function createComment(
  recordId: number,
  content: string
): ThunkAction<Promise<void>, {}, {}, CommentActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, CommentActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.CREATE_COMMENTS_REQUEST
    });
    fetch(`Home/CreateComment?recordId=${recordId}&content=${content}`, {
      method: "POST"
    })
      .then(() => {
        dispatch({
          type: Constants.CREATE_COMMENTS_SUCCESS
        });
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.CREATE_COMMENTS_FAIL
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

export function CreateCommentRequest(): ICreateCommentsRequest {
  return {
    type: Constants.CREATE_COMMENTS_REQUEST
  };
}

export function CreateCommentSuccess(): ICreateCommentsSuccess {
  return {
    type: Constants.CREATE_COMMENTS_SUCCESS
  };
}

export function CreateCommentFail(data: Error): ICreateCommentsFail {
  return {
    data,
    type: Constants.CREATE_COMMENTS_FAIL
  };
}
