import { useState } from 'react'
import { format } from 'date-fns'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import { Icons } from '@constants/icons'
import reporteService from '@services/reporteService'
import { toast } from 'sonner'

function ReportsPage() {
  const [loading, setLoading] = useState(false)
  const [activeReport, setActiveReport] = useState(null)

  // Estados para fechas de cada reporte
  const [facturacionDates, setFacturacionDates] = useState({
    fechaInicio: getFirstDayOfMonth(),
    fechaFin: format(new Date(), 'yyyy-MM-dd')
  })

  const [citasDates, setCitasDates] = useState({
    fechaInicio: getFirstDayOfMonth(),
    fechaFin: format(new Date(), 'yyyy-MM-dd')
  })

  const [mascotasDates, setMascotasDates] = useState({
    fechaInicio: getFirstDayOfMonth(),
    fechaFin: format(new Date(), 'yyyy-MM-dd')
  })

  // Estados para preview de estadísticas
  const [facturacionPreview, setFacturacionPreview] = useState(null)
  const [citasPreview, setCitasPreview] = useState(null)
  const [mascotasPreview, setMascotasPreview] = useState(null)

  /**
   * Obtiene el primer día del mes actual
   */
  function getFirstDayOfMonth() {
    const now = new Date()
    return format(new Date(now.getFullYear(), now.getMonth(), 1), 'yyyy-MM-dd')
  }

  /**
   * Valida que la fecha de inicio no sea mayor que la fecha fin
   */
  const validateDates = (fechaInicio, fechaFin) => {
    if (new Date(fechaInicio) > new Date(fechaFin)) {
      toast.error('La fecha de inicio no puede ser mayor que la fecha fin')
      return false
    }
    return true
  }

  /**
   * Genera reporte de facturación
   */
  const handleGenerarFacturacion = async () => {
    if (!validateDates(facturacionDates.fechaInicio, facturacionDates.fechaFin)) return

    try {
      setLoading(true)
      await reporteService.generarReporteFacturacion(
        facturacionDates.fechaInicio,
        facturacionDates.fechaFin
      )
      toast.success('Reporte de facturación generado correctamente')
    } catch (error) {
      console.error('Error al generar reporte:', error)
      toast.error('Error al generar el reporte de facturación')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Genera reporte de citas
   */
  const handleGenerarCitas = async () => {
    if (!validateDates(citasDates.fechaInicio, citasDates.fechaFin)) return

    try {
      setLoading(true)
      await reporteService.generarReporteCitas(
        citasDates.fechaInicio,
        citasDates.fechaFin
      )
      toast.success('Reporte de citas generado correctamente')
    } catch (error) {
      console.error('Error al generar reporte:', error)
      toast.error('Error al generar el reporte de citas')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Genera reporte de mascotas
   */
  const handleGenerarMascotas = async () => {
    if (!validateDates(mascotasDates.fechaInicio, mascotasDates.fechaFin)) return

    try {
      setLoading(true)
      await reporteService.generarReporteMascotas(
        mascotasDates.fechaInicio,
        mascotasDates.fechaFin
      )
      toast.success('Reporte de mascotas generado correctamente')
    } catch (error) {
      console.error('Error al generar reporte:', error)
      toast.error('Error al generar el reporte de mascotas')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Obtiene preview de facturación
   */
  const handlePreviewFacturacion = async () => {
    if (!validateDates(facturacionDates.fechaInicio, facturacionDates.fechaFin)) return

    try {
      setLoading(true)
      const data = await reporteService.getPreviewFacturacion(
        facturacionDates.fechaInicio,
        facturacionDates.fechaFin
      )
      setFacturacionPreview(data)
      setActiveReport('facturacion')
    } catch (error) {
      console.error('Error al obtener preview:', error)
      toast.error('Error al obtener la vista previa')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Obtiene preview de citas
   */
  const handlePreviewCitas = async () => {
    if (!validateDates(citasDates.fechaInicio, citasDates.fechaFin)) return

    try {
      setLoading(true)
      const data = await reporteService.getPreviewCitas(
        citasDates.fechaInicio,
        citasDates.fechaFin
      )
      setCitasPreview(data)
      setActiveReport('citas')
    } catch (error) {
      console.error('Error al obtener preview:', error)
      toast.error('Error al obtener la vista previa')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Obtiene preview de mascotas
   */
  const handlePreviewMascotas = async () => {
    if (!validateDates(mascotasDates.fechaInicio, mascotasDates.fechaFin)) return

    try {
      setLoading(true)
      const data = await reporteService.getPreviewMascotas(
        mascotasDates.fechaInicio,
        mascotasDates.fechaFin
      )
      setMascotasPreview(data)
      setActiveReport('mascotas')
    } catch (error) {
      console.error('Error al obtener preview:', error)
      toast.error('Error al obtener la vista previa')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reportes</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Genera reportes en PDF con estadísticas del sistema
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reporte de Facturación */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Icons.DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <Card.Title>Facturación</Card.Title>
                <Card.Description>Reporte de ingresos y facturas</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha Inicio
                </label>
                <Input
                  type="date"
                  value={facturacionDates.fechaInicio}
                  onChange={(e) => setFacturacionDates({ ...facturacionDates, fechaInicio: e.target.value })}
                  max={facturacionDates.fechaFin}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha Fin
                </label>
                <Input
                  type="date"
                  value={facturacionDates.fechaFin}
                  onChange={(e) => setFacturacionDates({ ...facturacionDates, fechaFin: e.target.value })}
                  min={facturacionDates.fechaInicio}
                  max={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviewFacturacion}
                  disabled={loading}
                  leftIcon={Icons.Eye}
                  fullWidth
                >
                  Vista Previa
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleGenerarFacturacion}
                  disabled={loading}
                  leftIcon={Icons.FileText}
                  fullWidth
                >
                  Generar PDF
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Reporte de Citas */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icons.Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <Card.Title>Citas</Card.Title>
                <Card.Description>Reporte de citas y atenciones</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha Inicio
                </label>
                <Input
                  type="date"
                  value={citasDates.fechaInicio}
                  onChange={(e) => setCitasDates({ ...citasDates, fechaInicio: e.target.value })}
                  max={citasDates.fechaFin}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha Fin
                </label>
                <Input
                  type="date"
                  value={citasDates.fechaFin}
                  onChange={(e) => setCitasDates({ ...citasDates, fechaFin: e.target.value })}
                  min={citasDates.fechaInicio}
                  max={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviewCitas}
                  disabled={loading}
                  leftIcon={Icons.Eye}
                  fullWidth
                >
                  Vista Previa
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleGenerarCitas}
                  disabled={loading}
                  leftIcon={Icons.FileText}
                  fullWidth
                >
                  Generar PDF
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Reporte de Mascotas */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Icons.PawPrint className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <Card.Title>Mascotas Registradas</Card.Title>
                <Card.Description>Reporte de nuevos registros</Card.Description>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha Inicio
                </label>
                <Input
                  type="date"
                  value={mascotasDates.fechaInicio}
                  onChange={(e) => setMascotasDates({ ...mascotasDates, fechaInicio: e.target.value })}
                  max={mascotasDates.fechaFin}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha Fin
                </label>
                <Input
                  type="date"
                  value={mascotasDates.fechaFin}
                  onChange={(e) => setMascotasDates({ ...mascotasDates, fechaFin: e.target.value })}
                  min={mascotasDates.fechaInicio}
                  max={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviewMascotas}
                  disabled={loading}
                  leftIcon={Icons.Eye}
                  fullWidth
                >
                  Vista Previa
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleGenerarMascotas}
                  disabled={loading}
                  leftIcon={Icons.FileText}
                  fullWidth
                >
                  Generar PDF
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Vista Previa de Estadísticas */}
      {activeReport && (
        <Card>
          <Card.Header>
            <Card.Title>Vista Previa de Estadísticas</Card.Title>
            <Card.Description>
              Resumen de datos antes de generar el reporte
            </Card.Description>
          </Card.Header>
          <Card.Content>
            {activeReport === 'facturacion' && facturacionPreview && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Facturas</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {facturacionPreview.totalFacturas}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Facturas Pagadas</p>
                  <p className="text-2xl font-bold text-green-600">
                    {facturacionPreview.facturasPagadas}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Facturado</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${facturacionPreview.totalFacturado?.toLocaleString('es-CO')}
                  </p>
                </div>
              </div>
            )}

            {activeReport === 'citas' && citasPreview && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Citas</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {citasPreview.totalCitas}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {citasPreview.pendientes || 0}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Agendadas</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {citasPreview.agendadas || 0}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Confirmadas</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {citasPreview.confirmadas}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">En Curso</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {citasPreview.enCurso || 0}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completadas</p>
                  <p className="text-2xl font-bold text-green-600">
                    {citasPreview.completadas}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Canceladas</p>
                  <p className="text-2xl font-bold text-red-600">
                    {citasPreview.canceladas}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">No Asistió</p>
                  <p className="text-2xl font-bold text-gray-500">
                    {citasPreview.noAsistio || 0}
                  </p>
                </div>
              </div>
            )}

            {activeReport === 'mascotas' && mascotasPreview && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Registradas</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {mascotasPreview.totalMascotas}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Caninos</p>
                    <p className="text-2xl font-bold text-green-600">
                      {mascotasPreview.porEspecie?.canino || 0}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Felinos</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {mascotasPreview.porEspecie?.felino || 0}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Aves</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {mascotasPreview.porEspecie?.ave || 0}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Roedores</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {mascotasPreview.porEspecie?.roedor || 0}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Otros</p>
                    <p className="text-2xl font-bold text-gray-600">
                      {mascotasPreview.porEspecie?.otro || 0}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card.Content>
        </Card>
      )}
    </div>
  )
}

export default ReportsPage
