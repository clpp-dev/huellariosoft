import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Textarea from '@components/ui/Textarea'
import { Icons } from '@constants/icons'
import { createMedicalRecordSchema } from '@validations/medicalRecordSchema'
import medicalRecordService from '@services/medicalRecordService'
import petService from '@services/petService'
import userService from '@services/userService'
import { toast } from 'sonner'

function MedicalRecordCreatePage() {
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
    resolver: yupResolver(createMedicalRecordSchema),
    defaultValues: {
      fecha: new Date()
    }
  })

  useEffect(() => {
    loadData()
    if (petId) {
      setValue('mascota', petId)
    }
  }, [])

  const loadData = async () => {
    try {
      setLoadingData(true)
      
      const petsResponse = await petService.getAll({ limit: 1000 })
      setPets(petsResponse.data || [])
      
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
      // Convertir valores numéricos
      const recordData = {
        ...data,
        peso: data.peso ? Number(data.peso) : null,
        temperatura: data.temperatura ? Number(data.temperatura) : null,
        frecuenciaCardiaca: data.frecuenciaCardiaca ? Number(data.frecuenciaCardiaca) : null,
        frecuenciaRespiratoria: data.frecuenciaRespiratoria ? Number(data.frecuenciaRespiratoria) : null
      }
      
      await medicalRecordService.create(recordData)
      toast.success('Historia clínica creada exitosamente')
      navigate('/medical-records')
    } catch (error) {
      console.error('Error al crear historia clínica:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al crear historia clínica')
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/medical-records')}
          leftIcon={Icons.ArrowLeft}
          className="mb-4"
        >
          Volver
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Nueva Consulta Médica</h1>
        <p className="mt-1 text-sm text-gray-600">
          Registra una nueva historia clínica
        </p>
      </div>

      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Básica */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Información de la Consulta
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

                <Input
                  label="Fecha de Consulta"
                  type="date"
                  {...register('fecha')}
                  error={errors.fecha?.message}
                  max={format(new Date(), 'yyyy-MM-dd')}
                  leftIcon={Icons.Calendar}
                  required
                />
              </div>
            </div>

            {/* Signos Vitales */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Signos Vitales
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                <Input
                  label="Peso (kg)"
                  type="number"
                  step="0.1"
                  {...register('peso')}
                  error={errors.peso?.message}
                  placeholder="0.0"
                  leftIcon={Icons.Activity}
                />

                <Input
                  label="Temperatura (°C)"
                  type="number"
                  step="0.1"
                  {...register('temperatura')}
                  error={errors.temperatura?.message}
                  placeholder="37.0"
                  leftIcon={Icons.Thermometer}
                />

                <Input
                  label="Frec. Cardíaca (lpm)"
                  type="number"
                  {...register('frecuenciaCardiaca')}
                  error={errors.frecuenciaCardiaca?.message}
                  placeholder="120"
                  leftIcon={Icons.Heart}
                />

                <Input
                  label="Frec. Respiratoria (rpm)"
                  type="number"
                  {...register('frecuenciaRespiratoria')}
                  error={errors.frecuenciaRespiratoria?.message}
                  placeholder="30"
                  leftIcon={Icons.Wind}
                />
              </div>
            </div>

            {/* Consulta Médica */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Información Clínica
              </h3>
              <div className="space-y-4">
                <Input
                  label="Motivo de Consulta"
                  {...register('motivo')}
                  error={errors.motivo?.message}
                  placeholder="Ej: Control rutinario, Vacunación, Síntomas..."
                  leftIcon={Icons.FileText}
                  required
                />

                <Textarea
                  label="Anamnesis (Historia del paciente)"
                  {...register('anamnesis')}
                  error={errors.anamnesis?.message}
                  placeholder="Describe los antecedentes y evolución del caso..."
                  rows={3}
                />

                <Textarea
                  label="Diagnóstico"
                  {...register('diagnostico')}
                  error={errors.diagnostico?.message}
                  placeholder="Describe el diagnóstico médico..."
                  rows={3}
                  required
                />

                <Textarea
                  label="Tratamiento"
                  {...register('tratamiento')}
                  error={errors.tratamiento?.message}
                  placeholder="Describe el tratamiento indicado, medicamentos, dosis..."
                  rows={4}
                  required
                />

                <Textarea
                  label="Observaciones"
                  {...register('observaciones')}
                  error={errors.observaciones?.message}
                  placeholder="Notas adicionales o recomendaciones..."
                  rows={2}
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/medical-records')}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                leftIcon={Icons.Save}
              >
                Guardar Historia Clínica
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}

export default MedicalRecordCreatePage
