// Servicio para gestión de citas
import httpClient from './httpClient'

export const appointmentService = {
  /**
   * Obtiene lista paginada de citas
   */
  async getAll(params = {}) {
    const response = await httpClient.get('/citas', params)
    return response
  },

  /**
   * Obtiene una cita por ID
   */
  async getById(id) {
    const response = await httpClient.get(`/citas/${id}`)
    return response.data
  },

  /**
   * Obtiene citas de una fecha específica
   */
  async getByDate(fecha) {
    const response = await httpClient.get(`/citas/fecha/${fecha}`)
    return response.data
  },

  /**
   * Obtiene citas de un veterinario específico
   */
  async getByVeterinarian(veterinarioId, params = {}) {
    const response = await httpClient.get(`/citas/veterinario/${veterinarioId}`, params)
    return response.data
  },

  /**
   * Obtiene citas de una mascota específica
   */
  async getByPet(mascotaId, params = {}) {
    const response = await httpClient.get(`/citas/mascota/${mascotaId}`, params)
    return response.data
  },

  /**
   * Crea una nueva cita
   */
  async create(data) {
    const response = await httpClient.post('/citas', data)
    return response.data
  },

  /**
   * Actualiza una cita existente
   */
  async update(id, data) {
    const response = await httpClient.put(`/citas/${id}`, data)
    return response.data
  },

  /**
   * Cambia el estado de una cita
   */
  async updateStatus(id, estado) {
    const response = await httpClient.patch(`/citas/${id}/estado`, { estado })
    return response.data
  },

  /**
   * Cancela una cita
   */
  async cancel(id, motivo) {
    const response = await httpClient.patch(`/citas/${id}/cancelar`, { motivo })
    return response.data
  },

  /**
   * Elimina una cita
   */
  async delete(id) {
    const response = await httpClient.delete(`/citas/${id}`)
    return response.data
  }
}

export default appointmentService
