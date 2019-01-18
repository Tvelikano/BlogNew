import React from "react";
import UserViewModel from "Types/Account/UserViewModel";
import { Link } from "react-router-dom";
import ModelState from "Types/ModelState";
import ModelErrors from "Components/ModelErrors";

interface IProps {
  user: UserViewModel;
  match: {
    params: {
      id: number;
    };
  };
  error: ModelState;
  GetUser: (id: number) => void;
  UpdateUser: (data: UserViewModel) => void;
}

export default class Add extends React.Component<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private email = React.createRef<HTMLTextAreaElement>();
  private password = React.createRef<HTMLInputElement>();
  private passwordConfirm = React.createRef<HTMLInputElement>();

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

  public render() {
    const { error, user } = this.props;

    return (
      <div className="container">
        <h4>Редактировать пользователя</h4>
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
              defaultValue={user.UserName}
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
              defaultValue={user.Email}
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
            <input type="submit" value="Изменить" className="btn btn-primary" />
          </div>

          <div className="form-group">
            <Link to="/Admin/Users" className="btn btn-danger">
              Отмена
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
