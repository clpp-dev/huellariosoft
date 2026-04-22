import * as yup from 'yup'
import { isValidEmail, isValidPhone, isValidDocument } from '@utils/validators'

// Esquema para crear propietario
export const createOwnerSchema = yup.object({
  nombreCompleto: yup
    .string()
    .required('El nombre completo es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  documento: yup
    .string()
    .required('El documento es requerido')
    .test('valid-document', 'Documento inválido (6-10 dígitos)', (value) => 
      isValidDocument(value)
    ),
  
  telefono: yup
    .string()
    .required('El teléfono es requerido')
    .test('valid-phone', 'Teléfono inválido', (value) => 
      isValidPhone(value)
    ),
  
  email: yup
    .string()
    .nullable()
    .test('valid-email', 'Email inválido', (value) => 
      !value || isValidEmail(value)
    ),
  
  direccion: yup
    .string()
    .nullable()
    .max(200, 'La dirección no puede exceder 200 caracteres')
})

// Esquema para actualizar propietario
export const updateOwnerSchema = yup.object({
  nombreCompleto: yup
    .string()
    .required('El nombre completo es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  documento: yup
    .string()
    .required('El documento es requerido')
    .test('valid-document', 'Documento inválido (6-10 dígitos)', (value) => 
      isValidDocument(value)
    ),
  
  telefono: yup
    .string()
    .required('El teléfono es requerido')
    .test('valid-phone', 'Teléfono inválido', (value) => 
      isValidPhone(value)
    ),
  
  email: yup
    .string()
    .nullable()
    .test('valid-email', 'Email inválido', (value) => 
      !value || isValidEmail(value)
    ),
  
  direccion: yup
    .string()
    .nullable()
    .max(200, 'La dirección no puede exceder 200 caracteres')
})
