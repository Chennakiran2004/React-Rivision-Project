import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL, authHeaders } from './api'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const loginData = {
      username: username,
      password: password,
    }

    try {
      const response = await fetch(`${BASE_URL}/token/`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(loginData),
      })

      if (!response.ok) {
        setError('Those credentials did not match. Please try again.')
        return
      }

      const data = await response.json()
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      navigate('/', { replace: true })
    } catch (loginError) {
      console.error('Error during login:', loginError)
      setError('Could not reach the server. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <header className="auth-header">
          <p className="eyebrow">Welcome back</p>
          <h2>Sign in.</h2>
          <p className="auth-subtitle">Your collection is waiting where you left it.</p>
        </header>

        <form className="auth-form" onSubmit={handleLogin}>
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
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <input
              className="text-input"
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-button auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="auth-footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  )
}

export default Login
