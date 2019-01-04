import { connect } from "react-redux";
import * as actions from "Actions/RecordActions";
import { ThunkDispatch } from "redux-thunk";
import RecordDTO from "Types/RecordDTO";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import Add from "Components/Admin/Records/Add";

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, actions.RecordActions>
) {
  return {
    AddRecord: async (data: RecordDTO) =>
      await dispatch(actions.AddRecord(data)),
  };
}

export default allowOnlyAdmin(
  connect(
    null,
    mapDispatchToProps
  )(Add)
);
