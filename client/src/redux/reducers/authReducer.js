import { AUTH_LOGIN } from '../actions/authActions'
import { AUTH_LOGOUT } from '../actions/authActions'

const initialState = {
  data: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        data: action.payload
      }
    case AUTH_LOGOUT:
      return state = initialState
    default:
      return state
  }
}