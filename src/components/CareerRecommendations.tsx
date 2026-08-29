import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  Bookmark, 
  BookmarkCheck, 
  Flame,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CareerRecommendation } from '../types';
import { generateCareerRecommendations } from '../lib/gemini';
import { sound } from '../lib/sound';

interface CareerRecommendationsProps {
  onAdoptRoadmap: (roleTitle: string) => void;
  onExploreRole: (roleId: string) => void;
}

export const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({
  onAdoptRoadmap,
  onExploreRole,
}) => {
  const { student, recommendations, setRecommendations, savedCareers, toggleSaveCareer } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecId, setSelectedRecId] = useState<string>(recommendations[0]?.id || 'rec-1');

  const handleRegenerateWithGemini = async () => {
    sound.playLevelUp();
    setIsLoading(true);
    try {
      const results = await generateCareerRecommendations(student);
      setRecommendations(results);
      if (results[0]) {
        setSelectedRecId(results[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const activeRec = recommendations.find(r => r.id === selectedRecId) || recommendations[0];

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white shadow-glow">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                Top 5 Transparent AI Career Matches
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase">
                Gemini 2.5 Explainability
              </span>
            </div>
            <p className="text-xs text-[#D4CDE6]/80 mt-0.5">
              Multi-factor algorithmic fit matching your academic coursework, project inventory, and {student.aptitudeTier} diagnostics.
            </p>
          </div>
        </div>

        <button
          onClick={handleRegenerateWithGemini}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all shadow-glass self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Synthesizing with Gemini...' : 'Recalculate AI Matches'}</span>
        </button>
      </div>

      {/* Main Grid: Left Selector List (4 Cols) + Right Detailed Explainability Card (8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Match Card List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300 px-1">
            Ranked Career Pathways
          </span>

          <div className="space-y-2.5">
            {recommendations.map((rec, index) => {
              const isSelected = rec.id === activeRec.id;
              const isSaved = savedCareers.includes(rec.id);

              return (
                <div
                  key={rec.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedRecId(rec.id);
                  }}
                  className={`p-4 rounded-3xl cursor-pointer transition-all duration-200 border relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-900/60 to-pink-900/40 border-purple-400 shadow-glow scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-black/40 flex items-center justify-center font-black text-xs text-amber-300 font-mono">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {rec.roleTitle}
                        </h4>
                        <span className="text-[11px] text-[#D4CDE6]/70">
                          {rec.salaryRange}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 font-display">
                        {rec.matchScore}%
                      </span>
                      <div className="text-[9px] text-white/50 font-medium">Fit Score</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/10 text-[11px]">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <TrendingUp className="w-3 h-3" />
                      <span>{rec.growthRate}</span>
                    </span>
                    <span className="text-white/60">
                      ~{rec.recommendedTimelineMonths} Mo. Pathway
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Explainability Dossier */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-6">
          
          {/* Role Header & Actions */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-white font-display">
                  {activeRec.roleTitle}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  {activeRec.matchScore}% Synergy
                </span>
              </div>
              <p className="text-xs text-[#D4CDE6]/70 mt-1">
                Market Demand: <strong className="text-white">{activeRec.marketDemand}</strong> • Est. Comp: <strong className="text-white">{activeRec.salaryRange}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSaveCareer(activeRec.id)}
                className={`p-2 rounded-xl border transition-colors ${
                  savedCareers.includes(activeRec.id)
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
                title="Bookmark Career Pathway"
              >
                {savedCareers.includes(activeRec.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  sound.playLevelUp();
                  onAdoptRoadmap(activeRec.roleTitle);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F14938] to-[#EC4899] text-white text-xs font-bold shadow-coral-glow hover:scale-105 transition-all flex items-center gap-1.5"
              >
                <span>Adopt Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Transparent AI Explainability Box */}
          <div className="p-4 rounded-3xl bg-purple-950/40 border border-purple-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-purple-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Transparent AI Rationale (Why You Match)</span>
            </div>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              {activeRec.whyFitRationale}
            </p>
          </div>

          {/* Candidate Strengths & Priority Missing Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Strengths */}
            <div className="p-4 rounded-3xl bg-emerald-950/25 border border-emerald-500/30 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Candidate Strengths</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#D4CDE6]">
                {activeRec.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Priority Skill Gaps */}
            <div className="p-4 rounded-3xl bg-amber-950/25 border border-amber-500/30 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>Priority Missing Skills to Bridge</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeRec.priorityMissingSkills.map((gap, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-500/30 text-[11px] font-semibold">
                    {gap}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Action bar */}
          <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-[#D4CDE6]/80">
              Estimated effort: <strong>{activeRec.recommendedTimelineMonths} Months</strong> to reach 90%+ readiness.
            </span>
            <button
              onClick={() => {
                sound.playClick();
                onExploreRole(activeRec.id);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
            >
              Explore Free OER Syllabus →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
