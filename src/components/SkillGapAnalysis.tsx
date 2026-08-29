import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  Plus, 
  Check, 
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SkillGapItem } from '../types';
import { sound } from '../lib/sound';

const INITIAL_SKILL_GAPS: SkillGapItem[] = [
  {
    skillName: 'TypeScript & Modern React',
    category: 'Core Language',
    studentLevel: 88,
    requiredLevel: 85,
    status: 'Mastered',
    bridgeProject: 'DevPulse Telemetry Engine',
    recommendedOER: {
      title: 'TypeScript Advanced Generics & Strict Typing',
      type: 'Documentation',
      provider: 'Official Docs',
      url: 'https://www.typescriptlang.org/docs/'
    }
  },
  {
    skillName: 'LangChain & Multi-Agent Graphs',
    category: 'Framework',
    studentLevel: 58,
    requiredLevel: 85,
    status: 'In Progress',
    bridgeProject: 'Build self-correcting code agent graph with Gemini 2.5',
    recommendedOER: {
      title: 'LangGraph Multi-Agent Architecture',
      type: 'Course',
      provider: 'Coursera Free',
      url: 'https://www.deeplearning.ai/short-courses/'
    }
  },
  {
    skillName: 'Vector Databases (pgvector / HNSW)',
    category: 'Theory & Design',
    studentLevel: 45,
    requiredLevel: 80,
    status: 'Critical Gap',
    bridgeProject: 'Implement 1536-dim embeddings similarity search on PostgreSQL',
    recommendedOER: {
      title: 'NPTEL: Big Data & High-Dimensional Vector Search',
      type: 'Course',
      provider: 'NPTEL',
      url: 'https://nptel.ac.in/courses/106104189'
    }
  },
  {
    skillName: 'Distributed Caching (Redis Cluster)',
    category: 'Cloud/DevOps',
    studentLevel: 85,
    requiredLevel: 80,
    status: 'Mastered',
    bridgeProject: 'Zomato Menu Caching Performance Tuning',
    recommendedOER: {
      title: 'Redis Streams & Clustering Architecture',
      type: 'Video',
      provider: 'YouTube',
      url: 'https://www.youtube.com/@hnasr'
    }
  },
  {
    skillName: 'Kubernetes (Helm & Ingress Controllers)',
    category: 'Cloud/DevOps',
    studentLevel: 40,
    requiredLevel: 75,
    status: 'Critical Gap',
    bridgeProject: 'Deploy multi-pod microservice cluster with auto-scaling metrics',
    recommendedOER: {
      title: 'Nana Janashia: Kubernetes Complete Blueprint',
      type: 'Video',
      provider: 'YouTube',
      url: 'https://www.youtube.com/watch?v=X48VuDVv0do'
    }
  },
  {
    skillName: 'STAR Behavioral Communication',
    category: 'Soft Skills',
    studentLevel: 78,
    requiredLevel: 80,
    status: 'In Progress',
    bridgeProject: 'Complete 3 AI mock behavioral interview rounds',
    recommendedOER: {
      title: 'STAR Method Masterclass for FAANG Placement',
      type: 'Book',
      provider: 'Book Summary',
      url: 'https://bytebytego.com/'
    }
  }
];

export const SkillGapAnalysis: React.FC = () => {
  const { student, updateStudent } = useAuth();
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>(INITIAL_SKILL_GAPS);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const handleLevelUpSkill = (skillName: string) => {
    sound.playLevelUp();
    setSkillGaps(prev =>
      prev.map(item => {
        if (item.skillName === skillName) {
          const newLevel = Math.min(100, item.studentLevel + 15);
          const newStatus = newLevel >= item.requiredLevel ? 'Mastered' : 'In Progress';
          return {
            ...item,
            studentLevel: newLevel,
            status: newStatus
          };
        }
        return item;
      })
    );

    // Boost student readiness score slightly
    updateStudent({
      readinessScore: Math.min(99, student.readinessScore + 2),
      radarScores: {
        ...student.radarScores,
        technicalDepth: Math.min(100, student.radarScores.technicalDepth + 2)
      }
    });

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#10B981', '#7C3AED', '#38BDF8']
      });
    } catch {
      // fallback
    }
  };

  const categories = ['All', 'Core Language', 'Framework', 'Cloud/DevOps', 'Theory & Design', 'Soft Skills'];

  const filteredItems = filterCategory === 'All' 
    ? skillGaps 
    : skillGaps.filter(i => i.category === filterCategory);

  const masteredCount = skillGaps.filter(i => i.status === 'Mastered').length;
  const inProgressCount = skillGaps.filter(i => i.status === 'In Progress').length;
  const criticalGapCount = skillGaps.filter(i => i.status === 'Critical Gap').length;

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Target className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-white font-display">
              Skill Gap & Competency Delta Matrix
            </h2>
          </div>
          <p className="text-xs text-[#D4CDE6]/80 mt-1 max-w-xl">
            Side-by-side calibration comparing your verified profile against hiring prerequisites for <strong>{student.dreamRole}</strong>.
          </p>
        </div>

        {/* Metric Badges */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-2 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-center">
            <div className="text-lg font-black font-display leading-tight">{masteredCount}</div>
            <div className="text-[9px] font-bold uppercase">Mastered</div>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-center">
            <div className="text-lg font-black font-display leading-tight">{inProgressCount}</div>
            <div className="text-[9px] font-bold uppercase">In Progress</div>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-center">
            <div className="text-lg font-black font-display leading-tight">{criticalGapCount}</div>
            <div className="text-[9px] font-bold uppercase">Critical Gaps</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick();
              setFilterCategory(cat);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-purple-600 text-white shadow-glow'
                : 'bg-white/5 text-[#D4CDE6] hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Side-by-Side Comparison Table / Cards */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const delta = item.studentLevel - item.requiredLevel;
          const isMastered = item.status === 'Mastered';

          return (
            <div
              key={item.skillName}
              className={`p-5 rounded-3xl backdrop-blur-2xl border transition-all duration-200 ${
                isMastered 
                  ? 'bg-white/5 border-white/10' 
                  : item.status === 'In Progress' 
                  ? 'bg-amber-950/20 border-amber-500/30' 
                  : 'bg-rose-950/20 border-rose-500/30'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                
                {/* Col 1: Skill Title & Category (4 Cols) */}
                <div className="lg:col-span-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      isMastered ? 'bg-emerald-400' : item.status === 'In Progress' ? 'bg-amber-400' : 'bg-rose-400 animate-pulse'
                    }`} />
                    <h4 className="text-base font-bold text-white leading-tight">
                      {item.skillName}
                    </h4>
                  </div>
                  <span className="text-[10px] text-purple-300 font-mono">
                    Category: {item.category}
                  </span>
                </div>

                {/* Col 2: Score Comparison Bars (4 Cols) */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">Your Level: <strong className="text-white">{item.studentLevel}%</strong></span>
                    <span className="text-white/70">Required: <strong className="text-white">{item.requiredLevel}%</strong></span>
                  </div>

                  <div className="relative w-full h-2.5 bg-black/40 rounded-full overflow-hidden">
                    {/* Student Progress */}
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isMastered ? 'bg-emerald-400' : item.status === 'In Progress' ? 'bg-amber-400' : 'bg-rose-400'
                      }`}
                      style={{ width: `${item.studentLevel}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px]">
                    <span className={`font-bold ${delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {delta >= 0 ? `+${delta}% (Exceeds Required)` : `${delta}% (Skill Deficit)`}
                    </span>
                    <span className="text-white/50">{item.status}</span>
                  </div>
                </div>

                {/* Col 3: Recommended Bridge Project & Action (4 Cols) */}
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-between gap-2 border-t lg:border-t-0 pt-2 lg:pt-0 border-white/10">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">
                      Bridge Action:
                    </span>
                    <p className="text-[11px] text-[#D4CDE6] leading-tight">
                      {item.bridgeProject}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={item.recommendedOER.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-purple-300 font-semibold flex items-center gap-1 transition-colors truncate"
                    >
                      <span>{item.recommendedOER.provider}</span>
                      <ExternalLink className="w-2.5 h-2.5 flex-shrink-0" />
                    </a>

                    {!isMastered && (
                      <button
                        onClick={() => handleLevelUpSkill(item.skillName)}
                        className="px-3 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold transition-all flex items-center gap-1 whitespace-nowrap"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Log Practice (+15%)</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
