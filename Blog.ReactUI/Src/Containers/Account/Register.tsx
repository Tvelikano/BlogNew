import RegisterViewModel from "Types/Account/RegisterViewModel";
import { ThunkDispatch } from "redux-thunk";
import * as Actions from "Actions/AccountActions";
import { connect } from "react-redux";
import Register from "Components/Account/Register";

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, Actions.AccountActions>
) {
  return {
    Register: async (data: RegisterViewModel) =>
      await dispatch(Actions.Register(data)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Register);
