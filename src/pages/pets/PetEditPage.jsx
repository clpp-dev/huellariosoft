import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Spinner from '@components/ui/Spinner'
import { Icons } from '@constants/icons'
import { updatePetSchema } from '@validations/petSchema'
import petService from '@services/petService'
import ownerService from '@services/ownerService'
import { toast } from 'sonner'

function PetEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [owners, setOwners] = useState([])
  const [loadingOwners, setLoadingOwners] = useState(true)
  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(updatePetSchema)
  })

  useEffect(() => {
    loadOwners()
    loadPet()
  }, [id])

  const loadOwners = async () => {
    try {
      setLoadingOwners(true)
      const response = await ownerService.getAll({ limit: 1000 })
      setOwners(response.data || [])
    } catch (error) {
      console.error('Error al cargar propietarios:', error)
    } finally {
      setLoadingOwners(false)
    }
  }

  const loadPet = async () => {
    try {
      setLoading(true)
      const pet = await petService.getById(id)
      
      setValue('nombre', pet.nombre)
      setValue('propietario', pet.propietario?._id || pet.propietario)
      setValue('especie', pet.especie)
      setValue('raza', pet.raza)
      setValue('edad.valor', pet.edad?.valor || '')
      setValue('edad.unidad', pet.edad?.unidad || 'meses')
      setValue('sexo', pet.sexo)
      setValue('color', pet.color)
      setValue('peso', pet.peso || '')
      setValue('esterilizado', pet.esterilizado || false)
    } catch (error) {
      console.error('Error al cargar mascota:', error)
      toast.error('Error al cargar datos de la mascota')
      navigate('/pets')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      const petData = {
        ...data,
        edad: {
          valor: Number(data.edad.valor),
          unidad: data.edad.unidad
        },
        peso: data.peso ? Number(data.peso) : null
      }
      
      await petService.update(id, petData)
      toast.success('Mascota actualizada exitosamente')
      navigate('/pets')
    } catch (error) {
      console.error('Error al actualizar mascota:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al actualizar mascota')
      }
    }
  }

  if (loading) {
    return <Spinner.Page message="Cargando mascota..." />
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/pets')}
          leftIcon={Icons.ArrowLeft}
          className="mb-4"
        >
          Volver
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Editar Mascota</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Actualiza la información de la mascota
        </p>
      </div>

      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Básica */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Información Básica
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Nombre"
                  {...register('nombre')}
                  error={errors.nombre?.message}
                  placeholder="Ej: Max, Luna"
                  leftIcon={Icons.PawPrint}
                  required
                />

                <Controller
                  name="propietario"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Propietario"
                      {...field}
                      error={errors.propietario?.message}
                      options={[
                        { value: '', label: loadingOwners ? 'Cargando...' : 'Selecciona un propietario' },
                        ...owners.map(owner => ({
                          value: owner._id,
                          label: `${owner.nombreCompleto} - ${owner.documento}`
                        }))
                      ]}
                      disabled={loadingOwners}
                      required
                    />
                  )}
                />

                <Select
                  label="Especie"
                  {...register('especie')}
                  error={errors.especie?.message}
                  options={[
                    { value: '', label: 'Selecciona una especie' },
                    { value: 'Canino', label: '🐕 Canino' },
                    { value: 'Felino', label: '🐈 Felino' },
                    { value: 'Ave', label: '🦜 Ave' },
                    { value: 'Roedor', label: '🐹 Roedor' },
                    { value: 'Reptil', label: '🦎 Reptil' },
                    { value: 'Otro', label: '🐾 Otro' }
                  ]}
                  required
                />

                <Input
                  label="Raza"
                  {...register('raza')}
                  error={errors.raza?.message}
                  placeholder="Ej: Labrador, Siamés"
                  required
                />
              </div>
            </div>

            {/* Características */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Características
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Edad"
                    type="number"
                    {...register('edad.valor')}
                    error={errors.edad?.valor?.message}
                    placeholder="0"
                    required
                  />
                  <Select
                    label="Unidad"
                    {...register('edad.unidad')}
                    error={errors.edad?.unidad?.message}
                    options={[
                      { value: 'dias', label: 'Días' },
                      { value: 'meses', label: 'Meses' },
                      { value: 'años', label: 'Años' }
                    ]}
                    required
                  />
                </div>

                <Select
                  label="Sexo"
                  {...register('sexo')}
                  error={errors.sexo?.message}
                  options={[
                    { value: '', label: 'Selecciona el sexo' },
                    { value: 'Macho', label: 'Macho' },
                    { value: 'Hembra', label: 'Hembra' }
                  ]}
                  required
                />

                <Input
                  label="Color"
                  {...register('color')}
                  error={errors.color?.message}
                  placeholder="Ej: Negro, Blanco con manchas"
                  required
                />

                <Input
                  label="Peso (kg)"
                  type="number"
                  step="0.1"
                  {...register('peso')}
                  error={errors.peso?.message}
                  placeholder="0.0"
                />

                <div className="sm:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register('esterilizado')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Mascota esterilizada
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/pets')}
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

export default PetEditPage
