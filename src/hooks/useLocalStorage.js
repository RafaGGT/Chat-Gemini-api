import { useState, useEffect } from 'react';

// Funcion que recibe una clave y un valor inicial, y devuelve un estado 
// que se sincroniza con localStorage
function useLocalStorage(key, initialValue) {
  // UseState que intenta leer el valor de localStorage, o usa el valor inicial si no existe
  const [value, setValue] = useState(() => {
    // Intentamos leer el valor de localStorage
    try {
      // Variable que almacena el valor de localStorage usando getItem con la clave proporcionada
      const stored = localStorage.getItem(key);
      // Retornamos el valor parseado si existe, o el valor inicial si no
      // ? para verificar si stored es distinto de null, si es así parseamos el valor
      // JSON.parse(stored) sirve para convertir el string almacenado en localStorage de nuevo a su tipo original (objeto, array, etc.)
      // : para retornar el valor inicial
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      // Si hay un error al leer localStorage, mostramos un mensaje de error y retornamos el valor inicial
      console.error('Error leyendo localStorage:', error);
      return initialValue;
    }
  });
  // UseEffect que se ejecuta cada vez que la clave o el valor cambian
  useEffect(() => {
    try {
      // Guardamos el valor en localStorage usando setItem con la clave y el valor parseado a string
      // JSON.stringify(value) sirve para convertir el valor a un string antes de almacenarlo en localStorage
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Si hay un error al guardar en localStorage, mostramos un mensaje de error
      console.error('Error guardando en localStorage:', error);
    }
    // Dependencias del useEffect: key y value, para que se ejecute cada vez que cambien
  }, [key, value]);
// Retornamos el valor y la función para actualizarlo
  return [value, setValue];
}

export default useLocalStorage;