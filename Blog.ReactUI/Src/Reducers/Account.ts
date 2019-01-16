import * as accountConstants from "Actions/Constants/Account";
import { AccountActions } from "Actions/AccountActions";
import { IAccountState } from "Types/Store/Index";
import UserDTO from "Types/Account/UserDTO";

const initialState: IAccountState = {
  isLoading: true,
  isAuthenticated: false,
  user: new UserDTO(),
};

export default function recordReducer(
  state: IAccountState = initialState,
  action: AccountActions
) {
  switch (action.type) {
    case accountConstants.LOGIN_REQUEST:
      return { ...state, isLoading: true };

    case accountConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.data,
      };
    case accountConstants.LOGIN_FAIL:
      return { ...state, isLoading: false };

    case accountConstants.LOGOUT:
      return { ...initialState, isLoading: false };

    default:
      return state;
  }
}
