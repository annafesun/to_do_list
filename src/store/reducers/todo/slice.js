import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [{
    id: 1,
    title: 'test1',
    description: 'Test11',
    tasks: [
      {
        id: 1,
        task: 'task 1',
        priority: 'low'
      }
    ]
  }]
}

const { actions, reducer } = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    addTodos: (state, { payload: todos }) => {
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
    addTask: (state, { payload: { task, todoId, lastTaskId } }) => {
      state.todos = state?.todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            tasks: [
              ...(todo?.tasks || []),
              {
                ...task,
                id: lastTaskId + 1
              }
            ]
          }
        }
        return todo
      })
    },

  },
})

export { actions as TodoActions }
export { reducer }