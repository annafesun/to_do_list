import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Col, Input, Row} from 'antd'
//slice
import {TodoActions} from '../../store/reducers/todo/slice'
//styles
import styles from './index.module.css'
//localstorage
import {getTodoSelector} from '../../store/reducers/todo/selectors'
import {TODOS} from '../../constants/localStorage'
import {LS} from '../../utilits/LocalStorage'
//components
import Todo from '../Todo'

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
            setTodo({title: '', description: ''})
        }
    }

    useEffect(() => {
        const LStodos = LS.get(TODOS)
        if (LStodos) {
            dispatch(TodoActions.addTodos(LStodos))
        }
    }, [])

    return (
        <div className={styles.createPost}>
            <Row gutter={[0, 24]}>
                <Col span={24}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Input
                                onChange={(e) => setTodo((prev) => (
                                    {...prev, title: e.target.value}
                                ))}
                                value={todo.title}
                                placeholder="Add title"
                            />
                        </Col>
                        <Col span={8}>
                            <Input
                                value={todo.description}
                                onChange={(e) => setTodo((prev) => (
                                    {...prev, description: e.target.value}
                                ))}
                                placeholder="Add description"
                            />
                        </Col>
                        <Col span={8}>
                            <Button
                                block
                                type="primary"
                                danger
                                onClick={addTodo}
                            >
                                Create
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[16, 20]}>
                        {todos?.map(({title, description, id, tasks}) => (
                            <Col
                                key={id}
                                span={8}
                            >
                                <Todo
                                    title={title}
                                    description={description}
                                    id={id} s
                                    tasks={tasks}
                                />
                            </Col>
                        ))}
                        {!todos?.length && <p className={styles.notList}>Please create your first list!</p>}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default CreatePost