import * as React from "react";
import { Link } from "react-router-dom";
import UserDTO from "Types/UserDTO";

interface IProps {
  isAuthenticated: boolean;
  user: UserDTO;
  Logout: () => void;
  GetUserInfo: () => void;
}

export default class Nav extends React.Component<IProps> {
  componentDidMount() {
    this.props.GetUserInfo();
  }

  public render() {
    const { user, isAuthenticated, Logout } = this.props;
    return (
      <nav className="navbar bg-dark col_white">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Статьи
          </Link>
          <div>
            {isAuthenticated ? (
              <>
                <Link className="btn btn-primary mr-1" to="/Profile">
                  {user.UserName}
                </Link>
                <a className="btn btn-danger" onClick={() => Logout()}>
                  Выйти
                </a>
              </>
            ) : (
              <>
                <Link className="btn btn-primary mr-1" to="/Login">
                  Войти
                </Link>
                <Link className="btn btn-info" to="/Register">
                  Зарегистрироваться
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
