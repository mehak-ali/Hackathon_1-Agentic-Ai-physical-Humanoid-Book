import React, { useState, useEffect } from 'react';
import styles from './Chatbot.module.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize session ID or load from local storage
  useEffect(() => {
    let storedSessionId = localStorage.getItem('chatbotSessionId');
    if (!storedSessionId) {
      storedSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatbotSessionId', storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  // Load chat history for the session
  useEffect(() => {
    if (sessionId && isOpen) {
      fetchChatHistory(sessionId);
    }
  }, [sessionId, isOpen]);

  const fetchChatHistory = async (sId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/chat/history/${sId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.history.map(msg => ({
          text: msg.message,
          isUser: msg.is_from_user,
          timestamp: msg.timestamp
        })));
      } else {
        console.error('Failed to fetch chat history');
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const sendMessage = async (messageText, selectedText = null) => {
    if (!messageText.trim() || isLoading) return;

    const newMessage = { text: messageText, isUser: true, timestamp: new Date().toISOString() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          query: messageText,
          selected_text: selectedText,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, isUser: false, timestamp: new Date().toISOString() },
        ]);
      } else {
        console.error('Failed to send message:', response.statusText);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error: Could not get a response from the bot.', isUser: false, timestamp: new Date().toISOString() },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error: Could not connect to the bot service.', isUser: false, timestamp: new Date().toISOString() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(input);
    }
  };

  const handleAskSelectedText = () => {
    const selection = window.getSelection().toString().trim();
    if (selection) {
      const question = prompt("Ask a question about the selected text:", selection);
      if (question) {
        sendMessage(question, selection);
      }
    } else {
      alert("Please select some text on the page first.");
    }
  };

  return (
    <>
      <button className={styles.chatButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>

      {isOpen && (
        <div className={styles.chatbotContainer}>
          <div className={styles.chatHeader}>
            <h3>RAG Chatbot</h3>
            <button onClick={() => setIsOpen(false)} className={styles.closeButton}>X</button>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.message} ${msg.isUser ? styles.userMessage : styles.botMessage}`}>
                <p>{msg.text}</p>
                <span className={styles.timestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <p>Typing...</p>
              </div>
            )}
          </div>
          <div className={styles.chatInputContainer}>
            <textarea
              className={styles.chatInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              rows="1"
            />
            <button onClick={() => sendMessage(input)} className={styles.sendButton} disabled={isLoading}>
              Send
            </button>
            <button onClick={handleAskSelectedText} className={styles.selectedTextButton} disabled={isLoading}>
              Ask about Selection
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
