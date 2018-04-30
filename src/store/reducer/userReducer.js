import * as actionTypes from '../action/actionTypes'
import { updateObject } from '../utility'

const initState = {
    login: false,
    error: null,
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

const loginSuccessfully = (state, action) => {
    const updatedState = {
        login: action.login,
        userData: action.userData
    }
    return updateObject(state, updatedState)
}

const loginFailed = (state, action) => {
    const updatedState = {
        login: action.login,
        error: action.error
    }
    return updateObject(state, updatedState)
}

const reducer = (state=initState, action) => {
    switch(action.type){
        case actionTypes.LOGIN_SUCCESSFULLY:
            return loginSuccessfully(state, action);
        case actionTypes.LOGIN_FAILED:
            return loginFailed(state, action);
        default:
            return state;
    }
}

export default reducer;