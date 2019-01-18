import React from "react";
import User from "Types/Account/User";
import { Redirect } from "react-router";
import { IStoreState } from "Types/Store/Index";
import { connect } from "react-redux";

interface IProps {
  isAuthenticated: boolean;
  user: User;
}

export const allowOnlyAdmin = <P extends any>(
  WrappedComponent: React.ComponentType<P>
) => {
  class AllowOnlyAdmin extends React.Component<P & IProps> {
    render() {
      const { isAuthenticated, user } = this.props;

      return isAuthenticated &&
        user &&
        user.Roles &&
        user.Roles.indexOf("Admin") !== -1 ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Redirect to="/Login" />
      );
    }
  }

  return connect(
    mapStateToProps,
    null
  )(AllowOnlyAdmin);
};

function mapStateToProps({ account }: IStoreState) {
  return {
    isAuthenticated: account.isAuthenticated,
    user: account.user,
  };
}
