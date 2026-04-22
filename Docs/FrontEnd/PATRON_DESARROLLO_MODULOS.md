# Patrón de Desarrollo de Módulos

Esta guía describe el patrón establecido para implementar módulos en el sistema Huellario. Sigue estos estándares para mantener consistencia en el código.

## 📋 Estructura General de un Módulo

Cada módulo completo incluye:
1. **Service** - Capa de comunicación con la API (`src/services/`)
2. **Validation Schema** - Esquemas Yup para formularios (`src/validations/`)
3. **List Page** - Página de listado con tabla y filtros
4. **Create Page** - Formulario de creación
5. **Edit Page** - Formulario de edición
6. **Detail Page** (opcional) - Vista detallada del registro

---

## 1️⃣ SERVICE LAYER

### Ubicación
`src/services/[moduleName]Service.js`

### Estructura Base
```javascript
import httpClient from './httpClient'

const API_URL = '/api-endpoint' // Ejemplo: '/usuarios', '/propietarios'

const moduleService = {
  // Listar con paginación y filtros
  getAll: async (params = {}) => {
    const response = await httpClient.get(API_URL, { params })
    return response.data
  },

  // Obtener por ID
  getById: async (id) => {
    const response = await httpClient.get(`${API_URL}/${id}`)
    return response.data.data
  },

  // Crear nuevo registro
  create: async (data) => {
    const response = await httpClient.post(API_URL, data)
    return response.data.data
  },

  // Actualizar registro
  update: async (id, data) => {
    const response = await httpClient.put(`${API_URL}/${id}`, data)
    return response.data.data
  },

  // Eliminar registro
  delete: async (id) => {
    const response = await httpClient.delete(`${API_URL}/${id}`)
    return response.data
  },

  // Métodos adicionales según necesidad del módulo
}

export default moduleService
```

### Ejemplos Implementados
- ✅ `userService.js` - toggleStatus()
- ✅ `ownerService.js` - getByDocument(), search()
- ✅ `petService.js` - getByOwner(), uploadImage()
- ✅ `appointmentService.js` - updateStatus(), cancel()

---

## 2️⃣ VALIDATION SCHEMAS

### Ubicación
`src/validations/[moduleName]Schema.js`

### Estructura Base
```javascript
import * as yup from 'yup'
import { isValidEmail, isValidPhone, isValidDocument } from '@utils/validators'

// Esquema para crear
export const createModuleSchema = yup.object({
  campoRequerido: yup
    .string()
    .required('Este campo es requerido')
    .min(3, 'Mínimo 3 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  
  email: yup
    .string()
    .nullable()
    .test('valid-email', 'Email inválido', (value) => 
      !value || isValidEmail(value)
    ),
  
  telefono: yup
    .string()
    .required('El teléfono es requerido')
    .test('valid-phone', 'Teléfono inválido', (value) => 
      isValidPhone(value)
    ),
})

// Esquema para actualizar (ajusta según necesidades)
export const updateModuleSchema = yup.object({
  // Similar al create, ajustando campos opcionales
})
```

### Validadores Disponibles
```javascript
// src/utils/validators.js
isValidEmail(email)      // Valida formato de email
isValidPhone(phone)      // Valida teléfono colombiano (10 dígitos)
isValidDocument(doc)     // Valida documento (6-10 dígitos)
```

---

## 3️⃣ LIST PAGE (Listado con Tabla)

### Ubicación
`src/pages/[module]/[Module]ListPage.jsx`

### Estructura Base
```javascript
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Badge from '@components/ui/Badge'
import Table from '@components/tables/Table'
import Modal from '@components/ui/Modal'
import { Icons } from '@constants/icons'
import moduleService from '@services/moduleService'
import { toast } from 'sonner'

function ModuleListPage() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterField, setFilterField] = useState('') // Si aplica
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    itemId: null
  })

  // Cargar datos
  useEffect(() => {
    loadData()
  }, [pagination.page, searchTerm, filterField])

  const loadData = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        q: searchTerm,
        // Agregar filtros adicionales según necesidad
      }
      
      const response = await moduleService.getAll(params)
      setData(response.data || [])
      
      if (response.pagination) {
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          pages: response.pagination.pages
        }))
      }
    } catch (error) {
      console.error('Error al cargar datos:', error)
      toast.error('Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  const handleDeleteClick = (itemId) => {
    setDeleteModal({ open: true, itemId })
  }

  const handleDeleteConfirm = async () => {
    try {
      await moduleService.delete(deleteModal.itemId)
      toast.success('Registro eliminado correctamente')
      setDeleteModal({ open: false, itemId: null })
      loadData()
    } catch (error) {
      console.error('Error al eliminar:', error)
      toast.error('Error al eliminar registro')
    }
  }

  // Definir columnas de la tabla
  const columns = [
    {
      header: 'Campo Principal',
      accessor: 'campo',
      render: (row) => (
        <div className="flex items-center">
          {/* Avatar o imagen si aplica */}
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-700">
              {row.campo?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{row.campo}</p>
            <p className="text-sm text-gray-500">{row.subCampo}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Estado',
      accessor: 'activo',
      render: (row) => (
        <Badge variant={row.activo ? 'success' : 'danger'}>
          {row.activo ? 'Activo' : 'Inactivo'}
        </Badge>
      )
    },
    {
      header: 'Acciones',
      accessor: '_id',
      render: (row) => (
        <div className="flex items-center space-x-2">
          {/* Botón Ver (opcional) */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/ruta/${row._id}`)}
            leftIcon={Icons.Eye}
          >
            Ver
          </Button>
          {/* Botón Editar */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/ruta/${row._id}/edit`)}
            leftIcon={Icons.Edit}
          >
            Editar
          </Button>
          {/* Botón Eliminar */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteClick(row._id)}
            leftIcon={Icons.Trash}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Eliminar
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Título del Módulo</h1>
          <p className="mt-1 text-sm text-gray-600">
            Descripción del módulo
          </p>
        </div>
        <Link to="/ruta/create">
          <Button leftIcon={Icons.Plus}>
            Nuevo Registro
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <Card>
        <Card.Content className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              leftIcon={Icons.Search}
            />
            {/* Agregar Select u otros filtros según necesidad */}
          </div>
        </Card.Content>
      </Card>

      {/* Tabla */}
      <Card>
        <Table
          columns={columns}
          data={data}
          isLoading={loading}
          pagination={{
            currentPage: pagination.page,
            totalPages: pagination.pages,
            onPageChange: handlePageChange
          }}
          emptyMessage="No se encontraron registros"
        />
      </Card>

      {/* Modal de confirmación de eliminación */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, itemId: null })}
        size="sm"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
            <Icons.AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-medium text-gray-900">
              Eliminar Registro
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              ¿Estás seguro de eliminar este registro? Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="mt-6 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ open: false, itemId: null })}
              fullWidth
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              fullWidth
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ModuleListPage
```

---

## 4️⃣ CREATE PAGE (Formulario de Creación)

### Ubicación
`src/pages/[module]/[Module]CreatePage.jsx`

### Estructura Base
```javascript
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Select from '@components/ui/Select'
import Textarea from '@components/ui/Textarea'
import { Icons } from '@constants/icons'
import { createModuleSchema } from '@validations/moduleSchema'
import moduleService from '@services/moduleService'
import { toast } from 'sonner'

function ModuleCreatePage() {
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(createModuleSchema)
  })

  const onSubmit = async (data) => {
    try {
      await moduleService.create(data)
      toast.success('Registro creado exitosamente')
      navigate('/ruta-listado')
    } catch (error) {
      console.error('Error al crear:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al crear registro')
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/ruta-listado')}
          leftIcon={Icons.ArrowLeft}
          className="mb-4"
        >
          Volver
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Nuevo Registro</h1>
        <p className="mt-1 text-sm text-gray-600">
          Completa el formulario para crear un nuevo registro
        </p>
      </div>

      {/* Formulario */}
      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Sección de campos */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Información General
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Campo de Texto"
                  {...register('campo')}
                  error={errors.campo?.message}
                  placeholder="Ejemplo..."
                  leftIcon={Icons.User}
                  required
                />

                <Select
                  label="Campo Selector"
                  {...register('selector')}
                  error={errors.selector?.message}
                  options={[
                    { value: '', label: 'Selecciona una opción' },
                    { value: 'opcion1', label: 'Opción 1' },
                    { value: 'opcion2', label: 'Opción 2' }
                  ]}
                  required
                />

                <div className="sm:col-span-2">
                  <Textarea
                    label="Campo de Texto Largo"
                    {...register('descripcion')}
                    error={errors.descripcion?.message}
                    placeholder="Descripción..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/ruta-listado')}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                leftIcon={Icons.Save}
              >
                Crear Registro
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}

export default ModuleCreatePage
```

---

## 5️⃣ EDIT PAGE (Formulario de Edición)

### Ubicación
`src/pages/[module]/[Module]EditPage.jsx`

### Estructura Base
```javascript
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Card from '@components/ui/Card'
import Button from '@components/ui/Button'
import Input from '@components/ui/Input'
import Spinner from '@components/ui/Spinner'
import { Icons } from '@constants/icons'
import { updateModuleSchema } from '@validations/moduleSchema'
import moduleService from '@services/moduleService'
import { toast } from 'sonner'

function ModuleEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(updateModuleSchema)
  })

  useEffect(() => {
    loadData()
  }, [id])

  const loadData = async () => {
    try {
      setLoading(true)
      const data = await moduleService.getById(id)
      
      // Cargar los datos en el formulario
      setValue('campo1', data.campo1)
      setValue('campo2', data.campo2)
      // ... más campos
    } catch (error) {
      console.error('Error al cargar datos:', error)
      toast.error('Error al cargar datos')
      navigate('/ruta-listado')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      await moduleService.update(id, data)
      toast.success('Registro actualizado exitosamente')
      navigate('/ruta-listado')
    } catch (error) {
      console.error('Error al actualizar:', error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error al actualizar registro')
      }
    }
  }

  if (loading) {
    return <Spinner.Page message="Cargando datos..." />
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/ruta-listado')}
          leftIcon={Icons.ArrowLeft}
          className="mb-4"
        >
          Volver
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Editar Registro</h1>
        <p className="mt-1 text-sm text-gray-600">
          Actualiza la información del registro
        </p>
      </div>

      {/* Formulario (similar al Create) */}
      <Card>
        <Card.Content className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campos del formulario */}
            
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/ruta-listado')}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                leftIcon={Icons.Save}
              >
                Guardar Cambios
              </Button>
            </div>
          </form>
        </Card.Content>
      </Card>
    </div>
  )
}

export default ModuleEditPage
```

---

## 🎨 COMPONENTES UI DISPONIBLES

### Input
```javascript
<Input
  label="Etiqueta"
  {...register('campo')}
  error={errors.campo?.message}
  placeholder="Placeholder"
  leftIcon={Icons.User}
  type="text" // text, email, password, number
  required
/>
```

### Select
```javascript
<Select
  label="Etiqueta"
  {...register('campo')}
  error={errors.campo?.message}
  options={[
    { value: '', label: 'Selecciona...' },
    { value: 'val1', label: 'Opción 1' }
  ]}
  required
/>
```

### Textarea
```javascript
<Textarea
  label="Etiqueta"
  {...register('campo')}
  error={errors.campo?.message}
  placeholder="Placeholder"
  rows={3}
/>
```

### Button
```javascript
<Button
  variant="primary" // primary, secondary, outline, ghost, danger
  size="md" // sm, md, lg
  onClick={() => {}}
  leftIcon={Icons.Plus}
  rightIcon={Icons.ArrowRight}
  loading={isLoading}
  disabled={isDisabled}
  fullWidth
>
  Texto del Botón
</Button>
```

### Badge
```javascript
<Badge variant="success"> // success, danger, warning, info, default
  Texto
</Badge>
```

### Modal
```javascript
<Modal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  size="sm" // sm, md, lg, xl
>
  <div className="p-6">
    {/* Contenido del modal */}
  </div>
</Modal>
```

### Card
```javascript
<Card>
  <Card.Header>
    <h2>Título</h2>
  </Card.Header>
  <Card.Content className="p-6">
    {/* Contenido */}
  </Card.Content>
</Card>
```

### Spinner
```javascript
// Spinner de página completa
<Spinner.Page message="Cargando..." />

// Spinner inline
<Spinner size="sm" /> // sm, md, lg
```

---

## 📦 ICONOS DISPONIBLES

### Uso
```javascript
import { Icons } from '@constants/icons'

<Icons.User />
<Icons.Mail />
<Icons.Phone />
```

### Iconos Comunes
- `User`, `Users` - Usuarios/Personas
- `Mail`, `Phone` - Contacto
- `Lock`, `Key` - Seguridad
- `Edit`, `Trash`, `Eye`, `Save` - Acciones
- `Plus`, `Minus` - Agregar/Quitar
- `Search`, `Filter` - Búsqueda
- `Calendar`, `Clock` - Fecha/Hora
- `FileText`, `File` - Documentos
- `Home`, `Building` - Lugares
- `Heart`, `Activity` - Salud
- `Package`, `ShoppingCart` - Inventario
- `DollarSign`, `CreditCard` - Finanzas
- `AlertCircle`, `CheckCircle`, `XCircle` - Estados
- `ArrowLeft`, `ArrowRight` - Navegación
- `ChevronLeft`, `ChevronRight`, `ChevronDown`, `ChevronUp` - Flechas
- `Settings`, `MoreVertical` - Configuración

---

## 🚨 MANEJO DE ERRORES Y TOAST

### Notificaciones con Sonner
```javascript
import { toast } from 'sonner'

// Éxito
toast.success('Operación exitosa')

// Error
toast.error('Error en la operación')

// Información
toast.info('Información importante')

// Advertencia
toast.warning('Advertencia')

// Con duración personalizada
toast.success('Mensaje', { duration: 5000 })
```

### Manejo de Errores de API
```javascript
try {
  await service.operation()
  toast.success('Operación exitosa')
} catch (error) {
  console.error('Error:', error)
  if (error.response?.data?.message) {
    toast.error(error.response.data.message)
  } else {
    toast.error('Error en la operación')
  }
}
```

---

## 📝 CHECKLIST DE IMPLEMENTACIÓN

### Para cada módulo nuevo:
- [ ] Crear/verificar service en `src/services/`
- [ ] Crear validación en `src/validations/`
- [ ] Implementar ListPage con:
  - [ ] Tabla con columnas apropiadas
  - [ ] Paginación
  - [ ] Búsqueda
  - [ ] Filtros (si aplica)
  - [ ] Modal de confirmación de eliminación
- [ ] Implementar CreatePage con:
  - [ ] Formulario con React Hook Form
  - [ ] Validación con Yup
  - [ ] Manejo de errores
- [ ] Implementar EditPage con:
  - [ ] Carga de datos existentes
  - [ ] Pre-poblar formulario
  - [ ] Actualización
- [ ] Implementar DetailPage (si aplica)
- [ ] Verificar rutas en `src/routes/`
- [ ] Probar CRUD completo
- [ ] Verificar manejo de errores
- [ ] Verificar responsive design

---

## 🔗 MÓDULOS PENDIENTES

### Alta Prioridad
1. **Mascotas** - Gestión de animales
2. **Citas** - Sistema de agendamiento
3. **Historia Clínica** - Registros médicos

### Media Prioridad
4. **Inventario** - Control de stock
5. **Facturación** - Sistema de cobros

### Baja Prioridad
6. **Reportes** - Estadísticas y gráficos

---

## 📚 REFERENCIAS

- **React Hook Form**: https://react-hook-form.com/
- **Yup**: https://github.com/jquense/yup
- **Sonner**: https://sonner.emilkowal.ski/
- **Lucide Icons**: https://lucide.dev/icons/

---

## ✅ MÓDULOS COMPLETADOS

1. ✅ **Dashboard** - Estadísticas generales
2. ✅ **Usuarios** - Gestión de usuarios del sistema
3. 🔄 **Propietarios** - Gestión de clientes (List y Create completos)
