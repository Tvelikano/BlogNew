import * as constants from "../actions/constants/comment";
import { CommentActions } from "../actions/CommentActions";
import { ICommentState } from "../types";

const initialState = {
  data: {
    List: new Array<CommentDTO>(),
    Count: 0,
    Info: {}
  },
  error: "",
  isLoading: false
};

export function commentReducer(
  state: ICommentState = initialState,
  action: CommentActions
) {
  switch (action.type) {
    case constants.GET_COMMENTS_REQUEST:
      return { ...state, isLoading: true, error: "" };
    case constants.GET_COMMENTS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        error: "",
        isLoading: false
      };
    }

    case constants.GET_COMMENTS_FAIL:
      return {
        ...state,
        error: action.data.message,
        isLoading: false
      };
    default:
      return state;
  }
}
