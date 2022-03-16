import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [
    { id: 1, title: '1', description: 'Desc 1', },
    { id: 2, title: '2', description: 'Desc 2', },
  ]
}

const { actions, reducer } = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    addTodos: (state, {payload: todos}) => {
      state.todos = todos
    },
    addTodo: (state, { payload: todo }) => {
      state.todos.push({
        id: (state.todos[state.todos.length - 1]?.id || 0) + 1,
        ...todo
      })
    },
    removeTodo: (state, { payload: id }) => {
      state.todos = state.todos.filter(({ id: todoId }) => todoId !== id)
    },
  },
})

export { actions as TodoActions }
export { reducer }