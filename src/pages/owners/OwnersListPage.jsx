import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Badge from '@components/ui/Badge'
import Table from '@components/tables/Table'
import Modal from '@components/ui/Modal'
import { Icons } from '@constants/icons'
import ownerService from '@services/ownerService'
import { toast } from 'sonner'

function OwnersListPage() {
  const navigate = useNavigate()
  const [owners, setOwners] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    ownerId: null
  })

  useEffect(() => {
    loadOwners()
  }, [pagination.page, searchTerm])

  const loadOwners = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        q: searchTerm
      }
      
      const response = await ownerService.getAll(params)
      setOwners(response.data || [])
      
      if (response.pagination) {
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          pages: response.pagination.pages
        }))
      }
    } catch (error) {
      console.error('Error al cargar propietarios:', error)
      toast.error('Error al cargar propietarios')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  const handleDeleteClick = (ownerId) => {
    setDeleteModal({ open: true, ownerId })
  }

  const handleDeleteConfirm = async () => {
    try {
      await ownerService.delete(deleteModal.ownerId)
      toast.success('Propietario eliminado correctamente')
      setDeleteModal({ open: false, ownerId: null })
      loadOwners()
    } catch (error) {
      console.error('Error al eliminar propietario:', error)
      toast.error('Error al eliminar propietario')
    }
  }

  const columns = [
    {
      header: 'Propietario',
      accessor: 'nombreCompleto',
      render: (row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-purple-700">
              {row.nombreCompleto?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{row.nombreCompleto}</p>
            <p className="text-sm text-gray-500">CC: {row.documento}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Contacto',
      accessor: 'telefono',
      render: (row) => (
        <div>
          <p className="text-sm text-gray-900">{row.telefono}</p>
          <p className="text-sm text-gray-500">{row.email || 'Sin email'}</p>
        </div>
      )
    },
    {
      header: 'Dirección',
      accessor: 'direccion',
      render: (row) => row.direccion || 'N/A'
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
            onClick={() => navigate(`/owners/${row._id}`)}
            leftIcon={Icons.Eye}
          >
            Ver
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/owners/${row._id}/edit`)}
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
          <h1 className="text-3xl font-bold text-gray-900">Propietarios</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona los clientes de la veterinaria
          </p>
        </div>
        <Link to="/owners/create">
          <Button leftIcon={Icons.Plus}>
            Nuevo Propietario
          </Button>
        </Link>
      </div>

      <Card>
        <Card.Content className="p-6">
          <Input
            placeholder="Buscar por nombre, documento o teléfono..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            leftIcon={Icons.Search}
          />
        </Card.Content>
      </Card>

      <Card>
        <Table
          columns={columns}
          data={owners}
          isLoading={loading}
          pagination={{
            currentPage: pagination.page,
            totalPages: pagination.pages,
            onPageChange: handlePageChange
          }}
          emptyMessage="No se encontraron propietarios"
        />
      </Card>

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, ownerId: null })}
        size="sm"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <Icons.AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Eliminar Propietario
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              ¿Estás seguro de eliminar este propietario? Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="mt-6 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, ownerId: null })}
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

export default OwnersListPage
