# Chatia

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.19-5A29E4?logo=axios&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini_API-Google-4285F4?logo=googlegemini&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white)
![License](https://img.shields.io/badge/license-educational-lightgrey)

Clon de interfaz tipo ChatGPT hecho con React, creado como proyecto de práctica para repasar **hooks**, **fetch**, **axios** y **caché con localStorage**. Se conecta a la API de **Google Gemini**.

## Características

- Chat conversacional con historial persistente (se guarda en `localStorage`, sobrevive a recargas de página).
- Ingreso y caché de la API Key de Gemini, sin tener que reingresarla en cada sesión.
- Doble implementación de las llamadas a la API: una con `fetch` y otra con `axios`, para comparar ambas sintaxis. **Esta duplicidad es solo con fines educativos** — en un proyecto real se elige un solo cliente HTTP, no ambos.
- Hook personalizado `useLocalStorage` para sincronizar estado de React con `localStorage`.
- Estilos con Tailwind CSS.

## Stack

- React 19 + Vite
- Tailwind CSS 4
- Axios
- API de Google Gemini (`gemini-3.1-flash-lite`)
- ESLint

## Requisitos previos

- Node.js instalado
- Una API Key de Gemini, obtenida gratis en [Google AI Studio](https://aistudio.google.com/apikey)

## Instalación

```bash
npm install
```

## Uso

```bash
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`). Ingresa tu API Key de Gemini en el campo correspondiente — quedará guardada en el navegador para las próximas veces que abras la app.

## Estructura del proyecto

```
src/
├── components/
│   ├── apikeyinput/    # Input y caché de la API Key
│   ├── chatwindows/    # Contenedor principal del chat
│   ├── mensajelist/    # Lista de mensajes de la conversación
│   └── mensajeinput/   # Input para escribir y enviar mensajes
├── hooks/
│   ├── useLocalStorage.js  # Hook genérico para sincronizar estado con localStorage
│   └── useChat.js          # Hook que maneja el estado del chat y las llamadas a la API
├── services/
│   ├── fetchClient.js   # Llamada a la API de Gemini usando fetch
│   └── axiosClient.js   # Llamada a la API de Gemini usando axios
├── App.jsx
└── main.jsx
```

## Notas

- Por defecto, `ChatWindow` usa el cliente `fetch` (`useChat(apiKey, 'fetch')`). Puedes cambiarlo a `'axios'` para probar la otra implementación.
- Si la API devuelve un error de modelo no disponible, revisa qué modelos de Gemini están vigentes para tu cuenta y actualiza `API_URL` en `fetchClient.js` y `axiosClient.js`.

## Scripts disponibles

- `npm run dev` — modo desarrollo
- `npm run build` — build de producción
- `npm run lint` — corre ESLint
- `npm run preview` — previsualiza el build de producción
