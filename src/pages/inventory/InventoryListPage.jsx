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
import inventoryService from '@services/inventoryService'
import { toast } from 'sonner'

function InventoryListPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState('')
  const [showLowStock, setShowLowStock] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    productId: null
  })

  useEffect(() => {
    if (showLowStock) {
      loadLowStock()
    } else {
      loadProducts()
    }
  }, [pagination.page, searchTerm, categoriaFilter, showLowStock])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        q: searchTerm
      }
      
      if (categoriaFilter) params.categoria = categoriaFilter
      
      const response = await inventoryService.getAll(params)
      setProducts(response.data || [])
      
      if (response.pagination) {
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          pages: response.pagination.pages
        }))
      }
    } catch (error) {
      console.error('Error al cargar inventario:', error)
      toast.error('Error al cargar inventario')
    } finally {
      setLoading(false)
    }
  }

  const loadLowStock = async () => {
    try {
      setLoading(true)
      const response = await inventoryService.getLowStock()
      setProducts(response || [])
      setPagination(prev => ({ ...prev, pages: 1 }))
    } catch (error) {
      console.error('Error al cargar productos con stock bajo:', error)
      toast.error('Error al cargar productos con stock bajo')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleFilterChange = (value) => {
    setCategoriaFilter(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  const handleDeleteClick = (productId) => {
    setDeleteModal({ open: true, productId })
  }

  const handleDeleteConfirm = async () => {
    try {
      await inventoryService.delete(deleteModal.productId)
      toast.success('Producto eliminado correctamente')
      setDeleteModal({ open: false, productId: null })
      loadProducts()
    } catch (error) {
      console.error('Error al eliminar producto:', error)
      toast.error('Error al eliminar producto')
    }
  }

  const isLowStock = (product) => {
    return product.cantidad <= product.stockMinimo
  }

  const getCategoriaIcon = (categoria) => {
    const icons = {
      'Medicamento': '💊',
      'Alimento': '🍖',
      'Accesorio': '🎾',
      'Insumo_Medico': '🩺',
      'Otro': '📦'
    }
    return icons[categoria] || '📦'
  }

  const columns = [
    {
      header: 'Producto',
      accessor: 'nombre',
      render: (row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
            {getCategoriaIcon(row.categoria)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{row.nombre}</p>
            <p className="text-sm text-gray-500">{row.categoria?.replace('_', ' ')}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Descripción',
      accessor: 'descripcion',
      render: (row) => (
        <p className="text-sm text-gray-700 truncate max-w-xs">{row.descripcion || 'N/A'}</p>
      )
    },
    {
      header: 'Stock',
      accessor: 'cantidad',
      render: (row) => (
        <div>
          <p className={`text-sm font-semibold ${
            isLowStock(row) ? 'text-red-600' : 'text-gray-900'
          }`}>
            {row.cantidad} {row.unidadMedida}
          </p>
          {isLowStock(row) && (
            <Badge variant="danger" size="sm">Stock Bajo</Badge>
          )}
        </div>
      )
    },
    {
      header: 'Stock Mínimo',
      accessor: 'stockMinimo',
      render: (row) => (
        <p className="text-sm text-gray-900">{row.stockMinimo} {row.unidadMedida}</p>
      )
    },
    {
      header: 'Precio',
      accessor: 'precio',
      render: (row) => (
        <p className="text-sm font-medium text-gray-900">
          ${row.precio?.toLocaleString('es-CO')}
        </p>
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
            onClick={() => navigate(`/inventory/${row._id}/edit`)}
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
          <h1 className="text-3xl font-bold text-gray-900">Inventario</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona los productos y stock de la veterinaria
          </p>
        </div>
        <Link to="/inventory/create">
          <Button leftIcon={Icons.Plus}>
            Nuevo Producto
          </Button>
        </Link>
      </div>

      <Card>
        <Card.Content className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <Input
                placeholder="Buscar por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={Icons.Search}
              />
            </div>
            <Select
              value={categoriaFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              options={[
                { value: '', label: 'Todas las categorías' },
                { value: 'Medicamento', label: '💊 Medicamento' },
                { value: 'Alimento', label: '🍖 Alimento' },
                { value: 'Accesorio', label: '🎾 Accesorio' },
                { value: 'Insumo_Medico', label: '🩺 Insumo Médico' },
                { value: 'Otro', label: '📦 Otro' }
              ]}
            />
            <Button
              variant={showLowStock ? 'primary' : 'outline'}
              onClick={() => setShowLowStock(!showLowStock)}
              leftIcon={Icons.AlertCircle}
              fullWidth
            >
              {showLowStock ? 'Ver Todo' : 'Stock Bajo'}
            </Button>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Table
          columns={columns}
          data={products}
          isLoading={loading}
          pagination={showLowStock ? null : {
            currentPage: pagination.page,
            totalPages: pagination.pages,
            onPageChange: handlePageChange
          }}
          emptyMessage="No se encontraron productos"
        />
      </Card>

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, productId: null })}
        size="sm"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <Icons.AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Eliminar Producto
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              ¿Estás seguro de eliminar este producto del inventario? Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="mt-6 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, productId: null })}
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

export default InventoryListPage
