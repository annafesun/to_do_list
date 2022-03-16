import React from 'react'
import styles from '../CreatePost/index.module.css'
import { Button, Card } from 'antd'
import { TodoActions } from '../../store/reducers/todo/slice'
import { useDispatch } from 'react-redux'
import FormTodo from './Form'

const Todo = ({ id, title, description, tasks = [] }) => {
  const dispatch = useDispatch()
  const removeTodo = (id) => {
    dispatch(TodoActions.removeTodo(id))
  }

  const lastTaskId = tasks[tasks?.length - 1]?.id || 1

  return (
      <Card
          className={styles.post}
          title={title}
          bordered={false}
      >
        <p>{description}</p>
        <FormTodo todoId={id} lastTaskId={lastTaskId} />
        {tasks?.map(({ id, task, priority }) => (
            <div style={{marginBottom: '10px'}} key={id}>
              <span>Task: {task}</span>{" "}<span>Priority: {priority}</span>
            </div>
        ))}
        <Button
            type="primary"
            danger
            onClick={() => removeTodo(id)}
        >
          Delete
        </Button>
      </Card>
  )
}

export default Todo