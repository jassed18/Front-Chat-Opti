import React from 'react';
import axios from 'axios';
import './Message.css';

const Message = ({ type, content, sender, options, onOptionClick }) => {
  const handleOptionClick = async (optionText) => {
    if (onOptionClick) {
      onOptionClick(optionText);
    }
    try {
    let sessionId = localStorage.getItem('session_id');

      await axios.post(process.env.REACT_APP_API_URL, { message: optionText,session_id: sessionId });
      
    } catch (error) {
      console.error('Error sending option:', error);
    }
  };

  if (type === 'text') {
    return (
      <div className={`message ${sender}`}>
        <p className="message-content">{content}</p>
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
  } else if (type === 'option' && options) {
    return (
      <div className={`message ${sender}`}>
        {options.map((option, index) => (
          <button key={index} className="message-button" onClick={() => handleOptionClick(option.label)}>
            {option.label}
          </button>
        ))}
      </div>
    );
  }
  return null;
};

export default Message;