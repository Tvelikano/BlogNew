import * as React from "react";
import { Link } from "react-router-dom";
import UserDTO from "Types/UserDTO";
import Popup from "Components/Popup";
import toastr from "toastr";

interface IProps {
  isAuthenticated: boolean;
  user: UserDTO;
  Logout: () => void;
  GetUserInfo: () => void;
}

interface IState {
  newRecordsId: number;
}

export default class Nav extends React.Component<IProps, IState> {
  private popup = React.createRef<Popup>();

  constructor(props: IProps) {
    super(props);
    this.state = { newRecordsId: 0 };
  }

  componentDidMount() {
    this.props.GetUserInfo();

    var connection = $.hubConnection("http://localhost:59525/signalr/hubs");
    var recordHub = connection.createHubProxy("recordHub");

    recordHub.on("newRecord", data => {
      this.setState({ newRecordsId: data });

      toastr.options.onShown = function() {
        console.log("hello");
      };
      toastr.info("Are you the 6 fingered man?");

      this.popup.current.show();
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
        <Popup ref={this.popup} id={this.state.newRecordsId} />
      </nav>
    );
  }
}
