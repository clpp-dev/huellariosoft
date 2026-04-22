import Cookies from 'js-cookie'
import { TOKEN_CONFIG } from '@constants/config'

/**
 * Servicio para manejo de tokens en cookies
 */
class TokenService {
  /**
   * Guarda el access token
   * @param {string} token - Token a guardar
   */
  setAccessToken(token) {
    Cookies.set(TOKEN_CONFIG.accessTokenKey, token, {
      ...TOKEN_CONFIG.cookieOptions,
      expires: 1, // 1 día
    })
  }

  /**
   * Obtiene el access token
   * @returns {string|null} - Token o null
   */
  getAccessToken() {
    return Cookies.get(TOKEN_CONFIG.accessTokenKey) || null
  }

  /**
   * Guarda el refresh token
   * @param {string} token - Token a guardar
   */
  setRefreshToken(token) {
    Cookies.set(TOKEN_CONFIG.refreshTokenKey, token, {
      ...TOKEN_CONFIG.cookieOptions,
      expires: 7, // 7 días
    })
  }

  /**
   * Obtiene el refresh token
   * @returns {string|null} - Token o null
   */
  getRefreshToken() {
    return Cookies.get(TOKEN_CONFIG.refreshTokenKey) || null
  }

  /**
   * Guarda ambos tokens
   * @param {string} accessToken - Access token
   * @param {string} refreshToken - Refresh token
   */
  setTokens(accessToken, refreshToken) {
    this.setAccessToken(accessToken)
    this.setRefreshToken(refreshToken)
  }

  /**
   * Elimina todos los tokens
   */
  clearTokens() {
    Cookies.remove(TOKEN_CONFIG.accessTokenKey, { path: '/' })
    Cookies.remove(TOKEN_CONFIG.refreshTokenKey, { path: '/' })
  }

  /**
   * Verifica si hay un token de acceso
   * @returns {boolean} - True si existe token
   */
  hasAccessToken() {
    return !!this.getAccessToken()
  }

  /**
   * Verifica si hay un refresh token
   * @returns {boolean} - True si existe refresh token
   */
  hasRefreshToken() {
    return !!this.getRefreshToken()
  }
}

export default new TokenService()
