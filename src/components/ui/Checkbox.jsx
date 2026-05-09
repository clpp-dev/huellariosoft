import { forwardRef } from 'react'
import { cn } from '@utils/helpers'

/**
 * Componente Checkbox reutilizable
 */
const Checkbox = forwardRef(
  (
    {
      label,
      description,
      error,
      className,
      containerClassName,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('w-full', containerClassName)}>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              type="checkbox"
              disabled={disabled}
              className={cn(
                'h-4 w-4 rounded border-gray-300 dark:border-gray-600',
                'text-primary-600 focus:ring-primary-500',
                'bg-white dark:bg-gray-800',
                'transition-colors duration-200',
                disabled && 'cursor-not-allowed opacity-50',
                error && 'border-red-300 dark:border-red-700',
                className
              )}
              {...props}
            />
          </div>
          {(label || description) && (
            <div className="ml-3 text-sm">
              {label && (
                <label
                  className={cn(
                    'font-medium text-gray-700 dark:text-gray-300',
                    disabled && 'cursor-not-allowed opacity-50'
                  )}
                >
                  {label}
                </label>
              )}
              {description && (
                <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
