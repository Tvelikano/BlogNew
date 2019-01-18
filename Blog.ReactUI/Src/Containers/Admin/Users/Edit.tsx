import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as userActions from "Actions/AdminUsersActions";
import UserViewModel from "Types/Account/UserViewModel";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import { IStoreState } from "Types/Store/Index";
import User from "Types/Account/User";
import Edit from "Components/Admin/Users/Edit";

function mapStateToProps({ users }: IStoreState) {
  return {
    user:
      !users.isLoading && users.data.List ? users.data.List[0] : new User(),
    error: users.error,
    isLoading: users.isLoading,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, userActions.UserActions>
) {
  return {
    GetUser: (id: number) => dispatch(userActions.GetUser(id)),

    UpdateUser: (data: UserViewModel) => dispatch(userActions.UpdateUser(data)),
  };
}

export default allowOnlyAdmin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Edit)
);
