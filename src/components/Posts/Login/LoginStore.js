import { makeAutoObservable } from 'mobx'
import { BASE_URL, authHeaders } from '../api'

class LoginStore {
  username = ''
  password = ''
  error = ''
  isSubmitting = false

  constructor() {
    makeAutoObservable(this)
  }

  setUsername = (value) => {
    this.username = value
  }

  setPassword = (value) => {
    this.password = value
  }

  login = async () => {
    this.error = ''
    this.isSubmitting = true

    const loginData = {
      username: this.username,
      password: this.password,
    }

    try {
      const response = await fetch(`${BASE_URL}/token/`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(loginData),
      })

      if (!response.ok) {
        this.error = 'Those credentials did not match. Please try again.'
        return
      }

      const data = await response.json()
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
    } catch (loginError) {
      console.error('Error during login:', loginError)
      this.error = 'Could not reach the server. Please try again later.'
    }
  }
}

export default LoginStore
