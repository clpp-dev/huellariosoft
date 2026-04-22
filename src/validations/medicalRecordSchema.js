import * as yup from 'yup'

// Esquema para crear historia clínica
export const createMedicalRecordSchema = yup.object({
  mascota: yup
    .string()
    .required('La mascota es requerida'),
  
  veterinario: yup
    .string()
    .required('El veterinario es requerido'),
  
  fecha: yup
    .date()
    .required('La fecha es requerida')
    .max(new Date(), 'La fecha no puede ser futura'),
  
  peso: yup
    .number()
    .nullable()
    .positive('El peso debe ser positivo')
    .max(500, 'Peso no válido'),
  
  temperatura: yup
    .number()
    .nullable()
    .positive('La temperatura debe ser positiva')
    .min(30, 'Temperatura muy baja')
    .max(45, 'Temperatura muy alta'),
  
  frecuenciaCardiaca: yup
    .number()
    .nullable()
    .positive('La frecuencia cardíaca debe ser positiva')
    .max(300, 'Valor no válido'),
  
  frecuenciaRespiratoria: yup
    .number()
    .nullable()
    .positive('La frecuencia respiratoria debe ser positiva')
    .max(200, 'Valor no válido'),
  
  motivo: yup
    .string()
    .required('El motivo de consulta es requerido')
    .min(5, 'El motivo debe tener al menos 5 caracteres')
    .max(300, 'El motivo no puede exceder 300 caracteres'),
  
  anamnesis: yup
    .string()
    .nullable()
    .max(1000, 'La anamnesis no puede exceder 1000 caracteres'),
  
  diagnostico: yup
    .string()
    .required('El diagnóstico es requerido')
    .min(5, 'El diagnóstico debe tener al menos 5 caracteres')
    .max(500, 'El diagnóstico no puede exceder 500 caracteres'),
  
  tratamiento: yup
    .string()
    .required('El tratamiento es requerido')
    .min(5, 'El tratamiento debe tener al menos 5 caracteres')
    .max(1000, 'El tratamiento no puede exceder 1000 caracteres'),
  
  observaciones: yup
    .string()
    .nullable()
    .max(500, 'Las observaciones no pueden exceder 500 caracteres')
})

// Esquema para actualizar historia clínica
export const updateMedicalRecordSchema = createMedicalRecordSchema
