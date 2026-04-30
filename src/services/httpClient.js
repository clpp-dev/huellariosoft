import { API_CONFIG } from '@constants/config'
import tokenService from './tokenService'
import { ERROR_MESSAGES } from '@constants/messages'

/**
 * Cliente HTTP con manejo de autenticación y errores
 */
class HttpClient {
  constructor() {
    this.baseURL = API_CONFIG.baseURL
    this.timeout = API_CONFIG.timeout
    this.isRefreshing = false
    this.failedQueue = []
  }

  /**
   * Procesa la cola de peticiones fallidas
   * @param {Error|null} error - Error si falló el refresh
   * @param {string|null} token - Nuevo token si fue exitoso
   */
  processQueue(error, token = null) {
    this.failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve(token)
      }
    })

    this.failedQueue = []
  }

  /**
   * Realiza una petición HTTP
   * @param {string} endpoint - Endpoint de la API
   * @param {Object} options - Opciones de fetch
   * @returns {Promise} - Respuesta de la API
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const token = tokenService.getAccessToken()
    const isBlob = options.responseType === 'blob'

    // Headers por defecto
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    // Agregar token si existe
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    // Crear AbortController para timeout manual (mejor compatibilidad)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    // Configuración de fetch
    const config = {
      ...options,
      headers,
      signal: controller.signal,
    }

    // Eliminar responseType de config (no es parte de fetch API)
    delete config.responseType

    try {
      const response = await fetch(url, config)

      // Limpiar timeout si la petición fue exitosa
      clearTimeout(timeoutId)

      // Si es 401, intentar refresh del token (excepto en login)
      if (response.status === 401 && !endpoint.includes('/auth/login')) {
        return this.handleUnauthorized(endpoint, config, isBlob)
      }

      // Si es para descargar blob
      if (isBlob) {
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || ERROR_MESSAGES.GENERIC)
        }
        const blob = await response.blob()
        return { data: blob, status: response.status }
      }

      // Parsear respuesta JSON
      const data = await response.json()

      // Si es 403, el usuario no tiene permisos (no cerrar sesión)
      if (response.status === 403) {
        throw new Error(data.message || ERROR_MESSAGES.UNAUTHORIZED)
      }

      // Si la respuesta no es exitosa (status >= 400)
      if (!response.ok) {
        throw new Error(data.message || ERROR_MESSAGES.GENERIC)
      }

      return data
    } catch (error) {
      // Limpiar timeout
      clearTimeout(timeoutId)

      // Error de red o timeout
      if (error.name === 'AbortError') {
        throw new Error('La petición ha tardado demasiado')
      }

      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error(ERROR_MESSAGES.NETWORK)
      }

      throw error
    }
  }

  /**
   * Maneja errores 401 (no autorizado)
   * @param {string} endpoint - Endpoint original
   * @param {Object} config - Configuración original
   * @param {boolean} isBlob - Si la respuesta es un blob
   * @returns {Promise} - Respuesta con nuevo token
   */
  async handleUnauthorized(endpoint, config, isBlob = false) {
    if (this.isRefreshing) {
      // Si ya se está refrescando, agregar a la cola
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject })
      })
        .then(token => {
          config.headers['Authorization'] = `Bearer ${token}`
          return fetch(`${this.baseURL}${endpoint}`, config).then(async res => {
            if (isBlob) {
              const blob = await res.blob()
              return { data: blob, status: res.status }
            }
            return res.json()
          })
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }

    this.isRefreshing = true

    const refreshToken = tokenService.getRefreshToken()

    if (!refreshToken) {
      this.processQueue(new Error(ERROR_MESSAGES.SESSION_EXPIRED), null)
      this.isRefreshing = false
      
      // Limpiar tokens y redirigir a login
      tokenService.clearTokens()
      window.location.href = '/login'
      
      throw new Error(ERROR_MESSAGES.SESSION_EXPIRED)
    }

    try {
      // Intentar refrescar el token
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        throw new Error('No se pudo renovar la sesión')
      }

      const data = await response.json()
      const { accessToken, refreshToken: newRefreshToken } = data.data

      // Guardar nuevos tokens
      tokenService.setTokens(accessToken, newRefreshToken)

      // Procesar cola de peticiones pendientes
      this.processQueue(null, accessToken)

      // Reintentar petición original
      config.headers['Authorization'] = `Bearer ${accessToken}`
      return fetch(`${this.baseURL}${endpoint}`, config).then(async res => {
        if (isBlob) {
          const blob = await res.blob()
          return { data: blob, status: res.status }
        }
        return res.json()
      })
    } catch (error) {
      // Si falla el refresh, cerrar sesión
      this.processQueue(error, null)
      tokenService.clearTokens()
      window.location.href = '/login'
      
      throw new Error(ERROR_MESSAGES.SESSION_EXPIRED)
    } finally {
      this.isRefreshing = false
    }
  }

  /**
   * Petición GET
   * @param {string} endpoint - Endpoint de la API
   * @param {Object} params - Parámetros query
   * @param {Object} options - Opciones adicionales (responseType, etc.)
   * @returns {Promise} - Respuesta de la API
   */
  async get(endpoint, params = {}, options = {}) {
    // Separar responseType de los parámetros de query
    const { responseType, ...queryParams } = params;
    
    // Filtrar parámetros vacíos o undefined
    const filteredParams = Object.entries(queryParams).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value
      }
      return acc
    }, {})
    
    const queryString = new URLSearchParams(filteredParams).toString()
    const url = queryString ? `${endpoint}?${queryString}` : endpoint

    return this.request(url, {
      method: 'GET',
      responseType: responseType || options.responseType,
      ...options
    })
  }

  /**
   * Petición POST
   * @param {string} endpoint - Endpoint de la API
   * @param {Object} data - Datos a enviar
   * @returns {Promise} - Respuesta de la API
   */
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * Petición PUT
   * @param {string} endpoint - Endpoint de la API
   * @param {Object} data - Datos a enviar
   * @returns {Promise} - Respuesta de la API
   */
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  /**
   * Petición PATCH
   * @param {string} endpoint - Endpoint de la API
   * @param {Object} data - Datos a enviar
   * @returns {Promise} - Respuesta de la API
   */
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  /**
   * Petición DELETE
   * @param {string} endpoint - Endpoint de la API
   * @returns {Promise} - Respuesta de la API
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    })
  }

  /**
   * Upload de archivo
   * @param {string} endpoint - Endpoint de la API
   * @param {FormData} formData - Datos del formulario con archivo
   * @returns {Promise} - Respuesta de la API
   */
  async upload(endpoint, formData) {
    const url = `${this.baseURL}${endpoint}`
    const token = tokenService.getAccessToken()

    const headers = {}
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    // Crear AbortController para timeout manual
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
        signal: controller.signal,
      })

      // Limpiar timeout
      clearTimeout(timeoutId)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || ERROR_MESSAGES.GENERIC)
      }

      return data
    } catch (error) {
      // Limpiar timeout
      clearTimeout(timeoutId)

      if (error.name === 'AbortError') {
        throw new Error('La carga ha tardado demasiado')
      }

      throw error
    }
  }
}

export default new HttpClient()
