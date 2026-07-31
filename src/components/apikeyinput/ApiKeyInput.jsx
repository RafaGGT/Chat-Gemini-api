import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

// Componente que permite al usuario ingresar y guardar su API Key en localStorage
function ApiKeyInput() {
    // Usamos el hook useLocalStorage para obtener y guardar la API Key
  const [apiKey, setApiKey] = useLocalStorage('apiKey', '');
   // Estado local para manejar el valor del input
  const [inputValue, setInputValue] = useState('');
    // Función que se ejecuta al hacer clic en el botón de guardar
  const handleSave = () => {
    // Si el input está vacío, no hacemos nada
    if (inputValue.trim() === '') {
        return;
    };
    // Guardamos la API Key en localStorage y limpiamos el input
    setApiKey(inputValue.trim());
    // Limpiamos el input después de guardar
    setInputValue('');
  };
  // Función que se ejecuta al hacer clic en el botón de borrar
  const handleClear = () => {
    // Borramos la API Key de localStorage y limpiamos el estado
    setApiKey('');
  };

  return (
    <div className="flex flex-col gap-2 p-4 border bg-blue-900 rounded-lg">
        {/* Si hay una API Key guardada, mostramos un mensaje y un botón para borrarla */}
    {apiKey ? (
        <div className="flex items-center justify-between">
          <span className="text-sm text-white">
            API Key guardada ({apiKey.slice(0, 1)}...{apiKey.slice(-1)})
          </span>
          <button onClick={handleClear} className="text-sm text-white font-bold hover:underline">
            Borrar
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ingresa tu API Key"
            className="flex-1 border px-2 py-1 rounded"
          />
          <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Guardar
          </button>
        </div>
      )}
    </div>
  );
}

export default ApiKeyInput;