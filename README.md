# 🐾 HuellarioSoft - Frontend

## Tabla de Contenidos

- [Descripción](#-descripción)
- [Tecnologías](#-tecnologías)
- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#️-instalación)
- [Configuración](#-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Despliegue](#-despliegue)
- [Módulos del Sistema](#-módulos-del-sistema)
- [Arquitectura](#️-arquitectura)
- [Seguridad](#-seguridad)
- [Documentación](#-documentación)
- [Convenciones](#-convenciones-de-código)
- [Estado del Proyecto](#-estado-del-proyecto)
- [Soporte](#-soporte)

---

## Descripción

HuellarioSoft es un sistema completo de gestión veterinaria diseñado para optimizar las operaciones clínicas y administrativas de consultorios y clínicas veterinarias. La aplicación frontend está construida con tecnologías modernas y ofrece una experiencia de usuario intuitiva y profesional.

### Características Principales

 **Interfaz Moderna** - Diseño tipo SaaS con UI/UX profesional  
 **Alto Rendimiento** - Build ultrarrápido con Vite  
 **Responsive Design** - Adaptado a todos los dispositivos  
 **Seguridad Robusta** - Autenticación JWT y control de acceso basado en roles  
 **Diseño Consistente** - Sistema de componentes reutilizables  
 **Tiempo Real** - Actualizaciones instantáneas y notificaciones toast  

---

## 🚀 Tecnologías

### Core
- **[React 18](https://reactjs.org/)** - Biblioteca de UI con Hooks y Suspense
- **[Vite 5](https://vitejs.dev/)** - Build tool de nueva generación con HMR
- **[Tailwind CSS 3](https://tailwindcss.com/)** - Framework CSS utility-first

### Routing & Forms
- **[React Router DOM 6](https://reactrouter.com/)** - Enrutamiento declarativo
- **[React Hook Form](https://react-hook-form.com/)** - Manejo performante de formularios
- **[Yup](https://github.com/jquense/yup)** - Validación de esquemas

### UI & UX
- **[Lucide React](https://lucide.dev/)** - Iconos modernos y optimizados
- **[Sonner](https://sonner.emilkowal.ski/)** - Sistema de notificaciones toast
- **[Recharts](https://recharts.org/)** - Gráficas y visualización de datos

### Utilities
- **[Axios](https://axios-http.com/)** - Cliente HTTP con interceptores
- **[date-fns](https://date-fns.org/)** - Librería moderna para manejo de fechas
- **[js-cookie](https://github.com/js-cookie/js-cookie)** - Manejo simplificado de cookies

---

## 🎨 Características

### Diseño y UX
- **Diseño Distintivo** - Identidad visual profesional tipo SaaS
- **Tema Personalizado** - Paleta de colores coherente y accesible
- **Animaciones Fluidas** - Transiciones y micro-interacciones pulidas
- **Mobile First** - Optimizado para dispositivos móviles y tablets

### Funcionalidad
- **Sistema de Autenticación** - Login, logout, recuperación de contraseña
- **Control de Acceso** - RBAC (Role-Based Access Control)
- **Notificaciones en Tiempo Real** - Toast notifications con Sonner
- **Validación de Formularios** - Validación robusta con Yup
- **Gestión de Estado Global** - Context API para autenticación
- **Manejo de Errores** - Interceptores Axios y páginas de error personalizadas
- **Paginación y Filtros** - En todas las listas y tablas
- **Búsqueda Avanzada** - Filtros múltiples y búsqueda en tiempo real

### Performance
- **Lazy Loading** - Carga diferida de rutas
- **Code Splitting** - División automática del código
- **Optimización de Imágenes** - Assets optimizados
- **Caché Inteligente** - Estrategias de caché para API

---

## 📁 Estructura del Proyecto

```
huellariosoft/
├── src/
│   ├── assets/              # Recursos estáticos
│   │   └── img/            # Imágenes y logos
│   │
│   ├── components/          # Componentes reutilizables
│   │   ├── layout/         # Layouts principales
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── shared/         # Componentes compartidos
│   │   │   └── EmptyState.jsx
│   │   ├── tables/         # Componentes de tablas
│   │   │   └── Table.jsx
│   │   └── ui/             # Componentes UI base
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Input.jsx
│   │       ├── Modal.jsx
│   │       └── ...
│   │
│   ├── constants/           # Constantes de la aplicación
│   │   ├── config.js       # Configuración general
│   │   ├── enums.js        # Enumeraciones
│   │   ├── icons.js        # Mapeo de iconos
│   │   └── messages.js     # Mensajes del sistema
│   │
│   ├── context/             # Context API
│   │   └── AuthContext.jsx # Contexto de autenticación
│   │
│   ├── hooks/               # Custom hooks
│   │   ├── useDebounce.js  # Hook para debouncing
│   │   └── useTheme.js     # Hook para tema (futuro)
│   │
│   ├── pages/               # Páginas de la aplicación
│   │   ├── appointments/   # Módulo de citas
│   │   ├── auth/           # Autenticación
│   │   ├── dashboard/      # Dashboard principal
│   │   ├── errors/         # Páginas de error
│   │   ├── inventory/      # Gestión de inventario
│   │   ├── invoices/       # Facturación
│   │   ├── medical-records/# Historias clínicas
│   │   ├── owners/         # Gestión de propietarios
│   │   ├── pets/           # Gestión de mascotas
│   │   ├── profile/        # Perfil de usuario
│   │   ├── reports/        # Reportes y estadísticas
│   │   └── users/          # Gestión de usuarios
│   │
│   ├── routes/              # Configuración de rutas
│   │   ├── AppRoutes.jsx   # Rutas principales
│   │   └── ProtectedRoute.jsx # HOC para rutas protegidas
│   │
│   ├── services/            # Servicios de API
│   │   ├── httpClient.js   # Cliente HTTP configurado
│   │   ├── tokenService.js # Manejo de tokens
│   │   ├── authService.js
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
│   ├── utils/               # Utilidades y helpers
│   │   ├── dateUtils.js    # Utilidades de fechas
│   │   ├── formatters.js   # Formateadores (moneda, texto)
│   │   ├── helpers.js      # Funciones auxiliares
│   │   ├── stringUtils.js  # Utilidades de strings
│   │   └── validators.js   # Validaciones custom
│   │
│   ├── validations/         # Esquemas de validación Yup
│   │   ├── authSchema.js
│   │   ├── appointmentSchema.js
│   │   ├── inventorySchema.js
│   │   ├── invoiceSchema.js
│   │   ├── medicalRecordSchema.js
│   │   ├── ownerSchema.js
│   │   ├── petSchema.js
│   │   └── userSchema.js
│   │
│   ├── App.jsx              # Componente raíz
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales + Tailwind
│
├── docs/                    # Documentación técnica
│   └── Manual_técnico.md
│
├── .agents/                 # Configuración de agentes IA
│   └── skills/
│
├── .env.example             # Plantilla de variables de entorno
├── .gitignore               # Archivos ignorados por Git
├── index.html               # HTML principal
├── package.json             # Dependencias y scripts
├── postcss.config.js        # Configuración de PostCSS
├── tailwind.config.js       # Configuración de Tailwind CSS
├── vite.config.js           # Configuración de Vite
└── README.md                # Este archivo
```

---

## 🛠️ Instalación

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0 ([Descargar](https://nodejs.org/))
- **npm** >= 9.0.0 (incluido con Node.js) o **yarn** >= 1.22.0
- **Git** para control de versiones

### Verificar Instalación

```bash
# Verificar versiones
node --version
npm --version
git --version
```

### Pasos de Instalación

1. **Clonar el repositorio** (si aplica)
```bash
git clone https://github.com/clpp-dev/huellariosoft.git
cd huellariosoft
```

2. **Instalar dependencias**
```bash
npm install
# o con yarn
yarn install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
cp .env.example .env
```

Edita el archivo `.env` con la configuración de tu entorno (ver sección [Configuración](#-configuración)).

4. **Verificar configuración**
```bash
# Listar scripts disponibles
npm run
```

5. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

---

## ⚙️ Configuración

### Variables de Entorno

El proyecto utiliza variables de entorno para configurar diferentes aspectos de la aplicación. Estas se definen en archivos `.env` según el entorno.

#### Archivos de Configuración

- `.env.development` - Configuración para desarrollo local
- `.env.production` - Configuración para producción (no incluido en el repo)
- `.env.example` - Plantilla con todas las variables disponibles

#### Variables Disponibles

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Application Info
VITE_APP_NAME=HuellarioSoft
VITE_APP_VERSION=1.0.0
VITE_ENV=development

# Authentication
VITE_TOKEN_COOKIE_NAME=ejemplo_huellario_token
VITE_REFRESH_TOKEN_COOKIE_NAME=ejemplo_huellario_refresh_token
```

#### Notas Importantes

- ⚠️ **Nunca incluyas valores sensibles en el código**
- ⚠️ **No commites archivos `.env` con credenciales reales**
- ⚠️ Las variables deben iniciar con `VITE_` para ser accesibles en el cliente
- ✅ Usa `.env.example` como referencia para crear tu `.env` local

### Configuración de Tailwind CSS

El archivo `tailwind.config.js` contiene la configuración personalizada del tema.

### Configuración de Vite

El archivo `vite.config.js` incluye:

- Alias de importación (`@` para `src/`)
- Configuración de servidor de desarrollo
- Optimizaciones de build
- Configuración de proxy (si es necesario)

---

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo con HMR
npm run dev -- --host    # Expone el servidor en la red local

# Build
npm run build            # Construye para producción en /dist
npm run preview          # Preview del build de producción localmente

# Calidad de Código
npm run lint             # Ejecuta ESLint para verificar código

```

## 🚀 Despliegue

### Plataforma de Despliegue

El frontend de HuellarioSoft está optimizado para desplegarse en **Cloudflare Pages**, aprovechando su infraestructura global de CDN y características avanzadas de performance.

### Configuración de Build

```yaml
# Configuración para Cloudflare Pages
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 18
```

### Variables de Entorno en Producción

Las siguientes variables deben configurarse en el panel de Cloudflare Pages:

```env
VITE_API_URL=[URL_DE_TU_API_BACKEND]
VITE_APP_NAME=HuellarioSoft
VITE_APP_VERSION=[VERSION_ACTUAL]
VITE_ENV=production
VITE_TOKEN_COOKIE_NAME=huellario_token
VITE_REFRESH_TOKEN_COOKIE_NAME=huellario_refresh_token
```

### Características de Cloudflare Pages

| Característica | Descripción |
|----------------|-------------|
| 🌍 **CDN Global** | Distribución en más de 275 ubicaciones globales |
| ⚡ **Despliegue Automático** | CI/CD integrado con GitHub/GitLab |
| 🔒 **SSL/TLS Automático** | Certificados SSL gratuitos y renovación automática |
| 🔄 **Rollback Instantáneo** | Vuelve a cualquier versión anterior en un clic |
| 🎯 **Preview Deployments** | Entorno de pruebas para cada Pull Request |
| 📊 **Analytics** | Métricas de rendimiento y tráfico incluidas |
| 🛡️ **DDoS Protection** | Protección contra ataques DDoS |

### Proceso de Despliegue

1. **Commit y Push**
   ```bash
   git add .
   git commit -m "feat: nueva funcionalidad"
   git push origin main
   ```

2. **Build Automático**
   - Cloudflare detecta el cambio automáticamente
   - Ejecuta `npm install` y `npm run build`
   - Valida el output en `/dist`

3. **Despliegue**
   - El contenido se distribuye globalmente en la CDN
   - Disponible en segundos con baja latencia global
   - URLs de preview disponibles para branches no principales

4. **Verificación**
   - Revisa el dashboard de Cloudflare Pages
   - Verifica logs de build y despliegue
   - Prueba la aplicación en producción

### Optimizaciones para Producción

El build de producción incluye:

- ✅ Minificación de JavaScript y CSS
- ✅ Tree-shaking para eliminar código no usado
- ✅ Compresión de assets (Brotli/Gzip)
- ✅ Code splitting automático
- ✅ Optimización de imágenes
- ✅ Preload de recursos críticos
- ✅ Cache busting con hashes en archivos

### Otras Plataformas de Despliegue

HuellarioSoft también puede desplegarse en:

- **Vercel** - Configuración automática para proyectos Vite
- **Netlify** - Build command: `npm run build`, Publish directory: `dist`
- **AWS S3 + CloudFront** - Para hosting estático con CDN
- **Azure Static Web Apps** - Con CI/CD integrado
- **GitHub Pages** - Para demos públicas

### Despliegue Manual

```bash
# Build para producción
npm run build

# El contenido estará en /dist
# Sube el contenido de /dist a tu servidor web
# Asegúrate de configurar las variables de entorno
```

---

## 📱 Módulos del Sistema

### Módulos Implementados y Funcionales

#### 1. **Autenticación y Autorización**
- Login con email y contraseña
- Recuperación de contraseña por email
- Reset de contraseña con token
- Gestión de perfil de usuario
- Logout seguro con invalidación de token
- Control de acceso basado en roles (RBAC)

#### 2. **Dashboard**
- Métricas en tiempo real del negocio
- Gráficos de citas por mes
- Alertas de stock bajo de inventario
- Próximas citas del día
- Resumen de ingresos
- Estadísticas de mascotas atendidas

#### 3. **Gestión de Usuarios**
- CRUD completo de usuarios
- Asignación de roles (Admin, Veterinario, Recepcionista, Auxiliar)
- Activar/Desactivar usuarios
- Búsqueda y filtrado
- Validación de email único
- Control de permisos por rol

#### 4. **Gestión de Propietarios (Clientes)**
- CRUD completo de propietarios
- Registro con validación de documento
- Vista de detalle con historial
- Listado de mascotas por propietario
- Búsqueda por nombre, documento o teléfono
- Paginación y filtros

#### 5. **Gestión de Mascotas**
- CRUD completo de mascotas
- Registro con foto (opcional)
- Clasificación por especie (Perro, Gato, Ave, Reptil, etc.)
- Filtros por especie, raza y estado
- Vista de detalle con historia clínica
- Asociación con propietarios
- Indicadores visuales de estado

#### 6. **Gestión de Citas**
- CRUD completo de citas veterinarias
- Calendario de citas
- Estados: Programada, Completada, Cancelada
- Motivo de cita y observaciones
- Filtros por fecha, estado y mascota
- Cancelación con motivo
- Notificaciones de recordatorio (próximamente)

#### 7. **Historias Clínicas**
- CRUD completo de registros médicos
- Signos vitales (temperatura, peso, frecuencia cardíaca)
- Diagnósticos y tratamientos
- Registro de vacunas y desparasitaciones
- Medicamentos recetados
- Observaciones del veterinario
- Historial completo por mascota
- Exportación a PDF (próximamente)

#### 8. **Gestión de Inventario**
- CRUD completo de productos
- Categorías: Medicamentos, Alimentos, Accesorios, Servicios
- Control de stock con alertas
- Precio de compra y venta
- Indicador de stock bajo (<10 unidades)
- Búsqueda y filtros por categoría
- Actualización de stock

#### 9. **Facturación**
- CRUD completo de facturas
- Creación con múltiples ítems
- Cálculo automático de subtotal, IVA y total
- Descuentos por ítem y generales
- Estados: Pendiente, Pagada, Cancelada
- Marcar como pagada
- Generación de PDF (implementado)
- Vista de detalle con breakdown de costos
- Filtros por fecha, estado y cliente

#### 10. **Reportes y Estadísticas**
- Dashboard de reportes
- Métricas de negocio (próximamente gráficas avanzadas)
- Exportación a Excel/PDF (próximamente)
- Reportes personalizables (próximamente)

### Páginas Implementadas

| Módulo | Páginas | Estado |
|--------|---------|--------|
| **Auth** | Login, Forgot Password, Reset Password | ✅ Completo |
| **Dashboard** | Dashboard Principal | ✅ Completo |
| **Usuarios** | Lista, Crear, Editar, Ver Detalle | ✅ Completo |
| **Propietarios** | Lista, Crear, Editar, Ver Detalle | ✅ Completo |
| **Mascotas** | Lista, Crear, Editar, Ver Detalle | ✅ Completo |
| **Citas** | Lista, Crear, Editar, Vista Calendar | ✅ Completo |
| **Historias** | Lista, Crear, Ver Detalle | ✅ Completo |
| **Inventario** | Lista, Crear, Editar | ✅ Completo |
| **Facturas** | Lista, Crear, Editar, Ver Detalle | ✅ Completo |
| **Reportes** | Dashboard de Reportes | ✅ Completo |
| **Perfil** | Ver y Editar Perfil | ✅ Completo |
| **Errores** | 404 Not Found | ✅ Completo |

**Total: 27+ páginas funcionales** completamente integradas con el backend.

### Características Transversales

- ✅ **Paginación** - Implementada en todas las listas
- ✅ **Búsqueda** - Búsqueda en tiempo real con debounce
- ✅ **Filtros** - Filtros múltiples por diferentes criterios
- ✅ **Ordenamiento** - Orden ascendente/descendente
- ✅ **Loading States** - Spinners y skeletons durante carga
- ✅ **Empty States** - Mensajes amigables cuando no hay datos
- ✅ **Error Handling** - Manejo graceful de errores con mensajes
- ✅ **Toast Notifications** - Feedback visual para acciones
- ✅ **Modales de Confirmación** - Para acciones destructivas
- ✅ **Badges de Estado** - Indicadores visuales con colores semánticos
- ✅ **Formateo de Fechas** - Fechas en español legibles
- ✅ **Formateo de Moneda** - COP (Pesos Colombianos)
- ✅ **Iconos Contextuales** - Lucide React para UI consistente
- ✅ **Query Params** - Pre-selección de valores en formularios

---

## Arquitectura

### Principios de Diseño

#### 1. **Separación de Responsabilidades**
Cada capa tiene una función específica:
- **Components** - UI y presentación
- **Services** - Lógica de API y comunicación
- **Utils** - Funciones auxiliares y transformaciones
- **Validators** - Esquemas de validación
- **Constants** - Configuración y valores fijos

#### 2. **Componentes Reutilizables**
Sistema de componentes base que se componen para crear UIs complejas:
```jsx
// Ejemplo de composición
<Card>
  <Card.Header title="Título" />
  <Card.Body>
    <Table data={data} columns={columns} />
  </Card.Body>
</Card>
```

#### 3. **Clean Code**
- Nombres descriptivos y semánticos
- Funciones pequeñas con una sola responsabilidad
- Comentarios solo donde añaden valor
- Evitar código duplicado (DRY principle)

#### 4. **Type Safety con PropTypes**
Aunque no usamos TypeScript, validamos props de componentes:
```jsx
Component.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
```

### Patrones de Diseño Implementados

#### 1. **Compound Components**
Componentes que trabajan juntos para formar una API cohesiva:
```jsx
<Modal open={open} onClose={handleClose}>
  <Modal.Header>Título</Modal.Header>
  <Modal.Body>Contenido</Modal.Body>
  <Modal.Footer>Acciones</Modal.Footer>
</Modal>
```

#### 2. **Custom Hooks**
Reutilización de lógica con estado:
```jsx
// useDebounce.js
const debouncedValue = useDebounce(searchTerm, 500);
```

#### 3. **Service Layer**
Capa de abstracción para API calls:
```jsx
// En lugar de fetch directo
const users = await userService.getAll();
```

#### 4. **Context API**
Estado global sin prop drilling:
```jsx
const { user, login, logout } = useAuth();
```

#### 5. **Higher-Order Components (HOC)**
Para lógica transversal:
```jsx
<ProtectedRoute role="admin">
  <AdminPanel />
</ProtectedRoute>
```

### Flujo de Datos

```
User Action (Click, Submit)
    ↓
Component Handler
    ↓
Service Layer (API Call)
    ↓
Backend API
    ↓
Response Processing
    ↓
State Update (Context/Local)
    ↓
Re-render Component
    ↓
User Feedback (Toast, Update UI)
```

### Gestión de Estado

| Tipo de Estado | Solución | Uso |
|----------------|----------|-----|
| **Autenticación** | Context API | Usuario, token, permisos |
| **Formularios** | React Hook Form | Estado de forms, validación |
| **UI Local** | useState | Modales, tabs, accordions |
| **Server State** | Promesas + useState | Datos de API con loading |

### Estructura de un Servicio

```javascript
// Ejemplo: userService.js
import httpClient from './httpClient';

const BASE_URL = '/users';

export const userService = {
  // GET all
  getAll: async (params) => {
    const response = await httpClient.get(BASE_URL, { params });
    return response.data;
  },
  
  // GET by ID
  getById: async (id) => {
    const response = await httpClient.get(`${BASE_URL}/${id}`);
    return response.data;
  },
  
  // POST create
  create: async (data) => {
    const response = await httpClient.post(BASE_URL, data);
    return response.data;
  },
  
  // PUT update
  update: async (id, data) => {
    const response = await httpClient.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },
  
  // DELETE
  delete: async (id) => {
    const response = await httpClient.delete(`${BASE_URL}/${id}`);
    return response.data;
  }
};
```

---

## Seguridad

### Autenticación y Autorización

#### JWT (JSON Web Tokens)
- **Access Token** - Token de corta duración para autenticación
- **Refresh Token** - Token de larga duración para renovar access tokens
- Tokens almacenados en cookies HTTP-only para prevenir XSS
- Expiración automática de tokens
- Renovación transparente de tokens

#### Control de Acceso Basado en Roles (RBAC)

| Rol | Permisos |
|-----|----------|
| **Administrador** | Acceso completo a todos los módulos |
| **Veterinario** | Gestión clínica (citas, historias, mascotas) |
| **Recepcionista** | Gestión administrativa (citas, propietarios, facturación) |
| **Auxiliar** | Gestión de inventario y soporte |

#### Rutas Protegidas
```jsx
// Solo usuarios autenticados
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>

// Requiere rol específico
<ProtectedRoute allowedRoles={['admin', 'veterinario']}>
  <MedicalRecordsPage />
</ProtectedRoute>
```

#### Interceptores de Axios

**Manejo automático de:**
- ❌ **401 Unauthorized** - Logout automático y redirect a login
- ❌ **403 Forbidden** - Mensaje de permiso denegado
- ❌ **500 Server Error** - Mensaje de error genérico
- ✅ **Token Refresh** - Renovación automática antes de expiración

### Mejores Prácticas de Seguridad

- **Validación de Entrada** - Todos los formularios validados con Yup  
- **Sanitización** - Prevención de XSS en inputs  
- **HTTPS Only** - Comunicación encriptada en producción  
- **CORS Configurado** - Solo dominios autorizados  
- **Rate Limiting** - Control de peticiones en el backend  
- **Secrets Seguras** - Variables de entorno, nunca hardcoded  
- **Dependencies Audit** - Auditoría regular de vulnerabilidades  

### Protección de Datos Sensibles

**Nunca incluir en el código:**
- Contraseñas o API keys
- Tokens de acceso
- Credenciales de base de datos
- URLs de producción con autenticación

**Usar siempre:**
- Variables de entorno (`.env`)
- Secrets management en plataformas de deploy
- `.gitignore` para archivos sensibles

---

## Documentación

### Documentación Disponible

| Documento | Ubicación | Descripción |
|-----------|-----------|-------------|
| **README** | `/README.md` | Documentación principal (este archivo) |
| **Manual Técnico** | `/docs/Manual_técnico.md` | Detalles técnicos profundos |
| **Changelog** | `/CHANGELOG.md` | Historial de cambios y versiones |
| **Requisitos Funcionales** | `/.github/Requisitos_funcionales.md` | Especificaciones funcionales |
| **Requisitos No Funcionales** | `/.github/Requisitos_no_funcionales.md` | Especificaciones no funcionales |
| **Historias de Usuario** | `/.github/Historias_de_usuario.md` | User stories y casos de uso |
| **Casos de Uso** | `/.github/Casos_de_uso.md` | Flujos de usuario detallados |

### Documentación de Componentes

Cada componente UI base incluye:
- Props esperadas y tipos
- Ejemplos de uso
- Variantes disponibles
- Notas de accesibilidad

### Recursos Externos

- [React 18 Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Yup Validation Schema](https://github.com/jquense/yup)

---

## Convenciones de Código

### Nomenclatura

```javascript
// Variables y funciones - camelCase
const userName = 'Juan';
function getUserData() {}

// Componentes React - PascalCase
function UserCard() {}
const ProfilePage = () => {};

// Constantes - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

// Archivos de componentes - PascalCase.jsx
UserCard.jsx
DashboardPage.jsx

// Archivos de servicios/utils - camelCase.js
authService.js
dateUtils.js
```

### Estructura de Componentes

```jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Descripción breve del componente
 * @param {Object} props - Props del componente
 */
function ComponentName({ prop1, prop2, onAction }) {
  // 1. Hooks de estado
  const [state, setState] = useState(initialValue);
  
  // 2. Hooks de contexto
  const { user } = useAuth();
  
  // 3. Hooks de efectos
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // 4. Handlers
  const handleAction = () => {
    // Handler logic
  };
  
  // 5. Render helpers
  const renderContent = () => {
    // Render logic
  };
  
  // 6. Return JSX
  return (
    <div className="component-wrapper">
      {/* JSX */}
    </div>
  );
}

// PropTypes
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  onAction: PropTypes.func
};

// Default props
ComponentName.defaultProps = {
  prop2: 0,
  onAction: () => {}
};

export default ComponentName;
```

### Imports

```javascript
// 1. Imports de React y librerías externas
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// 2. Imports de servicios
import { userService } from '@/services/userService';

// 3. Imports de componentes
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// 4. Imports de utils y helpers
import { formatDate } from '@/utils/dateUtils';
import { ROLES } from '@/constants/enums';

// 5. Imports de estilos (si aplica)
import './ComponentName.css';
```

### Clases de Tailwind CSS

```jsx
// ✅ Bueno - Clases ordenadas semánticamente
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// ❌ Evitar - Clases desordenadas
<div className="rounded-lg bg-white shadow-md flex p-4 items-center justify-between">

// ✅ Usar condicionales claros
<div className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}>

// ✅ Para clases complejas, usar variables
const cardClasses = `
  flex items-center gap-4
  p-6 rounded-xl
  bg-white shadow-lg
  hover:shadow-xl transition-shadow
`;
<div className={cardClasses}>
```

### Manejo de Errores

```javascript
try {
  await userService.create(userData);
  toast.success('Usuario creado exitosamente');
  navigate('/usuarios');
} catch (error) {
  console.error('Error creating user:', error);
  toast.error(error.response?.data?.message || 'Error al crear usuario');
}

if (!userId) {
  toast.error('ID de usuario no válido');
  return;
}
```

### Git Commits

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Formato: <type>(<scope>): <subject>

# Tipos comunes:
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: formato (sin cambio de código)
refactor: refactorización
test: agregar tests
chore: mantenimiento

# Ejemplos:
git commit -m "feat(auth): agregar recuperación de contraseña"
git commit -m "fix(invoices): corregir cálculo de IVA"
git commit -m "docs(readme): actualizar instrucciones de instalación"
git commit -m "refactor(services): extraer lógica común a httpClient"
```

---

## 👥 Roles y Permisos

### Sistema de Control de Acceso

| Módulo | Admin | Veterinario | Recepcionista | Auxiliar |
|--------|-------|-------------|---------------|----------|
| **Dashboard** | ✅ Ver | ✅ Ver | ✅ Ver | ✅ Ver |
| **Usuarios** | ✅ CRUD | ❌ Ver | ❌ Ver | ❌ - |
| **Propietarios** | ✅ CRUD | ✅ Ver | ✅ CRUD | ✅ Ver |
| **Mascotas** | ✅ CRUD | ✅ CRUD | ✅ CRUD | ✅ Ver |
| **Citas** | ✅ CRUD | ✅ CRUD | ✅ CRUD | ✅ Ver |
| **Historias Clínicas** | ✅ CRUD | ✅ CRUD | ❌ Ver | ❌ - |
| **Inventario** | ✅ CRUD | ✅ Ver | ✅ Ver | ✅ CRUD |
| **Facturación** | ✅ CRUD | ✅ Ver | ✅ CRUD | ❌ Ver |
| **Reportes** | ✅ Ver | ✅ Ver | ✅ Ver | ❌ - |

**Leyenda:**
- ✅ CRUD = Crear, Ver, Editar, Eliminar
- ✅ Ver = Solo lectura
- ❌ = Sin acceso

---

## 📄 Licencia

**Propietario - HuellarioSoft © 2026, Corporción Universitaria Iberoamericana**