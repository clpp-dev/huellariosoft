import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import authService from '@/services/authService'
import tokenService from '@/services/tokenService'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@constants/messages'

const AuthContext = createContext(null)

/**
 * Provider de autenticación
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  /**
   * Carga el perfil del usuario al iniciar la aplicación
   */
  const loadUser = useCallback(async () => {
    try {
      setLoading(true)

      // Verificar si hay token
      if (!tokenService.hasAccessToken()) {
        setIsAuthenticated(false)
        setUser(null)
        return
      }

      // Obtener perfil del usuario
      const response = await authService.getProfile()

      if (response.success && response.data) {
        setUser(response.data)
        setIsAuthenticated(true)
      } else {
        // Si falla, limpiar sesión
        handleLogout(false)
      }
    } catch (error) {
      console.error('Error cargando usuario:', error)
      // Si hay error, limpiar sesión
      handleLogout(false)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Efecto para cargar usuario al montar el componente
   */
  useEffect(() => {
    loadUser()
  }, [loadUser])

  /**
   * Inicia sesión
   * @param {Object} credentials - Email y password
   */
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials)

      if (response.success && response.data) {
        const { user: userData, accessToken, refreshToken } = response.data

        // Guardar tokens
        tokenService.setTokens(accessToken, refreshToken)

        // Guardar usuario
        setUser(userData)
        setIsAuthenticated(true)

        toast.success(SUCCESS_MESSAGES.LOGIN)

        // Redirigir al dashboard
        navigate('/dashboard', { replace: true })

        return { success: true }
      }

      return { success: false, message: response.message }
    } catch (error) {
      console.error('Error en login:', error)
      toast.error(error.message || ERROR_MESSAGES.GENERIC)
      return { success: false, message: error.message }
    }
  }

  /**
   * Cierra sesión
   * @param {boolean} showMessage - Mostrar mensaje de confirmación
   */
  const logout = async (showMessage = true) => {
    try {
      // Intentar cerrar sesión en el servidor
      await authService.logout()
    } catch (error) {
      console.error('Error en logout:', error)
    } finally {
      handleLogout(showMessage)
    }
  }

  /**
   * Maneja el proceso de logout local
   * @param {boolean} showMessage - Mostrar mensaje
   */
  const handleLogout = (showMessage = true) => {
    // Limpiar tokens
    tokenService.clearTokens()

    // Limpiar estado
    setUser(null)
    setIsAuthenticated(false)

    // Mostrar mensaje
    if (showMessage) {
      toast.info(SUCCESS_MESSAGES.LOGOUT)
    }

    // Redirigir a login
    navigate('/login', { replace: true })
  }

  /**
   * Actualiza los datos del usuario
   * @param {Object} userData - Nuevos datos del usuario
   */
  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData,
    }))
  }

  /**
   * Verifica si el usuario tiene un rol específico
   * @param {string|string[]} roles - Rol(es) a verificar
   * @returns {boolean} - True si tiene el rol
   */
  const hasRole = (roles) => {
    if (!user) return false

    const rolesArray = Array.isArray(roles) ? roles : [roles]
    return rolesArray.includes(user.rol)
  }

  /**
   * Verifica si el usuario tiene alguno de los roles especificados
   * @param {string[]} roles - Array de roles
   * @returns {boolean} - True si tiene alguno de los roles
   */
  const hasAnyRole = (roles) => {
    if (!user) return false
    return roles.some(role => user.rol === role)
  }

  /**
   * Verifica si el usuario tiene todos los roles especificados
   * @param {string[]} roles - Array de roles
   * @returns {boolean} - True si tiene todos los roles
   */
  const hasAllRoles = (roles) => {
    if (!user) return false
    return roles.every(role => user.rol === role)
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    loadUser,
    hasRole,
    hasAnyRole,
    hasAllRoles,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook para usar el contexto de autenticación
 * @returns {Object} - Contexto de autenticación
 */
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }

  return context
}

export default AuthContext
