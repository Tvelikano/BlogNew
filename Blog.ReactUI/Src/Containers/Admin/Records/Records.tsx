import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as recordActions from "Actions/RecordActions";
import { IStoreState } from "Types/Store/Index";
import Record from "Types/Records/Record";
import SearchQuery from "Types/SearchQuery";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import AdminRecords from "Components/Admin/Records/Records";

function mapStateToProps({ records }: IStoreState) {
  return {
    data: records.data,
    error: records.error,
    isLoading: records.isLoading,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, recordActions.RecordActions>
) {
  return {
    GetRecords: (searchQuery: SearchQuery) =>
      dispatch(recordActions.GetRecords(searchQuery)),

    AddRecord: (data: Record) => dispatch(recordActions.AddRecord(data)),

    DeleteRecord: (id: number) => dispatch(recordActions.DeleteRecord(id)),
  };
}

export default allowOnlyAdmin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminRecords)
);
