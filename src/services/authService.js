import httpClient from './httpClient'

/**
 * Servicio de autenticación
 */
class AuthService {
  /**
   * Inicia sesión
   * @param {Object} credentials - Email y password
   * @returns {Promise} - Datos del usuario y tokens
   */
  async login(credentials) {
    return httpClient.post('/auth/login', credentials)
  }

  /**
   * Cierra sesión
   * @returns {Promise} - Confirmación de logout
   */
  async logout() {
    return httpClient.post('/auth/logout')
  }

  /**
   * Obtiene el perfil del usuario autenticado
   * @returns {Promise} - Datos del usuario
   */
  async getProfile() {
    return httpClient.get('/auth/profile')
  }

  /**
   * Refresca el token de acceso
   * @param {string} refreshToken - Refresh token
   * @returns {Promise} - Nuevos tokens
   */
  async refreshToken(refreshToken) {
    return httpClient.post('/auth/refresh', { refreshToken })
  }

  /**
   * Solicita recuperación de contraseña
   * @param {string} email - Email del usuario
   * @returns {Promise} - Confirmación
   */
  async forgotPassword(email) {
    return httpClient.post('/auth/forgot-password', { email })
  }

  /**
   * Restablece la contraseña
   * @param {Object} data - Token y nueva contraseña
   * @returns {Promise} - Confirmación
   */
  async resetPassword(data) {
    return httpClient.post('/auth/reset-password', data)
  }

  /**
   * Cambia la contraseña del usuario autenticado
   * @param {Object} data - Contraseña actual y nueva
   * @returns {Promise} - Confirmación
   */
  async changePassword(data) {
    return httpClient.post('/auth/change-password', data)
  }
}

export default new AuthService()
