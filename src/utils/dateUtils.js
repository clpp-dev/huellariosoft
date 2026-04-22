import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns'
import { es } from 'date-fns/locale'

/**
 * Formatea una fecha en formato legible
 * @param {string|Date} date - Fecha a formatear
 * @param {string} formatString - Formato deseado (default: 'dd/MM/yyyy')
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date, formatString = 'dd/MM/yyyy') => {
  if (!date) return '-'
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    
    if (!isValid(dateObj)) return '-'
    
    return format(dateObj, formatString, { locale: es })
  } catch (error) {
    console.error('Error formateando fecha:', error)
    return '-'
  }
}

/**
 * Formatea una fecha y hora
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha y hora formateada
 */
export const formatDateTime = (date) => {
  return formatDate(date, 'dd/MM/yyyy HH:mm')
}

/**
 * Formatea solo la hora
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Hora formateada
 */
export const formatTime = (date) => {
  return formatDate(date, 'HH:mm')
}

/**
 * Formatea una fecha en formato relativo (hace X tiempo)
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha relativa
 */
export const formatRelativeTime = (date) => {
  if (!date) return '-'
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    
    if (!isValid(dateObj)) return '-'
    
    return formatDistanceToNow(dateObj, { 
      addSuffix: true,
      locale: es 
    })
  } catch (error) {
    console.error('Error formateando fecha relativa:', error)
    return '-'
  }
}

/**
 * Formatea una fecha para inputs de tipo date
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha en formato YYYY-MM-DD
 */
export const formatDateForInput = (date) => {
  return formatDate(date, 'yyyy-MM-dd')
}

/**
 * Formatea una fecha y hora para inputs de tipo datetime-local
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha en formato YYYY-MM-DDTHH:mm
 */
export const formatDateTimeForInput = (date) => {
  return formatDate(date, "yyyy-MM-dd'T'HH:mm")
}
