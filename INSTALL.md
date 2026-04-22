# 🐾 HuellarioSoft Frontend - Guía de Instalación

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0 ([Descargar](https://nodejs.org/))
- **npm** >= 9.0.0 (viene con Node.js)
- **Git** ([Descargar](https://git-scm.com/))
- **Backend de HuellarioSoft** corriendo en `http://localhost:5000`

### Verificar instalaciones

```powershell
node --version
# Debe mostrar v18.x.x o superior

npm --version
# Debe mostrar 9.x.x o superior
```

---

## 🚀 Instalación Paso a Paso

### 1. Navegar a la carpeta del frontend

```powershell
cd c:\- HUELLARIO -\huellariosoft\frontend
```

### 2. Instalar dependencias

```powershell
npm install
```

Este proceso puede tardar algunos minutos. Se instalarán todas las dependencias necesarias:
- React 18
- React Router DOM
- Tailwind CSS
- React Hook Form
- Yup
- Sonner (notificaciones)
- Lucide React (iconos)
- date-fns
- js-cookie
- Recharts (gráficas)

### 3. Configurar variables de entorno

El archivo `.env` ya está creado con la configuración por defecto:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=HuellarioSoft
VITE_APP_VERSION=1.0.0
VITE_TOKEN_COOKIE_NAME=huellario_token
VITE_REFRESH_TOKEN_COOKIE_NAME=huellario_refresh_token
VITE_ENV=development
```

**Si tu backend está en otra URL**, edita el archivo `.env`:

```powershell
notepad .env
```

Y cambia la URL:
```env
VITE_API_URL=http://tu-servidor:puerto/api
```

### 4. Iniciar el servidor de desarrollo

```powershell
npm run dev
```

Deberías ver algo como:

```
  VITE v5.2.8  ready in 423 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 5. Abrir la aplicación

Abre tu navegador en:
```
http://localhost:3000
```

---

## 🔑 Primer Inicio de Sesión

### Credenciales de Administrador

Usa las credenciales del administrador creado en el backend:

```
Email:    admin@huellariosoft.com
Password: 123456Usuario
```

**IMPORTANTE**: Cambia esta contraseña después del primer login.

---

## 📁 Estructura del Proyecto

```
frontend/
├── public/              # Archivos públicos estáticos
├── src/
│   ├── api/            # Configuración de API (placeholder)
│   ├── assets/         # Imágenes, fuentes, etc.
│   ├── components/     # Componentes reutilizables
│   │   ├── ui/        # Componentes base (Button, Input, etc.)
│   │   ├── forms/     # Componentes de formularios
│   │   ├── tables/    # Componentes de tablas
│   │   ├── modals/    # Componentes de modales
│   │   ├── layout/    # Layouts (Sidebar, Header, etc.)
│   │   └── shared/    # Componentes compartidos
│   ├── context/       # Context API de React
│   ├── hooks/         # Custom hooks
│   ├── pages/         # Páginas/vistas
│   ├── routes/        # Configuración de rutas
│   ├── services/      # Servicios de API
│   ├── utils/         # Utilidades y helpers
│   ├── validations/   # Esquemas de validación Yup
│   ├── constants/     # Constantes de la aplicación
│   ├── App.jsx       # Componente principal
│   ├── main.jsx      # Punto de entrada
│   └── index.css     # Estilos globales
├── .env              # Variables de entorno
├── .gitignore        # Archivos ignorados por Git
├── index.html        # HTML principal
├── package.json      # Dependencias y scripts
├── vite.config.js    # Configuración de Vite
├── tailwind.config.js # Configuración de Tailwind
├── postcss.config.js  # Configuración de PostCSS
├── README.md         # Documentación del proyecto
└── NEXT_STEPS.md     # Próximos pasos de desarrollo
```

---

## 🛠️ Scripts Disponibles

### Desarrollo

```powershell
npm run dev
# Inicia el servidor de desarrollo en http://localhost:3000
# Con hot-reload automático
```

### Producción

```powershell
npm run build
# Construye la aplicación para producción en la carpeta /dist
# Optimiza y minifica el código
```

```powershell
npm run preview
# Preview del build de producción
```

### Linting

```powershell
npm run lint
# Ejecuta ESLint para verificar calidad del código
```

---

## ✅ Verificar que Todo Funciona

### 1. Login
- Abre http://localhost:3000
- Deberías ver la página de login
- Ingresa las credenciales del administrador
- Deberías ser redirigido al dashboard

### 2. Dashboard
- Verifica que veas el dashboard con métricas
- Comprueba que el sidebar se despliega correctamente
- Verifica que el menú de usuario funciona

### 3. Navegación
- Haz clic en diferentes opciones del sidebar
- Verifica que las rutas cambian correctamente
- Comprueba que las páginas placeholder se muestran

### 4. Cerrar Sesión
- Haz clic en tu usuario en el header
- Selecciona "Cerrar Sesión"
- Deberías volver a la página de login

---

## 🐛 Solución de Problemas

### El servidor no inicia

**Error: `EADDRINUSE: address already in use`**
```powershell
# El puerto 3000 está en uso
# Detén otros procesos o cambia el puerto en vite.config.js
```

### Errores de dependencias

```powershell
# Eliminar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### No se conecta al backend

**Verificar que el backend esté corriendo:**
```powershell
# En otra terminal
curl http://localhost:5000/health
# Debe responder con status OK
```

**Verificar variables de entorno:**
```powershell
# Asegúrate de que .env tiene la URL correcta
notepad .env
```

**Verificar CORS:**
- El backend debe tener configurado CORS para aceptar peticiones desde http://localhost:3000
- Verifica la configuración en el backend

### Error de compilación de Tailwind

```powershell
# Reinstalar Tailwind y dependencias
npm install -D tailwindcss postcss autoprefixer
```

### Problemas con ESLint

```powershell
# Desactivar temporalmente (no recomendado para producción)
# Editar vite.config.js y comentar plugin de ESLint
```

---

## 🎨 Personalización

### Cambiar colores del tema

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Cambia estos valores por tus colores
        500: '#0ea5e9',
        600: '#0284c7',
        // ...
      }
    }
  }
}
```

### Cambiar logo y nombre

**Logo:**
- Reemplaza el SVG en `src/components/layout/AuthLayout.jsx`
- Reemplaza el SVG en `src/components/layout/Sidebar.jsx`

**Nombre de la aplicación:**
- Edita `.env`:
  ```env
  VITE_APP_NAME=Tu Nombre
  ```

### Cambiar puerto

Edita `vite.config.js`:

```javascript
server: {
  port: 3001, // Cambia el puerto aquí
  // ...
}
```

---

## 📦 Build para Producción

### 1. Crear build optimizado

```powershell
npm run build
```

Esto generará una carpeta `dist/` con los archivos optimizados.

### 2. Configurar variables de producción

Crea un archivo `.env.production`:

```env
VITE_API_URL=https://tu-servidor-produccion.com/api
VITE_ENV=production
```

### 3. Preview del build

```powershell
npm run preview
```

Abre http://localhost:4173 para ver el preview.

### 4. Desplegar

Puedes desplegar la carpeta `dist/` en:
- **Vercel** (recomendado para apps Vite/React)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**
- Cualquier servidor web estático

**Ejemplo con servidor simple:**
```powershell
# Instalar servidor HTTP simple
npm install -g serve

# Servir la carpeta dist
serve -s dist -p 80
```

---

## 🔐 Seguridad

### Variables de entorno

**NUNCA** subas el archivo `.env` a Git. Está incluido en `.gitignore`.

### Tokens

Los tokens se almacenan en cookies con:
- `HttpOnly` en producción
- `Secure` en producción (requiere HTTPS)
- `SameSite: Strict`

### HTTPS en Producción

**Siempre** usa HTTPS en producción para proteger:
- Tokens de autenticación
- Datos sensibles de usuarios
- Comunicación con el backend

---

## 📞 Ayuda y Soporte

### Documentación
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

### Recursos del Proyecto
- `README.md` - Descripción general
- `NEXT_STEPS.md` - Guía de desarrollo
- Comentarios en el código fuente

### Errores Comunes
Consulta la sección de "Solución de Problemas" arriba.

---

## ✨ Próximos Pasos

Una vez que la aplicación esté funcionando:

1. Lee `NEXT_STEPS.md` para guía de desarrollo
2. Familiarízate con la estructura del proyecto
3. Revisa los componentes UI disponibles
4. Comienza a desarrollar los módulos pendientes

---

**¡Listo! Ya tienes HuellarioSoft Frontend funcionando. 🎉**

Continúa con `NEXT_STEPS.md` para empezar a desarrollar los módulos del sistema.
