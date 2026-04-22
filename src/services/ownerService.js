// Servicio para gestión de propietarios
import httpClient from './httpClient'

export const ownerService = {
  /**
   * Obtiene lista paginada de propietarios
   */
  async getAll(params = {}) {
    const response = await httpClient.get('/propietarios', params)
    return response
  },

  /**
   * Obtiene un propietario por ID
   */
  async getById(id) {
    const response = await httpClient.get(`/propietarios/${id}`)
    return response.data
  },

  /**
   * Busca un propietario por documento
   */
  async getByDocument(documento) {
    const response = await httpClient.get(`/propietarios/documento/${documento}`)
    return response.data
  },

  /**
   * Crea un nuevo propietario
   */
  async create(data) {
    const response = await httpClient.post('/propietarios', data)
    return response.data
  },

  /**
   * Actualiza un propietario existente
   */
  async update(id, data) {
    const response = await httpClient.put(`/propietarios/${id}`, data)
    return response.data
  },

  /**
   * Elimina un propietario
   */
  async delete(id) {
    const response = await httpClient.delete(`/propietarios/${id}`)
    return response.data
  },

  /**
   * Busca propietarios por término de búsqueda
   */
  async search(query) {
    const response = await httpClient.get('/propietarios', {
      q: query
    })
    return response.data
  }
}

export default ownerService
