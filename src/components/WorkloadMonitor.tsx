import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Flame, 
  BatteryCharging, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Coffee, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles,
  Zap,
  TrendingDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sound } from '../lib/sound';

export const WorkloadMonitor: React.FC = () => {
  const { workload, updateWorkload } = useAuth();
  
  // Pomodoro Focus Timer State
  const [pomodoroSeconds, setPomodoroSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning && pomodoroSeconds > 0) {
      timer = setInterval(() => {
        setPomodoroSeconds(prev => {
          if (prev <= 1) {
            sound.playLevelUp();
            if (timerMode === 'focus') {
              updateWorkload({
                focusMinutesToday: workload.focusMinutesToday + 25,
                fatigueScore: Math.min(100, workload.fatigueScore + 5)
              });
              setTimerMode('break');
              return 5 * 60;
            } else {
              setTimerMode('focus');
              return 25 * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, pomodoroSeconds, timerMode, workload]);

  const togglePomodoro = () => {
    sound.playClick();
    setIsTimerRunning(!isTimerRunning);
  };

  const resetPomodoro = () => {
    sound.playClick();
    setIsTimerRunning(false);
    setPomodoroSeconds(timerMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const setPacing = (mode: 'Chill Mode' | 'Optimal Pace' | 'Crunch Alert') => {
    sound.playClick();
    let newDailyTarget = 5;
    if (mode === 'Chill Mode') newDailyTarget = 3;
    if (mode === 'Crunch Alert') newDailyTarget = 8;

    updateWorkload({
      pacingMode: mode,
      dailyTargetTasks: newDailyTarget
    });
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const fatigueLevel = workload.fatigueScore < 40 
    ? { text: 'Optimal Energy', color: 'text-emerald-400', bg: 'bg-emerald-500' }
    : workload.fatigueScore < 75 
    ? { text: 'Moderate Fatigue', color: 'text-amber-400', bg: 'bg-amber-500' }
    : { text: 'Overload / Rest Advised', color: 'text-rose-400', bg: 'bg-rose-500' };

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-500/20 text-orange-300 border border-orange-500/30">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-white font-display">
              Workload Regulation & Burnout Prevention Engine
            </h2>
          </div>
          <p className="text-xs text-[#D4CDE6]/80 mt-1 max-w-xl">
            Monitors learning velocity, study duration, and cognitive fatigue to dynamically throttle daily targets and sustain healthy peak performance.
          </p>
        </div>

        {/* Current Streak Pill */}
        <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-glow flex items-center gap-2 self-start md:self-auto">
          <Flame className="w-4 h-4 fill-white" />
          <span>{workload.currentStreak} Day Study Streak Active!</span>
        </div>
      </div>

      {/* Main KPI Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Fatigue Gauge */}
        <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Cognitive Fatigue Index
            </span>
            <BatteryCharging className="w-4 h-4 text-purple-300" />
          </div>

          <div className="flex items-baseline justify-between">
            <div className="text-4xl font-black font-display text-white">
              {workload.fatigueScore}<span className="text-lg text-white/50">/100</span>
            </div>
            <span className={`text-xs font-bold ${fatigueLevel.color}`}>
              {fatigueLevel.text}
            </span>
          </div>

          <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden p-0.5">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${fatigueLevel.bg}`}
              style={{ width: `${workload.fatigueScore}%` }}
            />
          </div>

          <p className="text-xs text-[#D4CDE6]/70 leading-relaxed">
            {workload.fatigueScore > 70 
              ? '⚠️ High study load detected. Platform is automatically capping daily tasks to prevent mental burnout.'
              : '✨ Healthy pacing observed. You are in optimal cognitive state for high-retention problem solving.'}
          </p>
        </div>

        {/* Card 2: Daily Velocity Tracker */}
        <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Daily Target Completion
            </span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>

          <div className="flex items-baseline justify-between">
            <div className="text-4xl font-black font-display text-white">
              {workload.tasksCompletedToday}<span className="text-lg text-white/50">/{workload.dailyTargetTasks} Tasks</span>
            </div>
            <span className="text-xs font-bold text-purple-300">
              {Math.round((workload.tasksCompletedToday / (workload.dailyTargetTasks || 1)) * 100)}% Done
            </span>
          </div>

          <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (workload.tasksCompletedToday / (workload.dailyTargetTasks || 1)) * 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#D4CDE6]/80 pt-1">
            <span>Focus Time Today: <strong>{workload.focusMinutesToday} Mins</strong></span>
            <span className="text-emerald-400 font-semibold">On Track</span>
          </div>
        </div>

        {/* Card 3: Adaptive Pacing Selector */}
        <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Adaptive Pace Controller
            </span>
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </div>

          <div className="space-y-1.5 pt-1">
            {(['Chill Mode', 'Optimal Pace', 'Crunch Alert'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setPacing(mode)}
                className={`flex items-center justify-between w-full p-2.5 rounded-2xl text-xs font-bold transition-all ${
                  workload.pacingMode === mode
                    ? 'bg-purple-600 text-white shadow-glow border border-purple-400'
                    : 'bg-white/5 text-[#D4CDE6] hover:bg-white/10 border border-white/5'
                }`}
              >
                <span>{mode}</span>
                <span className="text-[10px] text-white/60 font-normal">
                  {mode === 'Chill Mode' ? '3 Tasks/Day' : mode === 'Optimal Pace' ? '5 Tasks/Day' : '8 Tasks/Day'}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Built-In Pomodoro Focus Room Card */}
      <div className="p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass text-center max-w-xl mx-auto space-y-6">
        
        <div className="flex items-center justify-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
            {timerMode === 'focus' ? 'Deep Work Focus Interval' : 'Restorative Break Period'}
          </span>
        </div>

        <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-white select-none">
          {formatTimer(pomodoroSeconds)}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={togglePomodoro}
            className={`px-8 py-3.5 rounded-2xl text-sm font-bold text-white shadow-glow hover:scale-105 transition-all flex items-center gap-2 ${
              isTimerRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-gradient-to-r from-[#7C3AED] to-[#EC4899]'
            }`}
          >
            {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isTimerRunning ? 'Pause Session' : 'Start Focus Session'}</span>
          </button>

          <button
            onClick={resetPomodoro}
            className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[#D4CDE6] border border-white/10 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#D4CDE6]/70">
          25 Minutes Focus • 5 Minutes Break • Automatically logs focus credits to your university placement portfolio.
        </p>

      </div>

    </div>
  );
};
