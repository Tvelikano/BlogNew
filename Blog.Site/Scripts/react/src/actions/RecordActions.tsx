import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "./Constants/Record";
import querystring from "querystring";

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

export function GetRecords(
  searchString: string = "",
  page: number = 1
): ThunkAction<Promise<void>, {}, {}, RecordActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, RecordActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.GET_RECORDS_REQUEST
    });
    fetch(
      `Home/GetRecords${
        searchString !== ""
          ? `?searchString=${searchString}` +
            (page !== 1 ? `&page=${page}` : "")
          : page !== 1
          ? `?page=${page}`
          : ""
      }`
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
    fetch(`Home/Create?${querystring.stringify(data)}`, {
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
