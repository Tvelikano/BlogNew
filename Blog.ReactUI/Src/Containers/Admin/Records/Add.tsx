import { connect } from "react-redux";
import * as actions from "Actions/RecordActions";
import { ThunkDispatch } from "redux-thunk";
import Record from "Types/Records/Record";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import Add from "Components/Admin/Records/Add";
import { IStoreState } from "Types/Store/Index";

function mapStateToProps({ records }: IStoreState) {
  return {
    error: records.error,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, actions.RecordActions>
) {
  return {
    AddRecord: (data: Record) => dispatch(actions.AddRecord(data)),
  };
}

export default allowOnlyAdmin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Add)
);
