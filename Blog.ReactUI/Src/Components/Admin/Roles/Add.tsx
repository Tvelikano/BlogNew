import React from "react";
import { Link } from "react-router-dom";
import ModelState from "Types/ModelState";
import ModelErrors from "Components/ModelErrors";

interface IProps {
  error: ModelState;
  AddRole: (name: string) => void;
}

export default class Add extends React.PureComponent<IProps> {
  private name = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    this.props.AddRole(this.name.current!.value);
  };

  public render() {
    const { error } = this.props;

    return (
      <div className="container pt-2">
        <h4>Новая роль</h4>
        <hr />
        <ModelErrors error={error} />

        <form className="add" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="roleName">Имя роли</label>

            <input
              required
              id="roleName"
              aria-describedby="roleNameHelp"
              placeholder="Введите имя"
              className="form-control"
              ref={this.name}
            />

            <small id="roleNameHelp" className="form-text text-muted">
              Имя роли должно быть уникальным
            </small>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Добавить роль"
              className="btn btn-primary"
            />
          </div>

          <div className="form-group">
            <Link to="/Admin/Roles" className="btn btn-danger">
              Отмена
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
