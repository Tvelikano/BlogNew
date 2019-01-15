import * as React from "react";
import Comments from "Components/Comments/Comments";
import ReturnModelDTO from "Types/ReturnModelDTO";
import RecordDTO from "Types/RecordDTO";
import AddComment from "Components/Comments/AddComment";
import CommentDTO from "Types/CommentDTO";
import { Link } from "react-router-dom";

interface IProps {
  isAuthenticated: boolean;
  currentRecord: ReturnModelDTO<RecordDTO>;
  error: string;
  isLoading: boolean;
  isCommentsLoading: boolean;

  match: {
    params: {
      id: number;
    };
  };

  GetRecord: (id: number) => void;
  GetComments: (id: number) => void;
  CreateComment: (data: CommentDTO) => void;
}

export default class RecordFull extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.GetRecord(this.props.match.params.id);
  }

  public render() {
    const {
      currentRecord,
      CreateComment,
      isLoading,
      GetComments,
      isAuthenticated,
    } = this.props;

    return (
      <div className="container card mb-3 mt-3">
        <div className="card-body">
          {this.props.currentRecord &&
          this.props.currentRecord.Model &&
          !isLoading ? (
            <div>
              <h4 className="card-title">{currentRecord.Model.Name}</h4>
              <p className="card-text pb-3">{currentRecord.Model.Content}</p>
              <div className="float-right text-secondary small">
                {currentRecord.Model.CreateDate}
              </div>
              {currentRecord.IsCommentVisible ? (
                <>
                  {isAuthenticated ? (
                    <AddComment
                      recordId={currentRecord.Model.RecordId}
                      СreateComment={(data: CommentDTO) => CreateComment(data)}
                    />
                  ) : (
                    <Link className="btn btn-info" to="/Login">
                      Войдите что бы прокомментировать запись
                    </Link>
                  )}
                  <Comments list={currentRecord.Model.Comments} />
                </>
              ) : (
                <button
                  onClick={() => GetComments(this.props.match.params.id)}
                  className="btn btn-primary"
                >{`${
                  currentRecord.Info > 0
                    ? `Показать ${currentRecord.Info} комментариев`
                    : "Напишите первый комментарий"
                }`}</button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
