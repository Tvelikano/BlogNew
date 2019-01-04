import { connect } from "react-redux";
import * as actions from "Actions/AdminRolesActions";
import { ThunkDispatch } from "redux-thunk";
import Add from "Components/Admin/Roles/Add";

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
