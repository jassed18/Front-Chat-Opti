// MessageList.js
import React from 'react';
import './MessageList.css';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className="message-item">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
