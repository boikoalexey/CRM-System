import type { Todo, TodoRequest, MetaResponse, TodoInfo } from '../types'

const BASE_URL = 'https://easydev.club/api/v1'

export const getTodos = async (status?: 'all' | 'completed' | 'inWork'): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const query = status ? `?filter=${status}` : ''
    const res = await fetch(`${BASE_URL}/todos${query}`)
    return res.json()
  } catch (error) {
    console.error('Error in getTodos:', error)
    throw error
  }
}

export const getTodoById = async (id: number): Promise<Todo> => {
  try {
    const res = await fetch(`${BASE_URL}/todos/${id}`)
    return res.json()
  } catch (error) {
    console.error('Error in getTodoById:', error)
    throw error
  }
}

export const addTodo = async (todo: TodoRequest): Promise<Todo> => {
  try {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
    return res.json()
  } catch (error) {
    console.error('Error in addTodo:', error)
    throw error
  }
}

export const updateTodo = async (id: number, todo: TodoRequest): Promise<Todo> => {
  try {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
    return res.json()
  } catch (error) {
    console.error('Error in updateTodo:', error)
    throw error
  }
}

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.error('Error in deleteTodo:', error)
    throw error
  }
}
