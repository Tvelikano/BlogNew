import * as React from "react";
import { Link } from "react-router-dom";
import RecordDTO from "../Types/RecordDTO";

interface IProps {
  addRecord: (data: RecordDTO) => void;
}

export default class Add extends React.Component<IProps, object> {
  private name = React.createRef<HTMLInputElement>();
  private content = React.createRef<HTMLTextAreaElement>();

  public render = () => (
    <>
      <h4>New Record</h4>

      <form className="add" onSubmit={this.handleSubmit}>
        <div className="form-group">
          Name:
          <div className="col-md-10">
            <input required className="form-control" ref={this.name} />
          </div>
        </div>

        <div className="form-group">
          Content:
          <div className="col-md-10">
            <textarea required className="form-control" ref={this.content} />
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-10">
            <input type="submit" value="Post" className="btn btn-primary" />
          </div>
        </div>
      </form>

      <Link to="/" className="btn btn-danger">
        Cancel
      </Link>
    </>
  );

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const data = new RecordDTO();
    data.Name = this.name.current!.value;
    data.Content = this.content.current!.value;

    this.props.addRecord(data);
  };
}
