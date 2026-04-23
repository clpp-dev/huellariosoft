import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import Card from '@components/ui/Card'
import Spinner from '@components/ui/Spinner'
import { Icons } from '@constants/icons'
import { formatCurrency, formatTimeToAMPM } from '@utils/formatters'
import { formatDate } from '@utils/dateUtils'
import { ROLE_LABELS } from '@constants/enums'
import dashboardService from '@services/dashboardService'
import { toast } from 'sonner'

function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    citasHoy: 0,
    totalMascotas: 0,
    totalPropietarios: 0,
    facturacionMensual: 0,
  })

  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [lowStockItems, setLowStockItems] = useState([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const data = await dashboardService.getStats()
      
      setStats({
        citasHoy: data.citasHoy,
        totalMascotas: data.totalMascotas,
        totalPropietarios: data.totalPropietarios,
        facturacionMensual: data.facturacionMensual,
      })

      // Cargar próximas citas
      const citas = await dashboardService.getProximasCitas()
      setUpcomingAppointments(citas)

      // Cargar productos con stock bajo
      setLowStockItems(data.stockBajo)
    } catch (error) {
      console.error('Error al cargar dashboard:', error)
      toast.error('Error al cargar datos del dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Spinner.Page message="Cargando dashboard..." />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          ¡Hola, {user?.nombre?.split(' ')[0]}! 👋
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {ROLE_LABELS[user?.rol]} • {formatDate(new Date(), 'EEEE, d MMMM yyyy')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Citas de hoy */}
        <Card className="overflow-hidden">
          <Card.Content className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 bg-primary-100 rounded-xl">
                  <Icons.Calendar className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Citas Hoy
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.citasHoy}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Total mascotas */}
        <Card className="overflow-hidden">
          <Card.Content className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Icons.PawPrint className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Mascotas Registradas
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.totalMascotas}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Total propietarios */}
        <Card className="overflow-hidden">
          <Card.Content className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Icons.Users className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Clientes Activos
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.totalPropietarios}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Ingresos del mes */}
        <Card className="overflow-hidden">
          <Card.Content className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Icons.Receipt className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Facturación del Mes
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(stats.facturacionMensual)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Grid de 2 columnas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Próximas citas */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title>Próximas Citas</Card.Title>
              <Link
                to="/appointments"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Ver todas
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            {upcomingAppointments.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No hay citas próximas
              </p>
            ) : (
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {upcomingAppointments.slice(0, 5).map((appointment) => (
                    <li 
                      key={appointment._id} 
                      className="py-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2"
                      onClick={() => navigate(`/appointments/${appointment._id}/edit`)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <span className="text-primary-700 font-semibold text-sm">
                              {formatTimeToAMPM(appointment.hora)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {appointment.mascota?.nombre || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {appointment.propietario?.nombreCompleto || 'N/A'}
                          </p>
                          <p className="text-xs text-gray-400">
                            {appointment.motivo}
                          </p>
                        </div>
                        <div>
                          <Icons.ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Alertas de inventario */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title>Alertas de Inventario</Card.Title>
              <Link
                to="/inventory"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Ver inventario
              </Link>
            </div>
            <Card.Description>
              Productos con stock bajo
            </Card.Description>
          </Card.Header>
          <Card.Content>
            {lowStockItems.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No hay productos con stock bajo
              </p>
            ) : (
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {lowStockItems.slice(0, 5).map((item) => (
                    <li key={item._id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Icons.AlertCircle className="h-5 w-5 text-red-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.nombre}
                          </p>
                          <p className="text-sm text-red-600">
                            Stock: {item.cantidad} / Mínimo: {item.stockMinimo}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* Accesos rápidos */}
      <Card>
        <Card.Header>
          <Card.Title>Accesos Rápidos</Card.Title>
          <Card.Description>
            Accede rápidamente a las funciones más utilizadas
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Link
              to="/appointments/create"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Icons.Calendar className="h-8 w-8 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Nueva Cita
              </span>
            </Link>

            <Link
              to="/pets/create"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Icons.PawPrint className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Nueva Mascota
              </span>
            </Link>

            <Link
              to="/owners/create"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Icons.Users className="h-8 w-8 text-yellow-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Nuevo Cliente
              </span>
            </Link>

            <Link
              to="/invoices/create"
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Icons.Receipt className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Nueva Factura
              </span>
            </Link>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default DashboardPage
