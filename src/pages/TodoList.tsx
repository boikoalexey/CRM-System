import { useEffect, useState } from 'react'
import { todolistAPI } from '../api'
import type { Filter, Todo, TodoInfo } from '../types'
import { CreateTodoForm } from '../components/CreateTodoForm.tsx'
import { TodoFilters } from '../components/TodoFilters.tsx'
import { TodoItem } from '../components/TodoItem/TodoItem.tsx'

const REFRESH_MS = 5000

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [info, setInfo] = useState<TodoInfo>()
  const [filter, setFilter] = useState<Filter>(
    () => (localStorage.getItem('todoFilter') as Filter) || 'all'
  )

  useEffect(() => {
    loadTodos(filter)

    const id = setInterval(() => {
      loadTodos(filter)
    }, REFRESH_MS)

    return () => clearInterval(id)
  }, [filter])

  useEffect(() => localStorage.setItem('todoFilter', filter), [filter])

  function loadTodos(filter: Filter) {
    todolistAPI.getTodos(filter)
      .then((res) => {
        if (res) {
          setTodos(res.data)
          setInfo(res.info)
        }
      })
  }

  return (
    <div className="container">
      <CreateTodoForm onReload={() => loadTodos(filter)}/>
      <TodoFilters
        current={filter}
        onChange={setFilter}
        counts={info}
      />
      {todos.map((todo: Todo) =>
        <TodoItem
          key={todo.id}
          todo={todo}
          onReload={() => loadTodos(filter)}
        />
      )}
    </div>
  )
}
