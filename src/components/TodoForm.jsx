import { useState } from 'react'

export function TodoForm({ onSubmit, loading }) {
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const t = title.trim()
    if (!t || submitting) return
    setSubmitting(true)
    try {
      await onSubmit(t)
      setTitle('')
    } finally {
      setSubmitting(false)
    }
  }

  const disabled = loading || submitting

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field-row">
        <input
          className="field-input"
          type="text"
          placeholder="할 일을 입력하고 Enter를 눌러 추가하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="primary-btn" disabled={disabled}>
          {disabled ? '저장 중...' : '추가'}
        </button>
      </div>
      <p className="helper-text">
        간단한 Todo를 적고, 엔터 또는 추가 버튼으로 저장할 수 있어요.
      </p>
    </form>
  )
}

