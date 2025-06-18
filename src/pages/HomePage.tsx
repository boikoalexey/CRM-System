import { useEffect, useState } from 'react'
import { getTodos } from '../api/todos'
import type { Todo, TodoInfo } from '../types'
import { Link } from 'react-router-dom'

function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [info, setInfo] = useState<TodoInfo | undefined>()

  useEffect(() => {
    getTodos('all').then((res) => {
      setTodos(res.data)
      setInfo(res.info)
    })
  }, [])

  return (
    <div>
      <h1>Список задач</h1>
      <p>Всего: {info?.all}, Завершено: {info?.completed}, В работе: {info?.inWork}</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/todo/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
