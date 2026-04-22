import { Icons } from '@constants/icons'

/**
 * Componente de estado vacío genérico
 */
function EmptyState({
  icon: Icon = Icons.AlertCircle,
  title = 'No hay datos',
  description = 'No se encontraron elementos para mostrar',
  action,
  actionLabel,
}) {
  return (
    <div className="text-center py-12">
      <Icon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
        {description}
      </p>
      {action && actionLabel && (
        <div className="mt-6">
          <button
            onClick={action}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Icons.Plus className="-ml-1 mr-2 h-5 w-5" />
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  )
}

export default EmptyState
