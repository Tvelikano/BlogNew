import React from "react";
import RegisterViewModel from "Types/RegisterViewModel";
import { ThunkDispatch } from "redux-thunk";
import * as Actions from "Actions/AccountActions";
import { connect } from "react-redux";

interface IProps {
  register: (data: RegisterViewModel) => void;
}

class Register extends React.Component<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private email = React.createRef<HTMLInputElement>();
  private password = React.createRef<HTMLInputElement>();
  private passwordConfirm = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const data = new RegisterViewModel();

    data.UserName = this.name.current!.value;
    data.Email = this.email.current!.value;
    data.Password = this.password.current!.value;
    data.PasswordConfirm = this.passwordConfirm.current!.value;

    this.props.register(data);
  };

  public render = () => (
    <>
      <h2>Register</h2>
      <hr />
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>User Name</label>
          <input required className="form-control" ref={this.name} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input required className="form-control" ref={this.email} />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            required
            type="password"
            className="form-control"
            ref={this.password}
          />
        </div>

        <div className="form-group">
          <label>Password Confirm</label>
          <input
            required
            type="password"
            className="form-control"
            ref={this.passwordConfirm}
          />
        </div>

        <div className="col-md-10">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </>
  );
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, Actions.CommentActions>
) {
  return {
    register: async (data: RegisterViewModel) =>
      await dispatch(Actions.register(data)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Register);
