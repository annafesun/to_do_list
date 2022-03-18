import {Form, Input, Button, Row, Col, Select} from 'antd'
import {useDispatch} from 'react-redux'
//styles
import styles from './index.module.css'
//slice
import {TodoActions} from '../../../store/reducers/todo/slice'

const FormTodo = ({todoId, lastTaskId}) => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const {Option} = Select;

    const onFinish = (task) => {
        if (task.task && task.priority) {
            dispatch(TodoActions.addTask({todoId, task, lastTaskId}))
            form.resetFields()
        }
    }

    const onReset = () => {
        form.resetFields()
    }

    return (
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
        >
            <Row>
                <Col span={12}>
                    <Form.Item
                        name="task"
                        label="Task"
                    >
                        <Input
                            width="100%"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className={styles.priority}
                        name="priority"
                        label="Priority"
                    >
                        <Select
                            showSearch
                            placeholder="Select a priority"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="easier">Easier</Option>
                            <Option value="middle">Middle</Option>
                            <Option value="hard">Hard</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button
                    className={styles.buttonAdd}
                    type="primary"
                    htmlType="submit"
                >
                    Add task
                </Button>
                <Button
                    htmlType="button"
                    onClick={onReset}
                >
                    Reset
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormTodo