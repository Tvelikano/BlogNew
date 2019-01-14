import * as React from "react";
import { Link } from "react-router-dom";
import UserDTO from "Types/UserDTO";

interface IProps {
  user: UserDTO;
}

export default class Profile extends React.Component<IProps> {
  public render() {
    const { user } = this.props;
    return (
      <div className="container">
        {user && user.Roles && user.Roles.indexOf("Admin") !== -1 ? (
          <>
            <Link className="btn btn-primary m-1" to="/Admin/Records">
              Записи
            </Link>
            <Link className="btn btn-primary m-1" to="/Admin/Users">
              Пользователи
            </Link>
            <Link className="btn btn-primary m-1" to="/Admin/Roles">
              Роли
            </Link>
          </>
        ) : null}
      </div>
    );
  }
}
