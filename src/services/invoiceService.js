// Servicio para gestión de facturas
import httpClient from './httpClient'

export const invoiceService = {
  /**
   * Obtiene lista paginada de facturas
   */
  async getAll(params = {}) {
    const response = await httpClient.get('/facturas', params)
    return response
  },

  /**
   * Obtiene una factura por ID
   */
  async getById(id) {
    const response = await httpClient.get(`/facturas/${id}`)
    return response.data
  },

  /**
   * Obtiene estadísticas de facturación
   */
  async getStats(fechaInicio, fechaFin) {
    const response = await httpClient.get('/facturas/estadisticas', {
      fechaInicio,
      fechaFin
    })
    return response.data
  },

  /**
   * Crea una nueva factura
   */
  async create(data) {
    const response = await httpClient.post('/facturas', data)
    return response.data
  },

  /**
   * Actualiza una factura existente
   */
  async update(id, data) {
    const response = await httpClient.put(`/facturas/${id}`, data)
    return response.data
  },

  /**
   * Marca una factura como pagada
   */
  async markAsPaid(id, metodoPago) {
    const response = await httpClient.patch(`/facturas/${id}/pagar`, { metodoPago })
    return response.data
  },

  /**
   * Anula una factura
   */
  async cancel(id, motivo) {
    const response = await httpClient.patch(`/facturas/${id}/anular`, { motivo })
    return response.data
  },

  /**
   * Elimina una factura
   */
  async delete(id) {
    const response = await httpClient.delete(`/facturas/${id}`)
    return response.data
  },

  /**
   * Genera PDF de una factura
   */
  async generatePDF(id) {
    const response = await httpClient.get(`/facturas/${id}/pdf`, {
      responseType: 'blob'
    })
    return response
  }
}

export default invoiceService
