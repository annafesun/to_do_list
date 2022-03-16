import { Form, Input, Button, Row, Col } from 'antd'
import styles from './index.module.css'
import { useDispatch } from 'react-redux'
import { TodoActions } from '../../../store/reducers/todo/slice'

const FormTodo = ({todoId, lastTaskId}) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const onFinish = (task) => {
    if(task.task && task.priority){
      dispatch(TodoActions.addTask({ todoId, task, lastTaskId }))
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
                name="priority"
                label="Priority"
            >
              <Input />
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