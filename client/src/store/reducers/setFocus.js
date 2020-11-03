import { SET_FOCUS } from "../actions/types";

const initState = false;

const setFocus = (state = initState, { type }) => {
    switch (type) {
        case "SET_FOCUS" : 
            state = !state;
            return state;
        default : return state;
    }
}

export default setFocus;