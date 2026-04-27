import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import { Icons } from '@constants/icons'

/**
 * Componente de carga mientras se verifica la autenticación
 */
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col justify-center items-center text-center">
        <Icons.Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Cargando...</p>
      </div>
    </div>
  )
}

/**
 * Componente para proteger rutas que requieren autenticación
 * Redirige a login si el usuario no está autenticado
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // Mientras carga, mostrar pantalla de carga
  if (loading) {
    return <LoadingScreen />
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Si está autenticado, renderizar componente hijo
  return children
}

/**
 * Componente para proteger rutas que requieren roles específicos
 * Redirige a dashboard si el usuario no tiene el rol requerido
 */
export function RoleGuard({ children, roles = [] }) {
  const { user, hasAnyRole, loading } = useAuth()
  const location = useLocation()

  // Mientras carga, mostrar pantalla de carga
  if (loading) {
    return <LoadingScreen />
  }

  // Si no está autenticado, redirigir a login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Si no tiene ninguno de los roles permitidos, redirigir a dashboard
  if (roles.length > 0 && !hasAnyRole(roles)) {
    return <Navigate to="/dashboard" replace />
  }

  // Si tiene el rol, renderizar componente hijo
  return children
}

/**
 * Componente para rutas públicas (solo accesibles si NO está autenticado)
 * Redirige a dashboard si ya está autenticado
 */
export function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  // Mientras carga, mostrar pantalla de carga
  if (loading) {
    return <LoadingScreen />
  }

  // Si está autenticado, redirigir a dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  // Si no está autenticado, renderizar componente hijo
  return children
}

export default ProtectedRoute
