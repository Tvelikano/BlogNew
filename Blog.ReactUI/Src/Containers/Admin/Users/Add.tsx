import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as userActions from "Actions/AdminUsersActions";
import React from "react";
import UserViewModel from "Types/UserViewModel";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import { Link } from "react-router-dom";

interface IProps {
  AddUser: (data: UserViewModel) => void;
}

class Add extends React.Component<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private email = React.createRef<HTMLTextAreaElement>();
  private password = React.createRef<HTMLInputElement>();
  private passwordConfirm = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const data = new UserViewModel();
    data.UserName = this.name.current!.value;
    data.Email = this.email.current!.value;
    data.Password = this.password.current!.value;
    data.PasswordConfirm = this.passwordConfirm.current!.value;

    this.props.AddUser(data);
  };

  public render = () => (
    <>
      <h4>New User</h4>

      <form className="add" onSubmit={this.handleSubmit}>
        <div className="form-group">
          UserName:
          <div className="col-md-10">
            <input required className="form-control" ref={this.name} />
          </div>
        </div>

        <div className="form-group">
          Email:
          <div className="col-md-10">
            <textarea required className="form-control" ref={this.email} />
          </div>
        </div>

        <div className="form-group">
          Password:
          <div className="col-md-10">
            <input
              type="password"
              required
              className="form-control"
              ref={this.password}
            />
          </div>
        </div>

        <div className="form-group">
          Confirm Password:
          <div className="col-md-10">
            <input
              type="password"
              required
              className="form-control"
              ref={this.passwordConfirm}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-10">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>

      <Link to="/Admin/Users" className="btn btn-danger">
        Cancel
      </Link>
    </>
  );
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, userActions.UserActions>
) {
  return {
    AddUser: async (data: UserViewModel) =>
      await dispatch(userActions.AddUser(data)),
  };
}

export default allowOnlyAdmin(
  connect(
    null,
    mapDispatchToProps
  )(Add)
);
