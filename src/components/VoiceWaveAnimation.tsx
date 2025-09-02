import React from 'react';

const VoiceWaveAnimation: React.FC = () => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-blue-300 rounded-full opacity-75"
          style={{
            height: '8px',
            animation: `wave 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { 
            transform: scaleY(0.5);
            opacity: 0.5;
          }
          50% { 
            transform: scaleY(1.5);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default VoiceWaveAnimation;