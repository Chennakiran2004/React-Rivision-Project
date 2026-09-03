import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from './api'

const ProtectedRoute = () => {
  if (isLoggedIn() === false) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
