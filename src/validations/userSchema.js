import * as yup from 'yup'
import { isValidEmail, isValidPhone } from '@utils/validators'

// Esquema para crear usuario
export const createUserSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  email: yup
    .string()
    .required('El email es requerido')
    .test('valid-email', 'Email inválido', (value) => isValidEmail(value)),
  
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'La contraseña no puede exceder 50 caracteres'),
  
  confirmPassword: yup
    .string()
    .required('Confirma la contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  
  rol: yup
    .string()
    .required('El rol es requerido')
    .oneOf(
      ['administrador', 'veterinario', 'recepcionista', 'auxiliar'],
      'Rol inválido'
    ),
  
  telefono: yup
    .string()
    .nullable()
    .test('valid-phone', 'Teléfono inválido', (value) => 
      !value || isValidPhone(value)
    )
})

// Esquema para actualizar usuario
export const updateUserSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  email: yup
    .string()
    .required('El email es requerido')
    .test('valid-email', 'Email inválido', (value) => isValidEmail(value)),
  
  password: yup
    .string()
    .transform((value) => value === '' ? undefined : value)
    .optional()
    .test('min-length', 'La contraseña debe tener al menos 8 caracteres', (value) => {
      if (!value) return true // No validar si está vacío
      return value.length >= 8
    })
    .test('max-length', 'La contraseña no puede exceder 50 caracteres', (value) => {
      if (!value) return true // No validar si está vacío
      return value.length <= 50
    }),
  
  confirmPassword: yup
    .string()
    .transform((value) => value === '' ? undefined : value)
    .optional()
    .when('password', {
      is: (password) => password && password.length > 0,
      then: (schema) => schema
        .required('Confirma la contraseña')
        .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    }),
  
  rol: yup
    .string()
    .required('El rol es requerido')
    .oneOf(
      ['administrador', 'veterinario', 'recepcionista', 'auxiliar'],
      'Rol inválido'
    ),
  
  telefono: yup
    .string()
    .nullable()
    .test('valid-phone', 'Teléfono inválido', (value) => 
      !value || isValidPhone(value)
    )
})
