import type { Todo, TodoRequest, MetaResponse, TodoInfo } from '../types'

const BASE_URL = 'https://easydev.club/api/v1'

export const getTodos = async (status?: 'all' | 'completed' | 'inWork'): Promise<MetaResponse<Todo, TodoInfo>> => {
  const query = status ? `?filter=${status}` : ''
  const res = await fetch(`${BASE_URL}/todos${query}`)
  return res.json()
}

export const getTodoById = async (id: number): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/todos/${id}`)
  return res.json()
}

export const addTodo = async (todo: TodoRequest): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
  return res.json()
}

export const updateTodo = async (id: number, todo: TodoRequest): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
  return res.json()
}

export const deleteTodo = async (id: number): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}
