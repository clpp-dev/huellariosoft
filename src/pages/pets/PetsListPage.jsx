import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Badge from '@components/ui/Badge'
import Table from '@components/tables/Table'
import Modal from '@components/ui/Modal'
import { Icons } from '@constants/icons'
import petService from '@services/petService'
import { toast } from 'sonner'
import useDebounce from '@hooks/useDebounce'

function PetsListPage() {
  const navigate = useNavigate()
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [especieFilter, setEspecieFilter] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    petId: null
  })

  useEffect(() => {
    loadPets()
  }, [pagination.page, debouncedSearchTerm, especieFilter])

  const loadPets = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: debouncedSearchTerm
      }
      
      if (especieFilter) {
        params.especie = especieFilter
      }
      
      const response = await petService.getAll(params)
      setPets(response.data || [])
      
      if (response.pagination) {
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          pages: response.pagination.pages
        }))
      }
    } catch (error) {
      console.error('Error al cargar mascotas:', error)
      toast.error('Error al cargar mascotas')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleFilterChange = (value) => {
    setEspecieFilter(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  const handleDeleteClick = (petId) => {
    setDeleteModal({ open: true, petId })
  }

  const handleDeleteConfirm = async () => {
    try {
      await petService.delete(deleteModal.petId)
      toast.success('Mascota eliminada correctamente')
      setDeleteModal({ open: false, petId: null })
      loadPets()
    } catch (error) {
      console.error('Error al eliminar mascota:', error)
      toast.error('Error al eliminar mascota')
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

  const columns = [
    {
      header: 'Mascota',
      accessor: 'nombre',
      render: (row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg">
            {getEspecieIcon(row.especie)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{row.nombre}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.raza}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Propietario',
      accessor: 'propietario',
      render: (row) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{row.propietario?.nombreCompleto || 'N/A'}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.propietario?.telefono || ''}</p>
        </div>
      )
    },
    {
      header: 'Especie',
      accessor: 'especie',
      render: (row) => (
        <Badge variant="default">{row.especie}</Badge>
      )
    },
    {
      header: 'Edad/Sexo',
      accessor: 'edad',
      render: (row) => (
        <div>
          <p className="text-sm text-gray-900 dark:text-white">{row.edad?.valor} {row.edad?.unidad}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.sexo}</p>
        </div>
      )
    },
    {
      header: 'Estado',
      accessor: 'activo',
      render: (row) => (
        <Badge variant={row.activo ? 'success' : 'danger'}>
          {row.activo ? 'Activo' : 'Inactivo'}
        </Badge>
      )
    },
    {
      header: 'Acciones',
      accessor: '_id',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/pets/${row._id}`)}
            leftIcon={Icons.Eye}
          >
            Ver
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/pets/${row._id}/edit`)}
            leftIcon={Icons.Edit}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteClick(row._id)}
            leftIcon={Icons.Trash}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Eliminar
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mascotas</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Gestiona los animales registrados en la veterinaria
          </p>
        </div>
        <Link to="/pets/create">
          <Button leftIcon={Icons.Plus}>
            Nueva Mascota
          </Button>
        </Link>
      </div>

      <Card>
        <Card.Content className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <Input
                placeholder="Buscar por nombre, raza o propietario..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={Icons.Search}
              />
            </div>
            <Select
              value={especieFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              options={[
                { value: '', label: 'Todas las especies' },
                { value: 'Canino', label: '🐕 Canino' },
                { value: 'Felino', label: '🐈 Felino' },
                { value: 'Ave', label: '🦜 Ave' },
                { value: 'Roedor', label: '🐹 Roedor' },
                { value: 'Reptil', label: '🦎 Reptil' },
                { value: 'Otro', label: '🐾 Otro' }
              ]}
            />
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Table
          columns={columns}
          data={pets}
          isLoading={loading}
          pagination={{
            currentPage: pagination.page,
            totalPages: pagination.pages,
            onPageChange: handlePageChange
          }}
          emptyMessage="No se encontraron mascotas"
        />
      </Card>

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, petId: null })}
        size="sm"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <Icons.AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Eliminar Mascota
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              ¿Estás seguro de eliminar esta mascota? Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="mt-6 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, petId: null })}
              fullWidth
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              fullWidth
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PetsListPage
