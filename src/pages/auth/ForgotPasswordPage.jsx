import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import Input from '@components/ui/Input'
import Button from '@components/ui/Button'
import { Icons } from '@constants/icons'

// Esquema de validación
const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email('Email inválido')
    .required('El email es requerido'),
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
  })

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      // Aquí iría la llamada a la API
      // await authService.forgotPassword(data.email)

      // Simular envío exitoso
      setTimeout(() => {
        setEmailSent(true)
        toast.success('Se ha enviado un correo con instrucciones')
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.message || 'Error al enviar el correo')
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icons.CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Correo Enviado
        </h2>
        
        <p className="text-gray-600 mb-6">
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
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <Icons.ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio de sesión
        </Link>

        <h2 className="text-3xl font-bold text-gray-900">
          Recuperar Contraseña
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Ingresa tu correo electrónico y te enviaremos instrucciones para
          restablecer tu contraseña.
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
