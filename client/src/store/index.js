import {createStore, applyMiddleware, compose} from "redux"


import thunk from "redux-thunk"

import combine from "./reducers/combine"

const middleware = () => {
    if (process.env.NODE_ENV === 'development') {
        return compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    } else return applyMiddleware(thunk)
}

const store = createStore(combine, 
    middleware()
)

export default store;