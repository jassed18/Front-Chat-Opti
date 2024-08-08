import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ChatWindow from './ChatWindows';
import MessageInput from './MessageInput';
import './ChatApp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    setMessages([...messages, { type: 'text', content: message, sender: 'user' }]);
    try {
      const response = await axios.post('http://localhost:5000/send_message', { message });
      const botMessage = response.data.output.generic[0].text;
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'text', content: botMessage, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSendAudio = (audioBlob) => {
    setMessages([...messages, { type: 'audio', content: URL.createObjectURL(audioBlob), sender: 'user' }]);
  };

  return (
    <div className="chat-app">
      <ChatWindow messages={messages} />
      <div ref={messageEndRef} />
      <MessageInput onSendMessage={handleSendMessage} onSendAudio={handleSendAudio} />
    </div>
  );
};

export default ChatApp;