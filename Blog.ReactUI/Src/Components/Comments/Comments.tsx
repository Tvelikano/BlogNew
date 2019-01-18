import React from "react";
import Comment from "Types/Comments/Comment";

interface IProps {
  list: Comment[];
}

export default class Comments extends React.PureComponent<IProps> {
  public render = () => (
    <>
      <ul className="list-group list-group-flush">
        {this.props.list.map(item => (
          <li key={item.CommentId} className="list-group-item">
            <span className="font-weight-bold">{item.User.UserName}</span>

            <span className="small font-weight-light">{item.CreateDate}</span>

            <div className="font-weight-normal">{item.Content}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
