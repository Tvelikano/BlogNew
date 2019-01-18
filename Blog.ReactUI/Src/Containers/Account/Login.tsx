import LoginViewModel from "Types/Account/LoginViewModel";
import { ThunkDispatch } from "redux-thunk";
import * as Actions from "Actions/AccountActions";
import { connect } from "react-redux";
import { IStoreState } from "Types/Store/Index";
import Login from "Components/Account/Login";

function mapStateToProps({ account }: IStoreState) {
  return {
    error: account.error,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, Actions.AccountActions>
) {
  return {
    Login: (data: LoginViewModel) => dispatch(Actions.Login(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
