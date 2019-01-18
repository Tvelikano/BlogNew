import React from "react";
import UserViewModel from "Types/Account/UserViewModel";
import { Link } from "react-router-dom";
import ModelErrors from "Components/ModelErrors";
import ModelState from "Types/ModelState";

interface IProps {
  error: ModelState;
  AddUser: (data: UserViewModel) => void;
}

export default class Add extends React.Component<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private email = React.createRef<HTMLInputElement>();
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

  public render() {
    const { error } = this.props;

    return (
      <div className="container pt-2">
        <h4>Новый пользователь</h4>
        <hr />
        <ModelErrors error={error} />

        <form className="add" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Имя пользователя</label>

            <input
              required
              id="userName"
              aria-describedby="userNameHelp"
              placeholder="Введите имя"
              className="form-control"
              ref={this.name}
            />

            <small id="userNameHelp" className="form-text text-muted">
              Имя пользователя должно быть уникальным
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="userEmail">Email</label>

            <input
              required
              id="userEmail"
              aria-describedby="userEmailHelp"
              placeholder="Введите Email"
              className="form-control"
              ref={this.email}
            />

            <small id="userEmaileHelp" className="form-text text-muted">
              Email должен быть уникальным
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="userPassword">Пароль</label>

            <input
              type="password"
              required
              id="userPassword"
              aria-describedby="userPasswordHelp"
              placeholder="Введите пароль"
              className="form-control"
              ref={this.password}
            />

            <small id="userPasswordHelp" className="form-text text-muted">
              Пароль должен содержать как минимум 6 символов
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="userConfirmPassword">Подтвердите пароль</label>

            <input
              type="password"
              required
              id="userConfirmPassword"
              aria-describedby="userConfirmPasswordHelp"
              placeholder="Повторите пароль"
              className="form-control"
              ref={this.passwordConfirm}
            />

            <small
              id="userConfirmPasswordHelp"
              className="form-text text-muted"
            >
              Пароли должны совпадать
            </small>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Добавить пользователя"
              className="btn btn-primary"
            />
          </div>
        </form>

        <div className="form-group">
          <Link to="/Admin/Users" className="btn btn-danger">
            Отмена
          </Link>
        </div>
      </div>
    );
  }
}
