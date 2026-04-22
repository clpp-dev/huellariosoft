import * as yup from 'yup'

// Esquema para crear cita
export const createAppointmentSchema = yup.object({
  mascota: yup
    .string()
    .required('La mascota es requerida'),
  
  veterinario: yup
    .string()
    .required('El veterinario es requerido'),
  
  fecha: yup
    .date()
    .required('La fecha es requerida')
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'La fecha no puede ser anterior a hoy'),
  
  hora: yup
    .string()
    .required('La hora es requerida')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)'),
  
  motivo: yup
    .string()
    .required('El motivo de la cita es requerido')
    .min(5, 'El motivo debe tener al menos 5 caracteres')
    .max(200, 'El motivo no puede exceder 200 caracteres'),
  
  observaciones: yup
    .string()
    .nullable()
    .max(500, 'Las observaciones no pueden exceder 500 caracteres')
})

// Esquema para actualizar cita
export const updateAppointmentSchema = yup.object({
  mascota: yup
    .string()
    .required('La mascota es requerida'),
  
  veterinario: yup
    .string()
    .required('El veterinario es requerido'),
  
  fecha: yup
    .date()
    .required('La fecha es requerida'),
  
  hora: yup
    .string()
    .required('La hora es requerida')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)'),
  
  motivo: yup
    .string()
    .required('El motivo de la cita es requerido')
    .min(5, 'El motivo debe tener al menos 5 caracteres')
    .max(200, 'El motivo no puede exceder 200 caracteres'),
  
  observaciones: yup
    .string()
    .nullable()
    .max(500, 'Las observaciones no pueden exceder 500 caracteres')
})
