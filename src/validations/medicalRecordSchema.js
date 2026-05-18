import * as yup from 'yup'

// Esquema para crear historia clínica
export const createMedicalRecordSchema = yup.object({
  mascota: yup
    .string()
    .required('La mascota es requerida'),
  
  veterinario: yup
    .string()
    .required('El veterinario es requerido'),
  
  fechaConsulta: yup
    .date()
    .transform((value, originalValue) => {
      // Convertir string vacío a undefined
      return originalValue === '' ? undefined : value
    })
    .typeError('Ingresa una fecha válida')
    .required('La fecha es requerida')
    .max(new Date(), 'La fecha no puede ser futura'),
  
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
  
  temperatura: yup
    .number()
    .transform((value, originalValue) => {
      // Convertir string vacío a null
      return originalValue === '' ? null : value
    })
    .nullable()
    .typeError('Ingresa un número válido')
    .positive('La temperatura debe ser positiva')
    .min(30, 'Temperatura muy baja')
    .max(45, 'Temperatura muy alta'),
  
  frecuenciaCardiaca: yup
    .number()
    .transform((value, originalValue) => {
      // Convertir string vacío a null
      return originalValue === '' ? null : value
    })
    .nullable()
    .typeError('Ingresa un número válido')
    .positive('La frecuencia cardíaca debe ser positiva')
    .max(300, 'Valor no válido'),
  
  frecuenciaRespiratoria: yup
    .number()
    .transform((value, originalValue) => {
      // Convertir string vacío a null
      return originalValue === '' ? null : value
    })
    .nullable()
    .typeError('Ingresa un número válido')
    .positive('La frecuencia respiratoria debe ser positiva')
    .max(200, 'Valor no válido'),
  
  motivoConsulta: yup
    .string()
    .required('El motivo de consulta es requerido')
    .min(5, 'El motivo debe tener al menos 5 caracteres')
    .max(300, 'El motivo no puede exceder 300 caracteres'),
  
  anamnesicos: yup
    .string()
    .nullable()
    .max(2000, 'Los anamnésicos no pueden exceder 2000 caracteres'),
  
  sintomas: yup
    .string()
    .nullable()
    .max(1000, 'Los síntomas no pueden exceder 1000 caracteres'),
  
  // Examen Físico
  muscosas: yup
    .string()
    .nullable()
    .oneOf(['', 'Pálidas', 'Rosadas', 'Congestionadas', 'Cianóticas', 'Ictéricas', 'Otro'], 'Opción no válida'),
  
  deshidratacion: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value
    })
    .nullable()
    .typeError('Ingresa un número válido')
    .min(0, 'Debe ser entre 0 y 5')
    .max(5, 'Debe ser entre 0 y 5'),
  
  condicionCorporal: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === '' ? null : value
    })
    .nullable()
    .typeError('Ingresa un número válido')
    .min(0, 'Debe ser entre 0 y 5')
    .max(5, 'Debe ser entre 0 y 5'),
  
  actitudPropietario: yup
    .string()
    .nullable()
    .oneOf(['', 'Amigable', 'Nervioso', 'Agresivo', 'Temeroso', 'Colaborador', 'Otro'], 'Opción no válida'),
  
  actitudVeterinario: yup
    .string()
    .nullable()
    .oneOf(['', 'Amigable', 'Nervioso', 'Agresivo', 'Temeroso', 'Colaborador', 'Otro'], 'Opción no válida'),
  
  // Sistemas Afectados
  sistemasAfectadosDescripcion: yup
    .string()
    .nullable()
    .max(2000, 'La descripción no puede exceder 2000 caracteres'),
  
  pulso: yup
    .string()
    .nullable()
    .max(100, 'El pulso no puede exceder 100 caracteres'),
  
  tllc: yup
    .string()
    .nullable()
    .max(100, 'El TLLC no puede exceder 100 caracteres'),
  
  trpc: yup
    .string()
    .nullable()
    .max(100, 'El TRPC no puede exceder 100 caracteres'),
  
  examenesComplementarios: yup
    .string()
    .nullable()
    .max(2000, 'Los exámenes complementarios no pueden exceder 2000 caracteres'),
  
  listaProblemas: yup
    .string()
    .nullable()
    .max(2000, 'La lista de problemas no puede exceder 2000 caracteres'),
  
  listaMaestra: yup
    .string()
    .nullable()
    .max(2000, 'La lista maestra no puede exceder 2000 caracteres'),
  
  // Evaluación Clínica
  pronostico: yup
    .string()
    .nullable()
    .max(1000, 'El pronóstico no puede exceder 1000 caracteres'),
  
  diagnostico: yup
    .string()
    .required('El diagnóstico es requerido')
    .min(2, 'El diagnóstico debe tener al menos 2 caracteres')
    .max(2000, 'El diagnóstico no puede exceder 2000 caracteres'),
  
  tratamiento: yup
    .string()
    .nullable()
    .max(2000, 'El tratamiento no puede exceder 2000 caracteres'),
  
  observaciones: yup
    .string()
    .nullable()
    .max(500, 'Las observaciones no pueden exceder 500 caracteres')
})

// Esquema para actualizar historia clínica
export const updateMedicalRecordSchema = createMedicalRecordSchema
