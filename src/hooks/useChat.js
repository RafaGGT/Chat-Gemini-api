import { useState } from 'react';
import { sendMessageFetch } from '../services/fetchClient';
import { sendMessageAxios } from '../services/axiosClient';
import useLocalStorage from './useLocalStorage';

// Custom hook que maneja el estado del chat y la comunicación con la API
function useChat(apiKey, client = 'fetch') {
  const [messages, setMessages] = useLocalStorage('messages', []); // arreglo con la conversación (usuario + asistente)
    const [loading, setLoading] = useState(false); // true mientras se espera respuesta de la API
    const [error, setError] = useState(null); // mensaje de error si la petición falla, null si no hay error
    // Función que envía un mensaje al modelo de lenguaje y actualiza el estado del chat
    // async porque hace una petición a la API que puede tardar
  const sendMessage = async (text) => {
    // Si el texto está vacío o no hay API Key, no hacemos nada
    if (!text.trim() || !apiKey) {
        return;
    }
    // Creamos un objeto con el mensaje del usuario y lo agregamos al arreglo de mensajes
    const userMessage = { role: 'user', content: text };
    // Creamos un nuevo arreglo de mensajes que incluye el mensaje del usuario
    // ... es el operador de propagación que copia los elementos del arreglo messages y agrega userMessage al final
    const updatedMessages = [...messages, userMessage];

    // Actualizamos el estado del chat, ponemos loading en true y borramos cualquier error previo
    setMessages(updatedMessages);
    // Poner loading en true indica que estamos esperando una respuesta de la API
    setLoading(true);
    // Borrar cualquier error previo antes de hacer la nueva petición
    setError(null);

    try {
    // Elegimos la función de envío según el cliente seleccionado (fetch o axios)
      const sendFn = client === 'axios' ? sendMessageAxios : sendMessageFetch;
    // Llamamos a la función de envío con los mensajes actualizados y la API Key, y esperamos la respuesta
      const reply = await sendFn(updatedMessages, apiKey);
    // Agregamos la respuesta del asistente al arreglo de mensajes y actualizamos el estado del chat
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
        // Si hay un error en la petición, lo guardamos en el estado de error para mostrarlo al usuario
      setError(err.message);
    } finally {
        // Cuando termina la petición, ponemos loading en false para indicar que ya no estamos esperando respuesta
      setLoading(false);
    }
  };

  return { 
    // Retornamos el estado del chat y la función para enviar mensajes, para que otros componentes puedan usar este hook 
    messages, sendMessage, loading, error };
}

export default useChat;