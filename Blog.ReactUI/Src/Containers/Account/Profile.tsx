import { connect } from "react-redux";
import { IStoreState } from "Types/Store/Index";
import { allowOnlyAuthenticated } from "Hocs/AllowOnlyAuthenticated";
import Profile from "Components/Account/Profile";

function mapStateToProps({ account }: IStoreState) {
  return {
    user: account.user,
  };
}

export default allowOnlyAuthenticated(connect(mapStateToProps)(Profile));
