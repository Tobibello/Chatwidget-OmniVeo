import React from 'react';

const VoiceWaveAnimation: React.FC = () => {
  return (
    <div className="flex items-center gap-0.5 ml-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-0.5 bg-blue-300 rounded-full opacity-75"
          style={{
            height: '6px',
            animation: `wave 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveAnimation;