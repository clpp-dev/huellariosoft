# 📘 Manual Técnico - HuellarioSoft Frontend

**Versión:** 1.0.0  
**Fecha:** Mayo 2026  
**Autor:** HuellarioSoft Team

---

## 📑 Índice

1. [Introducción](#1-introducción)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Requisitos Previos](#3-requisitos-previos)
4. [Instalación y Configuración](#4-instalación-y-configuración)
5. [Inicialización del Proyecto](#5-inicialización-del-proyecto)
6. [Estructura del Proyecto](#6-estructura-del-proyecto)
7. [Variables de Entorno](#7-variables-de-entorno)
8. [Componentes Principales](#8-componentes-principales)
9. [Servicios y API](#9-servicios-y-api)
10. [Rutas y Navegación](#10-rutas-y-navegación)
11. [Autenticación y Autorización](#11-autenticación-y-autorización)
12. [Gestión de Estado](#12-gestión-de-estado)
13. [Estilos y Tema](#13-estilos-y-tema)
14. [Validación de Formularios](#14-validación-de-formularios)
15. [Despliegue](#15-despliegue)
16. [Optimización y Rendimiento](#16-optimización-y-rendimiento)
17. [Mantenimiento y Troubleshooting](#17-mantenimiento-y-troubleshooting)

---

## 1. Introducción

HuellarioSoft Frontend es la interfaz de usuario del sistema de gestión veterinaria, construida con React 18, Vite y Tailwind CSS. Proporciona una experiencia moderna, rápida y responsive para la gestión completa de una clínica veterinaria.

### Características Principales

- Desarrollo ultrarrápido con Vite
- React 18 con hooks y context API
- Diseño moderno con Tailwind CSS
- Interfaz 100% responsive
- Autenticación JWT con refresh tokens
- Dashboard con gráficas interactivas
- Validación de formularios robusta
- Soporte para modo oscuro
- Sistema de notificaciones toast
- Generación de reportes PDF

### Módulos del Sistema

1. **Dashboard** - Estadísticas y métricas en tiempo real
2. **Gestión de Propietarios** - CRUD completo de clientes
3. **Gestión de Mascotas** - Registro de pacientes con historial
4. **Citas** - Calendario y agendamiento de citas
5. **Historia Clínica** - Expedientes médicos completos
6. **Inventario** - Control de productos y stock
7. **Facturación** - Generación y gestión de facturas
8. **Reportes** - Informes y análisis de datos
9. **Usuarios** - Administración de usuarios del sistema

---

## 2. Arquitectura del Sistema

### Patrón de Diseño

El frontend utiliza una **arquitectura por capas** con separación de responsabilidades:

```
┌─────────────────────────────────────┐
│         Pages (Vistas)              │  ← Páginas/Pantallas
├─────────────────────────────────────┤
│      Components (Componentes)       │  ← Componentes reutilizables
├─────────────────────────────────────┤
│        Services (Servicios)         │  ← Lógica de negocio y API
├─────────────────────────────────────┤
│       Context (Estado Global)       │  ← Gestión de estado
├─────────────────────────────────────┤
│         Utils (Utilidades)          │  ← Funciones auxiliares
└─────────────────────────────────────┘
```

### Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | ^18.3.1 | Biblioteca UI |
| Vite | ^8.0.0 | Build tool y dev server |
| Tailwind CSS | ^3.4.3 | Framework CSS utility-first |
| React Router DOM | ^6.22.3 | Enrutamiento SPA |
| React Hook Form | ^7.51.2 | Gestión de formularios |
| Yup | ^1.4.0 | Validación de esquemas |
| Lucide React | ^0.363.0 | Iconos SVG |
| Recharts | ^2.12.2 | Gráficas y visualización |
| Sonner | ^1.4.41 | Notificaciones toast |
| date-fns | ^3.6.0 | Manejo de fechas |
| js-cookie | ^3.0.5 | Gestión de cookies |

### Características de Vite

- HMR (Hot Module Replacement) instantáneo
- Optimización automática de código splitting
- Build optimizado con esbuild
- Pre-bundling de dependencias
- Configuración de alias de rutas

---

## 3. Requisitos Previos

### Software Requerido

- **Node.js**: Versión 18.0.0 o superior
- **npm**: Versión 9.0.0 o superior (o Yarn 1.22+)
- **Git**: Para control de versiones
- **Editor de código**: VS Code recomendado

### Verificar Instalaciones

```bash
node --version    # Debe mostrar v18.0.0 o superior
npm --version     # Debe mostrar 9.0.0 o superior
```

### Extensiones de VS Code Recomendadas

- **ES7+ React/Redux/React-Native snippets** - Snippets de React
- **Tailwind CSS IntelliSense** - Autocompletado de clases Tailwind
- **ESLint** - Linter de código
- **Prettier** - Formateador de código
- **Auto Rename Tag** - Renombrado automático de tags HTML

### Conocimientos Técnicos Recomendados

- JavaScript ES6+
- React 18 (Hooks, Context API)
- Manejo de promesas y async/await
- CSS y Tailwind CSS
- HTML5
- React Router
- Conceptos de SPA (Single Page Application)

---

## 4. Instalación y Configuración

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/clpp-dev/huellariosoft.git
cd huellariosoft
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

Esto instalará todas las dependencias listadas en `package.json`.

> **Nota**: La instalación puede tardar 2-5 minutos dependiendo de la conexión a internet.

### Paso 3: Configurar Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Editar el archivo `.env` con las configuraciones correctas:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=HuellarioSoft
VITE_APP_VERSION=1.0.0

# Token Configuration
VITE_TOKEN_COOKIE_NAME=huellario_token
VITE_REFRESH_TOKEN_COOKIE_NAME=huellario_refresh_token

# Environment
VITE_ENV=development
```

> ⚠️ **Importante**: 
> - Las variables deben comenzar con `VITE_` para ser accesibles en el cliente
> - Nunca subir el archivo `.env` al repositorio
> - Para producción, usar `VITE_ENV=production`

### Paso 4: Verificar Conexión al Backend

Asegurarse de que el backend está corriendo en `http://localhost:5000` antes de iniciar el frontend.

---

## 5. Inicialización del Proyecto

### 5.1 Iniciar Servidor de Desarrollo

```bash
npm run dev
```

**Salida esperada:**

```
  VITE v8.0.0  ready in 312 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

El servidor de desarrollo estará disponible en: `http://localhost:3000`

### 5.2 Características del Servidor de Desarrollo

- **Hot Module Replacement (HMR)**: Los cambios se reflejan instantáneamente sin recargar la página
- **Error Overlay**: Errores visibles en pantalla durante el desarrollo
- **Proxy API**: Peticiones a `/api` se redirigen automáticamente al backend

### 5.3 Verificar Instalación

1. Abrir el navegador en `http://localhost:3000`
2. Debe cargar la página de login
3. Probar las credenciales del administrador:
   - **Email**: `admin@huellariosoft.com`
   - **Password**: `123456Usuario`

---

## 6. Estructura del Proyecto

```
huellariosoft-frontend/
├── public/                      # Archivos estáticos públicos
│   ├── favicon.ico
│   └── logo.png
│
├── src/                         # Código fuente
│   ├── assets/                  # Recursos (imágenes, fuentes)
│   │   └── img/
│   │       ├── logo.png
│   │       └── empty-state.svg
│   │
│   ├── components/              # Componentes reutilizables
│   │   ├── layout/             # Componentes de layout
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── shared/             # Componentes compartidos
│   │   │   └── EmptyState.jsx
│   │   ├── tables/             # Componentes de tablas
│   │   │   └── Table.jsx
│   │   └── ui/                 # Componentes UI base
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Input.jsx
│   │       ├── Modal.jsx
│   │       ├── Select.jsx
│   │       ├── Spinner.jsx
│   │       └── Textarea.jsx
│   │
│   ├── constants/               # Constantes de la aplicación
│   │   ├── config.js           # Configuración general
│   │   ├── enums.js            # Enumeraciones
│   │   ├── icons.js            # Iconos centralizados
│   │   └── messages.js         # Mensajes de error/éxito
│   │
│   ├── context/                 # Context API
│   │   └── AuthContext.jsx     # Contexto de autenticación
│   │
│   ├── hooks/                   # Custom hooks
│   │   ├── useDebounce.js
│   │   └── useTheme.js
│   │
│   ├── pages/                   # Páginas de la aplicación
│   │   ├── appointments/       # Módulo de citas
│   │   │   ├── AppointmentCreatePage.jsx
│   │   │   ├── AppointmentEditPage.jsx
│   │   │   └── AppointmentsPage.jsx
│   │   ├── auth/               # Autenticación
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   └── ResetPasswordPage.jsx
│   │   ├── dashboard/          # Dashboard principal
│   │   │   └── DashboardPage.jsx
│   │   ├── errors/             # Páginas de error
│   │   │   └── NotFoundPage.jsx
│   │   ├── inventory/          # Módulo de inventario
│   │   ├── invoices/           # Módulo de facturación
│   │   ├── medical-records/    # Historias clínicas
│   │   ├── owners/             # Propietarios
│   │   ├── pets/               # Mascotas
│   │   ├── profile/            # Perfil de usuario
│   │   ├── reports/            # Reportes
│   │   └── users/              # Usuarios
│   │
│   ├── routes/                  # Configuración de rutas
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── services/                # Servicios de API
│   │   ├── httpClient.js       # Cliente HTTP base
│   │   ├── tokenService.js     # Gestión de tokens
│   │   ├── authService.js      # Servicio de autenticación
│   │   ├── appointmentService.js
│   │   ├── dashboardService.js
│   │   ├── inventoryService.js
│   │   ├── invoiceService.js
│   │   ├── medicalRecordService.js
│   │   ├── ownerService.js
│   │   ├── petService.js
│   │   ├── reporteService.js
│   │   └── userService.js
│   │
│   ├── utils/                   # Utilidades
│   │   ├── dateUtils.js        # Funciones de fechas
│   │   ├── formatters.js       # Formateadores
│   │   ├── helpers.js          # Funciones auxiliares
│   │   ├── stringUtils.js      # Utilidades de strings
│   │   └── validators.js       # Validadores personalizados
│   │
│   ├── validations/             # Esquemas de validación
│   │   ├── appointmentSchema.js
│   │   ├── authSchema.js
│   │   ├── inventorySchema.js
│   │   ├── invoiceSchema.js
│   │   ├── medicalRecordSchema.js
│   │   ├── ownerSchema.js
│   │   ├── petSchema.js
│   │   └── userSchema.js
│   │
│   ├── App.jsx                  # Componente principal
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos globales
│
├── .env                         # Variables de entorno (no versionado)
├── .env.example                 # Ejemplo de variables
├── .gitignore                   # Archivos ignorados por Git
├── index.html                   # HTML principal
├── package.json                 # Dependencias y scripts
├── postcss.config.js            # Configuración de PostCSS
├── tailwind.config.js           # Configuración de Tailwind
├── vite.config.js               # Configuración de Vite
└── README.md                    # Documentación general
```

---

## 7. Variables de Entorno

### Variables Disponibles

| Variable | Descripción | Ejemplo | Requerida |
|----------|-------------|---------|-----------|
| `VITE_API_URL` | URL base del backend | `http://localhost:5000/api` | Sí |
| `VITE_APP_NAME` | Nombre de la aplicación | `HuellarioSoft` | No |
| `VITE_APP_VERSION` | Versión de la aplicación | `1.0.0` | No |
| `VITE_TOKEN_COOKIE_NAME` | Nombre de cookie del access token | `huellario_token` | Sí |
| `VITE_REFRESH_TOKEN_COOKIE_NAME` | Nombre de cookie del refresh token | `huellario_refresh_token` | Sí |
| `VITE_ENV` | Entorno de ejecución | `development`, `production` | Sí |

### Acceso a Variables de Entorno

```javascript
// En cualquier archivo
const apiUrl = import.meta.env.VITE_API_URL
const appName = import.meta.env.VITE_APP_NAME
```

### Configuración por Entorno

#### Desarrollo (`.env.development`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

#### Producción (`.env.production`)
```env
VITE_API_URL=https://api-huellariosoft.onrender.com/api
VITE_ENV=production
```

---

## 8. Componentes Principales

### 8.1 Componentes UI Base

#### Button
```jsx
<Button 
  variant="primary"     // primary, secondary, danger, ghost
  size="md"            // sm, md, lg
  loading={false}
  disabled={false}
  onClick={handleClick}
>
  Guardar
</Button>
```

#### Input
```jsx
<Input
  label="Email"
  type="email"
  placeholder="correo@ejemplo.com"
  error={errors.email}
  required
  {...register('email')}
/>
```

#### Card
```jsx
<Card
  title="Título"
  subtitle="Subtítulo opcional"
  actions={<Button>Acción</Button>}
>
  Contenido de la tarjeta
</Card>
```

#### Modal
```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Título del Modal"
  size="md"              // sm, md, lg, xl
>
  Contenido del modal
</Modal>
```

### 8.2 Componentes de Layout

#### DashboardLayout
```jsx
<DashboardLayout>
  <h1>Contenido de la página</h1>
</DashboardLayout>
```

Incluye:
- Header con navegación
- Sidebar con menú
- Área de contenido principal
- Soporte responsive

#### AuthLayout
```jsx
<AuthLayout>
  <LoginForm />
</AuthLayout>
```

Layout para páginas de autenticación (login, registro, etc.).

### 8.3 Componentes Especializados

#### Table
```jsx
<Table
  columns={columns}
  data={data}
  loading={loading}
  emptyMessage="No hay datos"
  onRowClick={handleRowClick}
/>
```

#### EmptyState
```jsx
<EmptyState
  icon={<Icon />}
  title="No hay datos"
  description="Descripción opcional"
  action={<Button>Crear nuevo</Button>}
/>
```

---

## 9. Servicios y API

### 9.1 HttpClient

Cliente HTTP centralizado con manejo de autenticación y errores:

```javascript
// src/services/httpClient.js
const httpClient = new HttpClient()

// GET
const response = await httpClient.get('/users')

// POST
const response = await httpClient.post('/users', { nombre: 'Juan' })

// PUT
const response = await httpClient.put('/users/123', { nombre: 'Juan' })

// DELETE
const response = await httpClient.delete('/users/123')
```

#### Características:
- Manejo automático de tokens JWT
- Refresh automático de tokens
- Interceptores de request y response
- Manejo de errores global
- Timeout configurable

### 9.2 Estructura de Servicios

Cada servicio encapsula las operaciones de un módulo:

```javascript
// src/services/ownerService.js
const ownerService = {
  // Obtener todos
  getAll: async (params) => {
    return httpClient.get('/propietarios', params)
  },

  // Obtener por ID
  getById: async (id) => {
    return httpClient.get(`/propietarios/${id}`)
  },

  // Crear
  create: async (data) => {
    return httpClient.post('/propietarios', data)
  },

  // Actualizar
  update: async (id, data) => {
    return httpClient.put(`/propietarios/${id}`, data)
  },

  // Eliminar
  delete: async (id) => {
    return httpClient.delete(`/propietarios/${id}`)
  },
}
```

### 9.3 Servicios Disponibles

| Servicio | Archivo | Endpoints |
|----------|---------|-----------|
| Autenticación | `authService.js` | Login, logout, perfil, refresh |
| Dashboard | `dashboardService.js` | Estadísticas, métricas |
| Propietarios | `ownerService.js` | CRUD de propietarios |
| Mascotas | `petService.js` | CRUD de mascotas |
| Citas | `appointmentService.js` | CRUD de citas |
| Historia Clínica | `medicalRecordService.js` | CRUD de historias |
| Inventario | `inventoryService.js` | CRUD de productos |
| Facturas | `invoiceService.js` | CRUD de facturas |
| Reportes | `reporteService.js` | Generación de reportes |
| Usuarios | `userService.js` | CRUD de usuarios |

---

## 10. Rutas y Navegación

### 10.1 Configuración de Rutas

```javascript
// src/routes/AppRoutes.jsx
<Routes>
  {/* Rutas públicas */}
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  </Route>

  {/* Rutas protegidas */}
  <Route element={<ProtectedRoute />}>
    <Route element={<DashboardLayout />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/propietarios" element={<OwnersPage />} />
      <Route path="/mascotas" element={<PetsPage />} />
      {/* ... más rutas */}
    </Route>
  </Route>

  {/* Ruta 404 */}
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

### 10.2 Rutas Principales

| Ruta | Componente | Descripción | Roles |
|------|------------|-------------|-------|
| `/` | DashboardPage | Dashboard principal | Todos |
| `/login` | LoginPage | Inicio de sesión | Público |
| `/propietarios` | OwnersPage | Lista de propietarios | Todos |
| `/propietarios/nuevo` | OwnerCreatePage | Crear propietario | Admin, Recepcionista |
| `/mascotas` | PetsPage | Lista de mascotas | Todos |
| `/citas` | AppointmentsPage | Gestión de citas | Todos |
| `/historia-clinica` | MedicalRecordsPage | Historias clínicas | Veterinario, Admin |
| `/inventario` | InventoryListPage | Control de inventario | Admin, Auxiliar |
| `/facturas` | InvoicesListPage | Gestión de facturas | Admin, Recepcionista |
| `/reportes` | ReportsPage | Reportes del sistema | Admin |
| `/usuarios` | UsersPage | Gestión de usuarios | Admin |
| `/perfil` | ProfilePage | Perfil de usuario | Todos |

### 10.3 Navegación Programática

```javascript
import { useNavigate } from 'react-router-dom'

function MyComponent() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/propietarios')
    // o con estado
    navigate('/propietarios/123', { state: { from: 'dashboard' } })
  }
}
```

---

## 11. Autenticación y Autorización

### 11.1 AuthContext

Gestión global del estado de autenticación:

```javascript
import { useAuth } from '@/context/AuthContext'

function MyComponent() {
  const { 
    user,              // Usuario actual
    isAuthenticated,   // Estado de autenticación
    loading,           // Cargando
    login,             // Función de login
    logout,            // Función de logout
    updateProfile      // Actualizar perfil
  } = useAuth()

  return (
    <div>
      {isAuthenticated && <p>Bienvenido {user.nombre}</p>}
    </div>
  )
}
```

### 11.2 ProtectedRoute

Protección de rutas basada en autenticación:

```javascript
// Uso automático en AppRoutes.jsx
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<DashboardPage />} />
</Route>
```

Funcionalidad:
- ✅ Verifica si el usuario está autenticado
- ✅ Redirige al login si no está autenticado
- ✅ Carga el perfil del usuario al iniciar
- ✅ Maneja el refresh automático de tokens

### 11.3 Protección por Roles

```javascript
import { useAuth } from '@/context/AuthContext'
import { ROLES } from '@/constants/enums'

function AdminOnlyComponent() {
  const { user } = useAuth()

  if (user?.rol !== ROLES.ADMINISTRATOR) {
    return <p>No tienes permisos</p>
  }

  return <div>Contenido solo para administradores</div>
}
```

### 11.4 Gestión de Tokens

```javascript
// tokenService.js maneja automáticamente:
// - Almacenamiento seguro en cookies
// - Refresh automático cuando expiran
// - Limpieza al cerrar sesión
```

---

## 12. Gestión de Estado

### 12.1 Context API

#### AuthContext
```javascript
// Proveedor en App.jsx
<AuthProvider>
  <AppRoutes />
</AuthProvider>

// Uso en componentes
const { user, isAuthenticated } = useAuth()
```

### 12.2 Estado Local (useState)

```javascript
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
```

### 12.3 Custom Hooks

#### useDebounce
```javascript
import { useDebounce } from '@/hooks/useDebounce'

const [searchTerm, setSearchTerm] = useState('')
const debouncedSearch = useDebounce(searchTerm, 500)

useEffect(() => {
  // Se ejecuta 500ms después del último cambio
  fetchData(debouncedSearch)
}, [debouncedSearch])
```

#### useTheme
```javascript
import { useTheme } from '@/hooks/useTheme'

const { theme, toggleTheme } = useTheme()

<button onClick={toggleTheme}>
  {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
</button>
```

---

## 13. Estilos y Tema

### 13.1 Tailwind CSS

Tailwind CSS utility-first framework para estilos:

```jsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-800">Título</h2>
  <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
    Acción
  </button>
</div>
```

### 13.2 Colores Personalizados

```javascript
// tailwind.config.js
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    900: '#0c4a6e',
  },
  secondary: {
    // ...
  },
}
```

### 13.3 Modo Oscuro

```jsx
// Activado con clase 'dark'
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Contenido
</div>
```

### 13.4 Responsive Design

```jsx
<div className="
  w-full           // Móvil
  md:w-1/2        // Tablet
  lg:w-1/3        // Desktop
  xl:w-1/4        // Desktop grande
">
  Contenido responsive
</div>
```

### 13.5 Estilos Globales

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
}

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700;
  }
}
```

---

## 14. Validación de Formularios

### 14.1 React Hook Form + Yup

```javascript
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ownerSchema } from '@/validations/ownerSchema'

function OwnerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(ownerSchema),
  })

  const onSubmit = async (data) => {
    try {
      await ownerService.create(data)
      toast.success('Propietario creado')
      reset()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nombre"
        {...register('nombre')}
        error={errors.nombre?.message}
      />
      
      <Button type="submit" loading={isSubmitting}>
        Guardar
      </Button>
    </form>
  )
}
```

### 14.2 Esquemas de Validación

```javascript
// src/validations/ownerSchema.js
import * as yup from 'yup'

export const ownerSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'Mínimo 3 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  
  documento: yup
    .string()
    .required('El documento es requerido')
    .matches(/^[0-9]+$/, 'Solo números'),
  
  email: yup
    .string()
    .email('Email inválido')
    .required('El email es requerido'),
  
  telefono: yup
    .string()
    .required('El teléfono es requerido')
    .matches(/^[0-9]{10}$/, 'Debe tener 10 dígitos'),
})
```

### 14.3 Validación en Tiempo Real

```javascript
const {
  register,
  watch,
  formState: { errors },
} = useForm({ mode: 'onChange' }) // Valida en cada cambio

const email = watch('email') // Observar un campo específico
```

---

## 15. Despliegue

### 15.1 Build para Producción

```bash
npm run build
```

Esto genera:
- Carpeta `dist/` con archivos optimizados
- HTML, CSS y JS minificados
- Code splitting automático
- Assets optimizados

### 15.2 Despliegue en Cloudflare Pages

#### Paso 1: Preparar Repositorio

1. Asegurarse de que `.env` está en `.gitignore`
2. Commit y push a GitHub

#### Paso 2: Configurar en Cloudflare

1. **Iniciar sesión en [Cloudflare Dashboard](https://dash.cloudflare.com)**

2. **Crear nuevo proyecto en Pages**
   - Ir a "Workers & Pages" → "Create application"
   - Seleccionar "Pages" → "Connect to Git"
   - Conectar con GitHub
   - Seleccionar el repositorio del frontend

3. **Configurar el despliegue**
   - **Project name**: `huellariosoft-frontend`
   - **Production branch**: `main`
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

4. **Agregar variables de entorno**
   
   En "Environment variables" agregar:
   ```
   VITE_API_URL=https://api-huellariosoft.onrender.com/api
   VITE_APP_NAME=HuellarioSoft
   VITE_APP_VERSION=1.0.0
   VITE_ENV=production
   VITE_TOKEN_COOKIE_NAME=huellario_token
   VITE_REFRESH_TOKEN_COOKIE_NAME=huellario_refresh_token
   ```

5. **Deploy**
   - Click en "Save and Deploy"
   - Cloudflare construirá y desplegará automáticamente
   - URL: `https://huellariosoft-frontend.pages.dev`

#### Paso 3: Características de Cloudflare Pages

- ✅ **Despliegues automáticos**: Cada push a GitHub despliega automáticamente
- ✅ **Preview deployments**: Cada PR genera una URL de preview
- ✅ **CDN global**: Distribución automática en la red global de Cloudflare
- ✅ **SSL/TLS automático**: Certificados HTTPS incluidos
- ✅ **Rollback instantáneo**: Volver a versiones anteriores en un click
- ✅ **Gratuito**: Plan gratuito muy generoso para proyectos

#### Paso 4: Configurar Dominio Personalizado (Opcional)

1. En Cloudflare Pages → Proyecto → "Custom domains"
2. Click en "Set up a custom domain"
3. Ingresar el dominio deseado
4. Cloudflare configurará automáticamente los registros DNS si el dominio está en Cloudflare
5. Si el dominio está en otro proveedor, seguir las instrucciones para configurar CNAME

#### Paso 5: Configurar Redirects y Headers (Opcional)

Crear archivo `_redirects` en la carpeta `public/`:

```
# SPA fallback
/*    /index.html   200

# Custom headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### 15.3 Variables de Entorno en Producción

Configurar en la plataforma de hosting:
- `VITE_API_URL` → URL del backend en producción
- `VITE_ENV` → `production`

---

## 16. Optimización y Rendimiento

### 16.1 Code Splitting

Vite automáticamente separa el código:

```javascript
// Carga lazy de componentes
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))

<Suspense fallback={<Spinner />}>
  <DashboardPage />
</Suspense>
```

### 16.2 Optimización de Imágenes

```jsx
// Usar formato WebP
<img 
  src="/img/logo.webp" 
  alt="Logo"
  loading="lazy"  // Lazy loading nativo
/>
```

### 16.3 Memoización

```javascript
import { useMemo, useCallback } from 'react'

// Memoizar cálculos costosos
const filteredData = useMemo(() => {
  return data.filter(item => item.active)
}, [data])

// Memoizar funciones
const handleClick = useCallback(() => {
  console.log('Click')
}, [])
```

### 16.4 Análisis del Bundle

```bash
# Generar análisis
npm run build

# Inspeccionar dist/assets para ver tamaños
```

### 16.5 Best Practices

- Usar lazy loading para rutas
- Implementar paginación en listas grandes
- Debounce en búsquedas
- Caché de peticiones cuando sea apropiado
- Minimizar re-renders innecesarios
- Optimizar imágenes y assets

---

## 17. Mantenimiento y Troubleshooting

### 17.1 Scripts de Desarrollo

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

### 17.2 Problemas Comunes

#### Error: "Cannot find module"

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

#### Error: "Port 3000 is already in use"

```bash
# Cambiar puerto en vite.config.js
server: {
  port: 3001,
}
```

#### Error: "Network request failed"

**Causa**: Backend no disponible o CORS mal configurado

**Solución**:
1. Verificar que el backend está corriendo
2. Revisar `VITE_API_URL` en `.env`
3. Verificar configuración CORS en el backend

#### Estilos de Tailwind no se aplican

```bash
# Limpiar caché de Tailwind
npm run build
```

### 17.3 Debugging

#### React DevTools

Instalar extensión de React DevTools en el navegador.

#### Console Logs

```javascript
console.log('Debug:', { user, isAuthenticated })
console.table(data) // Tabular datos
console.error('Error:', error)
```

#### Network Tab

Inspeccionar peticiones HTTP en DevTools → Network.

### 17.4 Logs en Producción

Considerar implementar:
- **Sentry** - Monitoreo de errores
- **LogRocket** - Session replay
- **Google Analytics** - Analítica de uso

### 17.5 Actualización de Dependencias

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar todas
npm update

# Actualizar una específica
npm install react@latest
```

---

## Soporte

Para soporte técnico o reportar problemas, contactar al equipo de desarrollo de HuellarioSoft.

- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png" width="20" height="20"/> [Natalia Sierra Salamando](https://www.linkedin.com/in/nataliasierradev-frontend/)
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png" width="20" height="20"/> [Cristian Leandro Pérez Peláez](https://www.linkedin.com/in/clperez341/)

**Última actualización:** Mayo 2026
