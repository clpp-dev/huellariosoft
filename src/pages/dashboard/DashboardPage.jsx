import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import Card from '@components/ui/Card'
import Spinner from '@components/ui/Spinner'
import { Icons } from '@constants/icons'
import { formatCurrency, formatTimeToAMPM } from '@utils/formatters'
import { formatDate } from '@utils/dateUtils'
import { ROLE_LABELS, ROLES } from '@constants/enums'
import dashboardService from '@services/dashboardService'
import { toast } from 'sonner'

function DashboardPage() {
  const { user, hasAnyRole } = useAuth()
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
  }, [user])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      // Si es propietario, solo cargar sus próximas citas
      if (user?.tipoUsuario === 'propietario') {
        const citas = await dashboardService.getProximasCitas()
        setUpcomingAppointments(citas)
      } else {
        // Si es empleado, cargar todas las estadísticas
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
      }
    } catch (error) {
      console.error('Error al cargar dashboard:', error)
      toast.error('Error al cargar datos del dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner.Page message="Cargando dashboard..." />
      </div>
    )
  }

  // Vista para propietarios
  if (user?.tipoUsuario === 'propietario') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ¡Hola, {user?.nombreCompleto?.split(' ')[0]}! 👋
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Bienvenido a tu portal de cliente • {formatDate(new Date(), 'EEEE, d MMMM yyyy')}
          </p>
        </div>

        {/* Accesos rápidos */}
        <Card>
          <Card.Header>
            <Card.Title>Accesos Rápidos</Card.Title>
            <Card.Description>
              Gestiona tus mascotas y citas
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Link
                to="/pets"
                className="flex flex-col items-center justify-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors border-2 border-purple-200 dark:border-purple-800"
              >
                <Icons.PawPrint className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-3" />
                <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  Mis Mascotas
                </span>
              </Link>

              <Link
                to="/appointments"
                className="flex flex-col items-center justify-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors border-2 border-primary-200 dark:border-primary-800"
              >
                <Icons.Calendar className="h-10 w-10 text-primary-600 dark:text-primary-400 mb-3" />
                <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  Mis Citas
                </span>
              </Link>

              <Link
                to="/medical-records"
                className="flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors border-2 border-green-200 dark:border-green-800"
              >
                <Icons.FileText className="h-10 w-10 text-green-600 dark:text-green-400 mb-3" />
                <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                  Historiales Médicos
                </span>
              </Link>
            </div>
          </Card.Content>
        </Card>

        {/* Próximas citas */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title>Mis Próximas Citas</Card.Title>
              <Link
                to="/appointments"
                className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Ver todas
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Icons.Calendar className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No tienes citas próximas
                </p>
                <Link
                  to="/appointments/create"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Agendar una cita
                </Link>
              </div>
            ) : (
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                  {upcomingAppointments.slice(0, 5).map((appointment) => (
                    <li 
                      key={appointment._id} 
                      className="py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-lg px-2 -mx-2"
                      onClick={() => navigate(`/appointments`)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                            <span className="text-primary-700 dark:text-primary-400 font-semibold text-sm">
                              {formatTimeToAMPM(appointment.hora)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {appointment.mascota?.nombre || 'N/A'}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {appointment.motivo}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {formatDate(appointment.fecha, 'dd MMMM yyyy')}
                          </p>
                        </div>
                        <div>
                          <Icons.ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
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
    )
  }

  // Vista para empleados (administrador, veterinario, recepcionista, auxiliar)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          ¡Hola, {user?.nombre?.split(' ')[0]}! 👋
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
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
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Citas Hoy
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
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
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Mascotas Registradas
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
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
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    Clientes Activos
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {stats.totalPropietarios}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Ingresos del mes - Solo visible para admin y veterinario */}
        {hasAnyRole([ROLES.ADMIN, ROLES.VETERINARIAN]) && (
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
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Facturación del Mes
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(stats.facturacionMensual)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </Card.Content>
          </Card>
        )}
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
                className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Ver todas
              </Link>
            </div>
          </Card.Header>
          <Card.Content>
            {upcomingAppointments.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No hay citas próximas
              </p>
            ) : (
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                  {upcomingAppointments.slice(0, 5).map((appointment) => (
                    <li 
                      key={appointment._id} 
                      className="py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-lg px-2 -mx-2"
                      onClick={() => navigate(`/appointments/${appointment._id}/edit`)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                            <span className="text-primary-700 dark:text-primary-400 font-semibold text-sm">
                              {formatTimeToAMPM(appointment.hora)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {appointment.mascota?.nombre || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {appointment.propietario?.nombreCompleto || 'N/A'}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {appointment.motivo}
                          </p>
                        </div>
                        <div>
                          <Icons.ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
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
                className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
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
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No hay productos con stock bajo
              </p>
            ) : (
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                  {lowStockItems.slice(0, 5).map((item) => (
                    <li key={item._id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                            <Icons.AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {item.nombre}
                          </p>
                          <p className="text-sm text-red-600 dark:text-red-400">
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
            {/* Nueva Cita - Accesible para todos los roles */}
            {hasAnyRole([ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN, ROLES.OWNER]) && (
              <Link
                to="/appointments/create"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <Icons.Calendar className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Nueva Cita
                </span>
              </Link>
            )}

            {/* Nueva Mascota - Solo para Admin, Recepcionista, Veterinario */}
            {hasAnyRole([ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN]) && (
              <Link
                to="/pets/create"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <Icons.PawPrint className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Nueva Mascota
                </span>
              </Link>
            )}

            {/* Nuevo Cliente - Admin, Recepcionista, Veterinario */}
            {hasAnyRole([ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN]) && (
              <Link
                to="/owners/create"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <Icons.Users className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Nuevo Cliente
                </span>
              </Link>
            )}

            {/* Nueva Factura - Admin, Recepcionista, Veterinario */}
            {hasAnyRole([ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN]) && (
              <Link
                to="/invoices/create"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                <Icons.Receipt className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Nueva Factura
                </span>
              </Link>
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default DashboardPage
