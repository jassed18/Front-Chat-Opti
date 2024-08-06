import React, { useState } from 'react';
import ChatWindow from './ChatWindows';
import MessageInput from './MessageInput';
import './ChatApp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { type: 'text', content: message, sender: 'user' }]);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'text', content: `Echo: ${message}`, sender: 'bot' },
      ]);
    }, 1000);
  };

  const handleSendAudio = (audioBlob) => {
    setMessages([...messages, { type: 'audio', content: URL.createObjectURL(audioBlob), sender: 'user' }]);
  };

  return (
    <div className="chat-app">
      <ChatWindow messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} onSendAudio={handleSendAudio} />
    </div>
  );
};

export default ChatApp;
