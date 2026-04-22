import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Badge from '@components/ui/Badge'
import Table from '@components/tables/Table'
import Modal from '@components/ui/Modal'
import { Icons } from '@constants/icons'
import invoiceService from '@services/invoiceService'
import { toast } from 'sonner'

function InvoicesListPage() {
  const navigate = useNavigate()
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [monthlyRevenue, setMonthlyRevenue] = useState(0)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    invoiceId: null
  })

  useEffect(() => {
    loadInvoices()
    loadMonthlyRevenue()
  }, [pagination.page, searchTerm, estadoFilter])

  const loadInvoices = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        q: searchTerm
      }
      
      if (estadoFilter) params.estado = estadoFilter
      
      const response = await invoiceService.getAll(params)
      setInvoices(response.data || [])
      
      if (response.pagination) {
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          pages: response.pagination.pages
        }))
      }
    } catch (error) {
      console.error('Error al cargar facturas:', error)
      toast.error('Error al cargar facturas')
    } finally {
      setLoading(false)
    }
  }

  const loadMonthlyRevenue = async () => {
    try {
      const now = new Date()
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      
      const stats = await invoiceService.getStats(
        firstDay.toISOString(),
        lastDay.toISOString()
      )
      
      setMonthlyRevenue(stats.totalFacturado || 0)
    } catch (error) {
      console.error('Error al cargar estadísticas:', error)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleFilterChange = (value) => {
    setEstadoFilter(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  const handleDeleteClick = (invoiceId) => {
    setDeleteModal({ open: true, invoiceId })
  }

  const handleDeleteConfirm = async () => {
    try {
      await invoiceService.delete(deleteModal.invoiceId)
      toast.success('Factura eliminada correctamente')
      setDeleteModal({ open: false, invoiceId: null })
      loadInvoices()
    } catch (error) {
      console.error('Error al eliminar factura:', error)
      toast.error('Error al eliminar factura')
    }
  }

  const getEstadoVariant = (estado) => {
    const variants = {
      'Pendiente': 'warning',
      'Pagada': 'success',
      'Cancelada': 'danger'
    }
    return variants[estado] || 'secondary'
  }

  const columns = [
    {
      header: 'Número',
      accessor: 'numero',
      render: (row) => (
        <p className="text-sm font-semibold text-gray-900">{row.numero || 'N/A'}</p>
      )
    },
    {
      header: 'Fecha',
      accessor: 'fecha',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-gray-900">
            {format(new Date(row.fecha), 'dd MMM yyyy', { locale: es })}
          </p>
        </div>
      )
    },
    {
      header: 'Propietario',
      accessor: 'propietario',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-gray-900">{row.propietario?.nombreCompleto || 'N/A'}</p>
          <p className="text-sm text-gray-500">{row.propietario?.documento}</p>
        </div>
      )
    },
    {
      header: 'Ítems',
      accessor: 'items',
      render: (row) => (
        <p className="text-sm text-gray-900">{row.items?.length || 0} ítem(s)</p>
      )
    },
    {
      header: 'Total',
      accessor: 'total',
      render: (row) => (
        <div>
          <p className="text-sm text-gray-500 line-through">
            ${row.subtotal?.toLocaleString('es-CO')}
          </p>
          <p className="text-base font-semibold text-gray-900">
            ${row.total?.toLocaleString('es-CO')}
          </p>
        </div>
      )
    },
    {
      header: 'Estado',
      accessor: 'estado',
      render: (row) => (
        <div>
          <Badge variant={getEstadoVariant(row.estado)}>
            {row.estado}
          </Badge>
          {row.metodoPago && row.estado === 'Pagada' && (
            <p className="text-xs text-gray-500 mt-1">{row.metodoPago}</p>
          )}
        </div>
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
            onClick={() => navigate(`/invoices/${row._id}`)}
            leftIcon={Icons.Eye}
          >
            Ver
          </Button>
          {row.estado === 'Pendiente' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/invoices/${row._id}/edit`)}
              leftIcon={Icons.Edit}
            >
              Editar
            </Button>
          )}
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
          <h1 className="text-3xl font-bold text-gray-900">Facturación</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona las facturas y pagos
          </p>
        </div>
        <Link to="/invoices/create">
          <Button leftIcon={Icons.Plus}>
            Nueva Factura
          </Button>
        </Link>
      </div>

      {/* Monthly Revenue Card */}
      <Card>
        <Card.Content className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Facturación del Mes</p>
              <p className="text-3xl font-bold text-gray-900">
                ${monthlyRevenue.toLocaleString('es-CO')}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Icons.DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <Input
                placeholder="Buscar por número, propietario..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={Icons.Search}
              />
            </div>
            <Select
              value={estadoFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              options={[
                { value: '', label: 'Todos los estados' },
                { value: 'Pendiente', label: 'Pendiente' },
                { value: 'Pagada', label: 'Pagada' },
                { value: 'Cancelada', label: 'Cancelada' }
              ]}
            />
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Table
          columns={columns}
          data={invoices}
          isLoading={loading}
          pagination={{
            currentPage: pagination.page,
            totalPages: pagination.pages,
            onPageChange: handlePageChange
          }}
          emptyMessage="No se encontraron facturas"
        />
      </Card>

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, invoiceId: null })}
        size="sm"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <Icons.AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Eliminar Factura
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              ¿Estás seguro de eliminar esta factura? Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="mt-6 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, invoiceId: null })}
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

export default InvoicesListPage
