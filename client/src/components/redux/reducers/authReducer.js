import * as authAction from '../actions/authAction'

const initState = {}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authAction.AUTH_LOGIN:
            return {
                ...state,
                data: action.payload
            }
        case authAction.AUTH_LOGOUT:
            state = initState
        default:
            return state;
    }
}