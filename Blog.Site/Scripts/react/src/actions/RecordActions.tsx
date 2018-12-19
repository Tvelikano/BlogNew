import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "./constants/record";

export interface IShowComments {
  type: Constants.SHOW_COMMENTS;
  id: number;
}

export interface IAddRecord {
  type: Constants.ADD_RECORD;
  data: RecordDTO;
}

export interface IDeleteRecord {
  type: Constants.DELETE_RECORD;
  id: number;
}

export interface IEditRecord {
  type: Constants.EDIT_RECORD;
  id: number;
}

export interface IUpdateRecord {
  type: Constants.UPDATE_RECORD;
  id: number;
  data: RecordDTO;
}

export interface IGetRecordsRequest {
  type: Constants.GET_RECORDS_REQUEST;
}

export interface IGetRecordsSuccess {
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  type: Constants.GET_RECORDS_SUCCESS;
}

export interface IGetRecordsFail {
  data: Error;
  type: Constants.GET_RECORDS_FAIL;
}

export type RecordActions =
  | IShowComments
  | IAddRecord
  | IDeleteRecord
  | IEditRecord
  | IUpdateRecord
  | IGetRecordsRequest
  | IGetRecordsSuccess
  | IGetRecordsFail;

export function getRecords(
  searchString: string = "",
  page: number = 1
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({
      type: Constants.GET_RECORDS_REQUEST
    });
    fetch(
      `http://localhost:62051/Home/GetRecords${
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

export function showComments(id: number): IShowComments {
  return {
    id,
    type: Constants.SHOW_COMMENTS
  };
}

export function addRecord(data: RecordDTO): IAddRecord {
  return {
    data,
    type: Constants.ADD_RECORD
  };
}

export function deleteRecord(id: number): IDeleteRecord {
  return {
    id,
    type: Constants.DELETE_RECORD
  };
}

export function editRecord(id: number): IEditRecord {
  return {
    id,
    type: Constants.EDIT_RECORD
  };
}

export function updateRecord(id: number, data: RecordDTO): IUpdateRecord {
  return {
    data,
    id,
    type: Constants.UPDATE_RECORD
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
