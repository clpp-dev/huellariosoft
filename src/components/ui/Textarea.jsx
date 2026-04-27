import { forwardRef } from 'react'
import { cn } from '@utils/helpers'

/**
 * Componente Textarea reutilizable
 */
const Textarea = forwardRef(
  (
    {
      label,
      error,
      helperText,
      className,
      containerClassName,
      disabled = false,
      required = false,
      rows = 4,
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

        {/* Textarea */}
        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled}
          className={cn(
            'block w-full rounded-lg border shadow-sm',
            'px-3 py-2.5 text-sm',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-white',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'resize-none',
            error
              ? 'border-red-300 dark:border-red-700 text-red-900 dark:text-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500',
            disabled && 'bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-600 cursor-not-allowed',
            className
          )}
          {...props}
        />

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

Textarea.displayName = 'Textarea'

export default Textarea
