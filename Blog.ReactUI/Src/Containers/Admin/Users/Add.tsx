import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as userActions from "Actions/AdminUsersActions";
import UserViewModel from "Types/Account/UserViewModel";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import Add from "Components/Admin/Users/Add";
import { IStoreState } from "Types/Store/Index";

function mapStateToProps({ users }: IStoreState) {
  return {
    error: users.error,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, userActions.UserActions>
) {
  return {
    AddUser: (data: UserViewModel) => dispatch(userActions.AddUser(data)),
  };
}

export default allowOnlyAdmin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Add)
);
