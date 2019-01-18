import React from "react";
import Comment from "Types/Comments/Comment";

interface IProps {
  recordId: number;
  СreateComment: (data: Comment) => void;
}

export default class Add extends React.PureComponent<IProps> {
  private content = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    let comment = new Comment();
    comment.RecordId = this.props.recordId;
    comment.Content = this.content.current!.value;

    this.props.СreateComment(comment);
  };

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Оставьте свой комментарий:</label>

          <input ref={this.content} className="form-control" />
        </div>

        <button className="btn btn-primary">Отправить</button>
      </form>
    );
  }
}
