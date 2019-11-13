import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE, ORDER_RESET } from '../actions/orderActions';

const initialState = {
	data: null,
	isLoading: null
}

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case ORDER_REQUEST:
			return {
				data: null,
				isLoading: true,
			}
		case ORDER_SUCCESS:
			return {
				data: action.payload,
				isLoading: false,
			}
		case ORDER_FAILURE:
			return {
				data: action.message,
				isLoading: false,
			}
		case ORDER_RESET:
			return initialState
		default:
			return state
	}
}
