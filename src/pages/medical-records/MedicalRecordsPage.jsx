import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Badge from '@components/ui/Badge'
import Table from '@components/tables/Table'
import Modal from '@components/ui/Modal'
import { Icons } from '@constants/icons'
import medicalRecordService from '@services/medicalRecordService'
import { toast } from 'sonner'

function MedicalRecordsPage() {
  const navigate = useNavigate()
  const [records, setRecords] = useState([])
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
    recordId: null
  })

  useEffect(() => {
    loadRecords()
  }, [pagination.page, searchTerm])

  const loadRecords = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        q: searchTerm
      }
      
      const response = await medicalRecordService.getAll(params)
      setRecords(response.data || [])
      
      if (response.pagination) {
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          pages: response.pagination.pages
        }))
      }
    } catch (error) {
      console.error('Error al cargar historias clínicas:', error)
      toast.error('Error al cargar historias clínicas')
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

  const handleDeleteClick = (recordId) => {
    setDeleteModal({ open: true, recordId })
  }

  const handleDeleteConfirm = async () => {
    try {
      await medicalRecordService.delete(deleteModal.recordId)
      toast.success('Historia clínica eliminada correctamente')
      setDeleteModal({ open: false, recordId: null })
      loadRecords()
    } catch (error) {
      console.error('Error al eliminar historia clínica:', error)
      toast.error('Error al eliminar historia clínica')
    }
  }

  const columns = [
    {
      header: 'Fecha',
      accessor: 'fecha',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {format(new Date(row.fecha), 'dd MMM yyyy', { locale: es })}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {format(new Date(row.fecha), 'HH:mm', { locale: es })}
          </p>
        </div>
      )
    },
    {
      header: 'Mascota',
      accessor: 'mascota',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{row.mascota?.nombre || 'N/A'}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.mascota?.especie} - {row.mascota?.raza}</p>
        </div>
      )
    },
    {
      header: 'Propietario',
      accessor: 'propietario',
      render: (row) => (
        <p className="text-sm text-gray-900 dark:text-white">{row.mascota?.propietario?.nombreCompleto || 'N/A'}</p>
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
      header: 'Diagnóstico',
      accessor: 'diagnostico',
      render: (row) => (
        <p className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">{row.diagnostico}</p>
      )
    },
    {
      header: 'Peso',
      accessor: 'peso',
      render: (row) => (
        <p className="text-sm text-gray-900 dark:text-white">{row.peso ? `${row.peso} kg` : 'N/A'}</p>
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
            onClick={() => navigate(`/medical-records/${row._id}`)}
            leftIcon={Icons.Eye}
          >
            Ver
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
    <div className="MAIN-CONTAINER-MEDICAL-REPORTS space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Historia Clínica</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Gestiona los registros médicos de las mascotas
          </p>
        </div>
        <Link to="/medical-records/create">
          <Button leftIcon={Icons.Plus}>
            Nueva Consulta
          </Button>
        </Link>
      </div>

      <Card>
        <Card.Content className="p-6">
          <Input
            placeholder="Buscar por mascota, propietario o diagnóstico..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            leftIcon={Icons.Search}
          />
        </Card.Content>
      </Card>

      <Card>
        <Table
          columns={columns}
          data={records}
          isLoading={loading}
          pagination={{
            currentPage: pagination.page,
            totalPages: pagination.pages,
            onPageChange: handlePageChange
          }}
          emptyMessage="No se encontraron historias clínicas"
        />
      </Card>

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, recordId: null })}
        size="sm"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <Icons.AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Eliminar Historia Clínica
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              ¿Estás seguro de eliminar esta historia clínica? Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="mt-6 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, recordId: null })}
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

export default MedicalRecordsPage
