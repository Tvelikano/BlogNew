import { IStoreState } from "Types/Index";
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
    Logout: async () => await dispatch(accountActions.Logout()),

    GetUserInfo: async () => await dispatch(accountActions.GetUserInfo()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
