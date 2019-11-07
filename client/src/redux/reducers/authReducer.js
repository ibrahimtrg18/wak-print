import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE } from '../actions/authActions'

const initialState = {
  data: null,
  isLoading: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case AUTH_FAILURE:
      return {
        ...state,
        message: "hello",
        isLoading: false,
      }
    default:
      return state
  }
}