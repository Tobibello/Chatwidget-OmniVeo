import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Bot } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I can see your screen and help you with any questions. What would you like to know?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'I can see your screen and understand your question. Let me help you with that...',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Modal */}
      {isOpen && (
        <>
          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] max-h-[80vh] bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/30 z-50 transition-all duration-300 scale-100">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/30">
              <div className="flex items-center gap-2">
                <img 
                  src="/OmniVeologo.png" 
                  alt="OmniVeo" 
                  className="w-6 h-6 rounded"
                />
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="text-white font-medium">Live Chat</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-white hover:bg-gray-700/30 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="overflow-y-auto p-4 space-y-4 h-80">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-700'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gray-300" />}
                  </div>
                  <div className={`max-w-[75%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-3 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-blue-500/80 text-white rounded-br-md' 
                        : 'bg-gray-700/30 text-gray-200 rounded-bl-md'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800/30 text-white placeholder-gray-400 border border-gray-700/30 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25 transition-all duration-200"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-500/80 text-white rounded-xl hover:bg-blue-600/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/25"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatPanel;