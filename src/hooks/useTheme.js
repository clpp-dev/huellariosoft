import { useEffect, useState } from 'react'

/**
 * Hook para manejar el tema de la aplicación (claro/oscuro)
 * Utiliza localStorage para persistir la preferencia del usuario
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Intentar obtener tema guardado
    const savedTheme = localStorage.getItem('theme')
    
    // Si no hay tema guardado, usar preferencia del sistema
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    
    return savedTheme
  })

  useEffect(() => {
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Guardar preferencia
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme, isDark: theme === 'dark' }
}
