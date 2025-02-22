import React from 'react';
import { Timer } from './components/Timer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Pomodoro Timer
        </h1>
        <Timer />
      </div>
    </div>
  );
}

export default App;