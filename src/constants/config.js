// Configuración de la aplicación
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'HuellarioSoft',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: import.meta.env.VITE_ENV || 'development',
}

// Configuración de la API
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000, // 30 segundos
}

// Configuración de tokens
export const TOKEN_CONFIG = {
  accessTokenKey: import.meta.env.VITE_TOKEN_COOKIE_NAME || 'huellario_token',
  refreshTokenKey: import.meta.env.VITE_REFRESH_TOKEN_COOKIE_NAME || 'huellario_refresh_token',
  cookieOptions: {
    path: '/',
    secure: import.meta.env.VITE_ENV === 'production',
    sameSite: 'strict',
  },
}
