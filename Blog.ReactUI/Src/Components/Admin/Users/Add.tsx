import React from "react";
import UserViewModel from "Types/UserViewModel";
import { Link } from "react-router-dom";

interface IProps {
  AddUser: (data: UserViewModel) => void;
}

export default class Add extends React.Component<IProps> {
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
    <div className="container">
      <h4>Новый пользователь</h4>

      <form className="add" onSubmit={this.handleSubmit}>
        <div className="form-group">
          Имя пользователя:
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
          Пароль:
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
          Подтвердите пароль:
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
        Отмена
      </Link>
    </div>
  );
}