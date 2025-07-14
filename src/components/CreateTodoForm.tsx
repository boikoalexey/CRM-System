import { Form, Input, Button, Space, notification } from 'antd'
import { memo } from 'react'
import { addTodo } from '../api'
import { taskTitleRules } from '../utils/validationRules'

type Props = {
  onReload: () => void
}

export const CreateTodoForm = memo(function CreateTodoForm(props: Props) {
  const { onReload } = props
  const [form] = Form.useForm<{ title: string }>()

  function onFinish({ title }: { title: string }) {
    const trimmedTitle = title.trim()

    addTodo({ title: trimmedTitle })
      .then(() => {
        form.resetFields()
        onReload()
      })
      .catch((error) => {
        notification.error({
          message: 'Error creating task',
          description: error?.message,
        })
      })
  }

  return (
    <Form
      form={form}
      name="create-todo"
      autoComplete="off"
      onFinish={onFinish}
      initialValues={{ title: '' }}
    >
      <Space.Compact style={{ width: '100%' }}>
        <Form.Item name="title" rules={taskTitleRules} required style={{ flex: 1 }}>
          <Input placeholder="Task To Be Done" allowClear />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Space.Compact>
    </Form>
  )
})
