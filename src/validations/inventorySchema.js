import * as yup from 'yup'

// Esquema para crear producto de inventario
export const createInventorySchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  descripcion: yup
    .string()
    .nullable()
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  
  categoria: yup
    .string()
    .required('La categoría es requerida')
    .oneOf(
      ['medicamento', 'vacuna', 'material-quirurgico', 'alimento', 'accesorio', 'insumo', 'otro'], 
      'Categoría no válida'
    ),
  
  cantidad: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .typeError('Ingresa un número válido')
    .required('La cantidad es requerida')
    .min(0, 'La cantidad no puede ser negativa')
    .integer('La cantidad debe ser un número entero'),
  
  unidadMedida: yup
    .string()
    .required('La unidad de medida es requerida')
    .max(20, 'La unidad no puede exceder 20 caracteres'),
  
  stockMinimo: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .typeError('Ingresa un número válido')
    .required('El stock mínimo es requerido')
    .min(0, 'El stock mínimo no puede ser negativo')
    .integer('El stock mínimo debe ser un número entero'),
  
  precioCompra: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value
    })
    .nullable()
    .typeError('Ingresa un número válido')
    .min(0, 'El precio de compra no puede ser negativo')
    .max(10000000, 'Precio no válido'),
  
  precioVenta: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value
    })
    .typeError('Ingresa un número válido')
    .required('El precio de venta es requerido')
    .positive('El precio de venta debe ser positivo')
    .max(10000000, 'Precio no válido'),
  
  proveedor: yup
    .string()
    .nullable()
    .max(150, 'El proveedor no puede exceder 150 caracteres'),
  
  lote: yup
    .string()
    .nullable()
    .max(50, 'El lote no puede exceder 50 caracteres'),
  
  fechaVencimiento: yup
    .date()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value
    })
    .typeError('Ingresa una fecha válida')
})

// Esquema para actualizar producto de inventario
export const updateInventorySchema = createInventorySchema
