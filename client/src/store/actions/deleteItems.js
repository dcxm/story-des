import {DELETE_ITEMS} from "./types";

const deleteItems = (payload) => {
    return {
        type: DELETE_ITEMS,
        payload
    }
}

export default deleteItems