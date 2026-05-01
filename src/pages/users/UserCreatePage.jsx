import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import { Icons } from '@constants/icons'
import { createUserSchema } from '@validations/userSchema'
import userService from '@services/userService'
import { toast } from 'sonner'

function UserCreatePage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(createUserSchema)
  })

  const onSubmit = async (data) => {
    try {
      // Remover confirmPassword antes de enviar
      const { confirmPassword, ...userData } = data
      
      await userService.create(userData)
      toast.success('Usuario creado exitosamente')
      navigate('/users')
    } catch (error) {
      console.error('Error al crear usuario:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al crear usuario')
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/users')}
          leftIcon={Icons.ArrowLeft}
          className="mb-4"
        >
          Volver
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Crear Usuario</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Completa el formulario para crear un nuevo usuario del sistema
        </p>
      </div>

      {/* Formulario */}
      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información personal */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Información Personal
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input
                    label="Nombre Completo"
                    {...register('nombre')}
                    error={errors.nombre?.message}
                    placeholder="Ej: Dr. Juan Pérez"
                    leftIcon={Icons.User}
                    required
                  />
                </div>

                <Input
                  label="Correo Electrónico"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  placeholder="ejemplo@huellario.com"
                  leftIcon={Icons.Mail}
                  required
                />

                <Input
                  label="Teléfono"
                  {...register('telefono')}
                  error={errors.telefono?.message}
                  placeholder="3001234567"
                  leftIcon={Icons.Phone}
                />
              </div>
            </div>

            {/* Información de acceso */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Información de Acceso
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  error={errors.password?.message}
                  placeholder="Mínimo 6 caracteres"
                  leftIcon={Icons.Lock}
                  rightIcon={showPassword ? Icons.EyeOff : Icons.Eye}
                  onRightIconClick={() => setShowPassword(!showPassword)}
                  required
                />

                <Input
                  label="Confirmar Contraseña"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                  placeholder="Repite la contraseña"
                  leftIcon={Icons.Lock}
                  rightIcon={showConfirmPassword ? Icons.EyeOff : Icons.Eye}
                  onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  required
                />

                <div className="sm:col-span-2">
                  <Select
                    label="Rol del Usuario"
                    {...register('rol')}
                    error={errors.rol?.message}
                    options={[
                      { value: '', label: 'Selecciona un rol' },
                      { value: 'administrador', label: 'Administrador' },
                      { value: 'veterinario', label: 'Veterinario' },
                      { value: 'recepcionista', label: 'Recepcionista' },
                      { value: 'auxiliar', label: 'Auxiliar' }
                    ]}
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <strong>Administrador:</strong> Acceso completo al sistema.{' '}
                    <strong>Veterinario:</strong> Gestión clínica.{' '}
                    <strong>Recepcionista:</strong> Gestión administrativa.{' '}
                    <strong>Auxiliar:</strong> Gestión de inventario.
                  </p>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/users')}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                leftIcon={Icons.Save}
              >
                Crear Usuario
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}

export default UserCreatePage
