import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as roleActions from "Actions/AdminRolesActions";
import { IStoreState } from "Types/Index";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import AdminRoles from "Components/Admin/Roles/Roles";

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
