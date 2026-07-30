const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent';

  // Función que envía un mensaje al modelo de lenguaje usando fetch
export async function sendMessageFetch(messages, apiKey) {
  // Creamos un array de objetos con el formato que espera la API, donde cada mensaje tiene un rol y un contenido
  const contents = messages.map((m) => ({
    // role es 'model' si el mensaje es del asistente, o 'user' si es del usuario
    role: m.role === 'assistant' ? 'model' : 'user',
    // parts es un array de objetos con el texto del mensaje
    parts: [{ text: m.content }],
  }));

  // Hacemos la petición POST a la API con la API Key y el contenido de los mensajes
  const response = await fetch(`${API_URL}?key=${apiKey}`, {
    // method es POST porque estamos enviando datos
    method: 'POST',
    // headers indica que el contenido es JSON, es decir, que estamos enviando un objeto en formato JSON
    headers: { 'Content-Type': 'application/json' },
    // body es el cuerpo de la petición, que contiene los mensajes en formato JSON
    body: JSON.stringify({ contents }),
  });
  // Si la respuesta no es OK, lanzamos un error con el mensaje de error de la API o el código de estado
  if (!response.ok) {
    // Intentamos leer el mensaje de error de la respuesta, pero si falla, devolvemos null
    const errorData = await response.json().catch(() => null);
    // Lanzamos un error con el mensaje de error de la API o el código de estado
    throw new Error(errorData?.error?.message || `Error ${response.status}`);
  }
  // Si la respuesta es OK, leemos el contenido de la respuesta en formato JSON y devolvemos el texto del primer mensaje generado por el modelo
  const data = await response.json();
  // data.candidates es un array de posibles respuestas generadas por el modelo, y tomamos la primera
  return data.candidates[0].content.parts[0].text;
}