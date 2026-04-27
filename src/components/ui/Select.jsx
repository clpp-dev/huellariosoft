import { forwardRef } from 'react'
import { cn } from '@utils/helpers'

/**
 * Componente Select reutilizable
 */
const Select = forwardRef(
  (
    {
      label,
      error,
      helperText,
      options = [],
      placeholder = 'Seleccionar...',
      className,
      containerClassName,
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('w-full', containerClassName)}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Select */}
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            'block w-full rounded-lg border shadow-sm',
            'px-3 py-2.5 text-sm',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-white',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-300 dark:border-red-700 text-red-900 dark:text-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500',
            disabled && 'bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-600 cursor-not-allowed',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Helper text o error */}
        {(error || helperText) && (
          <p
            className={cn(
              'mt-1.5 text-sm',
              error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
