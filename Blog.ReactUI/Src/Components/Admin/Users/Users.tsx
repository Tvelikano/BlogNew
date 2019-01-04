import ListViewModel from "Types/ListViewModel";
import React from "react";
import queryString from "querystring";
import SearchHelper from "Components/Helpers/SearchHelper";
import PagingHelper from "Components/Helpers/PagingHelper";
import SearchQuery from "Types/SearchQuery";
import UserViewModel from "Types/UserViewModel";
import { Link } from "react-router-dom";

interface IProps {
  data: ListViewModel<UserViewModel>;
  isLoading: boolean;
  location: {
    search: string;
  };
  GetUsers: (searchQuery: SearchQuery) => void;
  DeleteUser: (id: number) => void;
}

export default class AdminUsers extends React.Component<IProps> {
  public componentDidMount() {
    const { location, GetUsers } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    GetUsers(search);
  }

  public componentDidUpdate() {
    const { data, location, isLoading, GetUsers } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    if (
      !isLoading &&
      (search.Page != data.PageInfo.CurrentPage ||
        search.SearchString != data.SearchString)
    ) {
      GetUsers(search);
    }
  }

  public render() {
    const { location, data, DeleteUser } = this.props;

    return (
      <>
        <Link className="btn btn-primary" to="/Admin/Users/Add">
          Create New User
        </Link>

        <SearchHelper />
        {data.List ? (
          <>
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
                        <p key={role}>{role}</p>
                      ))}
                    </td>
                    <td>
                      <Link
                        to={`Users/Edit/${item.Id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => DeleteUser(item.Id)}
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
        ) : null}
      </>
    );
  }
}