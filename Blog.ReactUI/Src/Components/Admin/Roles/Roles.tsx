import RoleDTO from "Types/RoleDTO";
import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  data: RoleDTO[];
  GetRoles: () => void;
  DeleteRole: (id: number) => void;
}

export default class AdminRoles extends React.Component<IProps> {
  public componentDidMount() {
    this.props.GetRoles();
  }

  public render() {
    const { data, DeleteRole } = this.props;

    return (
      <>
        <Link to="/Admin/Roles/Add" className="btn btn-primary">
          Create New Role
        </Link>

        <table className="table table-striped table-bordered table-hover">
          <tbody>
            <tr>
              <th>Role Id</th>
              <th>Name</th>
              <th />
            </tr>
            {data
              ? data.map(item => (
                  <tr key={item.Id}>
                    <td>{item.Id}</td>
                    <td>{item.Name}</td>
                    <td>
                      <button
                        onClick={() => DeleteRole(item.Id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </>
    );
  }
}