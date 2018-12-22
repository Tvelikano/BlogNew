import * as React from "react";
import Comments from "./Comments";
import ReturnModelDTO from "../Types/ReturnModelDTO";

interface IProps {
  model: ReturnModelDTO<RecordDTO>;
  showComments: () => void;
  createComment: (recordId: number, content: string) => void;
}

class Record extends React.Component<IProps, object> {
  private showComments: React.ReactEventHandler<HTMLButtonElement> = ev => {
    ev.preventDefault();
    this.props.showComments();
  };

  public render() {
    const { Model, IsCommentVisible, Info } = this.props.model;
    const { createComment, showComments } = this.props;

    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{Model.Name}</h4>
          <p className="card-text">{Model.Content}</p>
          <div className="float-right text-secondary small">
            {new Date(
              parseInt(/^\/Date\((.*?)\)\/$/.exec(Model.CreateDate)[1], 10)
            ).toUTCString()}
          </div>
          {IsCommentVisible ? (
            <Comments
              list={Model.Comments}
              createComment={(content: string) => {
                createComment(Model.RecordId, content);
                showComments();
              }}
            />
          ) : (
            <button onClick={this.showComments} className="btn btn-primary">{`${
              Info > 0 ? `Show ${Info} Comments` : "Write first comment"
            }`}</button>
          )}
        </div>
      </div>
    );
  }
}

export default Record;
