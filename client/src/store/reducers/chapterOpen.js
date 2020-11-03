import { SET_ADD_CHAPTER_OPEN } from "../actions/types";

const initial = false;

const chapterOpen = (state = initial, { type }) => {
    switch (type) {
        case SET_ADD_CHAPTER_OPEN:
            state = !state
            return state;
        default:
            return state;
    }
}

export default chapterOpen;