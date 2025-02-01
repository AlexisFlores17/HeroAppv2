import { types } from "../types/types";

interface AuthAction {
  type: string;
  payload?: object;
}

export const AuthReducer = (state = {}, action: AuthAction) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        logged: true,
        user: action.payload
      };

    case types.logout:
      return {
        logged: false,
      };
    default:
      return state;
  }
};
