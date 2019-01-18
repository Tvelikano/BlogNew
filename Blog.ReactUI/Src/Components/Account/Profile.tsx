import * as React from "react";
import { Link } from "react-router-dom";
import User from "Types/Account/User";

interface IProps {
  user: User;
}

export default class Profile extends React.Component<IProps> {
  public render() {
    const { user } = this.props;
    return user && user.Roles && user.Roles.indexOf("Admin") !== -1 ? (
      <div className="container pt-1">
        <Link className="btn btn-primary m-1" to="/Admin/Records">
          Записи
        </Link>
        <Link className="btn btn-primary m-1" to="/Admin/Users">
          Пользователи
        </Link>
        <Link className="btn btn-primary m-1" to="/Admin/Roles">
          Роли
        </Link>
      </div>
    ) : null;
  }
}
