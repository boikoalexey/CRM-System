import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import { todolistAPI } from '../api'
import { Form, Input, Space } from 'antd'
import { taskTitleRules } from '../utils/validationRules.ts'
import { SubmitButton } from './common/SubmitButton.tsx'

type Props = {
  onReload: () => void
}

export function CreateTodoForm(props: Props) {
  const { onReload } = props
  const [form] = Form.useForm()
  const [title, setTitle] = useState('')

  function createItemHandler () {
    todolistAPI.addTodo({ title: title.trim() })
      .then(() => {
        setTitle('')
        onReload()
      })
  }

  function createTaskOnEnterHandler (event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      createItemHandler()
    }
  }

  function changeTaskTitleHandler (event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value)
  }

  return (
    <Form form={form} name="validateOnly" autoComplete="off">
      <Form.Item name="Task To Be Done" rules={taskTitleRules}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={title}
            placeholder="Task To Be Done"
            onChange={changeTaskTitleHandler}
            onKeyDown={createTaskOnEnterHandler}
          />
          <SubmitButton form={form} onClick={createItemHandler}>Add</SubmitButton>
        </Space.Compact>
      </Form.Item>
    </Form>
  )
}