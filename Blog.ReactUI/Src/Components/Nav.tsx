import * as React from "react";
import { Link } from "react-router-dom";
import UserDTO from "Types/UserDTO";
import Popup from "Components/Popup";

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

    recordHub.on("hello", data => {
      this.setState({ newRecordsId: data });
      this.popup.current.show();
    });

    connection.start();
  }

  public render() {
    const { user, isAuthenticated, Logout } = this.props;
    return (
      <nav className="navbar bg-dark col_white">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Статьи
          </Link>
          <Popup ref={this.popup} id={this.state.newRecordsId} />
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
        </div>
      </nav>
    );
  }
}
