import { type ChangeEvent, useState } from 'react'
import { validateTitle } from '../../utils/validateTitle.ts'
import { Button } from '../common/Button.tsx'
import './TodoItem.css'

type Props = {
  id: number
  title: string
  completed: boolean
  onToggleStatus: (id: number, isDone: boolean) => void
  onEdit: (id: number, newTitle: string) => void
  onDelete: (id: number) => void
}

export function TodoItem(props: Props) {
  const { id, title, completed, onToggleStatus, onEdit, onDelete } = props

  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(title)
  const [error, setError] = useState<string | null>(null)

  function handleSave() {
    const trimmed = inputValue.trim()
    const validationError = validateTitle(trimmed)

    if (validationError) {
      setError(validationError)
      return
    }

    if (trimmed === title) {
      setIsEditing(false)
      return
    }

    onEdit(id, trimmed)
    setIsEditing(false)
    setError(null)
  }

  function handleCancel() {
    setInputValue(title)
    setIsEditing(false)
  }

  function handleBlur() {
    handleCancel()
  }

  function changeTaskTitle (e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value)
    setError(null)
  }

  function changeTaskStatus(event: ChangeEvent<HTMLInputElement>) {
    const newTaskStatus = event.currentTarget.checked
    onToggleStatus(id, newTaskStatus)
  }

  return (
    <div className={`todo-item ${isEditing ? 'editing' : ''}`}>
      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={completed}
          onChange={changeTaskStatus}
          onBlur={handleBlur}
          disabled={isEditing}
        />
        <span className="custom-checkbox"></span>
      </label>

      {isEditing ? (
        <div className={'todo-input-wrapper'}>
          <input
            type="text"
            className="todo-input"
            value={inputValue}
            onChange={changeTaskTitle}
            autoFocus
          />
          {error && <div className="error-message">{error}</div>}
        </div>
      ) : (
        <span className={`todo-title ${completed ? 'completed' : ''}`}>
          {title}
        </span>
      )}

      {isEditing ? (
        <>
          <Button title={'✔'} className="btn edit" onClick={handleSave} />
          <Button title={'✖'} className="btn delete" onClick={handleCancel} />
        </>
      ) : (
        <>
          <Button title={'✎'} className="btn edit" onClick={() => setIsEditing(true)} />
          <Button title={'🗑'} className="btn delete" onClick={() => onDelete(id)} />
        </>
      )}
    </div>
  )
}
