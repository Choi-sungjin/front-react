const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '진행' },
  { key: 'completed', label: '완료' },
]

export function FilterTabs({ value, onChange }) {
  return (
    <div className="toolbar">
      <div className="toolbar-title">필터</div>
      <div className="tabs" role="tablist" aria-label="Todo 필터">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={value === f.key}
            className={
              value === f.key
                ? 'tabs__button tabs__button--active'
                : 'tabs__button'
            }
            onClick={() => onChange(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}

