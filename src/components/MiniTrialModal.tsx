import React from 'react';
import { 
  Calendar, 
  X, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Target, 
  Flame,
  Award
} from 'lucide-react';
import { CareerPossibilityMatch } from '../types';
import { useAuth } from '../context/AuthContext';
import { sound } from '../lib/sound';

interface MiniTrialModalProps {
  match: CareerPossibilityMatch | null;
  isOpen: boolean;
  onClose: () => void;
  onAdoptRoadmap: (roleTitle: string) => void;
}

export const MiniTrialModal: React.FC<MiniTrialModalProps> = ({
  match,
  isOpen,
  onClose,
  onAdoptRoadmap
}) => {
  const { completeMiniTrialDay } = useAuth();

  if (!isOpen || !match) return null;

  const { miniTrial } = match;
  const completedCount = miniTrial.tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / 7) * 100);

  const handleToggleDay = (day: number) => {
    completeMiniTrialDay(match.roleId, day);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl p-6 sm:p-8 rounded-4xl bg-[#140E24]/95 border border-purple-500/30 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Calendar className="w-5 h-5" />
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase">
                7-Day Career Simulation
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-white font-display mt-2">
              {miniTrial.title}
            </h2>
            <p className="text-xs text-[#D4CDE6]/70 mt-0.5">
              Test drive the real day-to-day responsibilities of a <strong className="text-white">{match.title}</strong> before committing to a 6-month roadmap.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="p-4 rounded-3xl bg-black/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Trial Progress: {completedCount} / 7 Days Complete</span>
            </span>
            <span className="font-mono font-bold text-emerald-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 7-Day Task Cards List */}
        <div className="space-y-3">
          {miniTrial.tasks.map((task) => {
            const isDone = !!task.completed;
            return (
              <div
                key={task.day}
                onClick={() => handleToggleDay(task.day)}
                className={`p-4 rounded-3xl cursor-pointer border transition-all flex items-start justify-between gap-3 ${
                  isDone
                    ? 'bg-emerald-950/40 border-emerald-500/40 shadow-glow'
                    : 'bg-white/5 hover:bg-white/10 border-white/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5 ${
                    isDone ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white/70'
                  }`}>
                    D{task.day}
                  </span>
                  <div>
                    <h4 className={`text-xs sm:text-sm font-bold leading-snug ${
                      isDone ? 'text-emerald-200 line-through' : 'text-white'
                    }`}>
                      {task.task}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#D4CDE6]/70">
                      <Target className="w-3 h-3 text-amber-300" />
                      <span><strong>Test Goal:</strong> {task.testGoal}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-1">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-white/30" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-4 rounded-3xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-[#D4CDE6]/80">
            Loving this trajectory? Adopt the full 6-month roadmap anytime.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playLevelUp();
                onAdoptRoadmap(match.title);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F14938] to-[#EC4899] text-white font-bold shadow-coral-glow hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <span>Adopt Full Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
