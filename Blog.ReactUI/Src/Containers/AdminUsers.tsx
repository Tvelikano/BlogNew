import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as userActions from "Actions/AdminUsersActions";
import { IStoreState } from "Types/Index";
import ListViewModel from "Types/ListViewModel";
import React from "react";
import queryString from "querystring";
import SearchHelper from "Components/Helpers/SearchHelper";
import PagingHelper from "Components/Helpers/PagingHelper";
import SearchQuery from "Types/SearchQuery";
import UserViewModel from "Types/UserViewModel";

interface IProps {
  data: ListViewModel<UserViewModel>;
  isLoading: boolean;
  location: {
    search: string;
  };
  getUsers: (searchQuery: SearchQuery) => void;
  addUser: (data: UserViewModel) => void;
  updateUser: (data: UserViewModel) => void;
  deleteUser: (id: number) => void;
}

class AdminUsers extends React.Component<IProps> {
  public componentDidMount() {
    const { location, getUsers } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    getUsers(search);
  }

  public componentDidUpdate() {
    const { data, location, isLoading, getUsers } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    if (
      !isLoading &&
      (search.Page != data.PageInfo.CurrentPage ||
        search.SearchString != data.SearchString)
    ) {
      getUsers(search);
    }
  }

  private name = React.createRef<HTMLInputElement>();
  private email = React.createRef<HTMLTextAreaElement>();
  private password = React.createRef<HTMLInputElement>();
  private passwordConfirm = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const data = new UserViewModel();
    data.UserName = this.name.current!.value;
    data.Email = this.email.current!.value;
    data.Password = this.password.current!.value;
    data.PasswordConfirm = this.passwordConfirm.current!.value;

    this.props.addUser(data);
  };

  public render() {
    const { location, data, updateUser, deleteUser } = this.props;

    return (
      <>
        <h4>New User</h4>

        <form className="add" onSubmit={this.handleSubmit}>
          <div className="form-group">
            UserName:
            <div className="col-md-10">
              <input required className="form-control" ref={this.name} />
            </div>
          </div>

          <div className="form-group">
            Email:
            <div className="col-md-10">
              <textarea required className="form-control" ref={this.email} />
            </div>
          </div>

          <div className="form-group">
            Password:
            <div className="col-md-10">
              <input
                type="password"
                required
                className="form-control"
                ref={this.password}
              />
            </div>
          </div>

          <div className="form-group">
            Confirm Password:
            <div className="col-md-10">
              <input
                type="password"
                required
                className="form-control"
                ref={this.passwordConfirm}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-10">
              <input type="submit" value="Post" className="btn btn-primary" />
            </div>
          </div>
        </form>

        <SearchHelper />
        <table className="table table-striped table-bordered table-hover">
          <tbody>
            <tr>
              <th>User Id</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Roles</th>
              <th />
            </tr>

            {data.List.map(item => (
              <tr key={item.Id}>
                <td>{item.Id}</td>
                <td>{item.UserName}</td>
                <td>{item.Email}</td>
                <td>
                  {item.Roles.map(role => (
                    <p>{role}</p>
                  ))}
                </td>
                <td>
                  <button
                    onClick={() => updateUser(item)}
                    className="btn btn-primary"
                    value="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(item.Id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <PagingHelper query={location.search} pagingInfo={data.PageInfo} />
      </>
    );
  }
}

function mapStateToProps({ users }: IStoreState) {
  return {
    data: users.data,
    error: users.error,
    isLoading: users.isLoading
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, userActions.UserActions>
) {
  return {
    getUsers: async (searchQuery: SearchQuery) =>
      await dispatch(userActions.GetUsers(searchQuery)),

    addUser: async (data: UserViewModel) =>
      await dispatch(userActions.AddUser(data)),

    updateUser: async (data: UserViewModel) =>
      await dispatch(userActions.UpdateUser(data)),

    deleteUser: async (id: number) => await dispatch(userActions.DeleteUser(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUsers);
