import { makeAutoObservable } from 'mobx'
import { BASE_URL, authHeaders } from '../api'

class RegisterStore {
  username = ''
  password = ''
  error = ''
  email = ''
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

  setEmail = (value) => {
    this.email = value
  }

  register = async () => {
    this.error = ''
    this.isSubmitting = true

    const registerData = {
      username: this.username,
      password: this.password,
      email: this.email,
    }

    try {
      const response = await fetch(`${BASE_URL}/register/`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(registerData),
      })

      if (!response.ok) {
        this.error = 'Registration failed. Please try again.'
        return
      }

      const data = await response.json()
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
    } catch (error) {
      console.log('register error', error)
      this.error = 'An error occurred during registration. Please try again later.'
    }
  }
}

export default RegisterStore
