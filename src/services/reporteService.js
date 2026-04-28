// Servicio de reportes
import httpClient from './httpClient'

const API_URL = '/reportes'

export const reporteService = {
  /**
   * Genera y descarga reporte PDF de facturación
   */
  async generarReporteFacturacion(fechaInicio, fechaFin) {
    try {
      const params = { responseType: 'blob' }
      if (fechaInicio) params.fechaInicio = fechaInicio
      if (fechaFin) params.fechaFin = fechaFin

      const response = await httpClient.get(`${API_URL}/facturacion/pdf`, params)

      // Crear un blob y descargar el PDF
      const blob = response.data || response
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `reporte-facturacion-${fechaInicio || 'ultimo-mes'}-${fechaFin || 'hoy'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      return true
    } catch (error) {
      console.error('Error al generar reporte de facturación:', error)
      throw error
    }
  },

  /**
   * Genera y descarga reporte PDF de citas
   */
  async generarReporteCitas(fechaInicio, fechaFin) {
    try {
      const params = { responseType: 'blob' }
      if (fechaInicio) params.fechaInicio = fechaInicio
      if (fechaFin) params.fechaFin = fechaFin

      const response = await httpClient.get(`${API_URL}/citas/pdf`, params)

      // Crear un blob y descargar el PDF
      const blob = response.data || response
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `reporte-citas-${fechaInicio || 'ultimo-mes'}-${fechaFin || 'hoy'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      return true
    } catch (error) {
      console.error('Error al generar reporte de citas:', error)
      throw error
    }
  },

  /**
   * Genera y descarga reporte PDF de mascotas registradas
   */
  async generarReporteMascotas(fechaInicio, fechaFin) {
    try {
      const params = { responseType: 'blob' }
      if (fechaInicio) params.fechaInicio = fechaInicio
      if (fechaFin) params.fechaFin = fechaFin

      const response = await httpClient.get(`${API_URL}/mascotas/pdf`, params)

      // Crear un blob y descargar el PDF
      const blob = response.data || response
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `reporte-mascotas-${fechaInicio || 'ultimo-mes'}-${fechaFin || 'hoy'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      return true
    } catch (error) {
      console.error('Error al generar reporte de mascotas:', error)
      throw error
    }
  },

  /**
   * Obtiene vista previa de estadísticas de facturación
   */
  async getPreviewFacturacion(fechaInicio, fechaFin) {
    try {
      const params = {}
      if (fechaInicio) params.fechaInicio = fechaInicio
      if (fechaFin) params.fechaFin = fechaFin

      const response = await httpClient.get(`${API_URL}/facturacion/preview`, params)
      return response.data
    } catch (error) {
      console.error('Error al obtener preview de facturación:', error)
      throw error
    }
  },

  /**
   * Obtiene vista previa de estadísticas de citas
   */
  async getPreviewCitas(fechaInicio, fechaFin) {
    try {
      const params = {}
      if (fechaInicio) params.fechaInicio = fechaInicio
      if (fechaFin) params.fechaFin = fechaFin

      const response = await httpClient.get(`${API_URL}/citas/preview`, params)
      return response.data
    } catch (error) {
      console.error('Error al obtener preview de citas:', error)
      throw error
    }
  },

  /**
   * Obtiene vista previa de estadísticas de mascotas
   */
  async getPreviewMascotas(fechaInicio, fechaFin) {
    try {
      const params = {}
      if (fechaInicio) params.fechaInicio = fechaInicio
      if (fechaFin) params.fechaFin = fechaFin

      const response = await httpClient.get(`${API_URL}/mascotas/preview`, params)
      return response.data
    } catch (error) {
      console.error('Error al obtener preview de mascotas:', error)
      throw error
    }
  }
}

export default reporteService
