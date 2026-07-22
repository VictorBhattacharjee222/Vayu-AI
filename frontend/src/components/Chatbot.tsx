"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function Chatbot({ contextData, inline = false }: { contextData: any, inline?: boolean }) {
  const [isOpen, setIsOpen] = useState(inline ? true : false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: 'Hello! I am VAYU AI. How can I assist you with this dashboard today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('https://sitcom-paddle-gown.ngrok-free.dev/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          context: contextData
        })
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const containerStyle = inline ? {
    width: '100%',
    height: '600px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden'
  } : {
    position: 'fixed' as const,
    bottom: '100px',
    right: '24px',
    width: '350px',
    height: '500px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    zIndex: 9999,
    overflow: 'hidden'
  };

  return (
    <>
      {/* Floating Button */}
      {!inline && (
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="glass-panel"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            zIndex: 9999,
            background: 'var(--primary)',
            color: 'white',
            fontSize: '24px'
          }}
        >
          {isOpen ? '✕' : '💬'}
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={inline ? "glass-card" : "glass-panel"} style={containerStyle}>
          {/* Header */}
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>VAYU AI Assistant</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Powered by Llama 3.1 8B (Environment ➔ Govt ➔ Decision)</p>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                padding: '12px 16px',
                borderRadius: '12px',
                maxWidth: '85%',
                lineHeight: '1.6',
                fontSize: '0.9rem',
                border: msg.role === 'assistant' ? '1px solid var(--border-color)' : 'none',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.content}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}>
                <span className="pulse" style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--text-muted)', borderRadius: '50%', marginRight: '4px' }}></span>
                <span className="pulse" style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--text-muted)', borderRadius: '50%', marginRight: '4px', animationDelay: '0.2s' }}></span>
                <span className="pulse" style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--text-muted)', borderRadius: '50%', animationDelay: '0.4s' }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.3)' }}>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--surface-dark)', color: 'white', outline: 'none' }}
            />
            <button 
              onClick={handleSend}
              className="btn-primary"
              style={{ padding: '0 16px' }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
