export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS'
export const DO_LOGOUT = 'DO_LOGOUT'

export const doLogin = (data) =>{
    return {
        type: FETCH_USER_LOGIN_SUCCESS, 
        payload: data
    }
}

export const doLogout = () =>{
    return {
        type: 'DO_LOGOUT'

    }
}