import type { Todo, TodoRequest, MetaResponse, TodoInfo, Filter } from '../types'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://easydev.club/api/v1',
})

export const todolistAPI = {
  async getTodos(status: Filter) {
    try {
      const params = { filter: status }
      const res = await instance.get<MetaResponse<Todo, TodoInfo>>('/todos', { params })
      return res.data
    } catch (error) {
      console.error('Error in getTodos:', error)
    }
  },

  async addTodo(todo: TodoRequest) {
    try {
      await instance.post<Todo>('/todos', todo)
    } catch (error) {
      console.error('Error in addTodo:', error)
    }
  },

  async updateTodo(id: number, todo: TodoRequest) {
    try {
      await instance.put<Todo>(`/todos/${id}`, todo)
    } catch (error) {
      console.error('Error in updateTodo:', error)
    }
  },

  async deleteTodo(id: number) {
    try {
      await instance.delete<void>(`/todos/${id}`)
    } catch (error) {
      console.error('Error in deleteTodo:', error)
    }
  },
}
