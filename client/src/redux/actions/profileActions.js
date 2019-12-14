export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";
export const PROFILE_RESET = "PROFILE_RESET";
export const PROFILE_STATUS = "PROFILE_STATUS";

export const profileRequest = () => {
    return {
        type: PROFILE_REQUEST
    }
}

export const profileSuccess = (payload) => {
    return {
        type: PROFILE_SUCCESS,
        payload
    }
}

export const profileFailure = (message) => {
    return {
        type: PROFILE_FAILURE,
        message
    }
}

export const profileReset = () => {
    return {
        type: PROFILE_RESET
    }
}

export const profileStatus = () => {
    return {
        type: PROFILE_STATUS,
    }
}

export const getProfile = (partnerId) => {
    return (dispatch) => {
        dispatch(profileRequest());
        fetch(`/api/partner/${partnerId}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch(profileSuccess(data.data))
                } else {
                    dispatch(profileFailure(data.message))
                }
            })
    }
}

export const resetProfile = () => {
    return dispatch => {
        dispatch(profileReset())
    }
}

export const changeStatus = (partnerId) => {
    return dispatch => {
        fetch(`/api/partner/${partnerId}/status`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch(profileStatus())
                }
            })
    }
}