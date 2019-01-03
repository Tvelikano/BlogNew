import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as roleActions from "Actions/AdminRolesActions";
import { IStoreState } from "Types/Index";
import RoleDTO from "Types/RoleDTO";
import React from "react";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import { Link } from "react-router-dom";

interface IProps {
  data: RoleDTO[];
  GetRoles: () => void;
  DeleteRole: (id: number) => void;
}

class AdminRoles extends React.Component<IProps> {
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

function mapStateToProps({ roles }: IStoreState) {
  return {
    data: roles.data,
    error: roles.error,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, roleActions.RoleActions>
) {
  return {
    GetRoles: async () => await dispatch(roleActions.GetRoles()),

    DeleteRole: async (id: number) =>
      await dispatch(roleActions.DeleteRole(id)),
  };
}

export default allowOnlyAdmin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminRoles)
);
