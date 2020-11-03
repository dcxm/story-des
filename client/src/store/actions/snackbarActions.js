import {SET_SNACKBAR_MESSAGE, SET_SNACKBAR_OPEN, CLEAR_SNACKBAR_MESSAGE} from "./types";

export const setSnackbarOpen = () => {
    return {
        type: SET_SNACKBAR_OPEN
    }
}

export const setSnackbarMessage = (payload) => {
    return {
        type: SET_SNACKBAR_MESSAGE,
        payload
    }
}

export const clearSnackbarMessage = () => {
    return {
        type: CLEAR_SNACKBAR_MESSAGE
    }
}

