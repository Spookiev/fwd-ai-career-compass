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
  ChevronRight,
  ShieldCheck,
  Compass,
  Cpu,
  Terminal,
  Activity,
  Layers,
  Palette
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sound } from '../lib/sound';

interface ProfileCardProps {
  onTakeDiagnostic: () => void;
  onOpenATS: () => void;
  onOpenRoadmap: () => void;
  onOpenProfileBuilder: () => void;
  onOpenIntake?: () => void;
  onOpenPresence?: () => void;
  onOpenAvatarModal?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  onTakeDiagnostic,
  onOpenATS,
  onOpenRoadmap,
  onOpenProfileBuilder,
  onOpenIntake,
  onOpenPresence,
  onOpenAvatarModal
}) => {
  const { student, workload, roadmap, avatar, triangulatedProfile, deconstructedKPIs, presence } = useAuth();
  const [animatedScore, setAnimatedScore] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let start = 0;
    const end = student.readinessScore;
    const duration = 1200;
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

  const skillsList = Object.values(triangulatedProfile.skills || {});

  return (
    <div className="relative w-full rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass overflow-hidden transition-all duration-300">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid: Left Profile (4 Cols) + Center Radar (4 Cols) + Right Deconstructed KPIs (4 Cols) */}
      <div className="relative p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Hero Avatar & Academic Metadata (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <div className="relative group cursor-pointer" onClick={onOpenAvatarModal}>
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#F14938] via-[#A855F7] to-[#10B981] rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow" />
            
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-white/30 bg-[#1e1738] shadow-2xl">
              <img
                src={avatar.imageUrl || student.avatarUrl}
                alt={avatar.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                Change Avatar
              </div>
            </div>

            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-[10px] font-black uppercase tracking-wider shadow-lg border border-white/20 whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{student.aptitudeTier}</span>
            </div>
          </div>

          <div className="pt-2 w-full">
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
            <p className="text-xs text-[#D4CDE6]/70 mt-0.5">
              {student.university} • {student.major}
            </p>

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

            {/* Triangulated Skill Evidence Tags */}
            <div className="mt-3.5 space-y-1 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300/80">
                Triangulated Skill Evidence:
              </span>
              <div className="flex flex-wrap gap-1">
                {skillsList.slice(0, 4).map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-lg bg-black/40 border border-white/10 text-[10px] text-[#D4CDE6] flex items-center gap-1"
                    title={`Composite Confidence: ${sk.compositeConfidence}`}
                  >
                    <span>{sk.name}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      sk.compositeConfidence === 'High' ? 'bg-emerald-400' : sk.compositeConfidence === 'Medium' ? 'bg-amber-400' : 'bg-red-400'
                    }`} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Competency Radar & Multi-Evidence Actions (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center justify-between w-full px-2 mb-1">
            <span className="text-xs font-bold text-[#D4CDE6] uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Competency Radar</span>
            </span>
            <span className="text-[10px] font-mono text-purple-300">
              Avg: {Math.round(Object.values(student.radarScores).reduce((a, b) => a + b, 0) / 6)}%
            </span>
          </div>

          <div className="w-full h-52 sm:h-60 relative">
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

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              onClick={() => {
                sound.playClick();
                if (onOpenIntake) onOpenIntake();
              }}
              className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 text-purple-200 border border-purple-500/30 text-xs font-semibold transition-all flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5 text-pink-300" />
              <span>Intake Router</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                if (onOpenPresence) onOpenPresence();
              }}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Presence Hub</span>
            </button>
          </div>
        </div>

        {/* Right Column: Deconstructed 5-Dimension Readiness Arena (4 Cols) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-black/40 border border-white/10 space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-white">
                5-Dimension Readiness Breakdown
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              {animatedScore}%
            </span>
          </div>

          {/* Dimension 1: Career Fit Index */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-white/80 font-medium flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                <span>1. Career Fit Index</span>
              </span>
              <span className="font-bold text-purple-300">{deconstructedKPIs.careerFitIndex}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full transition-all duration-700" style={{ width: `${deconstructedKPIs.careerFitIndex}%` }} />
            </div>
          </div>

          {/* Dimension 2: Skill Readiness */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-white/80 font-medium flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-pink-400" />
                <span>2. Skill Readiness</span>
              </span>
              <span className="font-bold text-pink-300">{deconstructedKPIs.skillReadiness}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500 rounded-full transition-all duration-700" style={{ width: `${deconstructedKPIs.skillReadiness}%` }} />
            </div>
          </div>

          {/* Dimension 3: Career Presence */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-white/80 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>3. Career Presence</span>
              </span>
              <span className="font-bold text-emerald-300">{presence.overallScore}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${presence.overallScore}%` }} />
            </div>
          </div>

          {/* Dimension 4: Interview Readiness */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-white/80 font-medium flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>4. Interview Readiness</span>
              </span>
              <span className="font-bold text-cyan-300">{deconstructedKPIs.interviewReadiness}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 rounded-full transition-all duration-700" style={{ width: `${deconstructedKPIs.interviewReadiness}%` }} />
            </div>
          </div>

          {/* Dimension 5: Learning Consistency */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-white/80 font-medium flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                <span>5. Habit Consistency</span>
              </span>
              <span className="font-bold text-orange-300">{deconstructedKPIs.learningConsistency}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full transition-all duration-700" style={{ width: `${deconstructedKPIs.learningConsistency}%` }} />
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-white/60">Milestones: {completedTasks}/{totalTasks || 8}</span>
            <span className="text-emerald-400 font-semibold">{workload.pacingMode}</span>
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

