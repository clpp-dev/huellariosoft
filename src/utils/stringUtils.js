/**
 * Capitaliza la primera letra de un string
 * @param {string} str - String a capitalizar
 * @returns {string} - String capitalizado
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} str - String a capitalizar
 * @returns {string} - String con cada palabra capitalizada
 */
export const capitalizeWords = (str) => {
  if (!str) return ''
  return str
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

/**
 * Trunca un string a una longitud máxima
 * @param {string} str - String a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - String truncado
 */
export const truncate = (str, maxLength = 50) => {
  if (!str) return ''
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}...`
}

/**
 * Genera un slug a partir de un string
 * @param {string} str - String a convertir
 * @returns {string} - Slug generado
 */
export const slugify = (str) => {
  if (!str) return ''
  
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Formatea un número de teléfono colombiano
 * @param {string} phone - Teléfono a formatear
 * @returns {string} - Teléfono formateado
 */
export const formatPhone = (phone) => {
  if (!phone) return ''
  
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  }
  
  return phone
}

/**
 * Formatea un documento de identidad
 * @param {string} document - Documento a formatear
 * @returns {string} - Documento formateado
 */
export const formatDocument = (document) => {
  if (!document) return ''
  
  const cleaned = document.replace(/\D/g, '')
  
  return new Intl.NumberFormat('es-CO').format(cleaned)
}

/**
 * Extrae las iniciales de un nombre
 * @param {string} name - Nombre completo
 * @returns {string} - Iniciales
 */
export const getInitials = (name) => {
  if (!name) return ''
  
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

/**
 * Limpia y normaliza un string
 * @param {string} str - String a limpiar
 * @returns {string} - String limpio
 */
export const cleanString = (str) => {
  if (!str) return ''
  
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .normalize('NFC')
}
