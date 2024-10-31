'use client';

import { useState, useEffect, useRef } from 'react';
import { useDarkMode } from './DarkModeProvider';
import { useLanguage } from './LanguageProvider';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const { language } = useLanguage();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    const thinkingMessage = { role: 'assistant', content: language === 'en' ? 'AI Chef is thinking...' : 'Chef AI sedang berfikir...' };
    setMessages(prevMessages => [...prevMessages, thinkingMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: input, 
          language,
          conversationHistory: messages.filter(msg => msg.role !== 'thinking')
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      setMessages(prevMessages => {
        const newMessages = prevMessages.filter(msg => msg !== thinkingMessage);
        return [...newMessages, { role: 'assistant', content: data.message }];
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => {
        const newMessages = prevMessages.filter(msg => msg !== thinkingMessage);
        return [...newMessages, { role: 'assistant', content: language === 'en' ? 'Sorry, I encountered an error.' : 'Maaf, saya mengalami kesalahan.' }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleChatBox}
        className={`fixed bottom-4 right-4 p-4 rounded-full ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center`}
      >
        {isOpen ? (
          '✕'
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="32" cy="32" r="30" />
              <circle cx="32" cy="28" r="12" />
              <path d="M20 48 C20 40, 44 40, 44 48" strokeLinecap="round" />
              <path d="M24 28 L28 28 M36 28 L40 28" strokeLinecap="round" />
              <path d="M32 40 L32 44" strokeLinecap="round" />
              <path d="M26 52 L38 52" strokeLinecap="round" />
              <path d="M16 24 L12 20 M48 24 L52 20" strokeLinecap="round" />
              <path d="M24 16 C24 12, 40 12, 40 16" strokeLinecap="round" />
            </svg>
            <span>{language === 'en' ? 'AI Chef' : 'Chef AI'}</span>
          </>
        )}
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-2xl h-3/4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl flex flex-col overflow-hidden`}>
            <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white flex justify-between items-center`}>
              <span className="text-xl font-bold">{language === 'en' ? 'AI Chef Assistant' : 'Pembantu Chef AI'}</span>
              <button onClick={toggleChatBox} className="text-white hover:text-gray-300">
                ✕
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3/4 p-3 rounded-lg ${
                    message.role === 'user' 
                      ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                      : isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                  }`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`max-w-3/4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <span className="inline-block animate-pulse">...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-300 dark:border-gray-600">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={`flex-grow p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder={language === 'en' ? 'Ask AI Chef...' : 'Tanya Chef AI...'}
                />
                <button 
                  type="submit" 
                  className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-200`}
                >
                  {language === 'en' ? 'Send' : 'Hantar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}