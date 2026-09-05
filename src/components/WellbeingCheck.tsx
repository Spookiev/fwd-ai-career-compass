import React, { useState } from 'react';
import { 
  Heart, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Snowflake, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  AlertCircle,
  X,
  Coffee,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getWellbeingPacingAdvice } from '../lib/gemini';
import { sound } from '../lib/sound';

interface WellbeingCheckProps {
  onClose?: () => void;
  isFloating?: boolean;
}

export const WellbeingCheck: React.FC<WellbeingCheckProps> = ({ onClose, isFloating = false }) => {
  const { wellbeing, logDailyMood, toggleStreakFreeze, workload } = useAuth();
  
  const [selectedMood, setSelectedMood] = useState<string>('😊');
  const [selectedVibe, setSelectedVibe] = useState<string>('🌱 Growth');
  const [energyLevel, setEnergyLevel] = useState<number>(4);
  const [studyMinutes, setStudyMinutes] = useState<number>(90);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pacingFeedback, setPacingFeedback] = useState<string | null>(wellbeing.lastSupportiveMessage || null);

  const moodEmojis = [
    { emoji: '😊', label: 'Great' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😕', label: 'Tired' },
    { emoji: '😫', label: 'Exhausted' }
  ];

  const vibeCards = [
    { label: '🌱 Growth', desc: 'Steady learning cadence' },
    { label: '⚡ Energetic', desc: 'High focus & flow' },
    { label: '🔥 Fired Up', desc: 'Crushing hard milestones' },
    { label: '🌧️ Drained', desc: 'Need a breather' },
    { label: '🌙 Resting', desc: 'Guilt-free recovery' }
  ];

  const handleSubmitCheckIn = async () => {
    sound.playLevelUp();
    setIsSubmitting(true);

    try {
      // Call Gemini pacing assistant for empathetic guidance
      const advice = await getWellbeingPacingAdvice({
        moodEmoji: selectedMood,
        vibeCard: selectedVibe,
        energyLevel: energyLevel,
        tasksCount: workload.tasksCompletedToday,
        weeklyMinutes: studyMinutes
      });

      setPacingFeedback(advice.supportiveMessage);

      // Log in context
      logDailyMood({
        moodEmoji: selectedMood,
        vibeCard: selectedVibe,
        preEnergyLevel: energyLevel,
        studyDurationMinutes: studyMinutes
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${isFloating ? 'p-6 rounded-4xl bg-[#140E24]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-5' : 'space-y-6'}`}>
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Heart className="w-5 h-5 text-emerald-400" />
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase">
              Sustainable Academic Pacing
            </span>
          </div>
          <h2 className="text-2xl font-black text-white font-display mt-1">
            5-Second Daily Energy & Mood Check-In
          </h2>
          <p className="text-xs text-[#D4CDE6]/80 max-w-xl">
            FWD prevents burnout through proactive fatigue detection, adaptive roadmap throttling, and streak freeze protections.
          </p>
        </div>

        {/* Streak & Freeze Status */}
        <div className="flex items-center gap-3">
          <div className="p-4 rounded-3xl bg-black/40 border border-white/10 flex items-center gap-3">
            <Flame className="w-6 h-6 text-orange-400 fill-orange-400" />
            <div>
              <div className="text-xl font-black text-white font-display">{wellbeing.currentStreak} Days</div>
              <div className="text-[10px] text-white/50">Active Streak</div>
            </div>
          </div>

          <button
            onClick={toggleStreakFreeze}
            className={`p-4 rounded-3xl border transition-all flex items-center gap-2 text-xs font-bold ${
              wellbeing.streakFrozen
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-white/5 border-white/10 text-[#D4CDE6] hover:bg-white/10'
            }`}
            title="Freeze streak for 24 hours without penalty"
          >
            <Snowflake className={`w-5 h-5 ${wellbeing.streakFrozen ? 'animate-spin' : ''}`} />
            <div className="text-left">
              <div>{wellbeing.streakFrozen ? 'Streak Frozen' : 'Use Freeze Token'}</div>
              <div className="text-[9px] text-white/50">{wellbeing.freezeTokensRemaining} Tokens Left</div>
            </div>
          </button>

          {isFloating && onClose && (
            <button onClick={onClose} className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Check-In Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Emoji Selector & Vibe Cards (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-6">
          
          {/* 1. Emoji Selector */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <span>How are you feeling right now?</span>
            </span>

            <div className="grid grid-cols-5 gap-2.5">
              {moodEmojis.map((item) => {
                const isSelected = selectedMood === item.emoji;
                return (
                  <button
                    key={item.emoji}
                    onClick={() => {
                      sound.playClick();
                      setSelectedMood(item.emoji);
                    }}
                    className={`p-3.5 sm:p-4 rounded-3xl flex flex-col items-center justify-center gap-1.5 transition-all border ${
                      isSelected
                        ? 'bg-purple-600/40 border-purple-400 scale-110 shadow-glow'
                        : 'bg-white/5 hover:bg-white/10 border-white/5 text-white/70'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                    <span className="text-[10px] font-bold text-white/80">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Vibe Cards */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
              <span>Select Today's Academic Vibe</span>
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {vibeCards.map((v) => {
                const isSelected = selectedVibe === v.label;
                return (
                  <button
                    key={v.label}
                    onClick={() => {
                      sound.playClick();
                      setSelectedVibe(v.label);
                    }}
                    className={`p-3.5 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-pink-900/50 border-pink-400 shadow-glow scale-[1.02]'
                        : 'bg-white/5 hover:bg-white/10 border-white/5'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{v.label}</div>
                    <div className="text-[10px] text-[#D4CDE6]/70 mt-0.5">{v.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Energy Bolts Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Pre-Study Energy Capacity</span>
              </span>
              <span className="text-xs font-mono text-amber-300 font-bold">{energyLevel} / 5 Bolts</span>
            </div>

            <div className="flex items-center gap-3">
              {[1, 2, 3, 4, 5].map((bolt) => (
                <button
                  key={bolt}
                  onClick={() => {
                    sound.playClick();
                    setEnergyLevel(bolt);
                  }}
                  className={`flex-1 py-3 rounded-2xl border transition-all flex items-center justify-center ${
                    bolt <= energyLevel
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-glow'
                      : 'bg-white/5 border-white/5 text-white/20'
                  }`}
                >
                  <Zap className={`w-4 h-4 ${bolt <= energyLevel ? 'fill-amber-400' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmitCheckIn}
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white text-xs font-bold shadow-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitting ? 'Syncing with Wellbeing Companion...' : 'Log 5-Second Check-In'}</span>
          </button>
        </div>

        {/* Right Column: Pacing Companion Feedback & Recent Logs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Supportive AI Pacing Box */}
          <div className="p-6 rounded-4xl bg-gradient-to-tr from-purple-950/60 via-black/50 to-emerald-950/40 border border-emerald-500/30 backdrop-blur-2xl shadow-glass space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Wellbeing Companion Insight</span>
            </div>

            <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-medium">
              "{pacingFeedback || wellbeing.lastSupportiveMessage}"
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#D4CDE6]/70">
              <span>Fatigue Level: <strong className="text-white">{wellbeing.fatigueScore}/100</strong></span>
              <span>Status: <strong className="text-emerald-300">{wellbeing.pacingRecommendation}</strong></span>
            </div>
          </div>

          {/* Recent Mood Logs History */}
          <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Recent Daily Check-Ins
              </span>
              <span className="text-[10px] text-white/50">Past 4 Days</span>
            </div>

            <div className="space-y-2">
              {wellbeing.dailyLogs.slice(0, 4).map((log, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{log.moodEmoji}</span>
                    <div>
                      <div className="font-bold text-white">{log.vibeCard}</div>
                      <div className="text-[10px] text-white/50">{log.date}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono text-amber-300">{log.preEnergyLevel}/5 Energy</span>
                    <div className="text-[9px] text-white/50">{log.studyDurationMinutes} mins</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
