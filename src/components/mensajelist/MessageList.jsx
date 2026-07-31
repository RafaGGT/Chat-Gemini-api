function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-slate-300 rounded-t-lg">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`max-w-[75%] px-3 py-2 rounded-lg ${
            msg.role === 'user'
              ? 'self-end bg-blue-500 text-white'
              : 'self-start bg-gray-200 text-gray-800'
          }`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}

export default MessageList;