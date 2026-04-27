import { forwardRef } from 'react'
import { cn } from '@utils/helpers'

/**
 * Componente Input reutilizable con soporte para errores y estados
 */
const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      onRightIconClick,
      className,
      containerClassName,
      type = 'text',
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

        {/* Input container */}
        <div className="relative">
          {/* Icono izquierdo */}
          {LeftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LeftIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(
              'block w-full rounded-lg border shadow-sm',
              'px-3 py-2.5 text-sm',
              'bg-white dark:bg-gray-800',
              'text-gray-900 dark:text-white',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              error
                ? 'border-red-300 dark:border-red-700 text-red-900 dark:text-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500',
              disabled && 'bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-600 cursor-not-allowed',
              LeftIcon && 'pl-10',
              RightIcon && 'pr-10',
              className
            )}
            {...props}
          />

          {/* Icono derecho */}
          {RightIcon && (
            <div 
              className={cn(
                "absolute inset-y-0 right-0 pr-3 flex items-center",
                onRightIconClick ? "cursor-pointer" : "pointer-events-none"
              )}
              onClick={onRightIconClick}
            >
              <RightIcon
                className={cn(
                  'h-5 w-5',
                  error ? 'text-red-400' : 'text-gray-400 dark:text-gray-500',
                  onRightIconClick && 'hover:text-gray-600 dark:hover:text-gray-400 transition-colors'
                )}
              />
            </div>
          )}
        </div>

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

Input.displayName = 'Input'

export default Input
