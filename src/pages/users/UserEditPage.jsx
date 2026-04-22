import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Spinner from '@components/ui/Spinner'
import { Icons } from '@constants/icons'
import { updateUserSchema } from '@validations/userSchema'
import userService from '@services/userService'
import { toast } from 'sonner'

function UserEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(updateUserSchema)
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
        <h1 className="text-3xl font-bold text-gray-900">Editar Usuario</h1>
        <p className="mt-1 text-sm text-gray-600">
          Actualiza la información del usuario
        </p>
      </div>

      {/* Formulario */}
      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información personal */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
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
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Cambiar Contraseña
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Deja estos campos vacíos si no deseas cambiar la contraseña
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Nueva Contraseña"
                  type="password"
                  {...register('password')}
                  error={errors.password?.message}
                  placeholder="Mínimo 6 caracteres"
                  leftIcon={Icons.Lock}
                />

                <Input
                  label="Confirmar Contraseña"
                  type="password"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                  placeholder="Repite la contraseña"
                  leftIcon={Icons.Lock}
                />

                <div className="sm:col-span-2">
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
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
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
