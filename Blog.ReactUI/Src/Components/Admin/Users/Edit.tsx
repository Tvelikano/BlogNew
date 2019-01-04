import React from "react";
import UserViewModel from "Types/UserViewModel";
import { Link } from "react-router-dom";

interface IProps {
  user: UserViewModel;
  match: {
    params: {
      id: number;
    };
  };
  GetUser: (id: number) => void;
  UpdateUser: (data: UserViewModel) => void;
}

export default class Add extends React.Component<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private email = React.createRef<HTMLTextAreaElement>();
  private password = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const { user, UpdateUser } = this.props;

    user.UserName = this.name.current!.value;
    user.Email = this.email.current!.value;
    user.Password = this.password.current!.value;

    UpdateUser(user);
  };

  public componentDidMount() {
    this.props.GetUser(this.props.match.params.id);
  }

  public render = () => (
    <>
      <h4>New User</h4>

      <form className="add" onSubmit={this.handleSubmit}>
        <div className="form-group">
          UserName:
          <div className="col-md-10">
            <input
              required
              className="form-control"
              ref={this.name}
              defaultValue={this.props.user.UserName}
            />
          </div>
        </div>

        <div className="form-group">
          Email:
          <div className="col-md-10">
            <textarea
              required
              className="form-control"
              ref={this.email}
              defaultValue={this.props.user.Email}
            />
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