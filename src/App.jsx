import useLocalStorage from './hooks/useLocalStorage';
import ApiKeyInput from './components/apikeyinput/ApiKeyInput';
import ChatWindow from './components/chatwindows/ChatWindow';
import Snowfall from 'react-snowfall';

function App() {
  const [apiKey] = useLocalStorage('apiKey', '');

  return (
    <>
      <Snowfall
        snowflakeCount={500}
        color="white"
        style={{ position: 'fixed', width: '100%', height: '100%', zIndex: -1 }}
      />
<Snowfall
        snowflakeCount={500}
        color="#c8bfbf"
        style={{ position: 'fixed', width: '100%', height: '100%', zIndex: -1 }}
      />
      <div className="max-w-2xl mx-auto p-6 flex flex-col gap-4 bg-gradient-to-tl from-cyan-900 via-cyan-800 to-blue-950 mt-10 rounded-lg shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-white">IA API (Gemini 3.1 Flash Lite)</h1>
        <ApiKeyInput />
        <ChatWindow apiKey={apiKey} />
      </div>
    </>
  );
}

export default App;