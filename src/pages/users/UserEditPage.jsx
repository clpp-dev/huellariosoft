import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Checkbox from '@components/ui/Checkbox'
import Spinner from '@components/ui/Spinner'
import { Icons } from '@constants/icons'
import { updateUserSchema } from '@validations/userSchema'
import userService from '@services/userService'
import { toast } from 'sonner'

function UserEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(updateUserSchema)
  })

  // Observar el rol seleccionado para mostrar/ocultar el checkbox
  const selectedRole = useWatch({
    control,
    name: 'rol',
    defaultValue: ''
  })

  useEffect(() => {
    loadUser()
  }, [id])

  const loadUser = async () => {
    try {
      setLoading(true)
      const user = await userService.getById(id)
      
      // Cargar los datos del usuario en el formulario
      setValue('nombre', user.nombre)
      setValue('email', user.email)
      setValue('telefono', user.telefono || '')
      setValue('rol', user.rol)
      setValue('actuarComoVeterinario', user.actuarComoVeterinario || false)
    } catch (error) {
      console.error('Error al cargar usuario:', error)
      toast.error('Error al cargar datos del usuario')
      navigate('/users')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      // Si password está vacío, no lo enviamos
      const userData = { ...data }
      if (!userData.password) {
        delete userData.password
        delete userData.confirmPassword
      }
      
      await userService.update(id, userData)
      toast.success('Usuario actualizado exitosamente')
      navigate('/users')
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al actualizar usuario')
      }
    }
  }

  if (loading) {
    return <Spinner.Page message="Cargando usuario..." />
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Editar Usuario</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Actualiza la información del usuario
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

            {/* Rol y permisos */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Rol y Permisos
              </h3>
              <div className="space-y-4">
                <Select
                  label="Rol del Usuario"
                  {...register('rol')}
                  error={errors.rol?.message}
                  options={[
                    { value: 'administrador', label: 'Administrador' },
                    { value: 'veterinario', label: 'Veterinario' },
                    { value: 'recepcionista', label: 'Recepcionista' },
                    { value: 'auxiliar', label: 'Auxiliar' }
                  ]}
                  required
                />

                {/* Checkbox para actuar como veterinario (solo para administradores) */}
                {selectedRole === 'administrador' && (
                  <Checkbox
                    {...register('actuarComoVeterinario')}
                    label="Habilitar como veterinario"
                    description="Este administrador aparecerá en los listados de veterinarios para asignación de citas e historias clínicas."
                  />
                )}
              </div>
            </div>

            {/* Cambiar contraseña (opcional) */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Cambiar Contraseña (Opcional)
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completa estos campos <span className="font-semibold">solo si deseas cambiar la contraseña</span> del usuario. Si los dejas vacíos, la contraseña actual se mantendrá sin cambios.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Nueva Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  error={errors.password?.message}
                  placeholder="Mínimo 8 caracteres"
                  leftIcon={Icons.Lock}
                  rightIcon={showPassword ? Icons.EyeOff : Icons.Eye}
                  onRightIconClick={() => setShowPassword(!showPassword)}
                />

                <Input
                  label="Confirmar Nueva Contraseña"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                  placeholder="Repite la contraseña"
                  leftIcon={Icons.Lock}
                  rightIcon={showConfirmPassword ? Icons.EyeOff : Icons.Eye}
                  onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
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
                Guardar Cambios
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}

export default UserEditPage
