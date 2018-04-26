import * as actionTypes from '../action/actionTypes';

import updateState from '../utility';

let initState = {
    items: [],
    itemDetails: [],
    itemId: null,
    error: null,
}

const getItem = (state, action) => {
    return updateState(state, {items: action.items})
}

const getItemDetails = (state, action) => {
    return updateState(state, {itemDetails: action.itemDetails})
}

const errorCatch = (state, action) => {
    console.log('bad connect')
    return updateState(state, {error: action.error})
}

const getDataReducer = (state=initState,action) => {
    switch(action.type){
        case actionTypes.GET_ITEMS:
            return getItem(state,action);
        case actionTypes.GET_ITEM_DETAILS:
            return getItemDetails(state,action);
        case actionTypes.ERROR_CATCH:
            return errorCatch(state, action)
        default:
            return state;
    }
}

export default getDataReducer;