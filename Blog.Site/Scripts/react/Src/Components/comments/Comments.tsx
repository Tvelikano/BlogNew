import React from "react";
import CommentDTO from "types/CommentDTO";

interface IProps {
  list: CommentDTO[];
  createComment: (content: string) => void;
}

export default class Comments extends React.Component<IProps, object> {
  private content = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    this.props.createComment(this.content.current!.value);
  };

  public render = () => (
    <>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Leave your comment:</label>

          <input ref={this.content} className="form-control" />
        </div>

        <button className="btn btn-primary">Create</button>
      </form>

      <ul className="list-group list-group-flush">
        {this.props.list.map(item => (
          <li key={item.CommentId} className="list-group-item">
            <div>
              <span className="font-weight-bold">{item.User.UserName}</span>

              <span className="small font-weight-light">
                {new Date(
                  parseInt(/^\/Date\((.*?)\)\/$/.exec(item.CreateDate)[1], 10)
                ).toUTCString()}
              </span>
            </div>

            <div className="font-weight-normal">{item.Content}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
