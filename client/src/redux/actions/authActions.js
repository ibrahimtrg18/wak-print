export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const AUTH_RESET = "AUTH_RESET";

export const authRequest = () => {
    return {
        type: AUTH_REQUEST,
    }
}

export const authSuccess = (payload) => {
    return {
        type: AUTH_SUCCESS,
        payload
    }
}

export const authFailure = () => {
    return {
        type: AUTH_FAILURE
    }
}

export const authReset = () => {
    return {
        type: AUTH_RESET
    }
}

export const authLogin = ({ email, password }) => {
    return (dispatch) => {
        fetch("/api/partner/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json()
        ).then(data => {
            if (data.success) {
                dispatch(authSuccess(data.data))
            }
        })
    }
}

export const authLogout = () => {
    return (dispatch) => {
        dispatch(authReset());
    }
}