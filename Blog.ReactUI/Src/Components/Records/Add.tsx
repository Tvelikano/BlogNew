import Record from "Types/Records/Record";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import ModelState from "Types/ModelState";
import ModelErrors from "Components/ModelErrors";

interface IProps {
  isAuthenticated: boolean;
  error: ModelState;
  AddRecord: (data: Record) => void;
}

export default class Add extends React.Component<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private content = React.createRef<HTMLTextAreaElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const data = new Record();
    data.Name = this.name.current!.value;
    data.Content = this.content.current!.value;

    this.props.AddRecord(data);
  };

  public render() {
    const { error } = this.props;
    return (
      <div className="container">
        <h4>Предложить новость</h4>
        <hr />
        <ModelErrors error={error} />

        <form className="add" onSubmit={this.handleSubmit}>
          <div className="form-group">
            Заголовок новости:
            <div className="col-md-10">
              <input required className="form-control" ref={this.name} />
            </div>
          </div>

          <div className="form-group">
            Основная часть:
            <div className="col-md-10">
              <textarea required className="form-control" ref={this.content} />
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-10">
              <input
                type="submit"
                value="Отправить"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>

        <Link to="/" className="btn btn-danger">
          Отмена
        </Link>
      </div>
    );
  }
}
