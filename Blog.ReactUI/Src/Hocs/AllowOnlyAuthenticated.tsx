import React from "react";
import { Redirect } from "react-router";
import { IStoreState } from "Types/Index";
import { connect } from "react-redux";

interface IProps {
  isAuthenticated: boolean;
}

export const allowOnlyAuthenticated = <P extends any>(
  WrappedComponent: React.ComponentType<P>
) => {
  class AllowOnlyAuthenticated extends React.Component<P & IProps> {
    render() {
      const { isAuthenticated } = this.props;

      return isAuthenticated ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Redirect to="/Login" />
      );
    }
  }

  return connect(
    mapStateToProps,
    null
  )(AllowOnlyAuthenticated);
};

function mapStateToProps({ account }: IStoreState) {
  return {
    isAuthenticated: account.isAuthenticated,
  };
}
