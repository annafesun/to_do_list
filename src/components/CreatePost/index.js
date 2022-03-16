import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TodoActions } from '../../store/reducers/todo/slice'
import { Button, Card, Col, Input, Row } from 'antd'
//styles
import styles from './index.module.css'
import { getTodoSelector } from '../../store/reducers/todo/selectors'
import { TODOS } from '../../constants/localStorage'
import { LS } from '../../utilits/LocalStorage'

const CreatePost = ({}) => {
  const [todo, setTodo] = useState({
    title: '',
    description: ''
  })
  const dispatch = useDispatch()

  const todos = useSelector(getTodoSelector)

  const addTodo = () => {
    if (todo.title && todo.description) {
      dispatch(TodoActions.addTodo(todo))
      setTodo({ title: '', description: '' })
    }
  }

  const removeTodo = (id) => {
    dispatch(TodoActions.removeTodo(id))
  }

  useEffect(() => {
    const LStodos = LS.get(TODOS)
    if (LStodos) {
      dispatch(TodoActions.addTodos(LStodos))
    }
  }, [])

  return (
      <div className={styles.createPost}>
        <Row>
          <Col span={9}>
            <Input
                onChange={(e) => setTodo((prev) => (
                    { ...prev, title: e.target.value }
                ))}
                value={todo.title}
                placeholder="Add title"
            />
          </Col>
          <Col span={9}>
            <Input
                value={todo.description}
                onChange={(e) => setTodo((prev) => (
                    { ...prev, description: e.target.value }
                ))}
                placeholder="Add description"
            />
          </Col>
          <Col span={6}>
            <Button
                block
                shape="round"
                type="primary"
                danger
                onClick={addTodo}
            >
              Create
            </Button>
          </Col>
        </Row>
        <Row>
          {todos?.map(({ title, description, id }) => (
              <Col
                  key={id}
                  span={24}
              >
                <Card
                    className={styles.post}
                    title={title}
                    bordered={false}
                >
                  <p>{description}</p>
                  <Button
                      type="primary"
                      danger
                      onClick={() => removeTodo(id)}
                  >
                    Delete
                  </Button>
                </Card>
              </Col>
          ))}
        </Row>
      </div>
  )
}

export default CreatePost