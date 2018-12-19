import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../actions/RecordActions";
import Add from "../components/Add";

function mapDispatchToProps(dispatch: Dispatch<actions.RecordActions>) {
  return {
    addRecord: (data: RecordDTO) => dispatch(actions.addRecord(data))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Add);
