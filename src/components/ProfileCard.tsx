import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Sparkles, 
  TrendingUp, 
  Flame, 
  Award, 
  ExternalLink, 
  Zap, 
  Share2, 
  CheckCircle2, 
  Clock, 
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sound } from '../lib/sound';

interface ProfileCardProps {
  onTakeDiagnostic: () => void;
  onOpenATS: () => void;
  onOpenRoadmap: () => void;
  onOpenProfileBuilder: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  onTakeDiagnostic,
  onOpenATS,
  onOpenRoadmap,
  onOpenProfileBuilder,
}) => {
  const { student, workload, roadmap } = useAuth();
  const [animatedScore, setAnimatedScore] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Smooth counter animation on initial mount / score change
  useEffect(() => {
    let start = 0;
    const end = student.readinessScore;
    const duration = 1200; // ms
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const stepIncrement = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += stepIncrement;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(Number(start.toFixed(1)));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [student.readinessScore]);

  const radarData = [
    { subject: 'Tech Depth', A: student.radarScores.technicalDepth, fullMark: 100 },
    { subject: 'Aptitude & Logic', A: student.radarScores.aptitudeLogic, fullMark: 100 },
    { subject: 'System Design', A: student.radarScores.systemDesign, fullMark: 100 },
    { subject: 'Problem Solving', A: student.radarScores.problemSolving, fullMark: 100 },
    { subject: 'Communication', A: student.radarScores.communication, fullMark: 100 },
    { subject: 'DevOps & Cloud', A: student.radarScores.devOpsCloud, fullMark: 100 },
  ];

  // Count total completed tasks across roadmap
  let totalTasks = 0;
  let completedTasks = 0;
  roadmap.monthlyGoals.forEach(m => {
    m.weeklyGoals.forEach(w => {
      w.tasks.forEach(t => {
        totalTasks++;
        if (t.completed) completedTasks++;
      });
    });
  });

  const handleShare = () => {
    sound.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="relative w-full rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass overflow-hidden transition-all duration-300">
      
      {/* Decorative top ambient mesh light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Athlete-Pro Card Grid */}
      <div className="relative p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Hero Cutout & Academic Metadata (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <div className="relative group">
            {/* Ambient rotating glow ring */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#F14938] via-[#A855F7] to-[#10B981] rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow" />
            
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-white/30 bg-[#1e1738] shadow-2xl">
              <img
                src={student.avatarUrl}
                alt={student.displayName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Performance Tier Floating Badge */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-[10px] font-black uppercase tracking-wider shadow-lg border border-white/20 whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{student.aptitudeTier}</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                {student.displayName}
              </h1>
              <button
                onClick={handleShare}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-[#D4CDE6] text-xs transition-colors"
                title="Copy Shareable Portfolio Link"
              >
                {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
            
            <p className="text-sm font-semibold text-purple-300/90 mt-0.5">
              {student.dreamRole}
            </p>
            <p className="text-xs text-[#D4CDE6]/70 mt-1">
              {student.university} • {student.major}
            </p>

            {/* Academic Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 mt-3">
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                CGPA {student.cgpa}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-200 border border-purple-500/30 text-[11px] font-semibold">
                {student.semester}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-blue-500/20 text-blue-200 border border-blue-500/30 text-[11px] font-semibold">
                Batch {student.gradYear}
              </span>
            </div>
          </div>

          {/* Quick Skill Tags */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1 pt-1 max-w-sm">
            {student.skills.slice(0, 5).map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-[#D4CDE6]">
                {skill}
              </span>
            ))}
            {student.skills.length > 5 && (
              <span className="px-2 py-0.5 rounded-lg bg-white/5 text-[10px] text-purple-300 font-bold">
                +{student.skills.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Center Column: Dynamic Concentric Skill Radar (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div className="flex items-center justify-between w-full px-4 mb-1">
            <span className="text-xs font-bold text-[#D4CDE6] uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Competency Radar
            </span>
            <span className="text-[10px] font-mono text-purple-300">
              Avg Index: {Math.round(Object.values(student.radarScores).reduce((a, b) => a + b, 0) / 6)}%
            </span>
          </div>

          <div className="w-full h-56 sm:h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.15)" strokeDasharray="3 3" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#D4CDE6', fontSize: 10, fontWeight: 600 }} 
                />
                <Radar
                  name="Skill Level"
                  dataKey="A"
                  stroke="#EC4899"
                  fill="url(#radarGradient)"
                  fillOpacity={0.65}
                />
                <defs>
                  <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onTakeDiagnostic();
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors mt-1"
          >
            <span>Calibrate Skills via Diagnostic</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Column: High-Contrast Tri-Color KPI Blocks (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-3.5">
          
          {/* KPI Block 1: Coral Red Pill (Placement Readiness %) */}
          <div 
            onClick={() => {
              sound.playClick();
              onOpenRoadmap();
            }}
            className="group cursor-pointer p-4 rounded-3xl bg-gradient-to-r from-[#F14938] to-[#E11D48] text-white shadow-coral-glow transform hover:-translate-y-1 transition-all duration-200 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-white/90">
                Placement Readiness
              </span>
              <span className="p-1 rounded-lg bg-black/20 text-white">
                <TrendingUp className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                {animatedScore}%
              </span>
              <span className="text-xs font-bold text-white/80">
                Target: 85%+
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-black/30 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-1000" 
                style={{ width: `${animatedScore}%` }}
              />
            </div>
          </div>

          {/* KPI Block 2: Deep Navy Pill (Milestones & Tasks) */}
          <div 
            onClick={() => {
              sound.playClick();
              onOpenRoadmap();
            }}
            className="group cursor-pointer p-4 rounded-3xl bg-[#1F3668] text-white shadow-glass transform hover:-translate-y-1 transition-all duration-200 border border-blue-400/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-200">
                Milestones Cleared
              </span>
              <span className="p-1 rounded-lg bg-white/10 text-cyan-300">
                <FileCheck className="w-4 h-4" />
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black font-display tracking-tight text-white">
                {completedTasks} <span className="text-lg text-blue-300 font-medium">/ {totalTasks || 8}</span>
              </span>
              <span className="text-xs font-semibold text-cyan-300">
                Phase 2 In-Progress
              </span>
            </div>
            <p className="text-[11px] text-blue-200/80 mt-1 truncate">
              Next: Redis Stream Async Worker
            </p>
          </div>

          {/* KPI Block 3: Pure White High-Contrast Pill (Streak & Workload) */}
          <div 
            onClick={() => {
              sound.playClick();
              onTakeDiagnostic();
            }}
            className="group cursor-pointer p-4 rounded-3xl bg-white text-[#120E1E] shadow-xl transform hover:-translate-y-1 transition-all duration-200 border border-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#120E1E]/70">
                Daily Study Streak
              </span>
              <span className="p-1 rounded-lg bg-orange-100 text-orange-600">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-3xl font-black font-display tracking-tight text-[#120E1E]">
                {workload.currentStreak} <span className="text-base font-bold text-orange-600">Days</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                {workload.pacingMode}
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#120E1E]/70 mt-1">
              Fatigue Level: <strong className="text-[#120E1E]">{workload.fatigueScore}/100</strong> (Optimal)
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Action Ribbon */}
      <div className="px-6 py-3.5 bg-black/40 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-[#D4CDE6]/80">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Target: <strong>{student.targetTimelineMonths} Months</strong> to Job Ready</span>
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Dream: <strong>{student.dreamCompany}</strong></span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onOpenATS();
            }}
            className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 font-semibold transition-colors"
          >
            ATS Resume Audit
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenProfileBuilder();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center gap-1"
          >
            <span>Edit Profile</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

    </div>
  );
};
