// Central API utility for all backend requests
// Automatically uses Vite proxy in dev, or VITE_API_URL in production

const BASE_URL = import.meta.env.VITE_API_URL || ''

// Get JWT token from localStorage
const getToken = () => localStorage.getItem('admin_token')

// Build request headers, optionally adding auth
const buildHeaders = (auth = false, isFormData = false) => {
  const headers = {}
  if (!isFormData) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

// Generic fetch wrapper with error handling
const request = async (method, endpoint, body = null, auth = false) => {
  const isFormData = body instanceof FormData
  const config = {
    method,
    headers: buildHeaders(auth, isFormData),
  }
  if (body) config.body = isFormData ? body : JSON.stringify(body)

  const response = await fetch(`${BASE_URL}${endpoint}`, config)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status} error`)
  }
  return data
}

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authAPI = {
  googleLogin: (credential) =>
    request('POST', '/api/auth/google', { credential }),
  getMe: () =>
    request('GET', '/api/auth/me', null, true),
}

// ─── Products API ─────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return request('GET', `/api/products${query ? `?${query}` : ''}`)
  },
  getOne: (id) =>
    request('GET', `/api/products/${id}`),
  create: (formData) =>
    request('POST', '/api/products', formData, true),
  update: (id, formData) =>
    request('PUT', `/api/products/${id}`, formData, true),
  delete: (id) =>
    request('DELETE', `/api/products/${id}`, null, true),
}

// ─── Orders API ───────────────────────────────────────────────────────────────
export const ordersAPI = {
  create: (orderData) =>
    request('POST', '/api/orders', orderData),
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return request('GET', `/api/orders${query ? `?${query}` : ''}`, null, true)
  },
  getOne: (id) =>
    request('GET', `/api/orders/${id}`, null, true),
  updateStatus: (id, statusData) =>
    request('PATCH', `/api/orders/${id}/status`, statusData, true),
  getStats: () =>
    request('GET', '/api/orders/stats', null, true),
}

// ─── Payments API ─────────────────────────────────────────────────────────────
export const paymentsAPI = {
  createOrder: (amount) =>
    request('POST', '/api/payments/create-order', { amount }),
  verify: (paymentData) =>
    request('POST', '/api/payments/verify', paymentData),
}
