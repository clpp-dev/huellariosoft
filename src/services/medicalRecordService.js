// Servicio para gestión de historias clínicas
import httpClient from './httpClient'

export const medicalRecordService = {
  /**
   * Obtiene lista paginada de historias clínicas
   */
  async getAll(params = {}) {
    const response = await httpClient.get('/historias-clinicas', params)
    return response
  },

  /**
   * Obtiene una historia clínica por ID
   */
  async getById(id) {
    const response = await httpClient.get(`/historias-clinicas/${id}`)
    return response.data
  },

  /**
   * Obtiene historias clínicas de una mascota específica
   */
  async getByPet(mascotaId) {
    const response = await httpClient.get(`/historias-clinicas/mascota/${mascotaId}`)
    return response.data
  },

  /**
   * Crea una nueva historia clínica
   */
  async create(data) {
    const response = await httpClient.post('/historias-clinicas', data)
    return response.data
  },

  /**
   * Actualiza una historia clínica existente
   */
  async update(id, data) {
    const response = await httpClient.put(`/historias-clinicas/${id}`, data)
    return response.data
  },

  /**
   * Elimina una historia clínica
   */
  async delete(id) {
    const response = await httpClient.delete(`/historias-clinicas/${id}`)
    return response.data
  },

  /**
   * Sube un archivo adjunto a una historia clínica
   */
  async uploadAttachment(id, file) {
    const formData = new FormData()
    formData.append('archivo', file)
    const response = await httpClient.upload(`/historias-clinicas/${id}/adjunto`, formData)
    return response.data
  }
}

export default medicalRecordService
