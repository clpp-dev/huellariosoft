import { cn } from '@utils/helpers'

/**
 * Componente Card reutilizable para contenedores
 */
function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-md overflow-hidden',
        hover && 'transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Header del Card
 */
function CardHeader({ children, className, ...props }) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Título del Card
 */
function CardTitle({ children, className, ...props }) {
  return (
    <h3
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

/**
 * Descripción del Card
 */
function CardDescription({ children, className, ...props }) {
  return (
    <p className={cn('mt-1 text-sm text-gray-500', className)} {...props}>
      {children}
    </p>
  )
}

/**
 * Contenido del Card
 */
function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * Footer del Card
 */
function CardFooter({ children, className, ...props }) {
  return (
    <div
      className={cn('px-6 py-4 bg-gray-50 border-t border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Exportar componente compuesto
Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

export default Card
