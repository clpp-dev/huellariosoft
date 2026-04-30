import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Badge from '@components/ui/Badge'
import Spinner from '@components/ui/Spinner'
import { Icons } from '@constants/icons'
import { ROLES } from '@constants/enums'
import { useAuth } from '@context/AuthContext'
import petService from '@services/petService'
import { toast } from 'sonner'

function PetDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { hasAnyRole } = useAuth()
  const [loading, setLoading] = useState(true)
  const [pet, setPet] = useState(null)

  useEffect(() => {
    loadPet()
  }, [id])

  const loadPet = async () => {
    try {
      setLoading(true)
      const petData = await petService.getById(id)
      setPet(petData)
    } catch (error) {
      console.error('Error al cargar mascota:', error)
      toast.error('Error al cargar información de la mascota')
      navigate('/pets')
    } finally {
      setLoading(false)
    }
  }

  const getEspecieIcon = (especie) => {
    const icons = {
      'Canino': '🐕',
      'Felino': '🐈',
      'Ave': '🦜',
      'Roedor': '🐹',
      'Reptil': '🦎',
      'Otro': '🐾'
    }
    return icons[especie] || '🐾'
  }

  if (loading) {
    return <Spinner.Page message="Cargando información..." />
  }

  if (!pet) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/pets')}
            leftIcon={Icons.ArrowLeft}
            className="mb-4"
          >
            Volver
          </Button>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl">
              {getEspecieIcon(pet.especie)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{pet.nombre}</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{pet.especie} • {pet.raza}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {hasAnyRole([ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN]) && (
            <Button
              variant="outline"
              onClick={() => navigate(`/pets/${id}/edit`)}
              leftIcon={Icons.Edit}
            >
              Editar
            </Button>
          )}
          <Badge variant={pet.activo ? 'success' : 'danger'}>
            {pet.activo ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
      </div>

      {/* Información Principal */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Datos de la Mascota */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Información de la Mascota</h2>
            </Card.Header>
            <Card.Content className="p-6">
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <Icons.Calendar className="w-4 h-4 mr-2" />
                    Edad
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {pet.edad?.valor} {pet.edad?.unidad}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <Icons.User className="w-4 h-4 mr-2" />
                    Sexo
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{pet.sexo}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <Icons.Palette className="w-4 h-4 mr-2" />
                    Color
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{pet.color}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <Icons.Activity className="w-4 h-4 mr-2" />
                    Peso
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {pet.peso ? `${pet.peso} kg` : 'No registrado'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <Icons.Shield className="w-4 h-4 mr-2" />
                    Esterilización
                  </dt>
                  <dd className="mt-1">
                    <Badge variant={pet.esterilizado ? 'success' : 'default'}>
                      {pet.esterilizado ? 'Esterilizado' : 'No esterilizado'}
                    </Badge>
                  </dd>
                </div>
              </dl>
            </Card.Content>
          </Card>

          {/* Propietario */}
          <Card className="mt-6">
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Propietario</h2>
            </Card.Header>
            <Card.Content className="p-6">
              {pet.propietario ? (
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-semibold text-purple-700">
                      {pet.propietario.nombreCompleto?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {pet.propietario.nombreCompleto}
                    </p>
                    <dl className="mt-2 space-y-1">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Icons.FileText className="w-4 h-4 mr-2" />
                        <span>CC: {pet.propietario.documento}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Icons.Phone className="w-4 h-4 mr-2" />
                        <span>{pet.propietario.telefono}</span>
                      </div>
                      {pet.propietario.email && (
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Icons.Mail className="w-4 h-4 mr-2" />
                          <span>{pet.propietario.email}</span>
                        </div>
                      )}
                    </dl>
                    {hasAnyRole([ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN]) && (
                      <Link to={`/owners/${pet.propietario._id}`}>
                        <Button variant="outline" size="sm" className="mt-3">
                          Ver perfil del propietario
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">Propietario no disponible</p>
              )}
            </Card.Content>
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Acciones Rápidas */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Acciones</h2>
            </Card.Header>
            <Card.Content className="flex gap-3 p-6">
              <Link to={`/appointments/create?petId=${id}`}>
                <Button fullWidth leftIcon={Icons.Calendar}>
                  Nueva Cita
                </Button>
              </Link>
              {hasAnyRole([ROLES.ADMIN, ROLES.VETERINARIAN]) && (
                <Link to={`/medical-records/create?petId=${id}`}>
                  <Button fullWidth variant="outline" leftIcon={Icons.FileText} className="max-h-[40px]">
                    Nueva Historia Clínica
                  </Button>
                </Link>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PetDetailPage
