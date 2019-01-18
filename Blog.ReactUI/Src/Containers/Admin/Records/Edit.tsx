import { connect } from "react-redux";
import * as actions from "Actions/RecordActions";
import { ThunkDispatch } from "redux-thunk";
import Record from "Types/Records/Record";
import { IStoreState } from "Types/Store/Index";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import Edit from "Components/Admin/Records/Edit";

function mapStateToProps({ records }: IStoreState) {
  return {
    record: records.currentRecord.Model,
    error: records.error,
    isLoading: records.isLoading,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, actions.RecordActions>
) {
  return {
    GetRecord: (id: number) => dispatch(actions.GetRecord(id)),

    UpdateRecord: (data: Record) => dispatch(actions.UpdateRecord(data)),
  };
}

export default allowOnlyAdmin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Edit)
);
