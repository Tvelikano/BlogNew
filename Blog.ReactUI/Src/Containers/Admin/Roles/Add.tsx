import { connect } from "react-redux";
import * as actions from "Actions/AdminRolesActions";
import { ThunkDispatch } from "redux-thunk";
import Add from "Components/Admin/Roles/Add";
import { IStoreState } from "Types/Store/Index";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";

function mapStateToProps({ roles }: IStoreState) {
  return {
    error: roles.error,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, actions.RoleActions>
) {
  return {
    AddRole: (name: string) => dispatch(actions.AddRole(name)),
  };
}

export default allowOnlyAdmin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Add)
);
