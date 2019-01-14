import RecordDTO from "Types/RecordDTO";
import React from "react";
import { Link, Redirect } from "react-router-dom";

interface IProps {
  isAuthenticated: boolean;
  AddRecord: (data: RecordDTO) => void;
}

export default class Add extends React.Component<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private content = React.createRef<HTMLTextAreaElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const data = new RecordDTO();
    data.Name = this.name.current!.value;
    data.Content = this.content.current!.value;

    this.props.AddRecord(data);
  };

  public render = () => (
    <div className="container">
      {this.props.isAuthenticated ? (
        <>
          <h4>Предложить новость</h4>

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
                <textarea
                  required
                  className="form-control"
                  ref={this.content}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-10">
                <input type="submit" value="Post" className="btn btn-primary" />
              </div>
            </div>
          </form>

          <Link to="/" className="btn btn-danger">
            Отмена
          </Link>
        </>
      ) : (
        <Redirect to="Login" />
      )}
    </div>
  );
}
