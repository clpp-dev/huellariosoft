import { forwardRef } from 'react'
import { cn } from '@utils/helpers'
import { Icons } from '@constants/icons'

/**
 * Componente Button reutilizable con variantes y tamaños
 */
const Button = forwardRef(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Variantes de estilos
    const variants = {
      primary:
        'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-md hover:shadow-lg dark:bg-primary-700 dark:hover:bg-primary-600',
      secondary:
        'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-md hover:shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600',
      success:
        'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 shadow-md hover:shadow-lg',
      danger:
        'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500 shadow-md hover:shadow-lg',
      warning:
        'bg-warning-600 text-white hover:bg-warning-700 focus:ring-warning-500 shadow-md hover:shadow-lg',
      outline:
        'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-500',
      ghost:
        'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
      link: 'bg-transparent text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline p-0',
    }

    // Tamaños
    const sizes = {
      xs: 'px-2.5 py-1.5 text-xs',
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-5 py-3 text-base',
      xl: 'px-6 py-3.5 text-base',
    }

    // Tamaños de iconos según el tamaño del botón
    const iconSizes = {
      xs: 'w-3.5 h-3.5',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-5 h-5',
      xl: 'w-6 h-6',
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center',
          'font-medium rounded-lg',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none',
          variants[variant],
          variant !== 'link' && sizes[size],
          className
        )}
        {...props}
      >
        {loading && (
          <Icons.Loader2
            className={cn('animate-spin', iconSizes[size], children && 'mr-2')}
          />
        )}
        {!loading && LeftIcon && (
          <LeftIcon className={cn(iconSizes[size], children && 'mr-2')} />
        )}
        {children}
        {!loading && RightIcon && (
          <RightIcon className={cn(iconSizes[size], children && 'ml-2')} />
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
