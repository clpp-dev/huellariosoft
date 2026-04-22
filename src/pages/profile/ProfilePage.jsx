import { useState } from 'react'
import { useAuth } from '@context/AuthContext'
import Card from '@components/ui/Card'
import Input from '@components/ui/Input'
import Button from '@components/ui/Button'
import { Icons } from '@constants/icons'
import { ROLE_LABELS } from '@constants/enums'

function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
        <p className="mt-1 text-sm text-gray-600">
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
                <h3 className="text-xl font-semibold text-gray-900">
                  {user?.nombre}
                </h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
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
    </div>
  )
}

export default ProfilePage
