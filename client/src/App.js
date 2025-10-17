import React, { useState } from 'react';
import axios from 'axios';
import './styles/App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      try {
        const response = await axios.post(
          process.env.BACKEND_URL || 'http://localhost:5001/api/chat',
          { message: input }
        );
        const aiMessage = { text: response.data.message, sender: 'ai' };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error:', error);
        setMessages((prev) => [
          ...prev,
          { text: 'Error: could not connect to server.', sender: 'ai' },
        ]);
      }
    }
  };

  return (
    <div className="App">
      <h1>AI Assistant - Customer Service by Amar Saroha</h1>

      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
