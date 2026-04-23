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
    .transform((value, originalValue) => {
      // Convertir string vacío a undefined
      if (originalValue === '') return undefined
      // Si viene como string de fecha (YYYY-MM-DD), convertir a Date
      if (typeof originalValue === 'string') {
        return new Date(originalValue + 'T00:00:00')
      }
      return value
    })
    .typeError('Ingresa una fecha válida')
    .required('La fecha es requerida')
    .test('not-past', 'La fecha no puede ser anterior a hoy', function(value) {
      if (!value) return false
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(value)
      selectedDate.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }),
  
  hora: yup
    .string()
    .required('La hora es requerida')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)')
    .test('not-past-time', 'La hora no puede ser anterior a la hora actual', function(value) {
      if (!value) return false
      const { fecha } = this.parent
      
      // Si no hay fecha, no validar la hora
      if (!fecha) return true
      
      const selectedDate = new Date(fecha)
      const today = new Date()
      
      // Comparar solo las fechas (sin hora)
      selectedDate.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)
      
      // Si la fecha no es hoy, la hora es válida
      if (selectedDate.getTime() !== today.getTime()) {
        return true
      }
      
      // Si es hoy, validar que la hora sea mayor o igual a la actual
      const [hours, minutes] = value.split(':').map(Number)
      const now = new Date()
      const selectedTime = hours * 60 + minutes
      const currentTime = now.getHours() * 60 + now.getMinutes()
      
      return selectedTime >= currentTime
    }),
  
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
    .transform((value, originalValue) => {
      // Convertir string vacío a undefined
      if (originalValue === '') return undefined
      // Si viene como string de fecha (YYYY-MM-DD), convertir a Date
      if (typeof originalValue === 'string') {
        return new Date(originalValue + 'T00:00:00')
      }
      return value
    })
    .typeError('Ingresa una fecha válida')
    .required('La fecha es requerida')
    .test('not-past', 'La fecha no puede ser anterior a hoy', function(value) {
      if (!value) return false
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(value)
      selectedDate.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }),
  
  hora: yup
    .string()
    .required('La hora es requerida')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)')
    .test('not-past-time', 'La hora no puede ser anterior a la hora actual', function(value) {
      if (!value) return false
      const { fecha } = this.parent
      
      // Si no hay fecha, no validar la hora
      if (!fecha) return true
      
      const selectedDate = new Date(fecha)
      const today = new Date()
      
      // Comparar solo las fechas (sin hora)
      selectedDate.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)
      
      // Si la fecha no es hoy, la hora es válida
      if (selectedDate.getTime() !== today.getTime()) {
        return true
      }
      
      // Si es hoy, validar que la hora sea mayor o igual a la actual
      const [hours, minutes] = value.split(':').map(Number)
      const now = new Date()
      const selectedTime = hours * 60 + minutes
      const currentTime = now.getHours() * 60 + now.getMinutes()
      
      return selectedTime >= currentTime
    }),
  
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
