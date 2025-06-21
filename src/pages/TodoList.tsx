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

  useEffect(() => loadTodos(), [])

  function loadTodos() {
    getTodos('all').then((res) => {
      setTodos(res.data)
      setInfo(res.info)
    })
  }

  function createTodo(title: string) {
    addTodo({ title }).then(() => loadTodos())
  }

  function removeTodo(id: number) {
    deleteTodo(id).then(() => loadTodos())
  }

  function updateTodoTitle(id: number, title: string) {
    updateTodo(id, { title }).then(() => loadTodos())
  }

  function updateTodoStatus(id: number, isDone: boolean) {
    updateTodo(id, { isDone }).then(() => loadTodos())
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'inWork') return !todo.isDone
    if (filter === 'completed') return todo.isDone
    return true
  })

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
      {filteredTodos.map((todo) => {
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
