import * as actionTypes from './actionTypes';

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

export const logout = (initUserData) => {
    return {
        type:actionTypes.LOGOUT,
        login: false,
        userData: {
            name: null,
            email: null,
            password: null,
            profilePic: null,
            stared: null,
            liked: null,
            post: null,
            category: null,
        }
    }
}