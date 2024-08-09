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
    let sessionId = localStorage.getItem('session_id');

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL, { message, session_id: sessionId });
      const data = response.data;

      if (data.session_id) {
        localStorage.setItem('session_id', data.session_id);
      }

      const botResponses = data.response.output.generic;

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

  const handleSendAudio = async (audioBlob) => {
    setMessages([...messages, { type: 'audio', content: URL.createObjectURL(audioBlob), sender: 'user' }]);
    let sessionId = localStorage.getItem('session_id');

    const formData = new FormData();
    formData.append('file', audioBlob);
    formData.append('session_id', sessionId);

    try {
      const response = await axios.post(process.env.REACT_APP_API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;

      if (data.session_id) {
        localStorage.setItem('session_id', data.session_id);
      }

      const botResponses = data.response.output.generic;

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
      console.error('Error sending audio:', error);
    }
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
