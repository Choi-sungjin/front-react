import { useEffect, useState, useCallback } from 'react'
import { useTodoStore } from './state/useTodoStore'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { FilterTabs } from './components/FilterTabs'

function App() {
  const { todos, loading, error, fetchTodos, addTodo, toggleTodo, deleteTodo } =
    useTodoStore()
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleAdd = useCallback(
    async (title) => {
      await addTodo(title)
    },
    [addTodo]
  )

  const filteredTodos =
    filter === 'all'
      ? todos
      : filter === 'completed'
        ? todos.filter((t) => t.completed)
        : todos.filter((t) => !t.completed)

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Todo List</h1>
      </header>
      <main className="app-main">
        <section className="app-panel">
          <TodoForm onSubmit={handleAdd} loading={loading} />
          <FilterTabs value={filter} onChange={setFilter} />
          <TodoList
            todos={filteredTodos}
            loading={loading}
            error={error}
            filter={filter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onRetry={fetchTodos}
          />
        </section>
      </main>
    </div>
  )
}

export default App

