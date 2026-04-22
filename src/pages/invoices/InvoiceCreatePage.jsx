import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Textarea from '@components/ui/Textarea'
import { Icons } from '@constants/icons'
import { createInvoiceSchema } from '@validations/invoiceSchema'
import invoiceService from '@services/invoiceService'
import ownerService from '@services/ownerService'
import { toast } from 'sonner'

function InvoiceCreatePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const ownerId = searchParams.get('ownerId')
  const [owners, setOwners] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(createInvoiceSchema),
    defaultValues: {
      items: [{ descripcion: '', cantidad: 1, precioUnitario: 0 }],
      descuento: 0,
      impuesto: 19
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  })

  const watchItems = watch('items')
  const watchDescuento = watch('descuento')
  const watchImpuesto = watch('impuesto')

  useEffect(() => {
    loadData()
    if (ownerId) {
      setValue('propietario', ownerId)
    }
  }, [])

  useEffect(() => {
    calculateTotals()
  }, [watchItems, watchDescuento, watchImpuesto])

  const loadData = async () => {
    try {
      setLoadingData(true)
      const ownersResponse = await ownerService.getAll({ limit: 1000 })
      setOwners(ownersResponse.data || [])
    } catch (error) {
      console.error('Error al cargar datos:', error)
      toast.error('Error al cargar datos necesarios')
    } finally {
      setLoadingData(false)
    }
  }

  const calculateTotals = () => {
    const subtotal = watchItems.reduce((sum, item) => {
      const cantidad = Number(item.cantidad) || 0
      const precio = Number(item.precioUnitario) || 0
      return sum + (cantidad * precio)
    }, 0)

    const descuento = Number(watchDescuento) || 0
    const impuesto = Number(watchImpuesto) || 0

    const descuentoMonto = (subtotal * descuento) / 100
    const baseImponible = subtotal - descuentoMonto
    const impuestoMonto = (baseImponible * impuesto) / 100
    const total = baseImponible + impuestoMonto

    return { subtotal, descuentoMonto, impuestoMonto, total }
  }

  const totals = calculateTotals()

  const onSubmit = async (data) => {
    try {
      const invoiceData = {
        ...data,
        items: data.items.map(item => ({
          ...item,
          cantidad: Number(item.cantidad),
          precioUnitario: Number(item.precioUnitario)
        })),
        descuento: Number(data.descuento),
        impuesto: Number(data.impuesto)
      }
      
      await invoiceService.create(invoiceData)
      toast.success('Factura creada exitosamente')
      navigate('/invoices')
    } catch (error) {
      console.error('Error al crear factura:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al crear factura')
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
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
        <h1 className="text-3xl font-bold text-gray-900">Nueva Factura</h1>
        <p className="mt-1 text-sm text-gray-600">
          Crea una nueva factura de servicio
        </p>
      </div>

      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Cliente */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Información del Cliente
              </h3>
              <Controller
                name="propietario"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Propietario"
                    {...field}
                    error={errors.propietario?.message}
                    options={[
                      { value: '', label: loadingData ? 'Cargando...' : 'Selecciona un propietario' },
                      ...owners.map(owner => ({
                        value: owner._id,
                        label: `${owner.nombreCompleto} - ${owner.documento}`
                      }))
                    ]}
                    disabled={loadingData}
                    required
                  />
                )}
              />
            </div>

            {/* Items */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Servicios / Productos
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ descripcion: '', cantidad: 1, precioUnitario: 0 })}
                  leftIcon={Icons.Plus}
                >
                  Agregar Ítem
                </Button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-5">
                        <Input
                          {...register(`items.${index}.descripcion`)}
                          error={errors.items?.[index]?.descripcion?.message}
                          placeholder="Descripción del servicio/producto"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          min="1"
                          {...register(`items.${index}.cantidad`)}
                          error={errors.items?.[index]?.cantidad?.message}
                          placeholder="Cant."
                          required
                        />
                      </div>
                      <div className="col-span-3">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          {...register(`items.${index}.precioUnitario`)}
                          error={errors.items?.[index]?.precioUnitario?.message}
                          placeholder="Precio unit."
                          leftIcon={Icons.DollarSign}
                          required
                        />
                      </div>
                      <div className="col-span-2 flex items-start space-x-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">
                            ${((watchItems[index]?.cantidad || 0) * (watchItems[index]?.precioUnitario || 0)).toLocaleString('es-CO')}
                          </p>
                        </div>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Icons.Trash className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totales */}
            <div className="pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Ajustes
                  </h3>
                  <Input
                    label="Descuento (%)"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    {...register('descuento')}
                    error={errors.descuento?.message}
                    placeholder="0"
                  />
                  <Input
                    label="Impuesto / IVA (%)"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('impuesto')}
                    error={errors.impuesto?.message}
                    placeholder="19"
                  />
                  <Textarea
                    label="Observaciones"
                    {...register('observaciones')}
                    error={errors.observaciones?.message}
                    placeholder="Notas adicionales..."
                    rows={3}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen</h3>
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${totals.subtotal.toLocaleString('es-CO')}</span>
                    </div>
                    {watchDescuento > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Descuento ({watchDescuento}%)</span>
                        <span className="font-medium text-red-600">-${totals.descuentoMonto.toLocaleString('es-CO')}</span>
                      </div>
                    )}
                    {watchImpuesto > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">IVA ({watchImpuesto}%)</span>
                        <span className="font-medium">${totals.impuestoMonto.toLocaleString('es-CO')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-3">
                      <span>Total</span>
                      <span className="text-primary-600">${totals.total.toLocaleString('es-CO')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/invoices')}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                leftIcon={Icons.Save}
              >
                Crear Factura
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}

export default InvoiceCreatePage
