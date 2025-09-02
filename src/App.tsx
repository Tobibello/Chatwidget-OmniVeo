import React from 'react';
import CallWidget from './components/CallWidget';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Demo Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">AI Assistant Demo</h1>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Screen Sharing Session Active</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              This is a demo page showing how the floating call widget works. The AI assistant can see your screen 
              when screen sharing is enabled and help you with questions about what you're viewing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-800 mb-2">Voice Interaction</h3>
                <p className="text-gray-600 text-sm">
                  Click the microphone button to start voice conversations with the AI assistant.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-800 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm">
                  Use the chat panel for text-based conversations and quick questions.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-800 mb-2">Screen Sharing</h3>
                <p className="text-gray-600 text-sm">
                  Enable screen sharing so the AI can see and help with what's on your screen.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-800 mb-2">Draggable Widget</h3>
                <p className="text-gray-600 text-sm">
                  The widget can be moved anywhere on your screen by clicking and dragging.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Try the Widget</h3>
            <p className="text-blue-700">
              Look for the floating widget at the bottom of your screen. You can drag it around, 
              toggle microphone and screen sharing, open the chat panel, or end the session.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Call Widget */}
      <CallWidget />
    </div>
  );
}

export default App;