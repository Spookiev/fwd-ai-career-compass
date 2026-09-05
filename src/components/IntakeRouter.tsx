import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  FolderGit2, 
  HelpCircle, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  RefreshCw,
  Zap,
  BookOpen,
  FileCheck2,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EvidenceCollector } from './EvidenceCollector';
import { InterestDiscovery } from './InterestDiscovery';
import { FoundationDiscovery } from './FoundationDiscovery';
import { sound } from '../lib/sound';

export type IntakePathway = 'hub' | 'experience' | 'discovery' | 'foundation';

interface IntakeRouterProps {
  onComplete?: () => void;
  onExplorePossibilities?: () => void;
}

export const IntakeRouter: React.FC<IntakeRouterProps> = ({ 
  onComplete,
  onExplorePossibilities 
}) => {
  const { student, runTriangulation, isTriangulating } = useAuth();
  const [activePathway, setActivePathway] = useState<IntakePathway>('hub');
  const [completedTracks, setCompletedTracks] = useState<{
    experience: boolean;
    discovery: boolean;
    foundation: boolean;
  }>({
    experience: false,
    discovery: false,
    foundation: false
  });

  const handleSelectPathway = (pathway: IntakePathway) => {
    sound.playClick();
    setActivePathway(pathway);
  };

  const handleMarkTrackCompleted = (track: 'experience' | 'discovery' | 'foundation') => {
    setCompletedTracks(prev => ({ ...prev, [track]: true }));
    sound.playLevelUp();
    setActivePathway('hub');
  };

  const handleRunFullTriangulation = async () => {
    await runTriangulation();
    if (onExplorePossibilities) {
      onExplorePossibilities();
    } else if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Dynamic Header & Context Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/85 backdrop-blur-2xl border border-white/10 shadow-glass">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-500/15 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Compass className="w-5 h-5" />
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-black uppercase tracking-wider">
                Multi-Evidence Intake Engine
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display mt-2 tracking-tight">
              Tell FWD about you — you don't need to have your career figured out yet.
            </h1>
            
            <p className="text-xs sm:text-sm text-[#D4CDE6]/80 mt-1 max-w-2xl leading-relaxed">
              FWD does not decide your career for you. We help you discover, test, build, and prove your direction through evidence, intrinsic interests, and zero-gatekeeping exploration.
            </p>
          </div>

          {activePathway !== 'hub' ? (
            <button
              onClick={() => handleSelectPathway('hub')}
              className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all shadow-glass"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Pathways</span>
            </button>
          ) : (
            <button
              onClick={handleRunFullTriangulation}
              disabled={isTriangulating}
              className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#F14938] to-[#EC4899] text-white text-xs font-bold shadow-coral-glow hover:scale-105 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isTriangulating ? 'animate-spin' : ''}`} />
              <span>{isTriangulating ? 'Triangulating Evidence...' : 'Triangulate My Direction →'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Pathway Viewport Switcher */}
      {activePathway === 'hub' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Choose Your Entry Pathway</span>
            </h3>
            <span className="text-[11px] text-white/50">
              You can complete one, two, or all three anytime.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pathway A: Experience Track */}
            <div
              onClick={() => handleSelectPathway('experience')}
              className={`group cursor-pointer p-6 rounded-4xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                completedTracks.experience
                  ? 'bg-purple-950/40 border-purple-500/50 shadow-glow'
                  : 'bg-[var(--theme-surface)]/80 hover:bg-[var(--theme-surface)] border-white/10 hover:border-purple-400/40 shadow-glass hover:scale-[1.02]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 group-hover:scale-110 transition-transform">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  {completedTracks.experience ? (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Evidence Connected</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-[10px] font-mono">
                      Option A
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-black text-white font-display">
                    I Have Existing Experience
                  </h4>
                  <p className="text-xs text-[#D4CDE6]/80 mt-1.5 leading-relaxed">
                    Connect your GitHub, LeetCode, optional PDF resume, university marks, or project links to calibrate claimed vs evidenced skills.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-purple-300 group-hover:text-white transition-colors">
                <span>Open Evidence Collector</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pathway B: Interest Discovery Track */}
            <div
              onClick={() => handleSelectPathway('discovery')}
              className={`group cursor-pointer p-6 rounded-4xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                completedTracks.discovery
                  ? 'bg-pink-950/40 border-pink-500/50 shadow-glow'
                  : 'bg-[var(--theme-surface)]/80 hover:bg-[var(--theme-surface)] border-white/10 hover:border-pink-400/40 shadow-glass hover:scale-[1.02]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  {completedTracks.discovery ? (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Interests Calibrated</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-[10px] font-mono">
                      Option B
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-black text-white font-display">
                    I Am Still Figuring Things Out
                  </h4>
                  <p className="text-xs text-[#D4CDE6]/80 mt-1.5 leading-relaxed">
                    Explore 8–12 scenario choice cards and 4 bi-directional workstyle sliders to uncover how you naturally prefer to solve problems.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-pink-300 group-hover:text-white transition-colors">
                <span>Start Interest Discovery</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pathway C: Beginner Foundation Track */}
            <div
              onClick={() => handleSelectPathway('foundation')}
              className={`group cursor-pointer p-6 rounded-4xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                completedTracks.foundation
                  ? 'bg-cyan-950/40 border-cyan-500/50 shadow-glow'
                  : 'bg-[var(--theme-surface)]/80 hover:bg-[var(--theme-surface)] border-white/10 hover:border-cyan-400/40 shadow-glass hover:scale-[1.02]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  {completedTracks.foundation ? (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Foundations Mapped</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-[10px] font-mono">
                      Option C
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-black text-white font-display">
                    I'm a Complete Beginner
                  </h4>
                  <p className="text-xs text-[#D4CDE6]/80 mt-1.5 leading-relaxed">
                    Zero technical background? No problem. Discover your core logic, creative communication, and non-coding strengths with zero stress.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-cyan-300 group-hover:text-white transition-colors">
                <span>Explore Foundation Discovery</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

          {/* Quick Summary Banner & Triangulation Launcher */}
          <div className="p-6 rounded-3xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-[#D4CDE6]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Current Profile Identity: <strong className="text-white">{student.displayName}</strong> ({student.major}, {student.university})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRunFullTriangulation}
                disabled={isTriangulating}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-glow flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Run Live Multi-Evidence Triangulation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pathway A Component View */}
      {activePathway === 'experience' && (
        <EvidenceCollector
          onSaved={() => handleMarkTrackCompleted('experience')}
          onBack={() => setActivePathway('hub')}
        />
      )}

      {/* Pathway B Component View */}
      {activePathway === 'discovery' && (
        <InterestDiscovery
          onSaved={() => handleMarkTrackCompleted('discovery')}
          onBack={() => setActivePathway('hub')}
        />
      )}

      {/* Pathway C Component View */}
      {activePathway === 'foundation' && (
        <FoundationDiscovery
          onSaved={() => handleMarkTrackCompleted('foundation')}
          onBack={() => setActivePathway('hub')}
        />
      )}

    </div>
  );
};
