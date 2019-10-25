import { AUTH_LOGIN } from '../actions/authActions'
import { AUTH_LOGOUT } from '../actions/authActions'

export const authReducer = (state = null, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        data: action.payload
      }
    case AUTH_LOGOUT:
      return state = null
    default:
      return state
  }
}