import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "actions/constants/Record";
import querystring from "querystring";
import ReturnModelDTO from "types/ReturnModelDTO";
import RecordDTO from "types/RecordDTO";
import ListViewModel from "types/ListViewModel";
import SearchQuery from "types/SearchQuery";

interface IAddRecordRequest {
  type: Constants.ADD_RECORDS_REQUEST;
}

interface IAddRecordSuccess {
  type: Constants.ADD_RECORDS_SUCCESS;
}

interface IAddRecordFail {
  type: Constants.ADD_RECORDS_FAIL;
  data: Error;
}

interface IShowComments {
  type: Constants.SHOW_COMMENTS;
  data: number;
}

interface IGetRecordsRequest {
  type: Constants.GET_RECORDS_REQUEST;
}

interface IGetRecordsSuccess {
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  type: Constants.GET_RECORDS_SUCCESS;
}

interface IGetRecordsFail {
  data: Error;
  type: Constants.GET_RECORDS_FAIL;
}

export type RecordActions =
  | IAddRecordRequest
  | IAddRecordSuccess
  | IAddRecordFail
  | IGetRecordsRequest
  | IGetRecordsSuccess
  | IGetRecordsFail
  | IShowComments;

export function GetRecords(searchQuery: SearchQuery
): ThunkAction<Promise<void>, {}, {}, RecordActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, RecordActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.GET_RECORDS_REQUEST
    });
    fetch(
      `api/record?${querystring.stringify(searchQuery)}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch({
          data,
          type: Constants.GET_RECORDS_SUCCESS
        });
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.GET_RECORDS_FAIL
        });
      });
  };
}

export function AddRecord(
  data: RecordDTO
): ThunkAction<Promise<void>, {}, {}, RecordActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, RecordActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.ADD_RECORDS_REQUEST
    });
    fetch(`api/record?${querystring.stringify(data)}`, {
      method: "POST"
    })
      .then(() => {
        dispatch({
          type: Constants.ADD_RECORDS_SUCCESS
        });
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.ADD_RECORDS_FAIL
        });
      });
  };
}

export function ShowComments(id: number): IShowComments {
  return {
    data: id,
    type: Constants.SHOW_COMMENTS
  };
}

export function GetNewsRequest(): IGetRecordsRequest {
  return {
    type: Constants.GET_RECORDS_REQUEST
  };
}

export function GetNewsSuccess(
  data: ListViewModel<ReturnModelDTO<RecordDTO>>
): IGetRecordsSuccess {
  return {
    data,
    type: Constants.GET_RECORDS_SUCCESS
  };
}

export function GetNewsFail(data: Error): IGetRecordsFail {
  return {
    data,
    type: Constants.GET_RECORDS_FAIL
  };
}
