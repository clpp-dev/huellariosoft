import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Textarea from '@components/ui/Textarea'
import Badge from '@components/ui/Badge'
import { Icons } from '@constants/icons'
import { createInvoiceSchema } from '@validations/invoiceSchema'
import invoiceService from '@services/invoiceService'
import ownerService from '@services/ownerService'
import petService from '@services/petService'
import inventoryService from '@services/inventoryService'
import { toast } from 'sonner'

function InvoiceCreatePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const ownerId = searchParams.get('ownerId')
  const [owners, setOwners] = useState([])
  const [pets, setPets] = useState([])
  const [products, setProducts] = useState([])
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
      items: [{ 
        tipoItem: 'servicio',
        tipo: 'consulta',
        descripcion: '', 
        cantidad: 1, 
        precioUnitario: 0,
        producto: null
      }],
      descuento: 0,
      impuestos: 19
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  })

  const watchItems = watch('items')
  const watchDescuento = watch('descuento')
  const watchImpuestos = watch('impuestos')
  const watchPropietario = watch('propietario')

  useEffect(() => {
    loadData()
    if (ownerId) {
      setValue('propietario', ownerId)
    }
  }, [])

  useEffect(() => {
    if (watchPropietario) {
      loadPets(watchPropietario)
    } else {
      setPets([])
      setValue('mascota', '')
    }
  }, [watchPropietario])

  useEffect(() => {
    calculateTotals()
  }, [watchItems, watchDescuento, watchImpuestos])

  const loadData = async () => {
    try {
      setLoadingData(true)
      const [ownersResponse, productsResponse] = await Promise.all([
        ownerService.getAll({ limit: 1000 }),
        inventoryService.getAll({ limit: 1000 })
      ])
      setOwners(ownersResponse.data || [])
      setProducts(productsResponse.data || [])
    } catch (error) {
      console.error('Error al cargar datos:', error)
      toast.error('Error al cargar datos necesarios')
    } finally {
      setLoadingData(false)
    }
  }

  const loadPets = async (propietarioId) => {
    try {
      const response = await petService.getByOwner(propietarioId)
      setPets(response || [])
    } catch (error) {
      console.error('Error al cargar mascotas:', error)
      toast.error('Error al cargar mascotas del propietario')
      setPets([])
    }
  }

  const handleProductSelect = (index, productId) => {
    if (!productId) return

    const product = products.find(p => p._id === productId)
    if (product) {
      setValue(`items.${index}.descripcion`, product.nombre)
      setValue(`items.${index}.precioUnitario`, product.precioVenta)
      setValue(`items.${index}.tipo`, 'producto')
    }
  }

  const handleItemTypeChange = (index, tipoItem) => {
    setValue(`items.${index}.tipoItem`, tipoItem)
    
    if (tipoItem === 'servicio') {
      setValue(`items.${index}.producto`, null)
      setValue(`items.${index}.descripcion`, '')
      setValue(`items.${index}.precioUnitario`, 0)
      setValue(`items.${index}.tipo`, 'consulta')
    } else {
      setValue(`items.${index}.descripcion`, '')
      setValue(`items.${index}.precioUnitario`, 0)
      setValue(`items.${index}.tipo`, 'producto')
    }
  }

  const calculateTotals = () => {
    const subtotal = watchItems.reduce((sum, item) => {
      const cantidad = Number(item.cantidad) || 0
      const precio = Number(item.precioUnitario) || 0
      return sum + (cantidad * precio)
    }, 0)

    const descuento = Number(watchDescuento) || 0
    const porcentajeImpuestos = Number(watchImpuestos) || 0
    const baseImponible = subtotal - descuento
    const impuestos = (baseImponible * porcentajeImpuestos) / 100

    return { subtotal, descuento, porcentajeImpuestos, impuestos, total: baseImponible + impuestos }
  }

  const totals = calculateTotals()

  const onSubmit = async (data) => {
    try {
      const invoiceData = {
        propietario: data.propietario,
        mascota: data.mascota,
        servicios: data.items.map(item => ({
          tipo: item.tipo,
          descripcion: item.descripcion,
          cantidad: Number(item.cantidad),
          precioUnitario: Number(item.precioUnitario),
          subtotal: Number(item.cantidad) * Number(item.precioUnitario),
          ...(item.tipoItem === 'producto' && item.producto ? { producto: item.producto } : {})
        })),
        subtotal: totals.subtotal,
        impuestos: totals.impuestos,
        descuento: Number(data.descuento),
        total: totals.total,
        observaciones: data.observaciones
      }
      
      await invoiceService.create(invoiceData)
      toast.success('Factura creada exitosamente')
      navigate('/invoices')
    } catch (error) {
      console.error('Error al crear factura:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message || 'Error al crear factura')
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nueva Factura</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Crea una nueva factura de servicios y productos
        </p>
      </div>

      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Cliente */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Información del Cliente
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

                <Controller
                  name="mascota"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Mascota"
                      {...field}
                      error={errors.mascota?.message}
                      options={[
                        { value: '', label: !watchPropietario ? 'Selecciona primero un propietario' : 'Selecciona una mascota' },
                        ...pets.map(pet => ({
                          value: pet._id,
                          label: `${pet.nombre} - ${pet.especie}`
                        }))
                      ]}
                      disabled={!watchPropietario || pets.length === 0}
                      required
                    />
                  )}
                />
              </div>
            </div>

            {/* Items */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Servicios / Productos
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ 
                    tipoItem: 'servicio',
                    tipo: 'consulta',
                    descripcion: '', 
                    cantidad: 1, 
                    precioUnitario: 0,
                    producto: null
                  })}
                  leftIcon={Icons.Plus}
                >
                  Agregar Ítem
                </Button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="space-y-4">
                      {/* Selector de tipo */}
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                          <Controller
                            name={`items.${index}.tipoItem`}
                            control={control}
                            render={({ field: typeField }) => (
                              <Select
                                label="Tipo"
                                {...typeField}
                                onChange={(e) => {
                                  typeField.onChange(e)
                                  handleItemTypeChange(index, e.target.value)
                                }}
                                options={[
                                  { value: 'servicio', label: '🏥 Servicio' },
                                  { value: 'producto', label: '📦 Producto de Inventario' }
                                ]}
                              />
                            )}
                          />
                        </div>

                        <div className="col-span-7">
                          {watchItems[index]?.tipoItem === 'producto' ? (
                            <Controller
                              name={`items.${index}.producto`}
                              control={control}
                              render={({ field: prodField }) => (
                                <Select
                                  label="Producto"
                                  {...prodField}
                                  onChange={(e) => {
                                    prodField.onChange(e)
                                    handleProductSelect(index, e.target.value)
                                  }}
                                  error={errors.items?.[index]?.producto?.message}
                                  options={[
                                    { value: '', label: 'Selecciona un producto' },
                                    ...products
                                      .filter(p => p.cantidad > 0)
                                      .map(product => ({
                                        value: product._id,
                                        label: `${product.nombre} - Stock: ${product.cantidad} ${product.unidadMedida} - $${product.precioVenta.toLocaleString('es-CO')}`
                                      }))
                                  ]}
                                  required
                                />
                              )}
                            />
                          ) : (
                            <Input
                              label="Descripción del Servicio"
                              {...register(`items.${index}.descripcion`)}
                              error={errors.items?.[index]?.descripcion?.message}
                              placeholder="Ej: Consulta general, Vacunación"
                              required
                            />
                          )}
                        </div>

                        <div className="col-span-2 flex items-end">
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => remove(index)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full"
                            >
                              <Icons.Trash className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Campos de cantidad y precio */}
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                          <Controller
                            name={`items.${index}.tipo`}
                            control={control}
                            render={({ field: tipoField }) => (
                              <Select
                                label="Categoría"
                                {...tipoField}
                                options={
                                  watchItems[index]?.tipoItem === 'producto'
                                    ? [{ value: 'producto', label: 'Producto' }]
                                    : [
                                        { value: 'consulta', label: 'Consulta' },
                                        { value: 'cirugia', label: 'Cirugía' },
                                        { value: 'vacunacion', label: 'Vacunación' },
                                        { value: 'desparasitacion', label: 'Desparasitación' },
                                        { value: 'examen', label: 'Examen' },
                                        { value: 'hospitalizacion', label: 'Hospitalización' },
                                        { value: 'estetica', label: 'Estética' },
                                        { value: 'otro', label: 'Otro' }
                                      ]
                                }
                                disabled={watchItems[index]?.tipoItem === 'producto'}
                                required
                              />
                            )}
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            label="Cantidad"
                            type="number"
                            min="1"
                            {...register(`items.${index}.cantidad`)}
                            error={errors.items?.[index]?.cantidad?.message}
                            placeholder="1"
                            required
                          />
                        </div>
                        <div className="col-span-3">
                          <Input
                            label="Precio Unit."
                            type="number"
                            step="0.01"
                            min="0"
                            {...register(`items.${index}.precioUnitario`)}
                            error={errors.items?.[index]?.precioUnitario?.message}
                            placeholder="0.00"
                            leftIcon={Icons.DollarSign}
                            disabled={watchItems[index]?.tipoItem === 'producto' && watchItems[index]?.producto}
                            required
                          />
                        </div>
                        <div className="col-span-4 flex items-end">
                          <div className="flex-1 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Subtotal</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              ${((watchItems[index]?.cantidad || 0) * (watchItems[index]?.precioUnitario || 0)).toLocaleString('es-CO')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Indicador de stock bajo */}
                      {watchItems[index]?.tipoItem === 'producto' && watchItems[index]?.producto && (() => {
                        const product = products.find(p => p._id === watchItems[index].producto)
                        const cantidad = Number(watchItems[index]?.cantidad) || 0
                        if (product && cantidad > product.cantidad) {
                          return (
                            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                              <Icons.AlertCircle className="w-4 h-4" />
                              <span>Stock insuficiente. Disponible: {product.cantidad} {product.unidadMedida}</span>
                            </div>
                          )
                        }
                        if (product && product.cantidad <= product.stockMinimo) {
                          return (
                            <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                              <Icons.AlertCircle className="w-4 h-4" />
                              <span>Advertencia: Stock bajo ({product.cantidad} {product.unidadMedida})</span>
                            </div>
                          )
                        }
                        return null
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totales */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Ajustes
                  </h3>
                  <Input
                    label="Descuento (COP)"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('descuento')}
                    error={errors.descuento?.message}
                    placeholder="0"
                    leftIcon={Icons.DollarSign}
                  />
                  <Input
                    label="Impuestos / IVA (%)"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    {...register('impuestos')}
                    error={errors.impuestos?.message}
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
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Resumen</h3>
                  <div className="space-y-3 p-6 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-primary-200 dark:border-gray-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">Subtotal</span>
                      <span className="font-semibold text-gray-900 dark:text-white">${totals.subtotal.toLocaleString('es-CO')}</span>
                    </div>
                    {watchDescuento > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">Descuento</span>
                        <span className="font-semibold text-red-600 dark:text-red-400">-${Number(watchDescuento).toLocaleString('es-CO')}</span>
                      </div>
                    )}
                    {watchImpuestos > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">IVA ({watchImpuestos}%)</span>
                        <span className="font-semibold text-gray-900 dark:text-white">${totals.impuestos.toLocaleString('es-CO')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold border-t-2 border-primary-300 dark:border-gray-600 pt-3 mt-3">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-primary-600 dark:text-primary-400">${totals.total.toLocaleString('es-CO')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
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
