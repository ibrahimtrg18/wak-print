export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILURE = "ORDER_FAILURE";

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

export const getOrders = (partnerId) => {
    return (dispatch) => {
        console.log(partnerId)
        dispatch(orderRequest());
        fetch(`/api/partner/${partnerId}/order`, {
            method: "GET"
        }).then(
            res => res.json()
        ).then(data => {
            if (data.success) {
                dispatch(orderSuccess(data.data))
            } else {
                dispatch(orderFailure(data.message))
            }
        })
    }
}