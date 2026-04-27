import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Textarea from '@components/ui/Textarea'
import Spinner from '@components/ui/Spinner'
import { Icons } from '@constants/icons'
import { updateOwnerSchema } from '@validations/ownerSchema'
import ownerService from '@services/ownerService'
import { toast } from 'sonner'

function OwnerEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(updateOwnerSchema)
  })

  useEffect(() => {
    loadOwner()
  }, [id])

  const loadOwner = async () => {
    try {
      setLoading(true)
      const owner = await ownerService.getById(id)
      
      setValue('nombreCompleto', owner.nombreCompleto)
      setValue('documento', owner.documento)
      setValue('telefono', owner.telefono)
      setValue('email', owner.email || '')
      setValue('direccion', owner.direccion || '')
    } catch (error) {
      console.error('Error al cargar propietario:', error)
      toast.error('Error al cargar datos del propietario')
      navigate('/owners')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      await ownerService.update(id, data)
      toast.success('Propietario actualizado exitosamente')
      navigate('/owners')
    } catch (error) {
      console.error('Error al actualizar propietario:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al actualizar propietario')
      }
    }
  }

  if (loading) {
    return <Spinner.Page message="Cargando propietario..." />
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/owners')}
          leftIcon={Icons.ArrowLeft}
          className="mb-4"
        >
          Volver
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Editar Propietario</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Actualiza la información del cliente
        </p>
      </div>

      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Input
                  label="Nombre Completo"
                  {...register('nombreCompleto')}
                  error={errors.nombreCompleto?.message}
                  placeholder="Ej: Juan Pérez González"
                  leftIcon={Icons.User}
                  required
                />
              </div>

              <Input
                label="Documento de Identidad"
                {...register('documento')}
                error={errors.documento?.message}
                placeholder="1234567890"
                leftIcon={Icons.FileText}
                required
              />

              <Input
                label="Teléfono"
                {...register('telefono')}
                error={errors.telefono?.message}
                placeholder="3001234567"
                leftIcon={Icons.Phone}
                required
              />

              <div className="sm:col-span-2">
                <Input
                  label="Correo Electrónico"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  placeholder="ejemplo@correo.com"
                  leftIcon={Icons.Mail}
                />
              </div>

              <div className="sm:col-span-2">
                <Textarea
                  label="Dirección"
                  {...register('direccion')}
                  error={errors.direccion?.message}
                  placeholder="Calle 123 #45-67, Apto 301"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/owners')}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                leftIcon={Icons.Save}
              >
                Guardar Cambios
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}

export default OwnerEditPage
