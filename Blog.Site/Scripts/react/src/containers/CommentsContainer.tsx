import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as actions from "../actions/CommentActions";
import { IStoreState, ICommentState } from "../types";
import React from "react";

interface IProps {
  recordId: number;
  data: ReturnListDTO<CommentDTO>;
  count: number;
  getComments: (recordId: number) => void;
  showComments: () => void;
}

class CommentsContainer extends React.Component<IProps, object> {
  public shouldComponentUpdate(nextProps: object, nextState: object) {
    if (this.props.recordId !== (nextProps as IProps).data.Info) return false;
    else return true;
  }

  private showComments: React.ReactEventHandler<HTMLButtonElement> = ev => {
    ev.preventDefault();
    this.props.getComments(this.props.recordId);
  };

  public render() {
    const { List } = this.props.data;
    return (
      <div>
        <button onClick={this.showComments} className="btn btn-primary">{`${
          this.props.count > 0
            ? `Show ${this.props.count} Comments`
            : "Write first comment"
        }`}</button>
        {/* {this.props.recordId === this.props.data.Info ? ( */}
        <ul className="list-group list-group-flush">
          {List.map(item => (
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
        {/* ) : (
          ""
        )} */}
      </div>
    );
  }
}

function mapStateToProps({ comments }: IStoreState) {
  return {
    data: comments.data,
    error: comments.error,
    isLoading: comments.isLoading
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, any>) {
  return {
    getComments: async (recordId: number) =>
      await dispatch(actions.getComments(recordId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsContainer);
