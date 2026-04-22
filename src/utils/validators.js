/**
 * Valida si un email tiene un formato válido
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida si un teléfono colombiano es válido
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} - True si es válido
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^3\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Valida si un documento de identidad es válido (cédula colombiana)
 * @param {string} document - Documento a validar
 * @returns {boolean} - True si es válido
 */
export const isValidDocument = (document) => {
  const documentRegex = /^\d{6,10}$/
  return documentRegex.test(document)
}

/**
 * Valida si una contraseña cumple con los requisitos mínimos
 * @param {string} password - Contraseña a validar
 * @returns {boolean} - True si es válida
 */
export const isValidPassword = (password) => {
  // Mínimo 6 caracteres
  return password && password.length >= 6
}

/**
 * Valida si una URL es válida
 * @param {string} url - URL a validar
 * @returns {boolean} - True si es válida
 */
export const isValidURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
