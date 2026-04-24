import { NavLink } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import { Icons } from '@constants/icons'
import { ROLES } from '@constants/enums'
import { cn } from '@utils/helpers'
import logoOnly from '@assets/img/ONLY_LOGO.png'

/**
 * Sidebar principal de la aplicación
 */
function Sidebar({ open, collapsed, onOpenChange, onCollapsedChange }) {
  const { user, hasAnyRole } = useAuth()

  // Configuración de navegación
  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Icons.Home,
      roles: Object.values(ROLES),
    },
    {
      name: 'Citas',
      href: '/appointments',
      icon: Icons.Calendar,
      roles: Object.values(ROLES),
    },
    {
      name: 'Propietarios',
      href: '/owners',
      icon: Icons.Users,
      roles: Object.values(ROLES),
    },
    {
      name: 'Mascotas',
      href: '/pets',
      icon: Icons.PawPrint,
      roles: Object.values(ROLES),
    },
    {
      name: 'Historia Clínica',
      href: '/medical-records',
      icon: Icons.FileText,
      roles: [ROLES.ADMIN, ROLES.VETERINARIAN],
    },
    {
      name: 'Inventario',
      href: '/inventory',
      icon: Icons.Package,
      roles: Object.values(ROLES),
    },
    {
      name: 'Facturación',
      href: '/invoices',
      icon: Icons.Receipt,
      roles: Object.values(ROLES),
    },
    {
      name: 'Reportes',
      href: '/reports',
      icon: Icons.BarChart3,
      roles: [ROLES.ADMIN],
    },
    {
      name: 'Usuarios',
      href: '/users',
      icon: Icons.UserCircle,
      roles: [ROLES.ADMIN],
    },
  ]

  // Filtrar navegación según roles
  const filteredNavigation = navigation.filter(item =>
    hasAnyRole(item.roles)
  )

  return (
    <>
      {/* Sidebar Desktop */}
      <aside
        className={cn(
          'hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:flex-col',
          'transition-all duration-300',
          'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700',
          collapsed ? 'lg:w-20' : 'lg:w-64'
        )}
      >
        {/* Logo */}
        <div className="LOGO-HUELALERIOSOFT-SIDEBAR flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src={logoOnly} alt="HuellarioSoft" className="w-10 h-10" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                HuellarioSoft
              </span>
            </div>
          )}
          
          {collapsed && (
            <div className="mx-auto w-10 h-10 rounded-xl flex items-center justify-center">
              <img src={logoOnly} alt="HuellarioSoft" className="w-10 h-10" />
            </div>
          )}

          {!collapsed && (
            <button
              onClick={() => onCollapsedChange(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Colapsar sidebar"
            >
              <Icons.ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {filteredNavigation.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                    'group relative',
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
                    collapsed && 'justify-center'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        'flex-shrink-0 transition-colors',
                        isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400',
                        collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'
                      )}
                    />
                    {!collapsed && <span>{item.name}</span>}
                    
                    {/* Tooltip para sidebar colapsado */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}

                    {/* Indicador activo */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-600 rounded-r" />
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Footer del sidebar */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {collapsed ? (
            <button
              onClick={() => onCollapsedChange(!collapsed)}
              className="w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Expandir sidebar"
            >
              <Icons.ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400 mx-auto" />
            </button>
          ) : (
            <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-700 dark:text-primary-400 font-semibold text-sm">
                  {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.nombre || 'Usuario'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || ''}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Sidebar Mobile */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 lg:hidden',
          'flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700',
          'transform transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img src={logoOnly} alt="HuellarioSoft" className="w-10 h-10" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              HuellarioSoft
            </span>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
            aria-label="Cerrar menú"
          >
            <Icons.X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {filteredNavigation.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => onOpenChange(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                    'group relative',
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        'w-5 h-5 mr-3 flex-shrink-0 transition-colors',
                        isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                      )}
                    />
                    <span>{item.name}</span>

                    {/* Indicador activo */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-600 rounded-r" />
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Footer del sidebar móvil */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-primary-700 dark:text-primary-400 font-semibold text-sm">
                {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.nombre || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email || ''}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
