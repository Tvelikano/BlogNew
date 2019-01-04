import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as userActions from "Actions/AdminUsersActions";
import UserViewModel from "Types/UserViewModel";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import { IStoreState } from "Types/Index";
import UserDTO from "Types/UserDTO";
import Add from "Components/Admin/Users/Add";

function mapStateToProps({ users }: IStoreState) {
  return {
    user:
      !users.isLoading && users.data.List ? users.data.List[0] : new UserDTO(),
    error: users.error,
    isLoading: users.isLoading,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, userActions.UserActions>
) {
  return {
    GetUser: async (id: number) => await dispatch(userActions.GetUser(id)),

    UpdateUser: async (data: UserViewModel) =>
      await dispatch(userActions.UpdateUser(data)),
  };
}

export default allowOnlyAdmin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Add)
);
