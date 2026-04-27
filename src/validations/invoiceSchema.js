import * as yup from 'yup'

// Esquema para crear factura
export const createInvoiceSchema = yup.object({
  propietario: yup
    .string()
    .required('El propietario es requerido'),
  
  mascota: yup
    .string()
    .required('La mascota es requerida'),
  
  items: yup
    .array()
    .of(
      yup.object({
        tipoItem: yup
          .string()
          .oneOf(['servicio', 'producto'], 'Tipo de ítem no válido')
          .required('El tipo de ítem es requerido'),
        tipo: yup
          .string()
          .oneOf([
            'consulta',
            'cirugia',
            'vacunacion',
            'desparasitacion',
            'examen',
            'hospitalizacion',
            'estetica',
            'producto',
            'otro'
          ], 'Categoría no válida')
          .required('La categoría es requerida'),
        descripcion: yup
          .string()
          .when('tipoItem', {
            is: 'servicio',
            then: (schema) => schema.required('La descripción es requerida').min(3, 'Mínimo 3 caracteres'),
            otherwise: (schema) => schema.nullable()
          })
          .max(200, 'Máximo 200 caracteres'),
        producto: yup
          .string()
          .when('tipoItem', {
            is: 'producto',
            then: (schema) => schema.required('Debe seleccionar un producto'),
            otherwise: (schema) => schema.nullable()
          }),
        cantidad: yup
          .number()
          .transform((value, originalValue) => {
            return originalValue === '' ? undefined : value
          })
          .typeError('Ingresa un número válido')
          .required('La cantidad es requerida')
          .positive('Debe ser mayor a 0')
          .integer('Debe ser un número entero'),
        precioUnitario: yup
          .number()
          .transform((value, originalValue) => {
            return originalValue === '' ? undefined : value
          })
          .typeError('Ingresa un número válido')
          .required('El precio unitario es requerido')
          .min(0, 'El precio no puede ser negativo')
          .max(10000000, 'Precio no válido')
      })
    )
    .min(1, 'Debe agregar al menos un item')
    .required('Los items son requeridos'),
  
  descuento: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? 0 : value
    })
    .typeError('Ingresa un número válido')
    .min(0, 'El descuento no puede ser negativo')
    .default(0),
  
  impuestos: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? 19 : value
    })
    .typeError('Ingresa un número válido')
    .min(0, 'Los impuestos no pueden ser negativos')
    .max(100, 'El porcentaje no puede exceder 100%')
    .default(19),
  
  observaciones: yup
    .string()
    .nullable()
    .max(500, 'Las observaciones no pueden exceder 500 caracteres')
})

// Esquema para actualizar factura
export const updateInvoiceSchema = createInvoiceSchema
