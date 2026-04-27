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
import appointmentService from '@services/appointmentService'
import { formatTimeToAMPM } from '@utils/formatters'
import { toast } from 'sonner'

function AppointmentsPage() {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [fechaFilter, setFechaFilter] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })

  const [statusModal, setStatusModal] = useState({
    open: false,
    appointmentId: null,
    currentStatus: ''
  })

  const [cancelModal, setCancelModal] = useState({
    open: false,
    appointmentId: null,
    motivo: ''
  })

  useEffect(() => {
    loadAppointments()
  }, [pagination.page, searchTerm, estadoFilter, fechaFilter])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        q: searchTerm
      }
      
      if (estadoFilter) params.estado = estadoFilter
      if (fechaFilter) params.fecha = fechaFilter
      
      const response = await appointmentService.getAll(params)
      setAppointments(response.data || [])
      
      if (response.pagination) {
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          pages: response.pagination.pages
        }))
      }
    } catch (error) {
      console.error('Error al cargar citas:', error)
      toast.error('Error al cargar citas')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleFilterChange = (filter, value) => {
    if (filter === 'estado') setEstadoFilter(value)
    if (filter === 'fecha') setFechaFilter(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  const handleStatusChange = async (newStatus) => {
    try {
      await appointmentService.updateStatus(statusModal.appointmentId, newStatus)
      toast.success('Estado de la cita actualizado')
      setStatusModal({ open: false, appointmentId: null, currentStatus: '' })
      loadAppointments()
    } catch (error) {
      console.error('Error al cambiar estado:', error)
      toast.error('Error al cambiar estado de la cita')
    }
  }

  const handleCancelConfirm = async () => {
    try {
      await appointmentService.cancel(cancelModal.appointmentId, cancelModal.motivo)
      toast.success('Cita cancelada correctamente')
      setCancelModal({ open: false, appointmentId: null, motivo: '' })
      loadAppointments()
    } catch (error) {
      console.error('Error al cancelar cita:', error)
      toast.error('Error al cancelar cita')
    }
  }

  const getStatusBadge = (estado) => {
    const variants = {
      'Programada': 'default',
      'Confirmada': 'info',
      'En_Curso': 'warning',
      'Completada': 'success',
      'Cancelada': 'danger',
      'No_Asistio': 'danger'
    }
    return <Badge variant={variants[estado] || 'default'}>{estado.replace('_', ' ')}</Badge>
  }

  const columns = [
    {
      header: 'Fecha/Hora',
      accessor: 'fecha',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {format(new Date(row.fecha), 'dd MMM yyyy', { locale: es })}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{formatTimeToAMPM(row.hora)}</p>
        </div>
      )
    },
    {
      header: 'Mascota',
      accessor: 'mascota',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{row.mascota?.nombre || 'N/A'}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.mascota?.especie}</p>
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
      header: 'Veterinario',
      accessor: 'veterinario',
      render: (row) => (
        <p className="text-sm text-gray-900 dark:text-white">{row.veterinario?.nombre || 'N/A'}</p>
      )
    },
    {
      header: 'Motivo',
      accessor: 'motivo',
      render: (row) => (
        <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">{row.motivo}</p>
      )
    },
    {
      header: 'Estado',
      accessor: 'estado',
      render: (row) => getStatusBadge(row.estado)
    },
    {
      header: 'Acciones',
      accessor: '_id',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/appointments/${row._id}/edit`)}
            leftIcon={Icons.Edit}
            disabled={row.estado === 'Completada' || row.estado === 'Cancelada'}
          >
            Editar
          </Button>
          {row.estado !== 'Completada' && row.estado !== 'Cancelada' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStatusModal({ open: true, appointmentId: row._id, currentStatus: row.estado })}
              leftIcon={Icons.CheckCircle}
            >
              Estado
            </Button>
          )}
          {row.estado !== 'Cancelada' && row.estado !== 'Completada' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCancelModal({ open: true, appointmentId: row._id, motivo: '' })}
              leftIcon={Icons.XCircle}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Cancelar
            </Button>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Citas</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Gestiona las citas de la veterinaria
          </p>
        </div>
        <Link to="/appointments/create">
          <Button leftIcon={Icons.Plus}>
            Nueva Cita
          </Button>
        </Link>
      </div>

      <Card>
        <Card.Content className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <Input
                placeholder="Buscar por mascota, propietario..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                leftIcon={Icons.Search}
              />
            </div>
            <Select
              value={estadoFilter}
              onChange={(e) => handleFilterChange('estado', e.target.value)}
              options={[
                { value: '', label: 'Todos los estados' },
                { value: 'Programada', label: 'Programada' },
                { value: 'Confirmada', label: 'Confirmada' },
                { value: 'En_Curso', label: 'En Curso' },
                { value: 'Completada', label: 'Completada' },
                { value: 'Cancelada', label: 'Cancelada' },
                { value: 'No_Asistio', label: 'No Asistió' }
              ]}
            />
            <Input
              type="date"
              value={fechaFilter}
              onChange={(e) => handleFilterChange('fecha', e.target.value)}
              leftIcon={Icons.Calendar}
            />
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Table
          columns={columns}
          data={appointments}
          isLoading={loading}
          pagination={{
            currentPage: pagination.page,
            totalPages: pagination.pages,
            onPageChange: handlePageChange
          }}
          emptyMessage="No se encontraron citas"
        />
      </Card>

      {/* Modal de Cambio de Estado */}
      <Modal
        isOpen={statusModal.open}
        onClose={() => setStatusModal({ open: false, appointmentId: null, currentStatus: '' })}
        size="sm"
      >
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Cambiar Estado de Cita</h3>
          <div className="space-y-2">
            {['Programada', 'Confirmada', 'En_Curso', 'Completada', 'No_Asistio'].map((estado) => (
              <button
                key={estado}
                onClick={() => handleStatusChange(estado)}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {getStatusBadge(estado)}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() => setStatusModal({ open: false, appointmentId: null, currentStatus: '' })}
            fullWidth
            className="mt-4"
          >
            Cancelar
          </Button>
        </div>
      </Modal>

      {/* Modal de Cancelación */}
      <Modal
        isOpen={cancelModal.open}
        onClose={() => setCancelModal({ open: false, appointmentId: null, motivo: '' })}
        size="sm"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <Icons.XCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Cancelar Cita</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Indica el motivo de la cancelación
            </p>
          </div>
          <div className="mt-4">
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Motivo de cancelación..."
              value={cancelModal.motivo}
              onChange={(e) => setCancelModal(prev => ({ ...prev, motivo: e.target.value }))}
            />
          </div>
          <div className="mt-6 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setCancelModal({ open: false, appointmentId: null, motivo: '' })}
              fullWidth
            >
              Cerrar
            </Button>
            <Button
              variant="danger"
              onClick={handleCancelConfirm}
              fullWidth
              disabled={!cancelModal.motivo.trim()}
            >
              Cancelar Cita
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AppointmentsPage
