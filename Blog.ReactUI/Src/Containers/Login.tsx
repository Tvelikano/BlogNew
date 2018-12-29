import React from "react";
import LoginViewModel from "Types/LoginViewModel";
import { ThunkDispatch } from "redux-thunk";
import * as Actions from "Actions/AccountActions";
import { connect } from "react-redux";

interface IProps {
  login: (data: LoginViewModel) => void;
}

class Login extends React.Component<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private password = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const data = new LoginViewModel();

    data.UserName = this.name.current!.value;
    data.Password = this.password.current!.value;

    this.props.login(data);
  };

  public render = () => (
    <>
      <h2>Log In</h2>
      <hr />
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>User Name</label>
          <input className="form-control" ref={this.name} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" ref={this.password} />
        </div>

        <div className="col-md-10">
          <button className="btn btn-primary">Log In</button>
        </div>
      </form>
    </>
  );
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, Actions.CommentActions>
) {
  return {
    login: async (data: LoginViewModel) => await dispatch(Actions.login(data))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Login);
