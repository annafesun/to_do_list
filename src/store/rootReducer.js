import { combineReducers } from '@reduxjs/toolkit'
import {reducer as todoReducer} from './reducers/todo'

export default combineReducers({
 todoReducer,
})

