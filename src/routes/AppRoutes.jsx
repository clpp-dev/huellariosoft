import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute, PublicRoute, RoleGuard } from './ProtectedRoute'
import { ROLES } from '@constants/enums'

// Layouts
import AuthLayout from '@components/layout/AuthLayout'
import DashboardLayout from '@components/layout/DashboardLayout'

// Páginas de autenticación
import LoginPage from '@pages/auth/LoginPage'
import ForgotPasswordPage from '@pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '@pages/auth/ResetPasswordPage'

// Páginas principales
import DashboardPage from '@pages/dashboard/DashboardPage'
import ProfilePage from '@pages/profile/ProfilePage'

// Páginas de usuarios
import UsersListPage from '@pages/users/UsersListPage'
import UserCreatePage from '@pages/users/UserCreatePage'
import UserEditPage from '@pages/users/UserEditPage'

// Páginas de propietarios
import OwnersListPage from '@pages/owners/OwnersListPage'
import OwnerCreatePage from '@pages/owners/OwnerCreatePage'
import OwnerEditPage from '@pages/owners/OwnerEditPage'
import OwnerDetailPage from '@pages/owners/OwnerDetailPage'

// Páginas de mascotas
import PetsListPage from '@pages/pets/PetsListPage'
import PetCreatePage from '@pages/pets/PetCreatePage'
import PetEditPage from '@pages/pets/PetEditPage'
import PetDetailPage from '@pages/pets/PetDetailPage'

// Páginas de citas
import AppointmentsPage from '@pages/appointments/AppointmentsPage'
import AppointmentCreatePage from '@pages/appointments/AppointmentCreatePage'
import AppointmentEditPage from '@pages/appointments/AppointmentEditPage'

// Páginas de historia clínica
import MedicalRecordsPage from '@pages/medical-records/MedicalRecordsPage'
import MedicalRecordCreatePage from '@pages/medical-records/MedicalRecordCreatePage'
import MedicalRecordDetailPage from '@pages/medical-records/MedicalRecordDetailPage'

// Páginas de inventario
import InventoryListPage from '@pages/inventory/InventoryListPage'
import InventoryCreatePage from '@pages/inventory/InventoryCreatePage'
import InventoryEditPage from '@pages/inventory/InventoryEditPage'

// Páginas de facturación
import InvoicesListPage from '@pages/invoices/InvoicesListPage'
import InvoiceCreatePage from '@pages/invoices/InvoiceCreatePage'
import InvoiceDetailPage from '@pages/invoices/InvoiceDetailPage'

// Páginas de reportes
import ReportsPage from '@pages/reports/ReportsPage'

// Página 404
import NotFoundPage from '@pages/errors/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas (solo accesibles si NO está autenticado) */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <AuthLayout>
              <ForgotPasswordPage />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <AuthLayout>
              <ResetPasswordPage />
            </AuthLayout>
          </PublicRoute>
        }
      />

      {/* Rutas protegidas (requieren autenticación) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Perfil de usuario */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Gestión de usuarios - Solo administradores */}
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN]}>
              <DashboardLayout>
                <UsersListPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/create"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN]}>
              <DashboardLayout>
                <UserCreatePage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:id/edit"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN]}>
              <DashboardLayout>
                <UserEditPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Gestión de propietarios */}
      <Route
        path="/owners"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN, ROLES.AUXILIARY]}>
              <DashboardLayout>
                <OwnersListPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/owners/create"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.RECEPTIONIST]}>
              <DashboardLayout>
                <OwnerCreatePage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/owners/:id/edit"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.RECEPTIONIST]}>
              <DashboardLayout>
                <OwnerEditPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/owners/:id"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN, ROLES.AUXILIARY]}>
              <DashboardLayout>
                <OwnerDetailPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Gestión de mascotas */}
      <Route
        path="/pets"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PetsListPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pets/create"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN]}>
              <DashboardLayout>
                <PetCreatePage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pets/:id/edit"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN]}>
              <DashboardLayout>
                <PetEditPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pets/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PetDetailPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Gestión de citas */}
      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AppointmentsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments/create"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN, ROLES.OWNER]}>
              <DashboardLayout>
                <AppointmentCreatePage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments/:id/edit"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN]}>
              <DashboardLayout>
                <AppointmentEditPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Historia clínica */}
      <Route
        path="/medical-records"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.VETERINARIAN, ROLES.OWNER]}>
              <DashboardLayout>
                <MedicalRecordsPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/medical-records/create"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.VETERINARIAN]}>
              <DashboardLayout>
                <MedicalRecordCreatePage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/medical-records/:id"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.VETERINARIAN, ROLES.OWNER]}>
              <DashboardLayout>
                <MedicalRecordDetailPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Inventario */}
      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN, ROLES.AUXILIARY]}>
              <DashboardLayout>
                <InventoryListPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory/create"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.AUXILIARY]}>
              <DashboardLayout>
                <InventoryCreatePage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory/:id/edit"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.AUXILIARY]}>
              <DashboardLayout>
                <InventoryEditPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Facturación */}
      <Route
        path="/invoices"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN, ROLES.AUXILIARY]}>
              <DashboardLayout>
                <InvoicesListPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoices/create"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.RECEPTIONIST]}>
              <DashboardLayout>
                <InvoiceCreatePage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoices/:id"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.VETERINARIAN, ROLES.AUXILIARY]}>
              <DashboardLayout>
                <InvoiceDetailPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Reportes */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <RoleGuard roles={[ROLES.ADMIN]}>
              <DashboardLayout>
                <ReportsPage />
              </DashboardLayout>
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Redireccionamientos */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Página 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
