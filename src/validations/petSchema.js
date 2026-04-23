import * as yup from 'yup'

// Esquema para crear mascota
export const createPetSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  
  propietario: yup
    .string()
    .required('El propietario es requerido'),
  
  especie: yup
    .string()
    .required('La especie es requerida')
    .oneOf(['Canino', 'Felino', 'Ave', 'Roedor', 'Reptil', 'Otro'], 'Especie no válida'),
  
  raza: yup
    .string()
    .required('La raza es requerida')
    .max(50, 'La raza no puede exceder 50 caracteres'),
  
  edad: yup.object({
    valor: yup
      .number()
      .transform((value, originalValue) => {
        return originalValue === '' ? undefined : value
      })
      .typeError('Ingresa un número válido')
      .required('El valor de la edad es requerido')
      .positive('El valor debe ser positivo')
      .max(100, 'Valor no válido'),
    unidad: yup
      .string()
      .required('La unidad de edad es requerida')
      .oneOf(['dias', 'meses', 'años'], 'Unidad no válida')
  }).required('La edad es requerida'),
  
  sexo: yup
    .string()
    .required('El sexo es requerido')
    .test('is-not-empty', 'Selecciona el sexo de la mascota', value => value && value !== ''),
  
  color: yup
    .string()
    .required('El color es requerido')
    .max(50, 'El color no puede exceder 50 caracteres'),
  
  peso: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value
    })
    .nullable()
    .typeError('Ingresa un número válido')
    .positive('El peso debe ser positivo')
    .max(500, 'Peso no válido'),
  
  esterilizado: yup
    .boolean()
    .required('Debe indicar si está esterilizado')
})

// Esquema para actualizar mascota
export const updatePetSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  
  propietario: yup
    .string()
    .required('El propietario es requerido'),
  
  especie: yup
    .string()
    .required('La especie es requerida')
    .oneOf(['Canino', 'Felino', 'Ave', 'Roedor', 'Reptil', 'Otro'], 'Especie no válida'),
  
  raza: yup
    .string()
    .required('La raza es requerida')
    .max(50, 'La raza no puede exceder 50 caracteres'),
  
  edad: yup.object({
    valor: yup
      .number()
      .transform((value, originalValue) => {
        return originalValue === '' ? undefined : value
      })
      .typeError('Ingresa un número válido')
      .required('El valor de la edad es requerido')
      .positive('El valor debe ser positivo')
      .max(100, 'Valor no válido'),
    unidad: yup
      .string()
      .required('La unidad de edad es requerida')
      .oneOf(['dias', 'meses', 'años'], 'Unidad no válida')
  }).required('La edad es requerida'),
  
  sexo: yup
    .string()
    .required('El sexo es requerido')
    .test('is-not-empty', 'Selecciona el sexo de la mascota', value => value && value !== ''),
  
  color: yup
    .string()
    .required('El color es requerido')
    .max(50, 'El color no puede exceder 50 caracteres'),
  
  peso: yup
    .number()
    .transform((value, originalValue) => {
      // Convertir string vacío a null
      return originalValue === '' ? null : value
    })
    .nullable()
    .typeError('Ingresa un número válido')
    .positive('El peso debe ser positivo')
    .max(500, 'Peso no válido'),
  
  esterilizado: yup
    .boolean()
    .required('Debe indicar si está esterilizado')
})
