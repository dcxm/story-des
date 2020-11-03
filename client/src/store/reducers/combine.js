import {combineReducers} from "redux";

import loading from "./loading";
import items from "./items";
import setFocus from "./setFocus";
import snackbarReducers from "./snackbarReducers";
import chapterOpen from "./chapterOpen";
import editDialogOpen from "./editDialogOpen";

const combine = combineReducers({
    loading,
    items,
    setFocus,
    chapterOpen,
    editDialogOpen,
    snackbarReducers
})

export default combine;