import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Textarea from '@components/ui/Textarea'
import { Icons } from '@constants/icons'
import { createAppointmentSchema } from '@validations/appointmentSchema'
import appointmentService from '@services/appointmentService'
import petService from '@services/petService'
import userService from '@services/userService'
import { toast } from 'sonner'

function AppointmentCreatePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const petId = searchParams.get('petId')
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
    resolver: yupResolver(createAppointmentSchema),
    defaultValues: {
      fecha: format(new Date(), 'yyyy-MM-dd')
    }
  })

  // Observar cambios en el campo mascota
  const selectedPetId = useWatch({ control, name: 'mascota' })

  useEffect(() => {
    loadData()
    if (petId) {
      setValue('mascota', petId)
    }
  }, [])

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
      
      // Cargar mascotas
      const petsResponse = await petService.getAll({ limit: 1000 })
      setPets(petsResponse.data || [])
      
      // Cargar veterinarios (usuarios con rol veterinario)
      const usersResponse = await userService.getAll({ rol: 'veterinario', limit: 1000 })
      setVeterinarians(usersResponse.data || [])
    } catch (error) {
      console.error('Error al cargar datos:', error)
      toast.error('Error al cargar datos necesarios')
    } finally {
      setLoadingData(false)
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
      
      await appointmentService.create(data)
      toast.success('Cita agendada exitosamente')
      navigate('/appointments')
    } catch (error) {
      console.error('Error al crear cita:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al agendar cita')
      }
    }
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nueva Cita</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Agenda una nueva cita médica
        </p>
      </div>

      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información de la Cita */}
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

            {/* Botones */}
            <div className="CREATE-APPOINTMENT flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
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
                Agendar Cita
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}

export default AppointmentCreatePage
