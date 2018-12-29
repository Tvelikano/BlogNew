import * as React from "react";
import Comments from "Components/Comments/Comments";
import ReturnModelDTO from "Types/ReturnModelDTO";
import RecordDTO from "Types/RecordDTO";
import AddComment from "Components/Comments/AddComment";
import CommentDTO from "Types/CommentDTO";

interface IProps {
  model: ReturnModelDTO<RecordDTO>;
  showComments: () => void;
  createComment: (data: CommentDTO) => void;
}

class Record extends React.Component<IProps> {
  public render() {
    const { Model, IsCommentVisible, Info } = this.props.model;
    const { createComment, showComments } = this.props;

    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{Model.Name}</h4>
          <p className="card-text">{Model.Content}</p>
          <div className="float-right text-secondary small">
            {Model.CreateDate}
          </div>
          {IsCommentVisible ? (
            <>
              <AddComment
                recordId={Model.RecordId}
                createComment={(data: CommentDTO) => createComment(data)}
              />
              <Comments list={Model.Comments} />
            </>
          ) : (
            <button
              onClick={() => showComments()}
              className="btn btn-primary"
            >{`${
              Info > 0 ? `Show ${Info} Comments` : "Write first comment"
            }`}</button>
          )}
        </div>
      </div>
    );
  }
}

export default Record;
