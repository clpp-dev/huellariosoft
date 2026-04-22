// Servicio para gestión de inventario
import httpClient from './httpClient'

export const inventoryService = {
  /**
   * Obtiene lista paginada de productos
   */
  async getAll(params = {}) {
    const response = await httpClient.get('/inventario', params)
    return response
  },

  /**
   * Obtiene un producto por ID
   */
  async getById(id) {
    const response = await httpClient.get(`/inventario/${id}`)
    return response.data
  },

  /**
   * Obtiene productos con stock bajo
   */
  async getLowStock() {
    const response = await httpClient.get('/inventario/stock-bajo')
    return response.data
  },

  /**
   * Crea un nuevo producto
   */
  async create(data) {
    const response = await httpClient.post('/inventario', data)
    return response.data
  },

  /**
   * Actualiza un producto existente
   */
  async update(id, data) {
    const response = await httpClient.put(`/inventario/${id}`, data)
    return response.data
  },

  /**
   * Actualiza la cantidad de un producto (entrada/salida)
   */
  async updateQuantity(id, cantidad, tipo) {
    const response = await httpClient.patch(`/inventario/${id}/cantidad`, {
      cantidad,
      tipo
    })
    return response.data
  },

  /**
   * Elimina un producto
   */
  async delete(id) {
    const response = await httpClient.delete(`/inventario/${id}`)
    return response.data
  },

  /**
   * Busca productos por término de búsqueda
   */
  async search(query) {
    const response = await httpClient.get('/inventario', {
      q: query
    })
    return response.data
  }
}

export default inventoryService
