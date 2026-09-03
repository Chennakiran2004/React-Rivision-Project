export const BASE_URL = 'http://127.0.0.1:8000/api'

export const getToken = () => localStorage.getItem('access')

export const isLoggedIn = () => Boolean(getToken())

export const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
})

export const logout = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
}
