import React from "react";
import CommentDTO from "Types/CommentDTO";

interface IProps {
  recordId: number;
  createComment: (data: CommentDTO) => void;
}

export default class AddComment extends React.Component<IProps> {
  private content = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    let comment = new CommentDTO();
    comment.RecordId = this.props.recordId;
    comment.Content = this.content.current!.value;

    this.props.createComment(comment);
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
    </>
  );
}
