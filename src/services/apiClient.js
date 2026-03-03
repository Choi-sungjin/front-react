/**
 * API 클라이언트
 * - 기본 베이스: /api
 * - VITE_API_BASE_URL이 있으면 우선 사용
 * - URL 슬래시 중복 방지
 */

/**
 * base와 path를 안전하게 결합한다.
 * @param {string} base
 * @param {string} path
 */
function joinUrl(base, path) {
  const b = base.endsWith('/') ? base.slice(0, -1) : base
  const p = path.startsWith('/') ? path : `/${path}`
  return `${b}${p}`
}

const RAW_BASE =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    (import.meta.env.VITE_API_BASE_URL ||
      import.meta.env.VITE_API_URL ||
      import.meta.env.REACT_APP_API_URL)) ||
  '/api'

const BASE = RAW_BASE || '/api'

function getUrl(path) {
  return joinUrl(BASE, path)
}

/**
 * @template T
 * @param {string} path
 * @param {RequestInit} [options]
 * @returns {Promise<{ success: boolean, data: T | null, message?: string }>}
 */
export async function request(path, options = {}) {
  const url = getUrl(path)

  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    url.startsWith('http://')
  ) {
    return {
      success: false,
      data: null,
      message:
        'HTTPS 페이지에서 HTTP API를 호출할 수 없습니다. VITE_API_BASE_URL을 https 주소로 설정해 주세요.',
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  let res
  try {
    res = await fetch(url, { ...options, headers })
  } catch (e) {
    return {
      success: false,
      data: null,
      message:
        e?.message ||
        `네트워크 오류: ${url} 요청 실패 (백엔드/CORS/환경변수 확인)`,
    }
  }

  const json = await res.json().catch(() => ({}))

  if (!res.ok) {
    const messageFromBody =
      (json && (json.message || json.error || json.detail)) || null

    return {
      success: false,
      data: null,
      message:
        messageFromBody ||
        res.statusText ||
        `요청이 실패했습니다. (HTTP ${res.status})`,
    }
  }

  return {
    success: true,
    data: json.data ?? json ?? null,
    message: json.message,
  }
}

export const api = {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) =>
    request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) =>
    request(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
}

