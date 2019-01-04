import { connect } from "react-redux";
import * as actions from "Actions/RecordActions";
import { ThunkDispatch } from "redux-thunk";
import RecordDTO from "Types/RecordDTO";
import { IStoreState } from "Types/Index";
import Add from "Components/Records/Add";

function mapStateToProps({ account }: IStoreState) {
  return {
    isAuthenticated: account.isAuthenticated,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, actions.RecordActions>
) {
  return {
    AddRecord: async (data: RecordDTO) =>
      await dispatch(actions.AddRecord(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);
