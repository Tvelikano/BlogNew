import { IStoreState } from "Types/Store/Index";
import * as accountActions from "Actions/AccountActions";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Nav from "Components/Nav";

function mapStateToProps({ account }: IStoreState) {
  return {
    isAuthenticated: account.isAuthenticated,
    user: account.user,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, accountActions.AccountActions>
) {
  return {
    Logout: () => dispatch(accountActions.Logout()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
