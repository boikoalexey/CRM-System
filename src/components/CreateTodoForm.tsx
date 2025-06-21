import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import { validateTitle } from '../utils/validateTitle.ts'
import { Button } from './common/Button.tsx'

type Props = {
  onCreateItem: (title: string) => void
}

export function CreateTodoForm(props: Props) {
  const { onCreateItem } = props

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)


  function changeTaskTitleHandler (event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value)
    setError(null)
  }

  function createTaskOnEnterHandler (event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      createItemHandler()
    }
  }

  function createItemHandler () {
    const validationError = validateTitle(title)
    if (validationError) {
      setError(validationError)
    } else {
      onCreateItem(title.trim())
      setTitle('')
    }
  }

  return (
    <div>
      <div className="task-input-wrapper">
        <input
          value={title}
          placeholder={'Task To Be Done'}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
          className={`task-input ${error ? 'error' : ''}`}
        />
        <Button title={'Add'} onClick={createItemHandler} className={'btn primary'}/>
      </div>
      <div className={'error-wrapper'}>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
    </div>
  )
}