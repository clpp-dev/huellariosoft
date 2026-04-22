// Servicio para obtener estadísticas del dashboard
import httpClient from './httpClient'

export const dashboardService = {
  /**
   * Obtiene estadísticas generales del dashboard
   */
  async getStats() {
    try {
      const [
        citasHoy,
        mascotas,
        propietarios,
        facturacion,
        stockBajo
      ] = await Promise.all([
        this.getCitasHoy(),
        this.getTotalMascotas(),
        this.getTotalPropietarios(),
        this.getFacturacionMensual(),
        this.getStockBajo()
      ])

      return {
        citasHoy: citasHoy.total || 0,
        totalMascotas: mascotas.total || 0,
        totalPropietarios: propietarios.total || 0,
        facturacionMensual: facturacion.total || 0,
        stockBajo: stockBajo.productos || []
      }
    } catch (error) {
      console.error('Error al obtener estadísticas:', error)
      throw error
    }
  },

  /**
   * Obtiene citas del día actual
   */
  async getCitasHoy() {
    const hoy = new Date().toISOString().split('T')[0]
    const response = await httpClient.get(`/citas/fecha/${hoy}`)
    return {
      total: response.data?.length || 0,
      citas: response.data || []
    }
  },

  /**
   * Obtiene total de mascotas activas
   */
  async getTotalMascotas() {
    const response = await httpClient.get('/mascotas', {
      activo: true,
      limit: 1
    })
    return {
      total: response.pagination?.total || 0
    }
  },

  /**
   * Obtiene total de propietarios activos
   */
  async getTotalPropietarios() {
    const response = await httpClient.get('/propietarios', {
      activo: true,
      limit: 1
    })
    return {
      total: response.pagination?.total || 0
    }
  },

  /**
   * Obtiene facturación del mes actual
   */
  async getFacturacionMensual() {
    const ahora = new Date()
    const primerDia = new Date(ahora.getFullYear(), ahora.getMonth(), 1)
    const ultimoDia = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0)

    const fechaInicio = primerDia.toISOString().split('T')[0]
    const fechaFin = ultimoDia.toISOString().split('T')[0]

    try {
      const response = await httpClient.get('/facturas/estadisticas', {
        fechaInicio,
        fechaFin
      })
      return {
        total: response.data?.totalPagado || 0,
        estadisticas: response.data
      }
    } catch (error) {
      // Si el endpoint no existe o hay error, retornar 0
      return { total: 0 }
    }
  },

  /**
   * Obtiene productos con stock bajo
   */
  async getStockBajo() {
    try {
      const response = await httpClient.get('/inventario/stock-bajo')
      return {
        productos: response.data || []
      }
    } catch (error) {
      return { productos: [] }
    }
  },

  /**
   * Obtiene próximas citas (próximos 7 días)
   */
  async getProximasCitas() {
    try {
      const response = await httpClient.get('/citas', {
        limit: 10,
        page: 1
      })
      return response.data || []
    } catch (error) {
      return []
    }
  }
}

export default dashboardService
