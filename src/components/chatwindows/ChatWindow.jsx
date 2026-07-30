import useChat from '../../hooks/useChat';
import MessageList from "../mensajelist/MessageList.jsx";
import MessageInput from "../mensajeinput/MessageInput.jsx";

function ChatWindow({ apiKey }) {
    // Usamos el hook useChat para manejar el estado del chat y la comunicación con la API
  const { messages, sendMessage, loading, error } = useChat(apiKey, 'fetch');

  return (
    <div className="flex flex-col h-[500px] border rounded-lg">
      <MessageList messages={messages} />
      {loading && <p className="px-4 text-sm text-gray-500">Escribiendo...</p>}
      {error && <p className="px-4 text-sm text-red-500">{error}</p>}
      <MessageInput onSend={sendMessage} disabled={loading || !apiKey} />
    </div>
  );    
}

export default ChatWindow;