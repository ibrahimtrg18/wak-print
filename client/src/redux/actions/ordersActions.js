export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILURE = "ORDER_FAILURE";
export const ORDER_RESET = "ORDER_RESET";

export const orderRequest = () => {
    return {
        type: ORDER_REQUEST
    }
}

export const orderSuccess = (payload) => {
    return {
        type: ORDER_SUCCESS,
        payload
    }
}

export const orderFailure = (message) => {
    return {
        type: ORDER_FAILURE,
        message
    }
}

export const orderReset = () => {
    return {
        type: ORDER_RESET
    }
}

export const getOrders = (partnerId) => {
    return (dispatch) => {
        dispatch(orderRequest());
        fetch(`/api/partner/${partnerId}/orders`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    dispatch(orderSuccess(data.data))
                } else {
                    dispatch(orderFailure(data.message))
                }
            })
    }
}

export const resetOrders = () => {
    return dispatch => {
        dispatch(orderReset())
    }
}