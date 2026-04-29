import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Textarea from '@components/ui/Textarea'
import { Icons } from '@constants/icons'
import { createOwnerSchema } from '@validations/ownerSchema'
import ownerService from '@services/ownerService'
import { toast } from 'sonner'

function OwnerCreatePage() {
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(createOwnerSchema)
  })

  const onSubmit = async (data) => {
    try {
      await ownerService.create(data)
      toast.success('Propietario creado exitosamente')
      navigate('/owners')
    } catch (error) {
      console.error('Error al crear propietario:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al crear propietario')
      }
    }
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nuevo Propietario</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Registra un nuevo cliente en el sistema
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
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="Contraseña"
                  type="password"
                  {...register('password')}
                  error={errors.password?.message}
                  placeholder="Mínimo 8 caracteres, incluir mayúscula, minúscula y número"
                  leftIcon={Icons.Lock}
                  required
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  La contraseña permitirá al propietario acceder al sistema para ver sus mascotas y citas
                </p>
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
                Crear Propietario
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}

export default OwnerCreatePage
