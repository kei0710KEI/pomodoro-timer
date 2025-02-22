import { useTimerStore } from '../store/timerStore';
import { Target, Trophy } from 'lucide-react';

export function Progress() {
  const { pomodorosCompleted, dailyGoal } = useTimerStore();
  const progress = (pomodorosCompleted / dailyGoal) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-600">Daily Goal</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium">{pomodorosCompleted} / {dailyGoal}</span>
        </div>
      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  );
}