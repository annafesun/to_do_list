import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Button, Card} from 'antd'
//styles
import styles from './index.module.css'
//components
import FormTodo from './Form'
//slice
import {TodoActions} from '../../store/reducers/todo/slice'
//images
import minus from '../../assets/icon/minusIco.png'

const Task = ({todoId, taskId, task, priority}) => {
    const dispatch = useDispatch()
    const [isActive, setActive] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef()

    const handleBlur = (taskId) => {
        setActive(false);
        dispatch(TodoActions.editTask({
            todoId,
            taskId,
            text: inputValue
        }))
        setInputValue('')
    }

    const activeTask = () => {
        setActive(true)
    }

    const removeTask = (id, taskId) => {
        dispatch(TodoActions.removeTask(id, taskId))
    }

    useEffect(() => {
        if (isActive && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isActive])

    return (
        <div className={styles.task} key={taskId}>
            <div className={styles.taskText}>
                Task:
                {isActive
                    ?
                    <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={() => handleBlur(taskId)}
                        type="text"
                    />
                    :
                    <span
                        onDoubleClick={activeTask}
                    >
                            <a className={styles.tooltip} href="#">
                                {task}
                                <span>Double click for change your task</span>
                            </a>

                        </span>
                }
            </div>
            <span className={styles.priorityText}> Priority: {priority} </span>
            <a
                className={styles.linkIco}
                href="#"
                onClick={() => removeTask({id: todoId, taskId})}
            >
                <img className={styles.minusIco} src={minus} alt="minus"/>
            </a>
        </div>
    )
}

const Todo = ({id, title, description, tasks = []}) => {
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
            <FormTodo todoId={id} lastTaskId={lastTaskId}/>
            {tasks?.map(({id: taskId, task, priority}) => (
                <Task
                    todoId={id}
                    taskId={taskId}
                    task={task}
                    priority={priority}
                />
            ))}
            <Button
                type="primary"
                danger
                block
                onClick={() => removeTodo(id)}
            >
                Delete
            </Button>
        </Card>
    )
}

export default Todo