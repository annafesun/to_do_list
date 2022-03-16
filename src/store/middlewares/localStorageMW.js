import { LS } from '../../utilits/LocalStorage'
import { TODOS } from '../../constants/localStorage'

export const localStorageMW = (store) => (next) => (action) => {
  next(action)
  LS.set(TODOS, store.getState().todoReducer.todos)
}