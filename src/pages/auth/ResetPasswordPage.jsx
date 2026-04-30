import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import Input from '@components/ui/Input'
import Button from '@components/ui/Button'
import { Icons } from '@constants/icons'
import authService from '@services/authService'

// Esquema de validación
const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Debe contener al menos una mayúscula, una minúscula y un número'
    )
    .required('La contraseña es requerida'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
})

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  })

  // Si no hay token, mostrar error
  if (!token) {
    return (
      <div className="w-full text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icons.XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Token Inválido
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          El enlace de recuperación no es válido o ha expirado.
        </p>

        <Link to="/forgot-password">
          <Button variant="primary" size="lg" className="w-full">
            Solicitar nuevo enlace
          </Button>
        </Link>
      </div>
    )
  }

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      const response = await authService.resetPassword(token, data.newPassword)
      toast.success(response.message || 'Contraseña actualizada exitosamente')
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.message || 'Error al restablecer la contraseña')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Título */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Nueva Contraseña
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Ingresa tu nueva contraseña para restablecer tu cuenta.
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Nueva Contraseña */}
        <Input
          label="Nueva Contraseña"
          type={showPassword ? 'text' : 'password'}
          placeholder="Mínimo 8 caracteres"
          leftIcon={Icons.Lock}
          rightIcon={showPassword ? Icons.EyeOff : Icons.Eye}
          onRightIconClick={() => setShowPassword(!showPassword)}
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />

        {/* Confirmar Contraseña */}
        <Input
          label="Confirmar Contraseña"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Repite tu contraseña"
          leftIcon={Icons.Lock}
          rightIcon={showConfirmPassword ? Icons.EyeOff : Icons.Eye}
          onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        {/* Requisitos de contraseña */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
            Requisitos de la contraseña:
          </p>
          <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
            <li>• Mínimo 8 caracteres</li>
            <li>• Al menos una letra mayúscula</li>
            <li>• Al menos una letra minúscula</li>
            <li>• Al menos un número</li>
          </ul>
        </div>

        {/* Botón de submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Restableciendo...' : 'Restablecer Contraseña'}
        </Button>

        {/* Link a login */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordPage
