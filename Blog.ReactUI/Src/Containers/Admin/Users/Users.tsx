import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as userActions from "Actions/AdminUsersActions";
import { IStoreState } from "Types/Store/Index";
import SearchQuery from "Types/SearchQuery";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import AdminUsers from "Components/Admin/Users/Users";

function mapStateToProps({ users }: IStoreState) {
  return {
    data: users.data,
    error: users.error,
    isLoading: users.isLoading,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, userActions.UserActions>
) {
  return {
    GetUsers: async (searchQuery: SearchQuery) =>
      await dispatch(userActions.GetUsers(searchQuery)),

    DeleteUser: async (id: number) =>
      await dispatch(userActions.DeleteUser(id)),
  };
}

export default allowOnlyAdmin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminUsers)
);
