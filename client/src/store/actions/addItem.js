import {ADD_ITEM} from "./types";

const addItem = (payload) => {
    return {
        type: ADD_ITEM,
        payload
    }
}

export default addItem