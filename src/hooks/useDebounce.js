import { useState, useEffect } from 'react';

/**
 * Hook personalizado para aplicar debounce a un valor
 * Útil para retrasar peticiones HTTP mientras el usuario escribe
 * 
 * @param {any} value - Valor a aplicar debounce
 * @param {number} delay - Tiempo de espera en milisegundos (default: 500ms)
 * @returns {any} - Valor con debounce aplicado
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Establecer un timer que actualice el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timeout si el valor cambia antes del delay
    // o si el componente se desmonta
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
