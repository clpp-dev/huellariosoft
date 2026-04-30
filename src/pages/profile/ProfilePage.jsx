import { useState } from 'react'
import { useAuth } from '@context/AuthContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@components/ui/Card'
import Input from '@components/ui/Input'
import Button from '@components/ui/Button'
import { Icons } from '@constants/icons'
import { ROLE_LABELS } from '@constants/enums'
import { changePasswordSchema } from '@validations/authSchema'
import authService from '@services/authService'
import { toast } from 'sonner'

function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(changePasswordSchema)
  })

  const onSubmitPasswordChange = async (data) => {
    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      })
      toast.success('Contraseña actualizada exitosamente')
      reset()
      setShowCurrentPassword(false)
      setShowNewPassword(false)
      setShowConfirmPassword(false)
    } catch (error) {
      console.error('Error al cambiar contraseña:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al cambiar contraseña')
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mi Perfil</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Gestiona tu información personal y configuración
        </p>
      </div>

      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <Card.Title>Información Personal</Card.Title>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              leftIcon={isEditing ? Icons.X : Icons.Edit}
            >
              {isEditing ? 'Cancelar' : 'Editar'}
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {user?.nombre?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {user?.nombre}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-400">
                  {ROLE_LABELS[user?.rol]}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                label="Nombre completo"
                defaultValue={user?.nombre}
                disabled={!isEditing}
              />
              <Input
                label="Correo electrónico"
                type="email"
                defaultValue={user?.email}
                disabled={!isEditing}
              />
              <Input
                label="Teléfono"
                defaultValue={user?.telefono || ''}
                disabled={!isEditing}
              />
              <Input label="Rol" defaultValue={ROLE_LABELS[user?.rol]} disabled />
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button variant="primary">Guardar Cambios</Button>
              </div>
            )}
          </div>
        </Card.Content>
      </Card>

      {/* Cambiar contraseña */}
      <Card>
        <Card.Header>
          <Card.Title>Cambiar Contraseña</Card.Title>
          <Card.Description>
            Actualiza tu contraseña para mantener tu cuenta segura
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <form onSubmit={handleSubmit(onSubmitPasswordChange)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Input
                  label="Contraseña Actual"
                  type={showCurrentPassword ? 'text' : 'password'}
                  {...register('currentPassword')}
                  error={errors.currentPassword?.message}
                  placeholder="Ingresa tu contraseña actual"
                  leftIcon={Icons.Lock}
                  rightIcon={showCurrentPassword ? Icons.EyeOff : Icons.Eye}
                  onRightIconClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  required
                />
              </div>

              <Input
                label="Nueva Contraseña"
                type={showNewPassword ? 'text' : 'password'}
                {...register('newPassword')}
                error={errors.newPassword?.message}
                placeholder="Mínimo 6 caracteres"
                leftIcon={Icons.Lock}
                rightIcon={showNewPassword ? Icons.EyeOff : Icons.Eye}
                onRightIconClick={() => setShowNewPassword(!showNewPassword)}
                required
              />

              <Input
                label="Confirmar Nueva Contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
                placeholder="Repite la nueva contraseña"
                leftIcon={Icons.Lock}
                rightIcon={showConfirmPassword ? Icons.EyeOff : Icons.Eye}
                onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset()
                  setShowCurrentPassword(false)
                  setShowNewPassword(false)
                  setShowConfirmPassword(false)
                }}
                disabled={isSubmitting}
              >
                Limpiar
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                leftIcon={Icons.Save}
              >
                Cambiar Contraseña
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}

export default ProfilePage
