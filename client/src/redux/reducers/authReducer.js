import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, AUTH_RESET } from '../actions/authActions'

const initialState = {
    data: null,
    isLoading: true,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                isLoading: true,
            }
        case AUTH_SUCCESS:
            return {
                data: action.payload,
                isLoading: false,
            }
        case AUTH_FAILURE:
            return {
                message: "Fail",
                isLoading: false,
            }
        case AUTH_RESET:
            return initialState
        default:
            return state
    }
}