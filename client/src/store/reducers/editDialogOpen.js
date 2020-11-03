import {SET_EDIT_DIALOG_OPEN} from "../actions/types";

const initial = false;

const editDialogOpen = (state = initial, {type}) => {
    switch (type) {
        case SET_EDIT_DIALOG_OPEN : 
            state = !state
            return state;
        default :
            return state;
    }
}

export default editDialogOpen;