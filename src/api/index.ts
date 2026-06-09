import type { Application, NearbySpot, Ticket, User } from '@/types'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}

export const ticketApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : ''
    return request<Ticket[]>(`/tickets${qs}`)
  },
  get: (id: string) => request<Ticket>(`/tickets/${id}`),
  nearby: (id: string) => request<NearbySpot[]>(`/tickets/${id}/nearby`)
}

export const authApi = {
  login: (email: string, password: string) =>
    request<User>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (payload: { email: string; nickname: string; password: string }) =>
    request<void>('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  findPassword: (email: string) =>
    request<void>('/auth/find-password', { method: 'POST', body: JSON.stringify({ email }) }),
  sendEmailCode: (email: string) =>
    request<void>('/auth/email-code', { method: 'POST', body: JSON.stringify({ email }) }),
  verifyEmailCode: (email: string, code: string) =>
    request<void>('/auth/verify-code', { method: 'POST', body: JSON.stringify({ email, code }) })
}

export const applicationApi = {
  apply: (ticketId: string) =>
    request<Application>('/applications', { method: 'POST', body: JSON.stringify({ ticketId }) }),
  list: () => request<Application[]>('/applications'),
  cancel: (id: string) => request<void>(`/applications/${id}`, { method: 'DELETE' })
}

export const userApi = {
  checkNickname: (nickname: string) =>
    request<{ available: boolean }>(`/user/check-nickname?nickname=${nickname}`),
  updateProfile: (payload: {
    nickname?: string
    currentPassword?: string
    newPassword?: string
  }) => request<void>('/user/profile', { method: 'PUT', body: JSON.stringify(payload) })
}
