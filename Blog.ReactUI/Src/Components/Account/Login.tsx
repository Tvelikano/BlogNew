import React from "react";
import LoginViewModel from "Types/Account/LoginViewModel";
import { Redirect } from "react-router-dom";

interface IProps {
  isAuthenticated: boolean;
  Login: (data: LoginViewModel) => void;
}

export default class Login extends React.Component<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private password = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const data = new LoginViewModel();

    data.UserName = this.name.current!.value;
    data.Password = this.password.current!.value;

    this.props.Login(data);
  };

  public render = () => (
    <div className="container">
      {!this.props.isAuthenticated ? (
        <>
          <h2>Вход</h2>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Имя пользователя</label>
              <input className="form-control" ref={this.name} />
            </div>

            <div className="form-group">
              <label>Пароль</label>
              <input
                type="password"
                className="form-control"
                ref={this.password}
              />
            </div>

            <div className="col-md-10">
              <button className="btn btn-primary">Войти</button>
            </div>
          </form>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}
