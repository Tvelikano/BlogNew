import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as roleActions from "Actions/AdminRolesActions";
import { IStoreState } from "Types/Index";
import RoleDTO from "Types/RoleDTO";
import React from "react";

interface IProps {
  data: RoleDTO[];
  isLoading: boolean;
  getRoles: () => void;
  addRole: (naem: string) => void;
  deleteRole: (id: number) => void;
}

class AdminRoles extends React.Component<IProps> {
  private name = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    this.props.addRole(this.name.current!.value);
  };

  public componentDidMount() {
    this.props.getRoles();
  }

  public render() {
    const { data, deleteRole } = this.props;

    return (
      <>
        <h4>New Role</h4>

        <form className="add" onSubmit={this.handleSubmit}>
          <div className="form-group">
            Name:
            <div className="col-md-10">
              <input required className="form-control" ref={this.name} />
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-10">
              <input
                type="submit"
                value="Add New"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>

        <table className="table table-striped table-bordered table-hover">
          <tbody>
            <tr>
              <th>Role Id</th>
              <th>Name</th>
              <th />
            </tr>
            {data.map(item => (
              <tr key={item.Id}>
                <td>{item.Id}</td>
                <td>{item.Name}</td>
                <td>
                  <button
                    onClick={() => deleteRole(item.Id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
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
    isLoading: roles.isLoading
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, roleActions.RoleActions>
) {
  return {
    getRoles: async () => await dispatch(roleActions.GetRoles()),

    addRole: async (name: string) => await dispatch(roleActions.AddRole(name)),

    deleteRole: async (id: number) => await dispatch(roleActions.DeleteRole(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminRoles);
