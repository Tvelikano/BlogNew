import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as userActions from "Actions/AdminUsersActions";
import UserViewModel from "Types/Account/UserViewModel";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import Add from "Components/Admin/Users/Add";

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, userActions.UserActions>
) {
  return {
    AddUser: async (data: UserViewModel) =>
      await dispatch(userActions.AddUser(data)),
  };
}

export default allowOnlyAdmin(
  connect(
    null,
    mapDispatchToProps
  )(Add)
);
