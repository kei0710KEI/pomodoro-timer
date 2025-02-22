import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerState {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  pomodorosCompleted: number;
  dailyGoal: number;
  soundEnabled: boolean;
  pomodorosUntilLongBreak: number;
  currentPomodoroSet: number;
  setMode: (mode: TimerMode) => void;
  setTimeLeft: (time: number) => void;
  setIsRunning: (isRunning: boolean) => void;
  setWorkDuration: (duration: number) => void;
  setShortBreakDuration: (duration: number) => void;
  setLongBreakDuration: (duration: number) => void;
  setDailyGoal: (goal: number) => void;
  incrementPomodoros: () => void;
  toggleSound: () => void;
  resetTimer: () => void;
  switchMode: () => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      mode: 'work',
      timeLeft: 25 * 60,
      isRunning: false,
      workDuration: 25 * 60,
      shortBreakDuration: 5 * 60,
      longBreakDuration: 15 * 60,
      pomodorosCompleted: 0,
      dailyGoal: 8,
      soundEnabled: true,
      pomodorosUntilLongBreak: 4,
      currentPomodoroSet: 0,
      setMode: (mode) => set({ mode }),
      setTimeLeft: (time) => set({ timeLeft: time }),
      setIsRunning: (isRunning) => set({ isRunning }),
      setWorkDuration: (duration) => {
        const minutes = Math.max(1, Math.min(60, duration));
        set({ workDuration: minutes * 60 });
        if (get().mode === 'work') {
          set({ timeLeft: minutes * 60 });
        }
      },
      setShortBreakDuration: (duration) => {
        const minutes = Math.max(1, Math.min(15, duration));
        set({ shortBreakDuration: minutes * 60 });
        if (get().mode === 'shortBreak') {
          set({ timeLeft: minutes * 60 });
        }
      },
      setLongBreakDuration: (duration) => {
        const minutes = Math.max(5, Math.min(30, duration));
        set({ longBreakDuration: minutes * 60 });
        if (get().mode === 'longBreak') {
          set({ timeLeft: minutes * 60 });
        }
      },
      setDailyGoal: (goal) => set({ dailyGoal: Math.max(1, goal) }),
      incrementPomodoros: () => {
        set((state) => {
          const newPomodorosCompleted = state.mode === 'work' 
            ? state.pomodorosCompleted + 1 
            : state.pomodorosCompleted;
          const newCurrentPomodoroSet = state.mode === 'work'
            ? (state.currentPomodoroSet + 1) % state.pomodorosUntilLongBreak
            : state.currentPomodoroSet;
          return { 
            pomodorosCompleted: newPomodorosCompleted,
            currentPomodoroSet: newCurrentPomodoroSet,
            isRunning: false
          };
        });
        get().switchMode();
      },
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      resetTimer: () => {
        const { workDuration, mode } = get();
        set({ 
          timeLeft: workDuration,
          isRunning: false,
          mode: 'work'
        });
      },
      switchMode: () => {
        const state = get();
        let nextMode: TimerMode;
        let nextTime: number;

        if (state.mode === 'work') {
          if (state.currentPomodoroSet === 0) {
            nextMode = 'longBreak';
            nextTime = state.longBreakDuration;
          } else {
            nextMode = 'shortBreak';
            nextTime = state.shortBreakDuration;
          }
        } else {
          nextMode = 'work';
          nextTime = state.workDuration;
        }

        set({ 
          mode: nextMode,
          timeLeft: nextTime
        });
      }
    }),
    {
      name: 'pomodoro-storage'
    }
  )
);