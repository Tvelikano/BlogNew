import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  AddRole: (name: string) => void;
}

export default class Add extends React.PureComponent<IProps> {
  private name = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    this.props.AddRole(this.name.current!.value);
  };

  public render = () => (
    <>
      <h4>Новая роль</h4>

      <form className="add" onSubmit={this.handleSubmit}>
        <div className="form-group">
          Имя роли:
          <div className="col-md-10">
            <input required className="form-control" ref={this.name} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-10">
            <input type="submit" value="Add Role" className="btn btn-primary" />
          </div>
        </div>
      </form>

      <Link to="/Admin/Records" className="btn btn-danger">
        Отмена
      </Link>
    </>
  );
}
