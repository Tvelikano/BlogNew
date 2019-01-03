import React from "react";
import UserDTO from "Types/UserDTO";
import { Redirect } from "react-router";
import { IStoreState } from "Types/Index";
import { connect } from "react-redux";

interface IProps {
  isAuthenticated: boolean;
  user: UserDTO;
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
