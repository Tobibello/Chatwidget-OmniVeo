import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Monitor, MonitorOff, MessageCircle, Phone, PhoneOff, MoreHorizontal } from 'lucide-react';
import VoiceWaveAnimation from './VoiceWaveAnimation';
import ChatPanel from './ChatPanel';

interface Position {
  x: number;
  y: number;
}

const CallWidget: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 20, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Constrain to viewport
      const maxX = window.innerWidth - (widgetRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (widgetRef.current?.offsetHeight || 0);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!widgetRef.current) return;
    
    const rect = widgetRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const toggleMicrophone = () => {
    setIsListening(!isListening);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const endSession = () => {
    setIsCallActive(false);
    // In a real app, this would close the connection
  };

  if (!isCallActive) {
    return null;
  }

  return (
    <>
      <div
        ref={widgetRef}
        className={`fixed z-50 bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 transition-all duration-200 select-none ${
          isDragging ? 'scale-105 shadow-3xl cursor-grabbing' : 'cursor-grab hover:shadow-3xl'
        }`}
        style={{ 
          left: position.x, 
          top: position.y,
          minWidth: '320px'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/OmniVeologo.png" 
              alt="OmniVeo" 
              className="w-8 h-8 rounded-lg"
            />
          </div>

          {/* Microphone Button */}
          <button
            onClick={toggleMicrophone}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 font-medium text-sm ${
              isListening 
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
            }`}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span>{isListening ? 'Listen' : 'Muted'}</span>
            {isListening && <VoiceWaveAnimation />}
          </button>

          {/* Ask Question Button */}
          <button
            onClick={toggleChat}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full hover:bg-gray-600/50 hover:text-white transition-all duration-200 font-medium text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask question</span>
          </button>

          {/* Screen Share Button */}
          <button
            onClick={toggleScreenShare}
            className={`p-2 rounded-full transition-all duration-200 ${
              isScreenSharing 
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/25 hover:bg-green-600' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
            }`}
            title={isScreenSharing ? 'Stop Screen Share' : 'Start Screen Share'}
          >
            {isScreenSharing ? <Monitor className="w-4 h-4" /> : <MonitorOff className="w-4 h-4" />}
          </button>

          {/* More Options */}
          <button
            className="p-2 rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white transition-all duration-200"
            title="More Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {/* End Session Button */}
          <button
            onClick={endSession}
            className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 ml-2"
            title="End Session"
          >
            <PhoneOff className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default CallWidget;