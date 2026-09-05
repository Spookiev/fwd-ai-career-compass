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
  Calendar,
  Layers,
  Award,
  ShieldCheck,
  Target
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CareerFamily, CareerPossibilityMatch } from '../types';
import { sound } from '../lib/sound';
import { MiniTrialModal } from './MiniTrialModal';

interface CareerRecommendationsProps {
  onAdoptRoadmap: (roleTitle: string) => void;
  onExploreRole: (roleId: string) => void;
}

export const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({
  onAdoptRoadmap,
  onExploreRole,
}) => {
  const { 
    student, 
    possibilityMap, 
    runTriangulation, 
    isTriangulating, 
    adoptPossibilityRoadmap,
    savedCareers, 
    toggleSaveCareer 
  } = useAuth();

  const [selectedFamily, setSelectedFamily] = useState<'All' | CareerFamily>('All');
  const [selectedRoleId, setSelectedRoleId] = useState<string>(
    possibilityMap.matches[0]?.roleId || 'role-fs-ai'
  );
  const [activeMiniTrialMatch, setActiveMiniTrialMatch] = useState<CareerPossibilityMatch | null>(null);

  const filteredMatches = selectedFamily === 'All'
    ? possibilityMap.matches
    : possibilityMap.matches.filter(m => m.family === selectedFamily);

  const activeMatch = possibilityMap.matches.find(m => m.roleId === selectedRoleId) || possibilityMap.matches[0];

  const handleRecalculate = async () => {
    sound.playLevelUp();
    await runTriangulation();
  };

  const getCriticalityBadge = (criticality: 'Blocker' | 'Priority' | 'Differentiator') => {
    switch (criticality) {
      case 'Blocker':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Priority':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Differentiator':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    }
  };

  const getFamilyGradient = (family: CareerFamily) => {
    switch (family) {
      case 'Technology':
        return 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-300';
      case 'Product & Business':
        return 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300';
      case 'Creative':
        return 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-300';
      case 'Communication':
        return 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300';
    }
  };

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
                Dynamic Career Possibility Map
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase">
                FWD 2.0 Triangulation
              </span>
            </div>
            <p className="text-xs text-[#D4CDE6]/80 mt-0.5">
              Explainable multi-evidence matching spanning 4 career families, low-risk 7-day mini trials, and categorized skill gap analysis.
            </p>
          </div>
        </div>

        <button
          onClick={handleRecalculate}
          disabled={isTriangulating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all shadow-glass self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isTriangulating ? 'animate-spin' : ''}`} />
          <span>{isTriangulating ? 'Triangulating Profile...' : 'Recalculate Possibility Map'}</span>
        </button>
      </div>

      {/* Career Family Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['All', 'Technology', 'Product & Business', 'Creative', 'Communication'] as const).map((family) => {
          const isActive = selectedFamily === family;
          return (
            <button
              key={family}
              onClick={() => {
                sound.playClick();
                setSelectedFamily(family);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-400 shadow-glow'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 border-white/10'
              }`}
            >
              {family === 'All' ? '🌟 All Pathways' : family}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Left Pathway Selector (5 Cols) + Right Detailed Dossier (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Match Card List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Ranked Matches ({filteredMatches.length})
            </span>
            <span className="text-[11px] text-white/50">
              Updated from verified evidence
            </span>
          </div>

          <div className="space-y-2.5">
            {filteredMatches.map((match, index) => {
              const isSelected = activeMatch && match.roleId === activeMatch.roleId;

              return (
                <div
                  key={match.roleId}
                  onClick={() => {
                    sound.playClick();
                    setSelectedRoleId(match.roleId);
                  }}
                  className={`p-4 rounded-3xl cursor-pointer transition-all duration-200 border relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-900/60 to-pink-900/40 border-purple-400 shadow-glow scale-[1.01]'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-black/40 flex items-center justify-center font-black text-xs text-amber-300 font-mono">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white leading-tight">
                            {match.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold ${getFamilyGradient(match.family)}`}>
                            {match.family}
                          </span>
                          <span className="text-[10px] text-purple-300/80 font-medium">
                            {match.matchType}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 font-display">
                        {match.compatibilityScore}%
                      </span>
                      <div className="text-[9px] text-white/50 font-medium">Fit Synergy</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/10 text-[11px]">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <TrendingUp className="w-3 h-3" />
                      <span>{match.growthRate || '+24% YoY'}</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        setActiveMiniTrialMatch(match);
                      }}
                      className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold text-[10px] bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/30"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>7-Day Mini-Trial</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Explainability Dossier */}
        {activeMatch && (
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-6">
            
            {/* Role Header & Actions */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-2xl font-black text-white font-display">
                    {activeMatch.title}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${getFamilyGradient(activeMatch.family)}`}>
                    {activeMatch.family}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    {activeMatch.compatibilityScore}% Synergy
                  </span>
                </div>
                <p className="text-xs text-[#D4CDE6]/70 mt-1">
                  Est. Comp: <strong className="text-white">{activeMatch.salaryRange || '$110,000 - $145,000'}</strong> • Market Trajectory: <strong className="text-white">{activeMatch.growthRate || '+24% YoY'}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveCareer(activeMatch.roleId)}
                  className={`p-2 rounded-xl border transition-colors ${
                    savedCareers.includes(activeMatch.roleId)
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                  title="Bookmark Career Pathway"
                >
                  {savedCareers.includes(activeMatch.roleId) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    sound.playLevelUp();
                    adoptPossibilityRoadmap(activeMatch.roleId);
                    onAdoptRoadmap(activeMatch.title);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F14938] to-[#EC4899] text-white text-xs font-bold shadow-coral-glow hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <span>Adopt Pathway</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Why It Suits You & What May Challenge You (Transparent Non-Opaque AI) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Why this suits you */}
              <div className="p-4 rounded-3xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-300 uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Why This Suits You</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#D4CDE6]">
                  {activeMatch.whyItSuitsYou.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What may challenge you */}
              <div className="p-4 rounded-3xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-rose-300 uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  <span>What May Challenge You</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#D4CDE6]">
                  {activeMatch.whatMayChallengeYou.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Categorized Skill Gaps (Blocker / Priority / Differentiator) */}
            <div className="p-4 rounded-3xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span>Categorized Skill Gap Analysis</span>
                </div>
                <span className="text-[10px] text-white/50">
                  Tiered by career barrier impact
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {activeMatch.skillGaps.map((gap, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-1.5 rounded-2xl border flex items-center gap-2 ${getCriticalityBadge(gap.criticality)}`}
                  >
                    <span className="text-xs font-bold text-white">{gap.skill}</span>
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-black/40">
                      {gap.criticality}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7-Day Mini-Trial Banner */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-900/40 via-pink-900/20 to-purple-900/40 border border-purple-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    7-Day Career Simulation: {activeMatch.miniTrial.title}
                  </h4>
                  <p className="text-[11px] text-[#D4CDE6]/70">
                    Test drive real day-to-day workflow tasks with zero long-term commitment.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveMiniTrialMatch(activeMatch);
                }}
                className="px-4 py-2 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>Launch 7-Day Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Action Bar */}
            <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#D4CDE6]/80 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified against Student Career Guardrails</span>
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  onExploreRole(activeMatch.roleId);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors"
              >
                Explore Free OER Syllabus →
              </button>
            </div>

          </div>
        )}

      </div>

      {/* 7-Day Mini-Trial Modal */}
      <MiniTrialModal
        match={activeMiniTrialMatch}
        isOpen={!!activeMiniTrialMatch}
        onClose={() => setActiveMiniTrialMatch(null)}
        onAdoptRoadmap={(title) => {
          onAdoptRoadmap(title);
          setActiveMiniTrialMatch(null);
        }}
      />

    </div>
  );
};
