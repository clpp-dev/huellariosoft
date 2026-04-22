// Servicio para gestión de mascotas
import httpClient from './httpClient'

export const petService = {
  /**
   * Obtiene lista paginada de mascotas
   */
  async getAll(params = {}) {
    const response = await httpClient.get('/mascotas', params)
    return response
  },

  /**
   * Obtiene una mascota por ID
   */
  async getById(id) {
    const response = await httpClient.get(`/mascotas/${id}`)
    return response.data
  },

  /**
   * Obtiene mascotas de un propietario específico
   */
  async getByOwner(propietarioId) {
    const response = await httpClient.get(`/mascotas/propietario/${propietarioId}`)
    return response.data
  },

  /**
   * Crea una nueva mascota
   */
  async create(data) {
    const response = await httpClient.post('/mascotas', data)
    return response.data
  },

  /**
   * Actualiza una mascota existente
   */
  async update(id, data) {
    const response = await httpClient.put(`/mascotas/${id}`, data)
    return response.data
  },

  /**
   * Elimina una mascota
   */
  async delete(id) {
    const response = await httpClient.delete(`/mascotas/${id}`)
    return response.data
  },

  /**
   * Sube la imagen de una mascota
   */
  async uploadImage(id, file) {
    const formData = new FormData()
    formData.append('imagen', file)
    const response = await httpClient.upload(`/mascotas/${id}/imagen`, formData)
    return response.data
  },

  /**
   * Busca mascotas por término de búsqueda
   */
  async search(query) {
    const response = await httpClient.get('/mascotas', {
      q: query
    })
    return response.data
  }
}

export default petService
