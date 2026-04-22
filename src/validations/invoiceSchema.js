import * as yup from 'yup'

// Esquema para crear factura
export const createInvoiceSchema = yup.object({
  propietario: yup
    .string()
    .required('El propietario es requerido'),
  
  items: yup
    .array()
    .of(
      yup.object({
        descripcion: yup
          .string()
          .required('La descripción es requerida')
          .min(3, 'Mínimo 3 caracteres')
          .max(200, 'Máximo 200 caracteres'),
        cantidad: yup
          .number()
          .required('La cantidad es requerida')
          .positive('Debe ser mayor a 0')
          .integer('Debe ser un número entero'),
        precioUnitario: yup
          .number()
          .required('El precio unitario es requerido')
          .positive('Debe ser mayor a 0')
          .max(10000000, 'Precio no válido')
      })
    )
    .min(1, 'Debe agregar al menos un item')
    .required('Los items son requeridos'),
  
  descuento: yup
    .number()
    .nullable()
    .min(0, 'El descuento no puede ser negativo')
    .max(100, 'El descuento no puede exceder 100%'),
  
  observaciones: yup
    .string()
    .nullable()
    .max(500, 'Las observaciones no pueden exceder 500 caracteres')
})

// Esquema para actualizar factura
export const updateInvoiceSchema = createInvoiceSchema
