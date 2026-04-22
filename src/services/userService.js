// Servicio para gestión de usuarios
import httpClient from './httpClient'

export const userService = {
  /**
   * Obtiene lista paginada de usuarios
   */
  async getAll(params = {}) {
    const response = await httpClient.get('/users', params)
    return response
  },

  /**
   * Obtiene un usuario por ID
   */
  async getById(id) {
    const response = await httpClient.get(`/users/${id}`)
    return response.data
  },

  /**
   * Crea un nuevo usuario
   */
  async create(data) {
    const response = await httpClient.post('/users', data)
    return response.data
  },

  /**
   * Actualiza un usuario existente
   */
  async update(id, data) {
    const response = await httpClient.put(`/users/${id}`, data)
    return response.data
  },

  /**
   * Elimina un usuario
   */
  async delete(id) {
    const response = await httpClient.delete(`/users/${id}`)
    return response.data
  },

  /**
   * Cambia el estado activo/inactivo de un usuario
   */
  async toggleStatus(id) {
    const response = await httpClient.patch(`/users/${id}/toggle-status`)
    return response.data
  }
}

export default userService
