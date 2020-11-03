import {SET_SNACKBAR_MESSAGE, CLEAR_SNACKBAR_MESSAGE, SET_SNACKBAR_OPEN} from "../actions/types";

const initialState = {
    message: "",
    open: false
}

const snackbarReducer = (state = initialState, {type, payload}) => {
    switch(type) {
        case SET_SNACKBAR_MESSAGE : 
            return {
                ...state,
                message: payload
            }
        case CLEAR_SNACKBAR_MESSAGE : 
            return {
                ...state,
                massage: ""
            }
        case SET_SNACKBAR_OPEN : 
            return {
                ...state,
                open: !state.open
            }
        default : 
            return state
    }
    return;
}

export default snackbarReducer;