import { ThunkAction, ThunkDispatch } from "redux-thunk";
import * as Constants from "Actions/Constants/Record";
import querystring from "querystring";
import ReturnModel from "Types/ReturnModel";
import Record from "Types/Records/Record";
import ListViewModel from "Types/ListViewModel";
import SearchQuery from "Types/SearchQuery";
import ModelState from "Types/ModelState";

interface IGetRecordsRequest {
  type: Constants.GET_RECORDS_REQUEST;
}

interface IGetRecordsSuccess {
  type: Constants.GET_RECORDS_SUCCESS;
  data: ListViewModel<ReturnModel<Record>>;
}

interface IGetRecordsFail {
  type: Constants.GET_RECORDS_FAIL;
  data: ModelState;
}

interface IGetRecordRequest {
  type: Constants.GET_RECORD_REQUEST;
}

interface IGetRecordSuccess {
  type: Constants.GET_RECORD_SUCCESS;
  data: ReturnModel<Record>;
}

interface IGetRecordFail {
  type: Constants.GET_RECORD_FAIL;
  data: ModelState;
}

interface IAddRecordRequest {
  type: Constants.ADD_RECORDS_REQUEST;
}

interface IAddRecordSuccess {
  type: Constants.ADD_RECORDS_SUCCESS;
}

interface IAddRecordFail {
  type: Constants.ADD_RECORDS_FAIL;
  data: ModelState;
}

interface IUpdateRecordRequest {
  type: Constants.UPDATE_RECORDS_REQUEST;
}

interface IUpdateRecordSuccess {
  type: Constants.UPDATE_RECORDS_SUCCESS;
}

interface IUpdateRecordFail {
  type: Constants.UPDATE_RECORDS_FAIL;
  data: ModelState;
}

interface IDeleteRecordRequest {
  type: Constants.DELETE_RECORDS_REQUEST;
}

interface IDeleteRecordSuccess {
  type: Constants.DELETE_RECORDS_SUCCESS;
}

interface IDeleteRecordFail {
  type: Constants.DELETE_RECORDS_FAIL;
  data: ModelState;
}

interface IShowComments {
  type: Constants.SHOW_COMMENTS;
  data: number;
}

export type RecordActions =
  | IGetRecordsRequest
  | IGetRecordsSuccess
  | IGetRecordsFail
  | IGetRecordRequest
  | IGetRecordSuccess
  | IGetRecordFail
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
      type: Constants.GET_RECORDS_REQUEST,
    });
    fetch(
      `http://localhost:59525/api/record?${querystring.stringify(searchQuery)}`,
      {
        credentials: "include",
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(data => {
        dispatch({
          data,
          type: Constants.GET_RECORDS_SUCCESS,
        });
      })
      .catch(ex => {
        dispatch({
          data: new ModelState(),
          type: Constants.GET_RECORDS_FAIL,
        });
      });
  };
}

export function GetRecord(
  id: number
): ThunkAction<Promise<void>, {}, {}, RecordActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, RecordActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.GET_RECORD_REQUEST,
    });
    fetch(`http://localhost:59525/api/record/${id}`, {
      credentials: "include",
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(data => {
        dispatch({
          data,
          type: Constants.GET_RECORD_SUCCESS,
        });
      })
      .catch(ex => {
        dispatch({
          data: new ModelState(),
          type: Constants.GET_RECORD_FAIL,
        });
      });
  };
}

export function AddRecord(
  data: Record
): ThunkAction<Promise<void>, {}, {}, RecordActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, RecordActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.ADD_RECORDS_REQUEST,
    });
    fetch(`http://localhost:59525/api/record`, {
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
            type: Constants.ADD_RECORDS_SUCCESS,
          });
        } else {
          return response.json();
        }
      })
      .then(error => {
        dispatch({
          data: error,
          type: Constants.ADD_RECORDS_FAIL,
        });
      })
      .catch(ex => {
        dispatch({
          type: Constants.ADD_RECORDS_FAIL,
          data: new ModelState(),
        });
      });
  };
}

export function UpdateRecord(
  data: Record
): ThunkAction<Promise<void>, {}, {}, RecordActions> {
  return async (
    dispatch: ThunkDispatch<{}, {}, RecordActions>
  ): Promise<void> => {
    dispatch({
      type: Constants.UPDATE_RECORDS_REQUEST,
    });
    fetch(`http://localhost:59525/api/record`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.UPDATE_RECORDS_SUCCESS,
          });
          dispatch(GetRecords(new SearchQuery()));
        } else {
          return response.json();
        }
      })
      .then(error => {
        dispatch({
          data: error,
          type: Constants.UPDATE_RECORDS_FAIL,
        });
      })
      .catch(ex => {
        dispatch({
          data: new ModelState(),
          type: Constants.UPDATE_RECORDS_FAIL,
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
      type: Constants.DELETE_RECORDS_REQUEST,
    });
    fetch(`http://localhost:59525/api/record`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
      credentials: "include",
    })
      .then(response => {
        if (response.ok) {
          dispatch({
            type: Constants.DELETE_RECORDS_SUCCESS,
          });
          dispatch(GetRecords(new SearchQuery()));
        } else {
          return response.json();
        }
      })
      .then(error => {
        dispatch({
          data: error,
          type: Constants.DELETE_RECORDS_FAIL,
        });
      })
      .catch(ex => {
        dispatch({
          data: new ModelState(),
          type: Constants.DELETE_RECORDS_FAIL,
        });
      });
  };
}
