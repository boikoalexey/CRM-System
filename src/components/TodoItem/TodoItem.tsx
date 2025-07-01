import { useState } from 'react'
import type { Todo } from '../../types.ts'
import { todolistAPI } from '../../api'
import { Checkbox, type CheckboxChangeEvent } from 'antd'
import { Form, Input, Button } from 'antd'
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { taskTitleRules } from '../../utils/validationRules.ts'
import './TodoItem.css'

type Props = {
  todo: Todo
  onReload: () => void
}

export function TodoItem(props: Props) {
  const { todo, onReload } = props
  const [form] = Form.useForm<{ title: string }>()

  const [isEditing, setIsEditing] = useState(false)

  function handleSave() {
    form
      .validateFields()
      .then(({ title }) => {
        const trimmedTitle = title.trim()

        if (trimmedTitle === todo.title) {
          setIsEditing(false)
          return
        }

        todolistAPI
          .updateTodo(todo.id, { title: trimmedTitle })
          .then(() => {
            setIsEditing(false)
            onReload()
          })
      })
  }

  function changeTaskStatus(e: CheckboxChangeEvent) {
    const isDone = e.target.checked
    todolistAPI.updateTodo(todo.id, { isDone }).then(onReload)
  }

  function deleteTask() {
    todolistAPI.deleteTodo(todo.id).then(onReload)
  }

  function handleEdit() {
    form.setFieldsValue({ title: todo.title })
    setIsEditing(true)
  }

  function handleCancel() {
    setIsEditing(false)
  }

  return (
    <div className={'todo-item'}>
      <Checkbox checked={todo.isDone} disabled={isEditing} onChange={changeTaskStatus} />

      {isEditing ? (
        <Form
          form={form}
          component={false}
          initialValues={{ title: todo.title }}
        >
          <Form.Item name="title" rules={taskTitleRules}>
            <Input autoFocus/>
          </Form.Item>
        </Form>
      ) : (
        <span className={`todo-title ${todo.isDone ? 'completed' : ''}`}>{todo.title}</span>
      )}

      <Button
        variant="outlined"
        color={isEditing ? 'cyan' : 'primary'}
        icon={isEditing ? <CheckOutlined /> : <EditOutlined />}
        onClick={isEditing ? handleSave : handleEdit}
      />
      <Button
        variant="outlined"
        color="danger"
        icon={isEditing ? <CloseOutlined /> : <DeleteOutlined />}
        onClick={isEditing ? handleCancel : deleteTask}
      />
    </div>
  )
}
