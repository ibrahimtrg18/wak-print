export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";

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

export const authLogin = ({ email, password }) => {
    return (dispatch, getState) => {
        fetch("/api/partner/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(data => {
            if (data.ok) {
                dispatch(authSuccess(data.json()))
            }
        })
    }
}