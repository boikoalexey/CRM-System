import { useCallback, useEffect, useState } from 'react'
import { getTodos } from '../api'
import type { Filter, Todo, TodoInfo } from '../types'
import { CreateTodoForm } from '../components/CreateTodoForm.tsx'
import { TodoFilters } from '../components/TodoFilters.tsx'
import { TodoItem } from '../components/TodoItem/TodoItem.tsx'

const REFRESH_MS = 5000

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [info, setInfo] = useState<TodoInfo>()
  const [filter, setFilter] = useState<Filter>('all')

  const loadTodos = useCallback(() => {
    getTodos(filter)
      .then((res) => {
        if (res) {
          setTodos(res.data)
          setInfo(res.info)
        }
      })
  }, [filter])

  useEffect(() => {
    loadTodos()
    const id = setInterval(() => loadTodos(), REFRESH_MS)
    return () => clearInterval(id)
  }, [loadTodos])

  return (
    <div className="container">
      <CreateTodoForm onReload={loadTodos}/>
      <TodoFilters
        current={filter}
        onChange={setFilter}
        counts={info}
      />
      {todos.map((todo: Todo) =>
        <TodoItem
          key={todo.id}
          todo={todo}
          onReload={loadTodos}
        />
      )}
    </div>
  )
}
