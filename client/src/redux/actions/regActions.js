export const REG_REQUEST = "REG_REQUEST";
export const REG_SUCCESS = "REG_SUCCESS";
export const REG_FAILURE = "REG_FAILURE";
export const REG_RESET = "REG_RESET";

export const regRequest = () => {
    return {
        type: REG_REQUEST
    }
}

export const regSuccess = (payload) => {
    return {
        type: REG_SUCCESS,
        payload
    }
}

export const regFailure = (payload) => {
    return {
        type: REG_FAILURE,
        payload
    }
}

export const regReset = () => {
    return {
        type: REG_RESET
    }
}

export const regAccount = ({
    email,
    password,
    fullName,
    businessName,
    phoneNumber,
    address
}) => {
    return (dispatch) => {
        dispatch(regRequest());
        fetch("/api/partner/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                fullName,
                businessName,
                phoneNumber,
                address
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch(regSuccess(data.message))
                } else {
                    dispatch(regFailure(data.message))
                }
            })
    }
}