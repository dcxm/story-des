import {SET_ITEMS} from "./types";

const setItems = (payload) => {
    return {
        type: SET_ITEMS,
        payload
    }
}

export default setItems