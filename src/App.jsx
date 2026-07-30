import useLocalStorage from './hooks/useLocalStorage';
import ApiKeyInput from './components/apikeyinput/ApiKeyInput';
import ChatWindow from './components/chatwindows/ChatWindow';

function App() {
  const [apiKey] = useLocalStorage('apiKey', '');

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-4 bg-cyan-900 mt-10 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-white">IA API (Gemini 3.1 Flash Lite)</h1>
      <ApiKeyInput />
      <ChatWindow apiKey={apiKey} />
    </div>
  );
}

export default App;