import * as recordConstants from "Actions/Constants/Record";
import * as commentConstants from "Actions/Constants/Comment";
import { RecordActions } from "Actions/RecordActions";
import { IRecordState } from "Types/Store/Index";
import { CommentActions } from "Actions/CommentActions";
import ReturnModel from "Types/ReturnModel";
import Record from "Types/Records/Record";
import ListViewModel from "Types/ListViewModel";

const initialState: IRecordState = {
  data: new ListViewModel<ReturnModel<Record>>(),
  currentRecord: new ReturnModel<Record>(),
  error: null,
  isLoading: false,
  isCommentsLoading: false,
};

export default function recordReducer(
  state: IRecordState = initialState,
  action: RecordActions | CommentActions
) {
  switch (action.type) {
    case recordConstants.GET_RECORDS_REQUEST:
      return { ...state, isLoading: true, error: null };

    case recordConstants.GET_RECORDS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        error: null,
        isLoading: false,
      };
    }

    case recordConstants.GET_RECORDS_FAIL:
      return {
        ...state,
        error: action.data,
        isLoading: false,
      };

    case recordConstants.GET_RECORD_REQUEST:
      return { ...state, isLoading: true, error: null };

    case recordConstants.GET_RECORD_SUCCESS: {
      return {
        ...state,
        currentRecord: action.data,
        error: null,
        isLoading: false,
      };
    }

    case recordConstants.GET_RECORD_FAIL:
      return {
        ...state,
        error: action.data,
        isLoading: false,
      };

    case recordConstants.ADD_RECORDS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case recordConstants.ADD_RECORDS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }

    case recordConstants.ADD_RECORDS_FAIL:
      return {
        ...state,
        error: action.data,
        isLoading: false,
      };

    case recordConstants.ADD_RECORDS_REQUEST:
      return {
        ...state,
        isCommentsLoading: true,
        error: null,
      };

    case commentConstants.GET_COMMENTS_SUCCESS:
      let currentRecord =
        state.currentRecord &&
        state.currentRecord.Model &&
        action.data.Info === state.currentRecord.Model.RecordId
          ? Object.assign(state.currentRecord, {
              IsCommentVisible: true,
              Model: Object.assign(state.currentRecord.Model, {
                Comments: action.data.List,
              }),
            })
          : state.currentRecord;

      return {
        ...state,
        currentRecord: currentRecord,
        data: {
          ...state.data,
          List: state.data.List.map(item =>
            item.Model.RecordId === action.data.Info
              ? {
                  ...item,
                  IsCommentVisible: true,
                  Model: { ...item.Model, Comments: action.data.List },
                }
              : item
          ),
        },
        isCommentsLoading: false,
      };

    case commentConstants.GET_COMMENTS_FAIL:
      return {
        ...state,
        error: action.data,
        isCommentsLoading: false,
      };

    case commentConstants.CREATE_COMMENTS_REQUEST:
      return { ...state, isCommentsLoading: true, error: null };

    case commentConstants.CREATE_COMMENTS_SUCCESS: {
      return {
        ...state,
        isCommentsLoading: false,
      };
    }

    case commentConstants.CREATE_COMMENTS_FAIL:
      return {
        ...state,
        error: action.data,
        isCommentsLoading: false,
      };

    default:
      return state;
  }
}
