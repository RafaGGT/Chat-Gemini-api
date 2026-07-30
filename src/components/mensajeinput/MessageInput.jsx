import { useState } from 'react';

function MessageInput({ onSend, disabled }) {
    // Estado local para el texto del mensaje
    const [text, setText] = useState('');
    // 
  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };
  // Función que maneja el evento de presionar una tecla en el input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <div className="flex gap-2 p-4 border-t bg-blue-900">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Escribe tu mensaje..."
        className="flex-1 border px-3 py-2 rounded bg-white disabled:bg-gray-100"
      />
      <button
        onClick={handleSubmit}
        disabled={disabled}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        Enviar
      </button>
    </div>
  );
}

export default MessageInput;