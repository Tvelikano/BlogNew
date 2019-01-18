import * as React from "react";
import Comments from "Components/Comments/Comments";
import ReturnModel from "Types/ReturnModel";
import Record from "Types/Records/Record";
import Add from "Components/Comments/Add";
import Comment from "Types/Comments/Comment";
import { Link } from "react-router-dom";

interface IProps {
  isAuthenticated: boolean;
  model: ReturnModel<Record>;
  GetComments: () => void;
  CreateComment: (data: Comment) => void;
}

export default class RecordLess extends React.PureComponent<IProps> {
  public render() {
    const { Model, IsCommentVisible, Info } = this.props.model;
    const { CreateComment, GetComments, isAuthenticated } = this.props;

    return (
      <div className="container card mb-3">
        <div className="card-body">
          <Link to={`Record/${Model.RecordId}`}>
            <h4 className="card-title">{Model.Name}</h4>
          </Link>
          <p className="card-text pb-3 text-muted text-truncate">
            {Model.Content}
          </p>
          <div className="float-right text-secondary small">
            {Model.CreateDate}
          </div>
          {IsCommentVisible ? (
            <>
              {isAuthenticated ? (
                <Add
                  recordId={Model.RecordId}
                  СreateComment={(data: Comment) => CreateComment(data)}
                />
              ) : (
                <Link className="btn btn-info" to="/Login">
                  Войдите что бы прокомментировать запись
                </Link>
              )}
              <Comments list={Model.Comments} />
            </>
          ) : (
            <button onClick={GetComments} className="btn btn-primary">{`${
              Info > 0
                ? `Показать ${Info} комментариев`
                : "Напишите первый комментарий"
            }`}</button>
          )}
        </div>
      </div>
    );
  }
}
