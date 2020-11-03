import { SET_ITEMS, DELETE_ITEMS, UPDATE_ITEM, ADD_ITEM } from "../actions/types";

const initial = {
  novels: [], shortStories: [], chapters: [], chaptersDndData: {
    chapters: [],
    columns: {
      "col-1": {
        id: "col-1",
        title: "Chapter Order",
        chapterIds: []
      }
    }
  }
}

const removeItem = (arrOfObjFrom, indexItem) => {
  const newArr = arrOfObjFrom.slice();
  const index = newArr.findIndex(item => item.dataValues.id === indexItem);
  newArr.splice(index, 1);
  return newArr;
}

const setItems = (state, action, editableItemType) => {
  if (Array.isArray(action.payload[editableItemType])) {
    return { ...state, [editableItemType]: [...action.payload[editableItemType]] }
  } else {
    return { ...state, [editableItemType]: { ...action.payload[editableItemType] } }
  }
}

const items = (state = initial, action) => {
  const editableItemType = action.payload ? Object.keys(action.payload)[0] : ''
  switch (action.type) {
    case SET_ITEMS:
      console.log(action.payload)
      return setItems(state, action, editableItemType)
    case ADD_ITEM:
      console.log(action.payload)
      if (action.payload.chapters) {
        return {
          ...state,
          [editableItemType]: [...state[editableItemType], ...action.payload[editableItemType]]
        }
      }
      return {
        ...state,
        [editableItemType]: [...action.payload[editableItemType], ...state[editableItemType]]
      }
    case UPDATE_ITEM:
      const find = () => state[editableItemType].findIndex(e => e.dataValues.id.toString() === action.payload[editableItemType].dataValues.id.toString())
      const clone = () => Array.from(state[editableItemType])
      let clonedArray = clone();
      clonedArray[find()] = { ...action.payload[editableItemType] };
      return {
        ...state,
        [editableItemType]: [...clonedArray]
      }
    case DELETE_ITEMS:
      if (action.payload.novels) {
        const resultArr = removeItem(state.novels, action.payload.novels.id);
        return { novels: resultArr, shortStories: state.shortStories, chapters: state.chapters }
      }
      if (action.payload.shortStories) {
        const resultArr = removeItem(state.shortStories, action.payload.shortStories.id);
        return { shortStories: resultArr, novels: state.novels, chapters: state.chapters }
      }
      if (action.payload.chapters) {
        const resultArr = removeItem(state.chapters, action.payload.chapters.id);
        return { chapters: resultArr, shortStories: state.shortStories, novels: state.novels }
      };
      break;
    default:
      return state
  }
};

export default items;