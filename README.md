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

1. **Autenticación** - Login, logout, perfil
2. **Dashboard** - Métricas y estadísticas
3. **Usuarios** - Gestión de usuarios del sistema
4. **Propietarios** - Gestión de clientes
5. **Mascotas** - Gestión de pacientes
6. **Citas** - Agenda y calendario veterinario
7. **Historia Clínica** - Registros médicos
8. **Inventario** - Control de productos y medicamentos
9. **Facturación** - Generación de facturas
10. **Reportes** - Estadísticas y reportes

## 🎯 Roadmap

- [x] Configuración inicial del proyecto
- [x] Sistema de autenticación
- [x] Layouts y componentes base
- [ ] Módulos de gestión
- [ ] Dashboard con gráficas
- [ ] Sistema de notificaciones
- [ ] Exportación de reportes
- [ ] Optimización de performance
- [ ] Testing (Jest + React Testing Library)
- [ ] Documentación con Storybook

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

Propietario - HuellarioSoft © 2024

---

Desarrollado con ❤️ por el equipo de HuellarioSoft
