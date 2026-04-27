import { cn } from '@utils/helpers'

/**
 * Variantes de badges
 */
const variants = {
  primary: 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border-primary-200 dark:border-primary-800',
  secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700',
  success: 'bg-success-100 dark:bg-success-900 text-success-800 dark:text-success-200 border-success-200 dark:border-success-800',
  danger: 'bg-danger-100 dark:bg-danger-900 text-danger-800 dark:text-danger-200 border-danger-200 dark:border-danger-800',
  warning: 'bg-warning-100 dark:bg-warning-900 text-warning-800 dark:text-warning-200 border-warning-200 dark:border-warning-800',
  info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800',
}

/**
 * Componente Badge para etiquetas y estados
 */
function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
