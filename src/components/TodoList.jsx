export function TodoList({
  todos,
  loading,
  error,
  filter,
  onToggle,
  onDelete,
  onRetry,
}) {
  const renderEmptyText = () => {
    if (filter === 'all') return '등록된 할 일이 없습니다.'
    if (filter === 'active') return '진행 중인 할 일이 없습니다.'
    if (filter === 'completed') return '완료된 할 일이 없습니다.'
    return '항목이 없습니다.'
  }

  return (
    <section aria-label="할 일 목록">
      <ul className="list">
        {todos.map((todo) => {
          const id = todo.id ?? todo._id
          return (
            <li key={id} className="todo-item">
              <input
                type="checkbox"
                className="todo-item__checkbox"
                checked={Boolean(todo.completed)}
                onChange={() => onToggle(id)}
              />
              <span
                className={
                  todo.completed
                    ? 'todo-item__title todo-item__title--completed'
                    : 'todo-item__title'
                }
              >
                {todo.title}
              </span>
              <button
                type="button"
                className="icon-btn"
                aria-label="할 일 삭제"
                onClick={() => onDelete(id)}
              >
                ✕
              </button>
            </li>
          )
        })}
      </ul>

      <div className="meta-row">
        <div>
          {loading && (
            <span className="status-pill status-pill--muted">
              불러오는 중...
            </span>
          )}
          {!loading && !error && todos.length === 0 && (
            <span className="status-pill status-pill--muted">
              {renderEmptyText()}
            </span>
          )}
          {error && (
            <span className="status-pill status-pill--danger">
              <span className="error-text">{error}</span>
              <button
                type="button"
                className="retry-btn"
                onClick={onRetry}
              >
                다시 시도
              </button>
            </span>
          )}
        </div>
        {!loading && !error && todos.length > 0 && (
          <span className="status-pill status-pill--success">
            총 {todos.length}개
          </span>
        )}
      </div>
    </section>
  )
}

