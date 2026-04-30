import * as yup from 'yup'

/**
 * Esquema de validación para cambio de contraseña
 */
export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required('La contraseña actual es requerida'),
  
  newPassword: yup
    .string()
    .required('La nueva contraseña es requerida')
    .min(6, 'La nueva contraseña debe tener al menos 6 caracteres')
    .max(50, 'La nueva contraseña no puede exceder 50 caracteres')
    .test(
      'different-from-current',
      'La nueva contraseña debe ser diferente a la actual',
      function(value) {
        return value !== this.parent.currentPassword
      }
    ),
  
  confirmPassword: yup
    .string()
    .required('Confirma la nueva contraseña')
    .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden')
})
