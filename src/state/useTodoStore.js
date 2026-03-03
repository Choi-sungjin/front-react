import { useState, useCallback } from 'react'
import { todoRepository } from '../services/todoRepository'

/**
 * Todo 상태 관리 훅
 * - CRUD
 * - 로딩/에러 상태
 */
export function useTodoStore() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTodos = useCallback(async () => {
    setLoading(true)
    setError(null)
    const res = await todoRepository.list()
    setLoading(false)

    if (!res.success) {
      setError(res.message || '목록을 불러오지 못했습니다.')
      setTodos([])
      return
    }

    const list = Array.isArray(res.data) ? res.data : []
    setTodos(list)
  }, [])

  const addTodo = useCallback(async (title) => {
    const t = title.trim()
    if (!t) return null
    setError(null)
    const res = await todoRepository.create({ title: t, completed: false })
    if (!res.success) {
      setError(res.message || '추가에 실패했습니다.')
      return null
    }
    setTodos((prev) => [...prev, res.data])
    return res.data
  }, [])

  const toggleTodo = useCallback(
    async (id) => {
      const target = todos.find((t) => t.id === id || t._id === id)
      if (!target) return null
      const realId = target.id ?? target._id
      const nextCompleted = !Boolean(target.completed)

      setError(null)
      const res = await todoRepository.update(realId, {
        completed: nextCompleted,
      })
      if (!res.success) {
        setError(res.message || '변경에 실패했습니다.')
        return null
      }

      setTodos((prev) =>
        prev.map((t) =>
          (t.id ?? t._id) === realId ? { ...t, ...res.data } : t
        )
      )
      return res.data
    },
    [todos]
  )

  const deleteTodo = useCallback(async (id) => {
    const target = todos.find((t) => t.id === id || t._id === id)
    if (!target) return false
    const realId = target.id ?? target._id

    setError(null)
    const res = await todoRepository.remove(realId)
    if (!res.success) {
      setError(res.message || '삭제에 실패했습니다.')
      return false
    }

    setTodos((prev) =>
      prev.filter((t) => (t.id ?? t._id) !== realId)
    )
    return true
  }, [todos])

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
}

