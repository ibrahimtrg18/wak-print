export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT"

export const authLogin = (data) => {
    return {
        type: AUTH_LOGIN,
        payload: data
    }
}

export const authLogout = () =>{
    return {
        type: AUTH_LOGOUT
    }
}
