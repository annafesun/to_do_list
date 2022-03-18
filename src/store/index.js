import {configureStore} from '@reduxjs/toolkit'
import reducers from './rootReducer'
import {localStorageMW} from './middlewares/localStorageMW'

export const createStore = (reducer = reducers) => {
    const store = configureStore({
        reducer: reducer,
        middleware: [localStorageMW]
    })
    return store
}

export const store = createStore()