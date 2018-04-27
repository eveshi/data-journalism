import * as actionTypes from './actionTypes';

import axios from '../../axios_data';

export const loginSuccessfully = (userData) => {
    return {
        type: actionTypes.LOGIN_SUCCESSFULLY,
        login: true,
        userData: userData
    }
}

export const loginFailed = (err) => {
    return {
        type: actionTypes.LOGIN_FAILED,
        login: false,
        err: err
    }
}

export const login = (userLoginData) => {
    return dispatch => {
        axios.post('/api/login', {
            userLoginData: userLoginData
        }).then(userResponse => {
            dispatch(loginSuccessfully(userResponse.data))
        }).catch( err => {
            dispatch(loginFailed(err))
        })
    }
}