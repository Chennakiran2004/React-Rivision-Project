import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../StoreProvide'
import { observer } from 'mobx-react-lite'

const Register = observer(() => {
  const {
    store: { registerStore },
  } = useStore()

  const {
    register,
    error,
    username,
    password,
    email,
    setEmail,
    setUsername,
    setPassword,
    isSubmitting,
  } = registerStore

  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault()
    register()
    navigate('/')
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

          <button className="primary-button auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  )
})

export default Register
