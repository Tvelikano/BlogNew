import * as accountConstants from "Actions/Constants/Account";
import { AccountActions } from "Actions/AccountActions";
import { IAccountState } from "Types/Store/Index";

const initialState: IAccountState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  error: null,
};

export default function recordReducer(
  state: IAccountState = initialState,
  action: AccountActions
) {
  switch (action.type) {
    case accountConstants.LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case accountConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.data,
        error: null,
      };
    case accountConstants.LOGIN_FAIL:
      return { ...state, isLoading: false, error: action.data };

    case accountConstants.LOGOUT:
      return { ...initialState, isLoading: false };

    default:
      return state;
  }
}
