import * as accountConstants from "Actions/Constants/Account";
import { AccountActions } from "Actions/AccountActions";
import { IAccountState } from "Types/Index";
import UserDTO from "Types/UserDTO";

const initialState: IAccountState = {
  isAuthenticated: false,
  user: new UserDTO(),
};

export default function recordReducer(
  state: IAccountState = initialState,
  action: AccountActions
) {
  switch (action.type) {
    case accountConstants.LOGIN_SUCCESS:
      return { isAuthenticated: true, user: action.data };

    case accountConstants.LOGOUT:
      return { initialState };

    default:
      return state;
  }
}
