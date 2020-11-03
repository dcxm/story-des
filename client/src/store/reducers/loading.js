import { SET_LOADING } from "../actions/types";

const initialState = {loading: false, component: ""};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING :
      return {
          ...state,
          loading: action.payload.loading,
          component: action.payload.component
      }
    default : 
      return state
  }
};

export default loading;