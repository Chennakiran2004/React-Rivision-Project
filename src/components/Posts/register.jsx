import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from './api'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault()

    const registerData = {
      username: username,
      password: password,
      email: email,
    }

    try {
      const response = await fetch(`${BASE_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      })

      if (!response.ok) {
        setError('Registration failed. Please try again.')
        return
      }

      const data = await response.json()
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      navigate('/')
    } catch (error) {
      console.error('Error during registration:', error)
      setError('An error occurred during registration. Please try again later.')
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <header className="auth-header">
          <p className="eyebrow">Get started</p>
          <h2>Create account.</h2>
          <p className="auth-subtitle">A quiet place to keep every note you write.</p>
        </header>

        <form className="auth-form" onSubmit={(event) => handleRegister(event)}>
          <div className="field-group">
            <label className="field-label" htmlFor="username">
              Username
            </label>
            <input
              className="text-input"
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="email">
              Email
            </label>
            <input
              className="text-input"
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <input
              className="text-input"
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-button auth-submit" type="submit">
            Create account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  )
}

export default Register
