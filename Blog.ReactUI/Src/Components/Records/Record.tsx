import * as React from "react";
import Comments from "Components/Comments/Comments";
import ReturnModelDTO from "Types/ReturnModelDTO";
import RecordDTO from "Types/RecordDTO";
import AddComment from "Components/Comments/AddComment";
import CommentDTO from "Types/CommentDTO";
import { Link } from "react-router-dom";

interface IProps {
  isAuthenticated: boolean;
  model: ReturnModelDTO<RecordDTO>;
  ShowComments: () => void;
  CreateComment: (data: CommentDTO) => void;
}

export default class Record extends React.PureComponent<IProps> {
  public render() {
    const { Model, IsCommentVisible, Info } = this.props.model;
    const { CreateComment, ShowComments, isAuthenticated } = this.props;

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
              {isAuthenticated ? (
                <AddComment
                  recordId={Model.RecordId}
                  СreateComment={(data: CommentDTO) => CreateComment(data)}
                />
              ) : (
                <Link className="btn btn-info" to="/Login">
                  Log In to write comment
                </Link>
              )}
              <Comments list={Model.Comments} />
            </>
          ) : (
            <button
              onClick={() => ShowComments()}
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
