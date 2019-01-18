import * as React from "react";
import { Link } from "react-router-dom";
import User from "Types/Account/User";
import Weather from "Containers/Weather/Weather";

interface IProps {
  isAuthenticated: boolean;
  user: User;
  Logout: () => void;
}

export default class Nav extends React.Component<IProps> {
  componentDidMount() {
    $("#root").addClass("loaded");
  }

  public render() {
    const { user, isAuthenticated, Logout } = this.props;

    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="navbar-brand">
              Статьи
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Новости
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Информация
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-item nav-link">
              Мероприятия
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-item nav-link">
              Контакты
            </Link>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Weather />
          </li>
          <li className="nav-item">
            {isAuthenticated ? (
              <>
                <Link className="btn btn-primary mr-1" to="/Profile">
                  {user.UserName}
                </Link>
                <a className="btn btn-danger" onClick={Logout}>
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
          </li>
        </ul>
      </nav>
    );
  }
}
