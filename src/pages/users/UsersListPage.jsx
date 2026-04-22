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
import { ROLE_LABELS } from '@constants/enums'
import userService from '@services/userService'
import { toast } from 'sonner'

function UsersListPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  
  const [filters, setFilters] = useState({
    rol: '',
    activo: ''
  })

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    userId: null
  })

  useEffect(() => {
    loadUsers()
  }, [pagination.page, filters])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      }
      
      const response = await userService.getAll(params)
      setUsers(response.data || [])
      
      if (response.pagination) {
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          pages: response.pagination.pages
        }))
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
      toast.error('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
    setPagination(prev => ({ ...prev, page: 1 })) // Reset a página 1 al filtrar
  }

  const handleToggleStatus = async (userId) => {
    try {
      await userService.toggleStatus(userId)
      toast.success('Estado actualizado correctamente')
      loadUsers()
    } catch (error) {
      console.error('Error al cambiar estado:', error)
      toast.error('Error al cambiar estado del usuario')
    }
  }

  const handleDeleteClick = (userId) => {
    setDeleteModal({ open: true, userId })
  }

  const handleDeleteConfirm = async () => {
    try {
      await userService.delete(deleteModal.userId)
      toast.success('Usuario eliminado correctamente')
      setDeleteModal({ open: false, userId: null })
      loadUsers()
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
      toast.error('Error al eliminar usuario')
    }
  }

  const columns = [
    {
      header: 'Nombre',
      accessor: 'nombre',
      render: (row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-700">
              {row.nombre?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{row.nombre}</p>
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Rol',
      accessor: 'rol',
      render: (row) => (
        <Badge variant={
          row.rol === 'administrador' ? 'primary' : 
          row.rol === 'veterinario' ? 'success' : 
          row.rol === 'recepcionista' ? 'warning' : 'secondary'
        }>
          {ROLE_LABELS[row.rol]}
        </Badge>
      )
    },
    {
      header: 'Teléfono',
      accessor: 'telefono',
      render: (row) => row.telefono || 'N/A'
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
            onClick={() => navigate(`/users/${row._id}/edit`)}
            leftIcon={Icons.Edit}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleToggleStatus(row._id)}
            leftIcon={row.activo ? Icons.Lock : Icons.Check}
          >
            {row.activo ? 'Desactivar' : 'Activar'}
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="mt-1 text-sm text-gray-600">
            Administra los usuarios del sistema
          </p>
        </div>
        <Link to="/users/create">
          <Button leftIcon={Icons.Plus}>
            Nuevo Usuario
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <Card>
        <Card.Content className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Select
              label="Filtrar por Rol"
              value={filters.rol}
              onChange={(e) => handleFilterChange('rol', e.target.value)}
              options={[
                { value: '', label: 'Todos los roles' },
                { value: 'administrador', label: 'Administrador' },
                { value: 'veterinario', label: 'Veterinario' },
                { value: 'recepcionista', label: 'Recepcionista' },
                { value: 'auxiliar', label: 'Auxiliar' }
              ]}
            />
            <Select
              label="Filtrar por Estado"
              value={filters.activo}
              onChange={(e) => handleFilterChange('activo', e.target.value)}
              options={[
                { value: '', label: 'Todos los estados' },
                { value: 'true', label: 'Activos' },
                { value: 'false', label: 'Inactivos' }
              ]}
            />
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setFilters({ rol: '', activo: '' })
                  setPagination(prev => ({ ...prev, page: 1 }))
                }}
                fullWidth
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Tabla */}
      <Card>
        <Table
          columns={columns}
          data={users}
          isLoading={loading}
          pagination={{
            currentPage: pagination.page,
            totalPages: pagination.pages,
            onPageChange: handlePageChange
          }}
          emptyMessage="No se encontraron usuarios"
        />
      </Card>

      {/* Modal de eliminación */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, userId: null })}
        size="sm"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <Icons.AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Eliminar Usuario
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="mt-6 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, userId: null })}
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

export default UsersListPage
