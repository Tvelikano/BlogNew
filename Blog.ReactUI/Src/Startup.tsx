import { ThunkDispatch } from "redux-thunk";
import * as accountActions from "Actions/AccountActions";
import { connect } from "react-redux";
import { IStoreState } from "Types/Store/Index";
import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface IProps {
  isLoading: boolean;
  GetUserInfo: () => void;
}

class Startup extends React.Component<IProps> {
  componentDidMount() {
    this.props.GetUserInfo();

    var connection = $.hubConnection("http://localhost:59525/signalr/hubs");
    var recordHub = connection.createHubProxy("recordHub");

    recordHub.on("newRecord", recordId => {
      toast(
        <Link to={`/Record/${recordId}`} className="navbar-brand">
          Новая запись
        </Link>
      );
    });

    connection.start();
  }

  render() {
    return !this.props.isLoading ? this.props.children : null;
  }
}

function mapStateToProps({ account }: IStoreState) {
  return {
    isLoading: account.isLoading,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, accountActions.AccountActions>
) {
  return {
    GetUserInfo: () => dispatch(accountActions.GetUserInfo()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Startup);
