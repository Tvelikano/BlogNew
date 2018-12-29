import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "Actions/Constants/Record";
import querystring from "querystring";
import ReturnModelDTO from "Types/ReturnModelDTO";
import RecordDTO from "Types/RecordDTO";
import ListViewModel from "Types/ListViewModel";
import SearchQuery from "Types/SearchQuery";

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

interface IUpdateRecordRequest {
  type: Constants.UPDATE_RECORDS_REQUEST;
}

interface IUpdateRecordSuccess {
  type: Constants.UPDATE_RECORDS_SUCCESS;
}

interface IUpdateRecordFail {
  type: Constants.UPDATE_RECORDS_FAIL;
  data: Error;
}

interface IDeleteRecordRequest {
  type: Constants.DELETE_RECORDS_REQUEST;
}

interface IDeleteRecordSuccess {
  type: Constants.DELETE_RECORDS_SUCCESS;
}

interface IDeleteRecordFail {
  type: Constants.DELETE_RECORDS_FAIL;
  data: Error;
}

interface IShowComments {
  type: Constants.SHOW_COMMENTS;
  data: number;
}

export type RecordActions =
  | IGetRecordsRequest
  | IGetRecordsSuccess
  | IGetRecordsFail
  | IAddRecordRequest
  | IAddRecordSuccess
  | IAddRecordFail
  | IUpdateRecordRequest
  | IUpdateRecordSuccess
  | IUpdateRecordFail
  | IDeleteRecordRequest
  | IDeleteRecordSuccess
  | IDeleteRecordFail
  | IShowComments;

export function GetRecords(
  searchQuery: SearchQuery
): ThunkAction<Promise<void>, {}, {}, RecordActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, RecordActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.GET_RECORDS_REQUEST
    });
    fetch(
      `http://localhost:59525/api/record?${querystring.stringify(searchQuery)}`,
      {
        credentials: "include"
      }
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
    fetch(`http://localhost:59525/api/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      credentials: "include"
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.ADD_RECORDS_SUCCESS
          });
          dispatch(GetRecords(new SearchQuery()));
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.ADD_RECORDS_FAIL
        });
      });
  };
}

export function UpdateRecord(
  data: RecordDTO
): ThunkAction<Promise<void>, {}, {}, RecordActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, RecordActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.UPDATE_RECORDS_REQUEST
    });
    fetch(`http://localhost:59525/api/record`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      credentials: "include"
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.UPDATE_RECORDS_SUCCESS
          });
          dispatch(GetRecords(new SearchQuery()));
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.UPDATE_RECORDS_FAIL
        });
      });
  };
}

export function DeleteRecord(
  id: number
): ThunkAction<Promise<void>, {}, {}, RecordActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, RecordActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.DELETE_RECORDS_REQUEST
    });
    fetch(`http://localhost:59525/api/record`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(id),
      credentials: "include"
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.DELETE_RECORDS_SUCCESS
          });
          dispatch(GetRecords(new SearchQuery()));
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch(ex => {
        dispatch({
          data: new Error(ex),
          type: Constants.DELETE_RECORDS_FAIL
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
