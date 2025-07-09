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

  function onFinish() {
    form
      .validateFields()
      .then(({ title }) => {
        const trimmedTitle = title.trim()

        addTodo({ title: trimmedTitle })
          .then(() => {
            form.resetFields()
            onReload()
          })
          .catch((error) => {
            notification.error({
              message: 'Error creating task',
              description: error?.message
            })
          })
      })
  }

  function isSubmitDisabled () {
    return !form.isFieldsTouched(true) ||
    form.getFieldsError().some(({ errors }) => errors.length)
  }

  return (
    <Form
      form={form}
      name="create-todo"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item>
        <Space.Compact style={{ width: '100%' }}>
          <Form.Item name="title" rules={taskTitleRules} noStyle>
            <Input placeholder="Task To Be Done" allowClear />
          </Form.Item>

          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={isSubmitDisabled()}
              >
                Add
              </Button>
            )}
          </Form.Item>
        </Space.Compact>
      </Form.Item>
    </Form>
  )
})
