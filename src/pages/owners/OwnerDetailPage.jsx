import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Badge from '@components/ui/Badge'
import Spinner from '@components/ui/Spinner'
import { Icons } from '@constants/icons'
import ownerService from '@services/ownerService'
import petService from '@services/petService'
import { toast } from 'sonner'

function OwnerDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [owner, setOwner] = useState(null)
  const [pets, setPets] = useState([])
  const [loadingPets, setLoadingPets] = useState(true)

  useEffect(() => {
    loadData()
  }, [id])

  const loadData = async () => {
    try {
      setLoading(true)
      const ownerData = await ownerService.getById(id)
      setOwner(ownerData)
      
      // Cargar mascotas del propietario
      setLoadingPets(true)
      const petsData = await petService.getByOwner(id)
      setPets(petsData || [])
    } catch (error) {
      console.error('Error al cargar datos:', error)
      toast.error('Error al cargar información del propietario')
      navigate('/owners')
    } finally {
      setLoading(false)
      setLoadingPets(false)
    }
  }

  if (loading) {
    return <Spinner.Page message="Cargando información..." />
  }

  if (!owner) {
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
            onClick={() => navigate('/owners')}
            leftIcon={Icons.ArrowLeft}
            className="mb-4"
          >
            Volver
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{owner.nombreCompleto}</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Información del cliente</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/owners/${id}/edit`)}
            leftIcon={Icons.Edit}
          >
            Editar
          </Button>
          <Badge variant={owner.activo ? 'success' : 'danger'}>
            {owner.activo ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
      </div>

      {/* Información del Propietario */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Datos Personales</h2>
            </Card.Header>
            <Card.Content className="p-6">
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <Icons.FileText className="w-4 h-4 mr-2" />
                    Documento
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{owner.documento}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <Icons.Phone className="w-4 h-4 mr-2" />
                    Teléfono
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{owner.telefono}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <Icons.Mail className="w-4 h-4 mr-2" />
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{owner.email || 'No registrado'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                    <Icons.MapPin className="w-4 h-4 mr-2" />
                    Dirección
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{owner.direccion || 'No registrada'}</dd>
                </div>
              </dl>
            </Card.Content>
          </Card>
        </div>

        {/* Estadísticas Rápidas */}
        <div>
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Resumen</h2>
            </Card.Header>
            <Card.Content className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <Icons.PawPrint className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mascotas</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{pets.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <Icons.Calendar className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Citas</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">-</span>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>

      {/* Mascotas del Propietario */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Mascotas</h2>
            <Link to={`/pets/create?ownerId=${id}`}>
              <Button size="sm" leftIcon={Icons.Plus}>
                Nueva Mascota
              </Button>
            </Link>
          </div>
        </Card.Header>
        <Card.Content className="p-6">
          {loadingPets ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : pets.length === 0 ? (
            <div className="text-center py-12">
              <Icons.PawPrint className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Este propietario no tiene mascotas registradas</p>
              <Link to={`/pets/create?ownerId=${id}`}>
                <Button className="mt-4" leftIcon={Icons.Plus}>
                  Registrar Primera Mascota
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pets.map((pet) => (
                <div
                  key={pet._id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => navigate(`/pets/${pet._id}`)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icons.PawPrint className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{pet.nombre}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{pet.especie} • {pet.raza}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <Badge variant="default" size="sm">
                          {pet.edad?.valor} {pet.edad?.unidad}
                        </Badge>
                        <Badge variant={pet.activo ? 'success' : 'danger'} size="sm">
                          {pet.activo ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  )
}

export default OwnerDetailPage
