import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTodoById } from '../api/todos'
import type { Todo } from '../types'

function TodoPage() {
  const { id } = useParams()
  const [todo, setTodo] = useState<Todo | null>(null)

  useEffect(() => {
    if (id) {
      getTodoById(Number(id)).then(setTodo)
    }
  }, [id])

  if (!todo) return <div>Загрузка...</div>

  return (
    <div>
      <h2>{todo.title}</h2>
      <p>Статус: {todo.isDone ? 'Сделано' : 'В работе'}</p>
      <p>Создано: {new Date(todo.created).toLocaleString()}</p>
    </div>
  )
}

export default TodoPage
