import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import Input from '@components/ui/Input'
import Button from '@components/ui/Button'
import { Icons } from '@constants/icons'
import authService from '@services/authService'

// Esquema de validación
const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Email inválido')
    .required('El email es requerido'),
  tipoUsuario: yup
    .string()
    .oneOf(['empleado', 'propietario'], 'Selecciona un tipo de usuario')
    .required('El tipo de usuario es requerido'),
})

function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      tipoUsuario: 'empleado',
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      const response = await authService.forgotPassword(data.email, data.tipoUsuario)
      setEmailSent(true)
      toast.success(response.message || 'Se ha enviado un correo con instrucciones')
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.message || 'Error al enviar el correo')
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="w-full text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icons.CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Correo Enviado
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Hemos enviado instrucciones para restablecer tu contraseña a tu
          correo electrónico.
        </p>

        <Link to="/login">
          <Button variant="primary" size="lg" className="w-full">
            Volver al inicio de sesión
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Título */}
      <div className="mb-8">
        <Link
          to="/login"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          <Icons.ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio de sesión
        </Link>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Recuperar Contraseña
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Ingresa tu correo electrónico y te enviaremos instrucciones para
          restablecer tu contraseña.
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Tipo de usuario */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Tipo de usuario
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              errors.tipoUsuario ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } hover:border-primary-500 dark:hover:border-primary-400`}>
              <input
                type="radio"
                value="empleado"
                {...register('tipoUsuario')}
                className="sr-only peer"
              />
              <div className="flex flex-col items-center space-y-2 peer-checked:text-primary-600 dark:peer-checked:text-primary-400">
                <Icons.Briefcase className="w-6 h-6" />
                <span className="text-sm font-medium">Empleado</span>
              </div>
              <div className="absolute inset-0 border-2 border-primary-600 dark:border-primary-400 rounded-lg opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </label>

            <label className={`relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              errors.tipoUsuario ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } hover:border-primary-500 dark:hover:border-primary-400`}>
              <input
                type="radio"
                value="propietario"
                {...register('tipoUsuario')}
                className="sr-only peer"
              />
              <div className="flex flex-col items-center space-y-2 peer-checked:text-primary-600 dark:peer-checked:text-primary-400">
                <Icons.User className="w-6 h-6" />
                <span className="text-sm font-medium">Propietario</span>
              </div>
              <div className="absolute inset-0 border-2 border-primary-600 dark:border-primary-400 rounded-lg opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </label>
          </div>
          {errors.tipoUsuario && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.tipoUsuario.message}
            </p>
          )}
        </div>

        {/* Email */}
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="usuario@ejemplo.com"
          leftIcon={Icons.Mail}
          error={errors.email?.message}
          {...register('email')}
        />

        {/* Botón de submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar Instrucciones'}
        </Button>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
