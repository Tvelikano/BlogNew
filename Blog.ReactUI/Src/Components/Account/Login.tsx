import React from "react";
import LoginViewModel from "Types/Account/LoginViewModel";
import LoginError from "Types/Account/LoginError";

interface IProps {
  error: LoginError;
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

  public render() {
    const { error } = this.props;
    return (
      <div className="container">
        <h2>Вход</h2>
        <hr />
        {error ? (
          <p className="text-danger">{error.error_description}</p>
        ) : null}

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Имя пользователя</label>

            <input
              required
              id="userName"
              placeholder="Введите имя"
              className="form-control"
              ref={this.name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="userPassword">Пароль</label>

            <input
              type="password"
              required
              id="userPassword"
              placeholder="Введите пароль"
              className="form-control"
              ref={this.password}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Войти</button>
          </div>
        </form>
      </div>
    );
  }
}
