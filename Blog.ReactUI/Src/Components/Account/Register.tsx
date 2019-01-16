import React from "react";
import RegisterViewModel from "Types/Account/RegisterViewModel";

interface IProps {
  Register: (data: RegisterViewModel) => void;
}

export default class Register extends React.Component<IProps> {
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

    this.props.Register(data);
  };

  public render = () => (
    <div className="container">
      <h2>Регистрация</h2>
      <hr />
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Имя пользователя</label>
          <input required className="form-control" ref={this.name} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input required className="form-control" ref={this.email} />
        </div>

        <div className="form-group">
          <label>Пароль</label>
          <input
            required
            type="password"
            className="form-control"
            ref={this.password}
          />
        </div>

        <div className="form-group">
          <label>Подтвердите пароль</label>
          <input
            required
            type="password"
            className="form-control"
            ref={this.passwordConfirm}
          />
        </div>

        <div className="col-md-10">
          <button className="btn btn-primary">Зарегистрироваться</button>
        </div>
      </form>
    </div>
  );
}
