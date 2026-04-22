import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import Card from '@components/ui/Card'
import { Icons } from '@constants/icons'
import { formatCurrency } from '@utils/formatters'
import { formatDate } from '@utils/dateUtils'
import { ROLE_LABELS } from '@constants/enums'

function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    appointments: { today: 0, thisWeek: 0, total: 0 },
    pets: { total: 0, thisMonth: 0 },
    owners: { total: 0, thisMonth: 0 },
    revenue: { today: 0, thisMonth: 0, pending: 0 },
  })

  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [lowStockItems, setLowStockItems] = useState([])

  useEffect(() => {
    // Aquí cargarías los datos reales de la API
    // Por ahora usaremos datos de ejemplo
    setStats({
      appointments: { today: 5, thisWeek: 23, total: 156 },
      pets: { total: 89, thisMonth: 12 },
      owners: { total: 67, thisMonth: 8 },
      revenue: { today: 450000, thisMonth: 5600000, pending: 1200000 },
    })

    setUpcomingAppointments([
      {
        id: 1,
        time: '09:00',
        petName: 'Max',
        ownerName: 'Juan Pérez',
        service: 'Consulta general',
      },
      {
        id: 2,
        time: '10:30',
        petName: 'Luna',
        ownerName: 'María García',
        service: 'Vacunación',
      },
      {
        id: 3,
        time: '11:00',
        petName: 'Rocky',
        ownerName: 'Carlos López',
        service: 'Control',
      },
    ])

    setLowStockItems([
      { id: 1, name: 'Vacuna Antirrábica', stock: 3, minStock: 10 },
      { id: 2, name: 'Amoxicilina 500mg', stock: 5, minStock: 15 },
      { id: 3, name: 'Gasas estériles', stock: 2, minStock: 20 },
    ])
  }, [])

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
                      {stats.appointments.today}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <Icons.ArrowRight className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                      <span className="sr-only">Increased by</span>
                      {stats.appointments.thisWeek} esta semana
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
                    Mascotas
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.pets.total}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      +{stats.pets.thisMonth} este mes
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
                    Propietarios
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.owners.total}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      +{stats.owners.thisMonth} este mes
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
                    Ingresos del Mes
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(stats.revenue.thisMonth)}
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
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {upcomingAppointments.map((appointment) => (
                  <li key={appointment.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <span className="text-primary-700 font-semibold text-sm">
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {appointment.petName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {appointment.ownerName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {appointment.service}
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
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {lowStockItems.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Icons.AlertCircle className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-red-600">
                          Stock: {item.stock} / Mínimo: {item.minStock}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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
