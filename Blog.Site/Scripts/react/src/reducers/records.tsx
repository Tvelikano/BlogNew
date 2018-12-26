import * as recordConstants from "actions/constants/Record";
import * as commentConstants from "actions/constants/Comment";
import { RecordActions } from "actions/RecordActions";
import { IRecordState } from "types/Index";
import { CommentActions } from "actions/CommentActions";
import ReturnModelDTO from "types/ReturnModelDTO";
import RecordDTO from "types/RecordDTO";
import ListViewModel from "types/ListViewModel";

const initialState: IRecordState = {
  data: new ListViewModel<ReturnModelDTO<RecordDTO>>(),
  error: "",
  isLoading: false,
  isCommentsLoading: false
};

export default function recordReducer(
  state: IRecordState = initialState,
  action: RecordActions | CommentActions
) {
  switch (action.type) {
    case recordConstants.GET_RECORDS_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case recordConstants.GET_RECORDS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        error: "",
        isLoading: false
      };
    }

    case recordConstants.GET_RECORDS_FAIL:
      return {
        ...state,
        error: action.data.message,
        isLoading: false
      };

    case recordConstants.ADD_RECORDS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: ""
      };

    case recordConstants.ADD_RECORDS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: ""
      };
    }

    case recordConstants.ADD_RECORDS_FAIL:
      return {
        ...state,
        error: action.data.message,
        isLoading: false
      };

    case recordConstants.SHOW_COMMENTS:
      return {
        ...state,
        data: {
          ...state.data,
          List: state.data.List.map(item =>
            item.Model.RecordId === action.data
              ? {
                  ...item,
                  IsCommentVisible: true
                }
              : item
          )
        }
      };

    case commentConstants.GET_COMMENTS_SUCCESS:
      return {
        data: {
          ...state.data,
          List: state.data.List.map(item =>
            item.Model.RecordId === action.data.Info
              ? {
                  ...item,
                  Model: { ...item.Model, Comments: action.data.List }
                }
              : item
          )
        },
        error: "",
        isCommentsLoading: false
      };

    case commentConstants.GET_COMMENTS_FAIL:
      return {
        ...state,
        error: action.data.message,
        isCommentsLoading: false
      };

    case commentConstants.CREATE_COMMENTS_REQUEST:
      return { ...state, isCommentsLoading: true, error: "" };

    case commentConstants.CREATE_COMMENTS_SUCCESS: {
      return {
        ...state,
        error: "",
        isCommentsLoading: false
      };
    }

    case commentConstants.CREATE_COMMENTS_FAIL:
      return {
        ...state,
        error: action.data.message,
        isCommentsLoading: false
      };

    default:
      return state;
  }
}
