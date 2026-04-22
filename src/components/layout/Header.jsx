import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import { Icons } from '@constants/icons'
import { ROLE_LABELS } from '@constants/enums'
import { CONFIRM_MESSAGES } from '@constants/messages'

/**
 * Header principal del dashboard
 */
function Header({ onMenuClick, sidebarCollapsed }) {
  const { user, logout } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef(null)

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  const handleLogout = () => {
    if (window.confirm(CONFIRM_MESSAGES.LOGOUT)) {
      logout()
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Lado izquierdo - Botón de menú móvil */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden transition-colors"
            aria-label="Abrir menú"
          >
            <Icons.Menu className="w-6 h-6" />
          </button>

          {/* Breadcrumb o título (opcional) */}
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-gray-900">
              Bienvenido, {user?.nombre?.split(' ')[0] || 'Usuario'}
            </h1>
          </div>
        </div>

        {/* Lado derecho - Acciones */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Botón de notificaciones */}
          <button
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Notificaciones"
          >
            <Icons.Bell className="w-6 h-6" />
            {/* Badge de notificaciones */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Menú de usuario */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Menú de usuario"
            >
              <div className="w-9 h-9 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white font-semibold text-sm">
                  {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.nombre || 'Usuario'}
                </p>
                <p className="text-xs text-gray-500">
                  {ROLE_LABELS[user?.rol] || user?.rol}
                </p>
              </div>

              <Icons.ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  userMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown del menú */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 animate-scale-in">
                {/* Info del usuario */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.nombre || 'Usuario'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || ''}
                  </p>
                  <span className="inline-flex items-center px-2 py-0.5 mt-2 rounded text-xs font-medium bg-primary-100 text-primary-800">
                    {ROLE_LABELS[user?.rol] || user?.rol}
                  </span>
                </div>

                {/* Opciones del menú */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      navigate('/profile')
                      setUserMenuOpen(false)
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Icons.UserCircle className="w-5 h-5 mr-3 text-gray-400" />
                    Mi Perfil
                  </button>

                  <button
                    onClick={() => {
                      navigate('/profile#settings')
                      setUserMenuOpen(false)
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Icons.Settings className="w-5 h-5 mr-3 text-gray-400" />
                    Configuración
                  </button>
                </div>

                {/* Cerrar sesión */}
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Icons.LogOut className="w-5 h-5 mr-3" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
