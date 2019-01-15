import * as React from "react";
import { Link } from "react-router-dom";
import UserDTO from "Types/UserDTO";
import { toast } from "react-toastify";

interface IProps {
  isAuthenticated: boolean;
  user: UserDTO;
  Logout: () => void;
  GetUserInfo: () => void;
}
export default class Nav extends React.Component<IProps> {
  componentDidMount() {
    this.props.GetUserInfo();

    var connection = $.hubConnection("http://localhost:59525/signalr/hubs");
    var recordHub = connection.createHubProxy("recordHub");

    recordHub.on("newRecord", recordId => {
      toast(
        <Link to={`/Record/${recordId}`} className="navbar-brand">
          Новая запись
        </Link>
      );
    });

    connection.start();
  }

  public render() {
    const { user, isAuthenticated, Logout } = this.props;
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark ">
        <ul className="navbar-nav mr-auto">
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
          <li className="nav-item">
            <Link to="/" className="nav-item nav-link">
              О нас
            </Link>
          </li>
        </ul>
        <div>
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
        </div>
      </nav>
    );
  }
}
