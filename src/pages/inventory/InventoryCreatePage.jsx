import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Textarea from '@components/ui/Textarea'
import { Icons } from '@constants/icons'
import { createInventorySchema } from '@validations/inventorySchema'
import inventoryService from '@services/inventoryService'
import { toast } from 'sonner'

function InventoryCreatePage() {
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(createInventorySchema)
  })

  const onSubmit = async (data) => {
    try {
      const productData = {
        ...data,
        cantidad: Number(data.cantidad),
        stockMinimo: Number(data.stockMinimo),
        precio: Number(data.precio)
      }
      
      await inventoryService.create(productData)
      toast.success('Producto agregado al inventario')
      navigate('/inventory')
    } catch (error) {
      console.error('Error al crear producto:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al agregar producto')
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/inventory')}
          leftIcon={Icons.ArrowLeft}
          className="mb-4"
        >
          Volver
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nuevo Producto</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Agrega un nuevo producto al inventario
        </p>
      </div>

      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información del Producto */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Información del Producto
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Input
                    label="Nombre del Producto"
                    {...register('nombre')}
                    error={errors.nombre?.message}
                    placeholder="Ej: Vacuna Antirrábica, Alimento Premium"
                    leftIcon={Icons.Package}
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <Textarea
                    label="Descripción"
                    {...register('descripcion')}
                    error={errors.descripcion?.message}
                    placeholder="Descripción detallada del producto..."
                    rows={3}
                  />
                </div>

                <Select
                  label="Categoría"
                  {...register('categoria')}
                  error={errors.categoria?.message}
                  options={[
                    { value: '', label: 'Selecciona una categoría' },
                    { value: 'Medicamento', label: '💊 Medicamento' },
                    { value: 'Alimento', label: '🍖 Alimento' },
                    { value: 'Accesorio', label: '🎾 Accesorio' },
                    { value: 'Insumo_Medico', label: '🩺 Insumo Médico' },
                    { value: 'Otro', label: '📦 Otro' }
                  ]}
                  required
                />

                <Input
                  label="Unidad de Medida"
                  {...register('unidadMedida')}
                  error={errors.unidadMedida?.message}
                  placeholder="Ej: unidad, kg, litro, caja"
                  required
                />
              </div>
            </div>

            {/* Stock y Precio */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Stock y Precio
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <Input
                  label="Cantidad Inicial"
                  type="number"
                  {...register('cantidad')}
                  error={errors.cantidad?.message}
                  placeholder="0"
                  min="0"
                  leftIcon={Icons.Package}
                  required
                />

                <Input
                  label="Stock Mínimo"
                  type="number"
                  {...register('stockMinimo')}
                  error={errors.stockMinimo?.message}
                  placeholder="0"
                  min="0"
                  leftIcon={Icons.AlertCircle}
                  required
                />

                <Input
                  label="Precio (COP)"
                  type="number"
                  step="0.01"
                  {...register('precio')}
                  error={errors.precio?.message}
                  placeholder="0.00"
                  min="0"
                  leftIcon={Icons.DollarSign}
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Se te notificará cuando el stock alcance el mínimo establecido
              </p>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/inventory')}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                leftIcon={Icons.Save}
              >
                Agregar Producto
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}

export default InventoryCreatePage
