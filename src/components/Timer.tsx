import { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Settings as SettingsIcon } from 'lucide-react';
import { useTimerStore } from '../store/timerStore';
import { formatTime } from '../lib/utils';
import { Settings } from './Settings';
import { Progress } from './Progress';

export function Timer() {
  const [showSettings, setShowSettings] = useState(false);
  const {
    mode,
    timeLeft,
    isRunning,
    soundEnabled,
    setTimeLeft,
    setIsRunning,
    toggleSound,
    resetTimer,
    incrementPomodoros,
  } = useTimerStore();

  useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (soundEnabled) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();
      }
      incrementPomodoros();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, setTimeLeft, soundEnabled, incrementPomodoros]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const getTimerColor = () => {
    switch (mode) {
      case 'work':
        return 'bg-timer-work';
      case 'shortBreak':
      case 'longBreak':
        return 'bg-timer-break';
      default:
        return 'bg-gray-800';
    }
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-8">
        <div className="text-8xl font-bold tracking-wider text-gray-800">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTimer}
            className={`p-4 rounded-full ${getTimerColor()} bg-gray-400 hover:bg-gray-500`}
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button
            onClick={resetTimer}
            className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            <RotateCcw size={24} />
          </button>
          
          <button
            onClick={toggleSound}
            className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>

          <button
            onClick={() => setShowSettings(true)}
            className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            <SettingsIcon size={24} />
          </button>
        </div>

        <div className="text-lg font-medium text-gray-600">
          {mode === 'work' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
        </div>

        <div className="w-full max-w-sm">
          <Progress />
        </div>
      </div>

      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}