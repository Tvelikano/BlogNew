import * as React from "react";
import { Link } from "react-router-dom";
import { IStoreState } from "Types/Index";
import * as accountActions from "Actions/AccountActions";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import UserDTO from "Types/UserDTO";

interface IProps {
  isAuthenticated: boolean;
  user: UserDTO;
  Logout: () => void;
  GetUserInfo: () => void;
}

class Nav extends React.Component<IProps> {
  componentDidMount() {
    this.props.GetUserInfo();
  }

  public render() {
    const { user, isAuthenticated, Logout } = this.props;
    return (
      <nav className="navbar bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Blog
          </Link>
          {isAuthenticated ? (
            <>
              <div className="text-light">Hello, {user.UserName}</div>
              <button className="btn btn-danger" onClick={() => Logout()}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/Login">Log In</Link>
              <Link to="/Register">Sign Up</Link>
            </>
          )}
          {user && user.Roles && user.Roles.indexOf("Admin") !== -1 ? (
            <>
              <Link to="/Admin/Records">Records</Link>
              <Link to="/Admin/Users">Users</Link>
              <Link to="/Admin/Roles">Roles</Link>
            </>
          ) : null}
        </div>
      </nav>
    );
  }
}

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
