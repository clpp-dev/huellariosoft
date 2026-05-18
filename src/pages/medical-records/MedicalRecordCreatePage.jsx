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
      fechaConsulta: format(new Date(), 'yyyy-MM-dd')
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
      
      const veterinariosData = await userService.getVeterinarios()
      setVeterinarians(veterinariosData || [])
    } catch (error) {
      console.error('Error al cargar datos:', error)
      toast.error('Error al cargar datos necesarios')
    } finally {
      setLoadingData(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      // Convertir valores numéricos y ajustar nombres de campos
      const recordData = {
        mascota: data.mascota,
        veterinario: data.veterinario,
        fechaConsulta: data.fechaConsulta,
        motivoConsulta: data.motivoConsulta,
        anamnesicos: data.anamnesicos || undefined,
        sintomas: data.sintomas || undefined,
        
        // Examen Físico
        examenFisico: {
          muscosas: data.muscosas || undefined,
          deshidratacion: data.deshidratacion ? Number(data.deshidratacion) : undefined,
          condicionCorporal: data.condicionCorporal ? Number(data.condicionCorporal) : undefined,
          actitudPropietario: data.actitudPropietario || undefined,
          actitudVeterinario: data.actitudVeterinario || undefined,
        },
        
        // Sistemas Afectados
        sistemasAfectados: {
          descripcion: data.sistemasAfectadosDescripcion || undefined,
          pulso: data.pulso || undefined,
          tllc: data.tllc || undefined,
          trpc: data.trpc || undefined,
          examenesComplementarios: data.examenesComplementarios || undefined,
          listaProblemas: data.listaProblemas || undefined,
          listaMaestra: data.listaMaestra || undefined,
        },
        
        // Evaluación Clínica
        evaluacionClinica: {
          pronostico: data.pronostico || undefined,
          diagnostico: data.diagnostico,
          tratamiento: data.tratamiento,
        },
        
        // Mantener campos legacy
        diagnostico: data.diagnostico,
        tratamiento: data.tratamiento,
        observaciones: data.observaciones || undefined,
        
        // Signos vitales
        peso: data.peso ? Number(data.peso) : undefined,
        temperatura: data.temperatura ? Number(data.temperatura) : undefined,
        frecuenciaCardiaca: data.frecuenciaCardiaca ? Number(data.frecuenciaCardiaca) : undefined,
        frecuenciaRespiratoria: data.frecuenciaRespiratoria ? Number(data.frecuenciaRespiratoria) : undefined
      }
      
      await medicalRecordService.create(recordData)
      toast.success('Historia clínica creada exitosamente')
      navigate('/medical-records')
    } catch (error) {
      console.error('Error al crear historia clínica:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message || 'Error al crear historia clínica')
      }
    }
  }

  return (
    <div className="MAIN-CONTAINER-CREATE-MEDICAL-REPORTS max-w-4xl mx-auto space-y-6">
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nueva Consulta Médica</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Registra una nueva historia clínica
        </p>
      </div>

      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Básica */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
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
                  {...register('fechaConsulta')}
                  error={errors.fechaConsulta?.message}
                  max={format(new Date(), 'yyyy-MM-dd')}
                  leftIcon={Icons.Calendar}
                  required
                />
              </div>
            </div>

            {/* Signos Vitales */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
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
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Información Clínica
              </h3>
              <div className="space-y-4">
                <Input
                  label="Motivo de Consulta"
                  {...register('motivoConsulta')}
                  error={errors.motivoConsulta?.message}
                  placeholder="Ej: Control rutinario, Vacunación, Síntomas..."
                  leftIcon={Icons.FileText}
                  required
                />

                <Textarea
                  label="Anamnésicos"
                  {...register('anamnesicos')}
                  error={errors.anamnesicos?.message}
                  placeholder="Historia del paciente, antecedentes, información relevante..."
                  rows={4}
                />

                <Textarea
                  label="Síntomas y Signos Clínicos"
                  {...register('sintomas')}
                  error={errors.sintomas?.message}
                  placeholder="Describe los síntomas observados y signos clínicos..."
                  rows={3}
                />
              </div>
            </div>

            {/* Examen Físico */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Examen Físico
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Controller
                  name="muscosas"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Mucosas"
                      {...field}
                      error={errors.muscosas?.message}
                      options={[
                        { value: '', label: 'Selecciona una opción' },
                        { value: 'Rosadas', label: 'Rosadas' },
                        { value: 'Pálidas', label: 'Pálidas' },
                        { value: 'Congestionadas', label: 'Congestionadas' },
                        { value: 'Cianóticas', label: 'Cianóticas' },
                        { value: 'Ictéricas', label: 'Ictéricas' },
                        { value: 'Otro', label: 'Otro' },
                      ]}
                    />
                  )}
                />

                <Controller
                  name="deshidratacion"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Deshidratación (0-5)"
                      {...field}
                      error={errors.deshidratacion?.message}
                      options={[
                        { value: '', label: 'Selecciona una opción' },
                        { value: '0', label: '0 - Sin deshidratación' },
                        { value: '1', label: '1 - Muy leve' },
                        { value: '2', label: '2 - Leve' },
                        { value: '3', label: '3 - Moderada' },
                        { value: '4', label: '4 - Severa' },
                        { value: '5', label: '5 - Muy severa' },
                      ]}
                    />
                  )}
                />

                <Controller
                  name="condicionCorporal"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Condición Corporal (0-5)"
                      {...field}
                      error={errors.condicionCorporal?.message}
                      options={[
                        { value: '', label: 'Selecciona una opción' },
                        { value: '0', label: '0' },
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                        { value: '5', label: '5' },
                      ]}
                    />
                  )}
                />

                <Controller
                  name="actitudPropietario"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Actitud (Propietario)"
                      {...field}
                      error={errors.actitudPropietario?.message}
                      options={[
                        { value: '', label: 'Selecciona una opción' },
                        { value: 'Amigable', label: 'Amigable' },
                        { value: 'Nervioso', label: 'Nervioso' },
                        { value: 'Agresivo', label: 'Agresivo' },
                        { value: 'Temeroso', label: 'Temeroso' },
                        { value: 'Colaborador', label: 'Colaborador' },
                        { value: 'Otro', label: 'Otro' },
                      ]}
                    />
                  )}
                />

                <Controller
                  name="actitudVeterinario"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Actitud (Veterinario)"
                      {...field}
                      error={errors.actitudVeterinario?.message}
                      options={[
                        { value: '', label: 'Selecciona una opción' },
                        { value: 'Amigable', label: 'Amigable' },
                        { value: 'Nervioso', label: 'Nervioso' },
                        { value: 'Agresivo', label: 'Agresivo' },
                        { value: 'Temeroso', label: 'Temeroso' },
                        { value: 'Colaborador', label: 'Colaborador' },
                        { value: 'Otro', label: 'Otro' },
                      ]}
                    />
                  )}
                />
              </div>
            </div>

            {/* Sistemas Afectados */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Sistemas Afectados
              </h3>
              <div className="space-y-4">
                <Textarea
                  label="Descripción de Sistemas Afectados"
                  {...register('sistemasAfectadosDescripcion')}
                  error={errors.sistemasAfectadosDescripcion?.message}
                  placeholder="Describe los sistemas corporales afectados..."
                  rows={3}
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <Input
                    label="Pulso"
                    {...register('pulso')}
                    error={errors.pulso?.message}
                    placeholder="Ej: 120 lpm"
                  />

                  <Input
                    label="TLLC (Tiempo de Llenado Capilar)"
                    {...register('tllc')}
                    error={errors.tllc?.message}
                    placeholder="Ej: 2 segundos"
                  />

                  <Input
                    label="TRPC (Tiempo de Respuesta Pupilar)"
                    {...register('trpc')}
                    error={errors.trpc?.message}
                    placeholder="Ej: Normal"
                  />
                </div>

                <Textarea
                  label="Exámenes Complementarios"
                  {...register('examenesComplementarios')}
                  error={errors.examenesComplementarios?.message}
                  placeholder="Resultados de laboratorio, imágenes, etc..."
                  rows={3}
                />

                <Textarea
                  label="Lista de Problemas"
                  {...register('listaProblemas')}
                  error={errors.listaProblemas?.message}
                  placeholder="Enumera los problemas identificados..."
                  rows={3}
                />

                <Textarea
                  label="Lista Maestra"
                  {...register('listaMaestra')}
                  error={errors.listaMaestra?.message}
                  placeholder="Registro de problemas crónicos o históricos..."
                  rows={3}
                />
              </div>
            </div>

            {/* Evaluación Clínica */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Evaluación Clínica
              </h3>
              <div className="space-y-4">
                <Textarea
                  label="Pronóstico"
                  {...register('pronostico')}
                  error={errors.pronostico?.message}
                  placeholder="Describe el pronóstico del paciente..."
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
                />

                <Textarea
                  label="Observaciones Adicionales"
                  {...register('observaciones')}
                  error={errors.observaciones?.message}
                  placeholder="Notas adicionales o recomendaciones..."
                  rows={2}
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
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
