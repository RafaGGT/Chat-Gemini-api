import axios from 'axios';

// URL de la API de Google Gemini 3.1 Flash Lite
const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent';
// Función que envía un mensaje al modelo de lenguaje usando axios
  export async function sendMessageAxios(messages, apiKey) {
    // Creamos un array de objetos con el formato que espera la API, donde cada mensaje tiene un rol y un contenido
  const contents = messages.map((m) => ({
    // role es 'model' si el mensaje es del asistente, o 'user' si es del usuario
    role: m.role === 'assistant' ? 'model' : 'user',
    // parts es un array de objetos con el texto del mensaje
    parts: [{ text: m.content }],
  }));
// Hacemos la petición POST a la API con la API Key y el contenido de los mensajes
  try {
    // axios.post recibe tres argumentos: la URL, el cuerpo de la petición y las opciones (headers)
    const response = await axios.post(
      `${API_URL}?key=${apiKey}`,
      { contents },
      { headers: { 'Content-Type': 'application/json' } }
    );
    // Si la respuesta es OK, devolvemos el texto del primer mensaje generado por el modelo
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    // Si hay un error en la petición, lanzamos un error con el mensaje de error de la API o el mensaje del error de axios
    const message = error.response?.data?.error?.message || error.message;
    throw new Error(message);
  }
}