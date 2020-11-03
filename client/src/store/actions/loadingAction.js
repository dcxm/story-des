import { SET_LOADING } from "./types";

const loadingAction = (payload) => {
    return {
        type: SET_LOADING,
        payload
    }
}

export default loadingAction;