import { Icons } from '@constants/icons'

/**
 * Componente de loading spinner
 */
function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  return (
    <Icons.Loader2
      className={`animate-spin text-primary-600 dark:text-primary-400 ${sizes[size]} ${className}`}
    />
  )
}

/**
 * Loading overlay para cubrir una sección
 */
function LoadingOverlay({ message = 'Cargando...' }) {
  return (
    <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300">{message}</p>
      </div>
    </div>
  )
}

/**
 * Loading completo de página
 */
function PageLoader({ message = 'Cargando...' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-4 text-base font-medium text-gray-600 dark:text-gray-300">{message}</p>
      </div>
    </div>
  )
}

/**
 * Skeleton loader para contenido
 */
function Skeleton({ className = '', rows = 1 }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${className}`}
        ></div>
      ))}
    </div>
  )
}

// Exportar todos los componentes
Spinner.Overlay = LoadingOverlay
Spinner.Page = PageLoader
Spinner.Skeleton = Skeleton

export default Spinner
