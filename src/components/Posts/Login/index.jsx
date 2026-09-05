import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../StoreProvide'
import { observer } from 'mobx-react-lite'

const Login = observer(() => {
  const {
    store: { loginStore },
  } = useStore()

  const { login, error, isSubmitting, username, password, setUsername, setPassword } = loginStore

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    login()
    navigate('/', { replace: true })
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
})

export default Login
