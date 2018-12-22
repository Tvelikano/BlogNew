import { connect } from "react-redux";
import * as actions from "../Actions/RecordActions";
import Add from "../Components/Add";
import { ThunkDispatch } from "redux-thunk";
import RecordDTO from "../Types/RecordDTO";

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
