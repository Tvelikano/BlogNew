import { connect } from "react-redux";
import * as actions from "actions/RecordActions";
import Add from "components/records/Add";
import { ThunkDispatch } from "redux-thunk";
import RecordDTO from "types/RecordDTO";

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, actions.RecordActions>
) {
  return {
    addRecord: async (data: RecordDTO) =>
      await dispatch(actions.AddRecord(data))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Add);
