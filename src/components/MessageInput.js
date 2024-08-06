import React, { useState } from 'react';
import './MessageInput.css';
import { FaMicrophone, FaPaperPlane } from 'react-icons/fa'; // Importamos los iconos necesarios

const MessageInput = ({ onSendMessage, onSendAudio }) => {
  const [message, setMessage] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleAudio = () => {
    if (isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (e) => {
            onSendAudio(e.data);
          };
          recorder.start();
          setMediaRecorder(recorder);
          setIsRecording(true);
        })
        .catch((err) => console.error('Error accessing audio stream', err));
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit" className="send-button">
        <FaPaperPlane className="send-icon" />
      </button>
      <button type="button" onClick={handleAudio} className="audio-button">
        <FaMicrophone className="microphone-icon" />
      </button>
    </form>
  );
};

export default MessageInput;
