import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '@context/AuthContext'
import Input from '@components/ui/Input'
import Button from '@components/ui/Button'
import { Icons } from '@constants/icons'

// Esquema de validación
const loginSchema = yup.object({
  email: yup
    .string()
    .email('Email inválido')
    .required('El email es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
  tipoUsuario: yup
    .string()
    .oneOf(['empleado', 'propietario'], 'Tipo de usuario inválido')
    .required('Selecciona el tipo de usuario'),
})

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      tipoUsuario: 'empleado',
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      const result = await login(data)

      if (result.success) {
        // El AuthContext ya maneja la redirección
      }
    } catch (error) {
      console.error('Error en login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Título */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Ingresa tus credenciales para acceder al sistema
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Tipo de Usuario */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo de Usuario
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="relative flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all hover:border-primary-500">
              <input
                type="radio"
                value="empleado"
                {...register('tipoUsuario')}
                className="sr-only peer"
              />
              <div className="flex items-center space-x-2 peer-checked:text-primary-600 dark:peer-checked:text-primary-400">
                <Icons.Briefcase className="w-5 h-5" />
                <span className="font-medium">Empleado</span>
              </div>
              <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-primary-600 dark:peer-checked:border-primary-400 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 pointer-events-none"></div>
            </label>
            <label className="relative flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all hover:border-primary-500">
              <input
                type="radio"
                value="propietario"
                {...register('tipoUsuario')}
                className="sr-only peer"
              />
              <div className="flex items-center space-x-2 peer-checked:text-primary-600 dark:peer-checked:text-primary-400">
                <Icons.User className="w-5 h-5" />
                <span className="font-medium">Propietario</span>
              </div>
              <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-primary-600 dark:peer-checked:border-primary-400 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 pointer-events-none"></div>
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

        {/* Password */}
        <Input
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={Icons.Lock}
          rightIcon={showPassword ? Icons.EyeOff : Icons.Eye}
          onRightIconClick={() => setShowPassword(!showPassword)}
          error={errors.password?.message}
          {...register('password')}
        />

        {/* Olvidé mi contraseña */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Recordarme
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
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
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </form>

      {/* Información adicional */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              ¿Necesitas ayuda?
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Contacta al administrador para obtener acceso
          </p>
        </div>
      </div>

      {/* Footer con información del sistema */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Icons.Info className="w-4 h-4" />
          <span>
            Sistema de gestión veterinaria v1.0.0
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
