import React from 'react';
import Message from './Message';
import './ChatWindow.css';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <Message key={index} type={msg.type} content={msg.content} sender={msg.sender} />
      ))}
    </div>
  );
};

export default ChatWindow;
