import { REG_SUCCESS, REG_REQUEST, REG_FAILURE } from "../actions/regActions"

const initialState = {
    message: null,
    isLoading: null
}

export const regReducer = (state = initialState, action) => {
    switch (action.type) {
        case REG_REQUEST:
            return {
                isLoading: true,
            }
        case REG_SUCCESS:
            return {
                success: true,
                message: action.payload,
                isLoading: false
            }
        case REG_FAILURE:
            return {
                success: false,
                message: action.payload,
                isLoading: false
            }
        case "REG_RESET":
            return initialState
        default:
            return state
    }
}