import Role from "Types/Account/Role";
import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  data: Role[];
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
      <div className="container">
        <Link to="/Admin/Roles/Add" className="btn btn-primary mt-2 mb-2">
          Создать новую роль
        </Link>

        <table className="table table-striped table-bordered table-hover">
          <tbody>
            <tr>
              <th>ID роли</th>
              <th>Имя</th>
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
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}
