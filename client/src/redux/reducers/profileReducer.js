import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE, PROFILE_RESET } from '../actions/profileActions';

const initialState = {
	data: null,
	isLoading: null
}

export const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROFILE_REQUEST:
			return {
				data: null,
				isLoading: true,
			}
		case PROFILE_SUCCESS:
			return {
				data: action.payload,
				isLoading: false,
			}
		case PROFILE_FAILURE:
			return {
				data: action.message,
				isLoading: false,
			}
		case PROFILE_RESET:
			return initialState
		default:
			return state
	}
}
