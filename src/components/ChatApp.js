import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MessageInput from './MessageInput';
import Message from './Message';
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
      const response = await axios.post('https://python-web.1jgnu1o1v8pl.us-south.codeengine.appdomain.cloud/send_message', { message });
      const botResponses = response.data.output.generic;

      botResponses.forEach((botResponse) => {
        if (botResponse.response_type === 'text') {
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'text', content: botResponse.text, sender: 'bot' },
          ]);
        } else if (botResponse.response_type === 'option') {
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'option', options: botResponse.options, sender: 'bot' },
          ]);
        }
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSendAudio = (audioBlob) => {
    setMessages([...messages, { type: 'audio', content: URL.createObjectURL(audioBlob), sender: 'user' }]);
  };

  const handleOptionClick = (optionText) => {
    handleSendMessage(optionText);
  };

  return (
    <div className="chat-app">
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} {...message} onOptionClick={handleOptionClick} />
        ))}
        <div ref={messageEndRef} />
      </div>
      <MessageInput onSendMessage={handleSendMessage} onSendAudio={handleSendAudio} />
    </div>
  );
};

export default ChatApp;