# 🚀 Inicio Rápido - HuellarioSoft Frontend

## ⚡ Comandos Esenciales

### Instalación Inicial (Solo primera vez)
```bash
cd c:\- HUELLARIO -\huellariosoft\frontend
npm install
```

### Desarrollo Diario
```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador: http://localhost:3000
```

### Login
```
Email:    admin@huellariosoft.com
Password: 123456Usuario
```

---

## 📝 Comandos Completos

### Desarrollo
```bash
npm run dev          # Inicia servidor en http://localhost:3000
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Verificar código con ESLint
```

### Limpiar y Reinstalar
```bash
# Si hay problemas con dependencias
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## 🔍 Verificar Estado del Proyecto

### Verificar Backend
```bash
# El backend debe estar corriendo en puerto 5000
curl http://localhost:5000/health
```

### Ver Logs del Frontend
```bash
# En el navegador: F12 > Console
# Ver errores de red: F12 > Network
```

### Ver Variables de Entorno
```bash
notepad .env
# Debe tener: VITE_API_URL=http://localhost:5000/api
```

---

## 📂 Navegación en el Proyecto

### Estructura de Carpetas Clave
```bash
frontend/
├── src/
│   ├── components/ui/        # Componentes reutilizables
│   ├── pages/                # Páginas de cada módulo
│   ├── services/             # Servicios de API
│   ├── context/              # Estado global
│   ├── utils/                # Utilidades
│   └── constants/            # Constantes
```

### Archivos Importantes
```
- .env                        # Variables de entorno
- vite.config.js             # Configuración de Vite
- tailwind.config.js         # Configuración de Tailwind
- README.md                  # Documentación general
- INSTALL.md                 # Guía de instalación
- NEXT_STEPS.md              # Próximos pasos de desarrollo
- RESUMEN_EJECUTIVO.md       # Resumen del proyecto
```

---

## 🎨 Usar Componentes UI

### Button
```jsx
import Button from '@components/ui/Button'
import { Icons } from '@constants/icons'

<Button variant="primary" size="md" leftIcon={Icons.Plus}>
  Nuevo
</Button>
```

### Input
```jsx
import Input from '@components/ui/Input'

<Input
  label="Nombre"
  error={errors.name}
  leftIcon={Icons.User}
  required
/>
```

### Card
```jsx
import Card from '@components/ui/Card'

<Card>
  <Card.Header>
    <Card.Title>Título</Card.Title>
  </Card.Header>
  <Card.Content>
    Contenido aquí
  </Card.Content>
</Card>
```

### Modal
```jsx
import Modal from '@components/ui/Modal'
import { useState } from 'react'

const [isOpen, setIsOpen] = useState(false)

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Header>Título</Modal.Header>
  <Modal.Content>Contenido</Modal.Content>
  <Modal.Footer>
    <Button onClick={() => setIsOpen(false)}>Cerrar</Button>
  </Modal.Footer>
</Modal>
```

### Table
```jsx
import Table from '@components/tables/Table'

const columns = [
  { header: 'Nombre', accessor: 'nombre' },
  { header: 'Email', accessor: 'email' },
]

<Table
  columns={columns}
  data={usuarios}
  isLoading={loading}
/>
```

---

## 🔐 Usar Autenticación

### En un componente
```jsx
import { useAuth } from '@context/AuthContext'

function MiComponente() {
  const { user, login, logout, hasRole } = useAuth()
  
  // Verificar si está autenticado
  if (!user) return <p>No autenticado</p>
  
  // Verificar rol
  if (hasRole('admin')) {
    return <AdminPanel />
  }
  
  // Login
  const handleLogin = async () => {
    await login(email, password)
  }
  
  // Logout
  const handleLogout = async () => {
    await logout()
  }
}
```

---

## 📡 Hacer Llamadas a la API

### Crear un servicio
```jsx
// src/services/userService.js
import httpClient from './httpClient'

export const userService = {
  async getAll(params) {
    return httpClient.get('/usuarios', { params })
  },
  
  async getById(id) {
    return httpClient.get(`/usuarios/${id}`)
  },
  
  async create(data) {
    return httpClient.post('/usuarios', data)
  },
  
  async update(id, data) {
    return httpClient.put(`/usuarios/${id}`, data)
  },
  
  async delete(id) {
    return httpClient.delete(`/usuarios/${id}`)
  }
}
```

### Usar el servicio
```jsx
import { userService } from '@services/userService'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    loadUsers()
  }, [])
  
  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await userService.getAll()
      setUsers(data)
    } catch (error) {
      toast.error('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }
  
  const handleDelete = async (id) => {
    try {
      await userService.delete(id)
      toast.success('Usuario eliminado')
      loadUsers()
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }
}
```

---

## ✅ Validar Formularios

### Crear esquema de validación
```jsx
// src/validations/userSchema.js
import * as yup from 'yup'

export const createUserSchema = yup.object({
  nombre: yup.string()
    .required('El nombre es requerido')
    .min(3, 'Mínimo 3 caracteres'),
  email: yup.string()
    .required('El email es requerido')
    .email('Email inválido'),
  password: yup.string()
    .required('La contraseña es requerida')
    .min(6, 'Mínimo 6 caracteres'),
  rol: yup.string()
    .required('El rol es requerido')
    .oneOf(['admin', 'veterinario', 'recepcionista', 'auxiliar'])
})
```

### Usar en formulario
```jsx
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserSchema } from '@validations/userSchema'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Button from '@components/ui/Button'

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(createUserSchema)
  })
  
  const onSubmit = async (data) => {
    try {
      await userService.create(data)
      toast.success('Usuario creado')
    } catch (error) {
      toast.error('Error al crear usuario')
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nombre"
        {...register('nombre')}
        error={errors.nombre?.message}
      />
      
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      
      <Input
        label="Contraseña"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      
      <Select
        label="Rol"
        {...register('rol')}
        error={errors.rol?.message}
        options={[
          { value: 'admin', label: 'Administrador' },
          { value: 'veterinario', label: 'Veterinario' },
          { value: 'recepcionista', label: 'Recepcionista' },
          { value: 'auxiliar', label: 'Auxiliar' },
        ]}
      />
      
      <Button type="submit" loading={isSubmitting}>
        Guardar
      </Button>
    </form>
  )
}
```

---

## 🎨 Usar Utilidades

### Formatear Moneda
```jsx
import { formatCurrency } from '@utils/formatters'

const precio = 50000
formatCurrency(precio) // "$50,000"
```

### Formatear Fecha
```jsx
import { formatDate, formatDateTime } from '@utils/dateUtils'

formatDate(new Date()) // "12 de ene de 2024"
formatDateTime(new Date()) // "12 de ene de 2024, 10:30 AM"
```

### Validar Email/Teléfono
```jsx
import { isValidEmail, isValidPhone } from '@utils/validators'

isValidEmail('test@gmail.com') // true
isValidPhone('3001234567') // true (Colombia)
```

### Manipular Strings
```jsx
import { capitalize, truncate, getInitials } from '@utils/stringUtils'

capitalize('hola mundo') // "Hola mundo"
truncate('Texto largo...', 10) // "Texto l..."
getInitials('Juan Pérez') // "JP"
```

---

## 🎯 Patrones Comunes

### Página con Listado
```jsx
function ListPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Listado</h1>
        <Button leftIcon={Icons.Plus}>Nuevo</Button>
      </div>
      
      <Card>
        <Table
          columns={columns}
          data={items}
          isLoading={loading}
        />
      </Card>
    </div>
  )
}
```

### Página con Formulario
```jsx
function FormPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Formulario</h1>
      
      <Card>
        <Card.Content>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Campos del formulario */}
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline">Cancelar</Button>
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}
```

---

## 🐛 Solución de Problemas Rápida

### El servidor no inicia
```bash
# Verificar que el puerto 3000 esté libre
# O cambiar puerto en vite.config.js
```

### Error "Cannot find module"
```bash
# Reinstalar dependencias
npm install
```

### No conecta con backend
```bash
# 1. Verificar que backend esté corriendo
curl http://localhost:5000/health

# 2. Verificar .env
notepad .env
# Debe tener: VITE_API_URL=http://localhost:5000/api
```

### Errores de CORS
```bash
# Verificar configuración de CORS en el backend
# El backend debe permitir: http://localhost:3000
```

---

## 📚 Recursos Útiles

### Documentación Completa
- `README.md` - Información general del proyecto
- `INSTALL.md` - Guía detallada de instalación
- `NEXT_STEPS.md` - Guía de desarrollo de módulos
- `RESUMEN_EJECUTIVO.md` - Resumen del proyecto

### Documentación Externa
- React: https://react.dev
- Vite: https://vitejs.dev
- Tailwind: https://tailwindcss.com
- React Hook Form: https://react-hook-form.com
- Yup: https://github.com/jquense/yup

---

## 💡 Tips de Productividad

### Atajos de VSCode
```
Ctrl + P        - Buscar archivo
Ctrl + Shift + F - Buscar en todos los archivos
Ctrl + `        - Abrir terminal
F2              - Renombrar símbolo
Alt + Click     - Múltiples cursores
```

### Extensiones Recomendadas
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Auto Rename Tag

### Snippets Útiles
```jsx
// rfc - React Function Component
function MyComponent() {
  return <div></div>
}

// rafce - Arrow Function Component with Export
const MyComponent = () => {
  return <div></div>
}
export default MyComponent

// useState
const [state, setState] = useState(initialValue)

// useEffect
useEffect(() => {
  // code
}, [])
```

---

## ✨ Siguiente Paso

Consulta `NEXT_STEPS.md` para comenzar a implementar los módulos del sistema en el siguiente orden:

1. **Usuarios** (Gestión de usuarios del sistema)
2. **Propietarios** (Gestión de clientes)
3. **Mascotas** (Gestión de pacientes)
4. **Citas** (Sistema de agendamiento)
5. **Historia Clínica** (Registros médicos)
6. **Inventario** (Control de productos)
7. **Facturación** (Generación de facturas)
8. **Reportes** (Estadísticas y análisis)

---

**¡Listo para desarrollar! 🚀**
