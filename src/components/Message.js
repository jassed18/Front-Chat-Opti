import React from 'react';
import './Message.css';

const Message = ({ type, content, sender }) => {
  if (type === 'text') {
    return (
      <div className={`message ${sender}`}>
        <p>{content}</p>
      </div>
    );
  } else if (type === 'audio') {
    return (
      <div className={`message ${sender}`}>
        <audio controls>
          <source src={content} type="audio/webm" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
  return null;
};

export default Message;
