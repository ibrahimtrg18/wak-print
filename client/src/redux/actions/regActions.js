export const REG_REQUEST = "REG_REQUEST";
export const REG_SUCCESS = "REG_SUCCESS";
export const REG_FAILURE = "REG_FAILURE";

export const regRequest = () =>{
  return {
    type: REG_REQUEST
  }
}

export const regSuccess = (payload) =>{
  return {
    type: REG_SUCCESS,
    payload
  }
}

export const regFailure = (payload) =>{
  return {
    type: REG_FAILURE,
    payload
  }
}
