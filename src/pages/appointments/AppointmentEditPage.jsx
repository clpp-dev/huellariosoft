import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Textarea from '@components/ui/Textarea'
import Spinner from '@components/ui/Spinner'
import { Icons } from '@constants/icons'
import { updateAppointmentSchema } from '@validations/appointmentSchema'
import appointmentService from '@services/appointmentService'
import petService from '@services/petService'
import userService from '@services/userService'
import { toast } from 'sonner'

function AppointmentEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [pets, setPets] = useState([])
  const [veterinarians, setVeterinarians] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(updateAppointmentSchema)
  })

  // Observar cambios en el campo mascota
  const selectedPetId = useWatch({ control, name: 'mascota' })

  useEffect(() => {
    loadData()
    loadAppointment()
  }, [id])

  // Cuando cambia la mascota seleccionada, obtener su propietario
  useEffect(() => {
    if (selectedPetId && pets.length > 0) {
      const selectedPet = pets.find(pet => pet._id === selectedPetId)
      if (selectedPet?.propietario?._id) {
        setValue('propietario', selectedPet.propietario._id)
      }
    }
  }, [selectedPetId, pets, setValue])

  const loadData = async () => {
    try {
      setLoadingData(true)
      
      const petsResponse = await petService.getAll({ limit: 1000 })
      setPets(petsResponse.data || [])
      
      const usersResponse = await userService.getAll({ rol: 'veterinario', limit: 1000 })
      setVeterinarians(usersResponse.data || [])
    } catch (error) {
      console.error('Error al cargar datos:', error)
    } finally {
      setLoadingData(false)
    }
  }

  const loadAppointment = async () => {
    try {
      setLoading(true)
      const appointment = await appointmentService.getById(id)
      
      setValue('mascota', appointment.mascota?._id || appointment.mascota)
      setValue('propietario', appointment.propietario?._id || appointment.propietario)
      setValue('veterinario', appointment.veterinario?._id || appointment.veterinario)
      setValue('fecha', format(new Date(appointment.fecha), 'yyyy-MM-dd'))
      setValue('hora', appointment.hora)
      setValue('motivo', appointment.motivo)
      setValue('observaciones', appointment.observaciones || '')
    } catch (error) {
      console.error('Error al cargar cita:', error)
      toast.error('Error al cargar datos de la cita')
      navigate('/appointments')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      // Asegurar que el propietario esté incluido
      if (!data.propietario) {
        const selectedPet = pets.find(pet => pet._id === data.mascota)
        if (selectedPet?.propietario?._id) {
          data.propietario = selectedPet.propietario._id
        } else {
          toast.error('La mascota seleccionada no tiene propietario asignado')
          return
        }
      }
      
      await appointmentService.update(id, data)
      toast.success('Cita actualizada exitosamente')
      navigate('/appointments')
    } catch (error) {
      console.error('Error al actualizar cita:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al actualizar cita')
      }
    }
  }

  if (loading) {
    return <Spinner.Page message="Cargando cita..." />
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/appointments')}
          leftIcon={Icons.ArrowLeft}
          className="mb-4"
        >
          Volver
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Editar Cita</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Actualiza la información de la cita
        </p>
      </div>

      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Información de la Cita
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Controller
                    name="mascota"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Mascota"
                        {...field}
                        error={errors.mascota?.message}
                        options={[
                          { value: '', label: loadingData ? 'Cargando...' : 'Selecciona una mascota' },
                          ...pets.map(pet => ({
                            value: pet._id,
                            label: `${pet.nombre} - ${pet.especie} (${pet.propietario?.nombreCompleto || 'Sin propietario'})`
                          }))
                        ]}
                        disabled={loadingData}
                        required
                      />
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Controller
                    name="veterinario"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Veterinario"
                        {...field}
                        error={errors.veterinario?.message}
                        options={[
                          { value: '', label: loadingData ? 'Cargando...' : 'Selecciona un veterinario' },
                          ...veterinarians.map(vet => ({
                            value: vet._id,
                            label: vet.nombre
                          }))
                        ]}
                        disabled={loadingData}
                        required
                      />
                    )}
                  />
                </div>

                <Input
                  label="Fecha"
                  type="date"
                  {...register('fecha')}
                  error={errors.fecha?.message}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  leftIcon={Icons.Calendar}
                  required
                />

                <Input
                  label="Hora"
                  type="time"
                  {...register('hora')}
                  error={errors.hora?.message}
                  leftIcon={Icons.Clock}
                  required
                />

                <div className="sm:col-span-2">
                  <Input
                    label="Motivo de la Cita"
                    {...register('motivo')}
                    error={errors.motivo?.message}
                    placeholder="Ej: Consulta general, Vacunación, Control"
                    leftIcon={Icons.FileText}
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <Textarea
                    label="Observaciones"
                    {...register('observaciones')}
                    error={errors.observaciones?.message}
                    placeholder="Información adicional relevante para la cita..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/appointments')}
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

export default AppointmentEditPage
