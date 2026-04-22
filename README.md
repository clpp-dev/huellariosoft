# 🐾 HuellarioSoft - Frontend

Sistema de gestión veterinaria profesional construido con React.js, Vite y Tailwind CSS.

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework de CSS utility-first
- **React Router DOM** - Enrutamiento
- **React Hook Form** - Manejo de formularios
- **Yup** - Validación de esquemas
- **Sonner** - Notificaciones toast
- **Lucide React** - Iconos
- **Recharts** - Gráficas y visualización de datos
- **js-cookie** - Manejo de cookies
- **date-fns** - Manejo de fechas

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── api/              # Configuración de API y axios
│   ├── assets/           # Imágenes, fuentes, archivos estáticos
│   ├── components/       # Componentes reutilizables
│   │   ├── ui/          # Componentes base (Button, Input, etc.)
│   │   ├── forms/       # Componentes de formularios
│   │   ├── tables/      # Componentes de tablas
│   │   ├── modals/      # Componentes de modales
│   │   ├── layout/      # Layouts (Sidebar, Header, etc.)
│   │   └── shared/      # Componentes compartidos
│   ├── context/          # Context API de React
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Páginas/vistas de la aplicación
│   ├── routes/           # Configuración de rutas
│   ├── services/         # Servicios de API
│   ├── utils/            # Utilidades y helpers
│   ├── validations/      # Esquemas de validación Yup
│   ├── constants/        # Constantes de la aplicación
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── public/              # Archivos públicos
├── .env                 # Variables de entorno
├── .env.example         # Ejemplo de variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── index.html          # HTML principal
├── package.json        # Dependencias y scripts
├── tailwind.config.js  # Configuración de Tailwind
├── vite.config.js      # Configuración de Vite
└── README.md           # Este archivo
```

## 🛠️ Instalación

### Requisitos previos
- Node.js >= 18.0.0
- npm o yarn

### Pasos

1. **Instalar dependencias**
```bash
npm install
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:
```env
VITE_API_URL=http://localhost:5000/api
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run preview      # Preview de build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 🎨 Características del Diseño

- **Diseño distintivo y profesional** - UI/UX moderna tipo SaaS
- **Tema customizado** - Sistema de colores coherente y profesional
- **Responsive design** - Adaptado a todos los dispositivos
- **Animaciones suaves** - Micro-interacciones pulidas
- **Accesibilidad** - Cumple con estándares WCAG
- **Dark mode ready** - Preparado para modo oscuro (opcional)

## 🔐 Seguridad

- **JWT Authentication** - Autenticación con tokens
- **Protected Routes** - Rutas protegidas por autenticación
- **Auto logout** - Cierre de sesión automático por expiración
- **Axios Interceptors** - Manejo automático de errores 401/403
- **Secure cookies** - Almacenamiento seguro de tokens
- **RBAC** - Control de acceso basado en roles

## 🏗️ Arquitectura

### Principios de diseño
- **Componentes reutilizables** - DRY (Don't Repeat Yourself)
- **Separación de responsabilidades** - Cada capa tiene su función
- **Clean Code** - Código limpio y mantenible
- **Escalabilidad** - Fácil de escalar y mantener
- **Type safety** - Props validadas y documentadas

### Patrones utilizados
- **Compound Components** - Componentes compuestos
- **Custom Hooks** - Lógica reutilizable
- **Context API** - Estado global sin librerías externas
- **Service Layer** - Capa de servicios para API

## 📱 Módulos Principales

### ✅ Implementados y Funcionales

1. **🔐 Autenticación** - Login, logout, recuperación de contraseña, perfil de usuario
2. **📊 Dashboard** - Métricas en tiempo real, estadísticas, próximas citas, alertas de stock
3. **👥 Usuarios** - CRUD completo, gestión de roles, activar/desactivar usuarios
4. **👤 Propietarios** - CRUD completo, vista de detalle, gestión de clientes
5. **🐾 Mascotas** - CRUD completo, vista de detalle, filtros por especie, gestión de pacientes
6. **📅 Citas** - CRUD completo, gestión de estados, calendario veterinario, cancelación con motivo
7. **📋 Historia Clínica** - CRUD completo, signos vitales, diagnósticos, tratamientos, vacunas
8. **📦 Inventario** - CRUD completo, alertas de stock bajo, categorías, control de productos
9. **💰 Facturación** - CRUD completo, ítems dinámicos, descuentos, IVA, marcar como pagada, generar PDF
10. **📈 Reportes** - Módulo base implementado (pendiente gráficas avanzadas)

### Características Destacadas

- ✅ **27 páginas funcionales** completamente integradas con el backend
- ✅ **8 servicios de API** con manejo completo de errores
- ✅ **7 esquemas de validación** con Yup para formularios
- ✅ **Paginación** en todas las listas
- ✅ **Búsqueda y filtros** avanzados
- ✅ **Modales de confirmación** para acciones destructivas
- ✅ **Toast notifications** para feedback visual
- ✅ **Loading states** en botones y páginas
- ✅ **Formateo de fechas** en español con date-fns
- ✅ **Formateo de moneda** en pesos colombianos (COP)
- ✅ **Badges de estado** con colores semánticos
- ✅ **Emojis** para especies de mascotas y categorías de inventario
- ✅ **Query params** para pre-selección de valores

## 🎯 Estado del Proyecto

### ✅ Completado
- [x] Configuración inicial del proyecto
- [x] Sistema de autenticación completo
- [x] Layouts y componentes base
- [x] **Todos los módulos de gestión implementados** (8/8)
- [x] Dashboard con estadísticas en tiempo real
- [x] Sistema de notificaciones con Sonner
- [x] Validaciones completas con Yup
- [x] Integración completa con API backend

### 🔄 En Progreso / Mejoras Futuras
- [ ] Dashboard con gráficas avanzadas (Recharts)
- [ ] Exportación de reportes (Excel/PDF)
- [ ] Timeline de historia clínica por mascota
- [ ] Sistema de recordatorios automáticos
- [ ] Optimización de performance (lazy loading, memoization)
- [ ] Testing (Jest + React Testing Library)
- [ ] Documentación con Storybook
- [ ] PWA (Progressive Web App)
- [ ] Modo oscuro (Dark mode)

## 👥 Roles del Sistema

- **Administrador** - Acceso completo
- **Veterinario** - Gestión clínica
- **Recepcionista** - Gestión administrativa
- **Auxiliar** - Gestión de inventario

## 📝 Convenciones de Código

- Usar **camelCase** para variables y funciones
- Usar **PascalCase** para componentes
- Usar **UPPER_SNAKE_CASE** para constantes
- Comentarios claros y concisos
- Props destructuradas en componentes
- Imports organizados por tipo

## 🤝 Contribución

Este es un proyecto privado. Para contribuir, contacta al equipo de desarrollo.

## 📄 Licencia

Propietario - HuellarioSoft © 2026

