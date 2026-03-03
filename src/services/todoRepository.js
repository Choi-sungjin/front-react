import { api } from './apiClient'

/**
 * Todo API 래퍼
 * 백엔드 기준 엔드포인트:
 *  - GET    /todos
 *  - POST   /todos
 *  - PUT    /todos/:id
 *  - DELETE /todos/:id
 */

export const todoRepository = {
  async list() {
    return api.get('/todos')
  },

  /**
   * @param {{ title: string, completed?: boolean }} body
   */
  async create(body) {
    return api.post('/todos', body)
  },

  /**
   * @param {string} id
   * @param {{ title?: string, completed?: boolean }} patch
   */
  async update(id, patch) {
    return api.put(`/todos/${id}`, patch)
  },

  /**
   * @param {string} id
   */
  async remove(id) {
    return api.delete(`/todos/${id}`)
  },
}

