import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Spinner from '@components/ui/Spinner'
import { Icons } from '@constants/icons'
import medicalRecordService from '@services/medicalRecordService'
import { toast } from 'sonner'

function MedicalRecordDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [record, setRecord] = useState(null)

  useEffect(() => {
    loadRecord()
  }, [id])

  const loadRecord = async () => {
    try {
      setLoading(true)
      const recordData = await medicalRecordService.getById(id)
      setRecord(recordData)
    } catch (error) {
      console.error('Error al cargar historia clínica:', error)
      toast.error('Error al cargar información de la historia clínica')
      navigate('/medical-records')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Spinner.Page message="Cargando historia clínica..." />
  }

  if (!record) {
    return null
  }

  return (
    <div className="MAIN-CONTAINER-DETAIL-MEDICAL-REPORTS space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
          <h1 className="text-3xl font-bold text-gray-900">Historia Clínica</h1>
          <p className="mt-1 text-sm text-gray-600">
            {format(new Date(record.fecha), "dd 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Contenido Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información del Paciente */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">Información del Paciente</h2>
            </Card.Header>
            <Card.Content className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                  🐾
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{record.mascota?.nombre}</h3>
                  <p className="text-sm text-gray-600">{record.mascota?.especie} • {record.mascota?.raza}</p>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Edad</p>
                      <p className="text-sm font-medium text-gray-900">
                        {record.mascota?.edad?.valor} {record.mascota?.edad?.unidad}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Sexo</p>
                      <p className="text-sm font-medium text-gray-900">{record.mascota?.sexo}</p>
                    </div>
                  </div>
                </div>
              </div>

              {record.mascota?.propietario && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Propietario</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-700">
                        {record.mascota.propietario.nombreCompleto?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {record.mascota.propietario.nombreCompleto}
                      </p>
                      <p className="text-xs text-gray-500">{record.mascota.propietario.telefono}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card.Content>
          </Card>

          {/* Signos Vitales */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">Signos Vitales</h2>
            </Card.Header>
            <Card.Content className="p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icons.Activity className="w-4 h-4 text-blue-600" />
                    <p className="text-xs text-gray-600">Peso</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {record.peso ? `${record.peso} kg` : 'N/A'}
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icons.Thermometer className="w-4 h-4 text-red-600" />
                    <p className="text-xs text-gray-600">Temperatura</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {record.temperatura ? `${record.temperatura} °C` : 'N/A'}
                  </p>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icons.Heart className="w-4 h-4 text-pink-600" />
                    <p className="text-xs text-gray-600">F. Cardíaca</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {record.frecuenciaCardiaca ? `${record.frecuenciaCardiaca} lpm` : 'N/A'}
                  </p>
                </div>
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icons.Wind className="w-4 h-4 text-cyan-600" />
                    <p className="text-xs text-gray-600">F. Respiratoria</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {record.frecuenciaRespiratoria ? `${record.frecuenciaRespiratoria} rpm` : 'N/A'}
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Información Clínica */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">Información Clínica</h2>
            </Card.Header>
            <Card.Content className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Motivo de Consulta</h4>
                <p className="text-sm text-gray-900">{record.motivo}</p>
              </div>

              {record.anamnesis && (
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Anamnesis</h4>
                  <p className="text-sm text-gray-900 whitespace-pre-line">{record.anamnesis}</p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Diagnóstico</h4>
                <p className="text-sm text-gray-900 whitespace-pre-line">{record.diagnostico}</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Tratamiento</h4>
                <p className="text-sm text-gray-900 whitespace-pre-line">{record.tratamiento}</p>
              </div>

              {record.observaciones && (
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Observaciones</h4>
                  <p className="text-sm text-gray-900 whitespace-pre-line">{record.observaciones}</p>
                </div>
              )}
            </Card.Content>
          </Card>

          {/* Vacunas */}
          {record.vacunas && record.vacunas.length > 0 && (
            <Card>
              <Card.Header>
                <h2 className="text-lg font-semibold text-gray-900">Vacunas Aplicadas</h2>
              </Card.Header>
              <Card.Content className="p-6">
                <div className="space-y-3">
                  {record.vacunas.map((vacuna, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <Icons.Shield className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{vacuna.nombre}</p>
                        <p className="text-xs text-gray-600">
                          Aplicada: {format(new Date(vacuna.fecha), 'dd/MM/yyyy')}
                        </p>
                        {vacuna.proximaDosis && (
                          <p className="text-xs text-gray-600">
                            Próxima dosis: {format(new Date(vacuna.proximaDosis), 'dd/MM/yyyy')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          )}
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Veterinario */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">Veterinario</h2>
            </Card.Header>
            <Card.Content className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icons.User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {record.veterinario?.nombre || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">Veterinario</p>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Información de Registro */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">Información de Registro</h2>
            </Card.Header>
            <Card.Content className="p-6 space-y-3">
              <div>
                <p className="text-xs text-gray-500">Fecha de consulta</p>
                <p className="text-sm font-medium text-gray-900">
                  {format(new Date(record.fecha), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                </p>
              </div>
              {record.createdAt && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Registrado el</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(record.createdAt), "dd/MM/yyyy 'a las' HH:mm")}
                  </p>
                </div>
              )}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MedicalRecordDetailPage
