import * as constants from "../actions/constants/record";
import { RecordActions } from "../actions/RecordActions";
import { IRecordState } from "../types";

const initialState = {
  data: {
    List: new Array<ReturnModelDTO<RecordDTO>>(),
    PageInfo: {
      TotalItems: 0,
      ItemsPerPage: 1,
      CurrentPage: 1,
      TotalPages: 0
    },
    SearchString: ""
  },
  error: "",
  isLoading: false
};

export function recordReducer(
  state: IRecordState = initialState,
  action: RecordActions
) {
  switch (action.type) {
    case constants.GET_RECORDS_REQUEST:
      return { ...state, isLoading: true, error: "" };

    case constants.GET_RECORDS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        error: "",
        isLoading: false
      };
    }

    case constants.GET_RECORDS_FAIL:
      return {
        ...state,
        error: action.data.message,
        isLoading: false
      };

    case constants.SHOW_COMMENTS:
      return {
        ...state,
        data: state.data.List.map(item =>
          item.Model.RecordId === action.id ? { ...item, visible: true } : item
        )
      };

    case constants.ADD_RECORD:
      return {
        ...state,
        data: [...state.data.List, action.data]
      };

    case constants.DELETE_RECORD:
      return {
        ...state,
        data: state.data.List.filter(item => item.Model.RecordId !== action.id)
      };

    // case constants.EDIT_RECORD:
    // 	return {
    // 		...state,
    // 		data: state.data.List.map(item =>
    // 			item.Model.RecordId === action.id ? { ...item, isEditing: !item.isEditing } : item,
    // 		),
    // 	};

    // case constants.UPDATE_RECORD:
    // 	return {
    // 		...state,
    // 		data: state.data.map(item =>
    // 			item.id === action.id
    // 				? {
    // 						...item,
    // 						author: action.data.author,
    // 						bigText: action.data.bigText,
    // 						isEditing: !item.isEditing,
    // 						text: action.data.text,
    // 				  }
    // 				: item,
    // 		),
    // 	};

    default:
      return state;
  }
}
