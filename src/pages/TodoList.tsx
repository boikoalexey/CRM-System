import { useEffect, useState } from 'react'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../api/todos'
import type { Todo, TodoInfo } from '../types'
import { CreateTodoForm } from '../components/CreateTodoForm.tsx'
import { TodoItem } from '../components/TodoItem/TodoItem.tsx'

type Filter = 'all' | 'inWork' | 'completed'

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [info, setInfo] = useState<TodoInfo | undefined>()
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => loadTodos(filter), [filter])

  function loadTodos(filter: Filter) {
    getTodos(filter).then((res) => {
      setTodos(res.data)
      setInfo(res.info)
    })
  }

  function createTodo(title: string) {
    addTodo({ title }).then(() => loadTodos(filter))
  }

  function removeTodo(id: number) {
    deleteTodo(id).then(() => loadTodos(filter))
  }

  function updateTodoTitle(id: number, title: string) {
    updateTodo(id, { title }).then(() => loadTodos(filter))
  }

  function updateTodoStatus(id: number, isDone: boolean) {
    updateTodo(id, { isDone }).then(() => loadTodos(filter))
  }

  const filters = [
    { key: 'all', label: 'Все', count: info?.all },
    { key: 'inWork', label: 'В работе', count: info?.inWork },
    { key: 'completed', label: 'Сделано', count: info?.completed },
  ] as const


  return (
    <div className="container">
      <CreateTodoForm onCreateItem={createTodo}/>
      <div className="status-filters">
        {filters.map(({ key, label, count }) => (
          <p
            key={key}
            onClick={() => setFilter(key)}
            className={`text-button ${filter === key ? 'active-text-button' : ''}`}
          >
            {label} ({count ?? 0})
          </p>
        ))}
      </div>
      {todos.map((todo) => {
        function handleToggle (id: number, isDone: boolean){
          updateTodoStatus(id, isDone)
        }
        function handleEdit (id: number, newTitle: string) {
          updateTodoTitle(id, newTitle)
        }
        function handleDelete (id: number){
          removeTodo(id)
        }

        return (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.isDone}
            onToggleStatus={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )
      })}
    </div>
  )
}

export default TodoList
