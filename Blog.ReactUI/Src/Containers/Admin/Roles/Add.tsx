import { connect } from "react-redux";
import * as actions from "Actions/AdminRolesActions";
import { ThunkDispatch } from "redux-thunk";
import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  AddRole: (name: string) => void;
}

class Add extends React.PureComponent<IProps> {
  private name = React.createRef<HTMLInputElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    this.props.AddRole(this.name.current!.value);
  };

  public render = () => (
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
            <input type="submit" value="Add Role" className="btn btn-primary" />
          </div>
        </div>
      </form>

      <Link to="/Admin/Records" className="btn btn-danger">
        Cancel
      </Link>
    </>
  );
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, actions.RoleActions>
) {
  return {
    AddRole: async (name: string) => await dispatch(actions.AddRole(name)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Add);
