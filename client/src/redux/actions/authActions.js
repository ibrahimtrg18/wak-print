export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const AUTH_RESET = "AUTH_RESET";

export const _authRequest = () => {
    return {
        type: AUTH_REQUEST,
    }
}

export const _authSuccess = (payload) => {
    return {
        type: AUTH_SUCCESS,
        payload
    }
}

export const _authFailure = (payload) => {
    return {
        type: AUTH_FAILURE,
        payload
    }
}

export const _authLogout = () => {
    return {
        type: AUTH_LOGOUT
    }
}

export const _authReset = () => {
    return {
        type: AUTH_RESET
    }
}

export const _login = ({ email, password }) => {
    return (dispatch) => {
        dispatch(_authRequest())
        fetch("/api/partner/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success)
                    dispatch(_authSuccess(data.data))
                else
                    dispatch(_authFailure(data.message))
            })
    }
}

export const _logout = () => {
    return (dispatch) => {
        dispatch(_authLogout());
    }
}

export const _reset = () => {
    return (dispatch) => {
        dispatch(_authReset());
    }
}