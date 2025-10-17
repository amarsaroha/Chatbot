import React from 'react';
import './ChatBox.css';

function ChatBox({ messages }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          <p>{msg.text}</p>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatBox;
