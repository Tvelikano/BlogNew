import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "Actions/Constants/Comment";
import ReturnListDTO from "Types/ReturnListDTO";
import CommentDTO from "Types/Comments/CommentDTO";

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
      type: Constants.GET_COMMENTS_REQUEST,
    });
    fetch(`http://localhost:59525/api/comment/${recordId}`, {
      credentials: "include",
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({
          data,
          type: Constants.GET_COMMENTS_SUCCESS,
        });
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.GET_COMMENTS_FAIL,
        });
      });
  };
}

export function createComment(
  data: CommentDTO
): ThunkAction<Promise<void>, {}, {}, CommentActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, CommentActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.CREATE_COMMENTS_REQUEST,
    });
    fetch(`http://localhost:59525/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.CREATE_COMMENTS_SUCCESS,
          });
          dispatch(getComments(data.RecordId));
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.CREATE_COMMENTS_FAIL,
        });
      });
  };
}
