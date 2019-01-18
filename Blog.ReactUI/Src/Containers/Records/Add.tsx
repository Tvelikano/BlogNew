import { connect } from "react-redux";
import * as actions from "Actions/RecordActions";
import { ThunkDispatch } from "redux-thunk";
import Record from "Types/Records/Record";
import { IStoreState } from "Types/Store/Index";
import Add from "Components/Records/Add";
import { allowOnlyAuthenticated } from "Hocs/AllowOnlyAuthenticated";

function mapStateToProps({ account, records }: IStoreState) {
  return {
    isAuthenticated: account.isAuthenticated,
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

export default allowOnlyAuthenticated(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Add)
);
