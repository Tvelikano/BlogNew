import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as recordActions from "Actions/RecordActions";
import { IStoreState } from "Types/Index";
import RecordDTO from "Types/RecordDTO";
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
    GetRecords: async (searchQuery: SearchQuery) =>
      await dispatch(recordActions.GetRecords(searchQuery)),

    AddRecord: async (data: RecordDTO) =>
      await dispatch(recordActions.AddRecord(data)),

    DeleteRecord: async (id: number) =>
      await dispatch(recordActions.DeleteRecord(id)),
  };
}

export default allowOnlyAdmin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminRecords)
);
