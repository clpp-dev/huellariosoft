import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Badge from '@components/ui/Badge'
import Spinner from '@components/ui/Spinner'
import Modal from '@components/ui/Modal'
import Select from '@components/ui/Select'
import Textarea from '@components/ui/Textarea'
import { Icons } from '@constants/icons'
import invoiceService from '@services/invoiceService'
import { toast } from 'sonner'

function InvoiceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [invoice, setInvoice] = useState(null)
  
  const [payModal, setPayModal] = useState({
    open: false,
    metodoPago: ''
  })
  
  const [cancelModal, setCancelModal] = useState({
    open: false,
    motivo: ''
  })

  useEffect(() => {
    loadInvoice()
  }, [id])

  const loadInvoice = async () => {
    try {
      setLoading(true)
      const invoiceData = await invoiceService.getById(id)
      setInvoice(invoiceData)
    } catch (error) {
      console.error('Error al cargar factura:', error)
      toast.error('Error al cargar información de la factura')
      navigate('/invoices')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsPaid = async () => {
    if (!payModal.metodoPago) {
      toast.error('Selecciona un método de pago')
      return
    }

    try {
      await invoiceService.markAsPaid(id, payModal.metodoPago)
      toast.success('Factura marcada como pagada')
      setPayModal({ open: false, metodoPago: '' })
      loadInvoice()
    } catch (error) {
      console.error('Error al marcar factura como pagada:', error)
      toast.error('Error al actualizar factura')
    }
  }

  const handleCancel = async () => {
    if (!cancelModal.motivo) {
      toast.error('Indica el motivo de cancelación')
      return
    }

    try {
      await invoiceService.cancel(id, cancelModal.motivo)
      toast.success('Factura cancelada')
      setCancelModal({ open: false, motivo: '' })
      loadInvoice()
    } catch (error) {
      console.error('Error al cancelar factura:', error)
      toast.error('Error al cancelar factura')
    }
  }

  const handleGeneratePDF = async () => {
    try {
      await invoiceService.generatePDF(id)
      toast.success('PDF generado correctamente')
    } catch (error) {
      console.error('Error al generar PDF:', error)
      toast.error('Error al generar PDF')
    }
  }

  if (loading) {
    return <Spinner.Page message="Cargando factura..." />
  }

  if (!invoice) {
    return null
  }

  const getEstadoVariant = (estado) => {
    const variants = {
      'pendiente': 'warning',
      'pagada-presencial': 'success',
      'anulada': 'danger'
    }
    return variants[estado] || 'secondary'
  }

  const getEstadoLabel = (estado) => {
    const labels = {
      'pendiente': 'Pendiente',
      'pagada-presencial': 'Pagada',
      'anulada': 'Cancelada'
    }
    return labels[estado] || estado
  }

  const getMetodoPagoLabel = (metodo) => {
    const labels = {
      'efectivo': 'Efectivo',
      'tarjeta': 'Tarjeta',
      'transferencia': 'Transferencia',
      'otro': 'Otro'
    }
    return labels[metodo] || metodo
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/invoices')}
            leftIcon={Icons.ArrowLeft}
            className="mb-4"
          >
            Volver
          </Button>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Factura {invoice.numeroFactura || 'N/A'}</h1>
            <Badge variant={getEstadoVariant(invoice.estado)} size="lg">
              {getEstadoLabel(invoice.estado)}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {invoice.fecha ? format(new Date(invoice.fecha), "dd 'de' MMMM 'de' yyyy", { locale: es }) : 'Sin fecha'}
          </p>
        </div>
        <div className="flex space-x-2">
          {invoice.estado === 'pendiente' && (
            <>
              <Button
                variant="outline"
                onClick={() => setPayModal({ open: true, metodoPago: '' })}
                leftIcon={Icons.Check}
              >
                Marcar como Pagada
              </Button>
              <Button
                variant="outline"
                onClick={() => setCancelModal({ open: true, motivo: '' })}
                leftIcon={Icons.X}
                className="text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50"
              >
                Cancelar Factura
              </Button>
            </>
          )}
          <Button
            variant="outline"
            onClick={handleGeneratePDF}
            leftIcon={Icons.Download}
          >
            Generar PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Detalle de Servicios/Productos</h2>
            </Card.Header>
            <Card.Content className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase py-3">Descripción</th>
                      <th className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase py-3">Cantidad</th>
                      <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase py-3">Precio Unit.</th>
                      <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase py-3">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {invoice.servicios?.map((item, index) => (
                      <tr key={index}>
                        <td className="py-4 text-sm text-gray-900 dark:text-white">{item.descripcion}</td>
                        <td className="py-4 text-sm text-center text-gray-900 dark:text-white">{item.cantidad}</td>
                        <td className="py-4 text-sm text-right text-gray-900 dark:text-white">
                          ${item.precioUnitario?.toLocaleString('es-CO')}
                        </td>
                        <td className="py-4 text-sm text-right font-medium text-gray-900 dark:text-white">
                          ${(item.cantidad * item.precioUnitario).toLocaleString('es-CO')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">${invoice.subtotal?.toLocaleString('es-CO')}</span>
                </div>
                {invoice.descuento > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Descuento</span>
                    <span className="font-medium text-red-600">
                      -${invoice.descuento?.toLocaleString('es-CO')}
                    </span>
                  </div>
                )}
                {invoice.impuestos > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">IVA ({invoice.porcentajeImpuestos || 0}%)</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${invoice.impuestos?.toLocaleString('es-CO')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold border-t border-gray-300 dark:border-gray-600 pt-3">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-primary-600 dark:text-primary-400">${invoice.total?.toLocaleString('es-CO')}</span>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Observaciones */}
          {invoice.observaciones && (
            <Card>
              <Card.Header>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Observaciones</h2>
              </Card.Header>
              <Card.Content className="p-6">
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{invoice.observaciones}</p>
              </Card.Content>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cliente */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Cliente</h2>
            </Card.Header>
            <Card.Content className="p-6">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-semibold text-purple-700">
                    {invoice.propietario?.nombreCompleto?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {invoice.propietario?.nombreCompleto || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Doc: {invoice.propietario?.documento}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <Icons.Phone className="w-3 h-3 inline mr-1" />
                    {invoice.propietario?.telefono}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <Icons.Mail className="w-3 h-3 inline mr-1" />
                    {invoice.propietario?.email}
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Estado de Pago */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Estado de Pago</h2>
            </Card.Header>
            <Card.Content className="p-6 space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Estado</p>
                <Badge variant={getEstadoVariant(invoice.estado)} size="lg">
                  {getEstadoLabel(invoice.estado)}
                </Badge>
              </div>
              {invoice.metodoPago && invoice.estado === 'pagada-presencial' && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Método de Pago</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{getMetodoPagoLabel(invoice.metodoPago)}</p>
                </div>
              )}
              {invoice.motivoCancelacion && invoice.estado === 'anulada' && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Motivo de Cancelación</p>
                  <p className="text-sm text-gray-900 dark:text-white">{invoice.motivoCancelacion}</p>
                </div>
              )}
            </Card.Content>
          </Card>

          {/* Información de Registro */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Información</h2>
            </Card.Header>
            <Card.Content className="p-6 space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Fecha de emisión</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {invoice.fecha ? format(new Date(invoice.fecha), "dd/MM/yyyy") : 'Sin fecha'}
                </p>
              </div>
              {invoice.createdAt && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Creada el</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {format(new Date(invoice.createdAt), "dd/MM/yyyy 'a las' h:mm a", { locale: es })}
                  </p>
                </div>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>

      {/* Pay Modal */}
      <Modal
        isOpen={payModal.open}
        onClose={() => setPayModal({ open: false, metodoPago: '' })}
        size="sm"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
            <Icons.Check className="w-6 h-6 text-green-600" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Marcar como Pagada
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Confirma el método de pago utilizado
            </p>
          </div>
          <div className="mt-4">
            <Select
              label="Método de Pago"
              value={payModal.metodoPago}
              onChange={(e) => setPayModal({ ...payModal, metodoPago: e.target.value })}
              options={[
                { value: '', label: 'Selecciona un método' },
                { value: 'efectivo', label: 'Efectivo' },
                { value: 'tarjeta', label: 'Tarjeta (Débito/Crédito)' },
                { value: 'transferencia', label: 'Transferencia Bancaria' },
                { value: 'otro', label: 'Otro' }
              ]}
            />
          </div>
          <div className="mt-6 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setPayModal({ open: false, metodoPago: '' })}
              fullWidth
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleMarkAsPaid}
              fullWidth
            >
              Confirmar Pago
            </Button>
          </div>
        </div>
      </Modal>

      {/* Cancel Modal */}
      <Modal
        isOpen={cancelModal.open}
        onClose={() => setCancelModal({ open: false, motivo: '' })}
        size="sm"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <Icons.X className="w-6 h-6 text-red-600" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Cancelar Factura
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Indica el motivo de la cancelación
            </p>
          </div>
          <div className="mt-4">
            <Textarea
              label="Motivo de Cancelación"
              value={cancelModal.motivo}
              onChange={(e) => setCancelModal({ ...cancelModal, motivo: e.target.value })}
              placeholder="Describe el motivo..."
              rows={3}
              required
            />
          </div>
          <div className="mt-6 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setCancelModal({ open: false, motivo: '' })}
              fullWidth
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleCancel}
              fullWidth
            >
              Cancelar Factura
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default InvoiceDetailPage
