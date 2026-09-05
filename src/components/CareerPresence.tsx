import React from 'react';
import { 
  ShieldCheck, 
  Github, 
  Linkedin, 
  FileText, 
  Globe, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  AlertTriangle,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sound } from '../lib/sound';

export const CareerPresence: React.FC = () => {
  const { presence, togglePresenceCheck, student } = useAuth();
  const { breakdown, overallScore } = presence;

  const handleToggle = (section: 'github' | 'linkedIn' | 'resumeAts' | 'portfolio', key: string) => {
    togglePresenceCheck(section, key);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white shadow-glow">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-black uppercase">
              Phase 5 Architecture
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
            Multidimensional Career Presence Hub
          </h2>
          <p className="text-xs sm:text-sm text-[#D4CDE6]/80 max-w-xl">
            A great portfolio without proof is invisible. Audit your public engineering footprint across GitHub, LinkedIn, ATS resume keywords, and case studies.
          </p>
        </div>

        {/* Overall Score Dial */}
        <div className="p-5 rounded-3xl bg-black/40 border border-white/10 flex items-center gap-4 self-start md:self-auto">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                className="text-white/10"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="5"
                strokeDasharray={163}
                strokeDashoffset={163 - (163 * overallScore) / 100}
                className="text-emerald-400 transition-all duration-1000"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-base font-black text-white font-display">
              {overallScore}%
            </span>
          </div>

          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Presence Health</div>
            <div className="text-[11px] text-emerald-400 font-semibold">
              {overallScore >= 80 ? 'Tier-1 Recruiter Ready' : 'Emerging Footprint'}
            </div>
            <div className="text-[9px] text-white/50">Weighted across 5 channels</div>
          </div>
        </div>
      </div>

      {/* Actionable Insight Notice Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-950/70 via-pink-950/40 to-black/60 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0" />
          <p className="text-xs text-white/90 leading-relaxed">
            <strong>Recruiter Signal:</strong> Your <span className="text-purple-300 font-bold">{student.dreamRole}</span> skills are at <span className="text-emerald-300 font-bold">{student.aptitudeTier}</span>, but your GitHub presence is lagging behind (missing live deployed demo links). Let's fix that today.
          </p>
        </div>

        <button
          onClick={() => sound.playClick()}
          className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold whitespace-nowrap transition-colors"
        >
          View 1-Click Fix Checklist →
        </button>
      </div>

      {/* 4 Multi-Channel Audit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Channel 1: GitHub Profile Hygiene */}
        <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Github className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">GitHub Profile Hygiene</h4>
                <span className="text-[10px] text-white/50">Code evidence & commit proof</span>
              </div>
            </div>

            <span className="text-sm font-black text-purple-300 font-mono">
              {breakdown.github.score}%
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <label 
              onClick={() => handleToggle('github', 'bio')}
              className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-black/40 transition-colors"
            >
              <span className="text-[#D4CDE6]">Compelling technical bio with current focus</span>
              <input
                type="checkbox"
                checked={breakdown.github.checklist.bio}
                onChange={() => {}}
                className="w-4 h-4 rounded text-purple-600 accent-purple-500 cursor-pointer"
              />
            </label>

            <label 
              onClick={() => handleToggle('github', 'readme')}
              className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-black/40 transition-colors"
            >
              <span className="text-[#D4CDE6]">Custom profile README with dynamic tech badges</span>
              <input
                type="checkbox"
                checked={breakdown.github.checklist.readme}
                onChange={() => {}}
                className="w-4 h-4 rounded text-purple-600 accent-purple-500 cursor-pointer"
              />
            </label>

            <label 
              onClick={() => handleToggle('github', 'pinnedRepos')}
              className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-black/40 transition-colors"
            >
              <span className="text-[#D4CDE6]">Top 4 starred/pinned repositories organized</span>
              <input
                type="checkbox"
                checked={breakdown.github.checklist.pinnedRepos}
                onChange={() => {}}
                className="w-4 h-4 rounded text-purple-600 accent-purple-500 cursor-pointer"
              />
            </label>

            <label 
              onClick={() => handleToggle('github', 'liveLinks')}
              className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-black/40 transition-colors"
            >
              <span className="text-[#D4CDE6]">Live deployed demo URLs attached to pinned repos</span>
              <input
                type="checkbox"
                checked={breakdown.github.checklist.liveLinks}
                onChange={() => {}}
                className="w-4 h-4 rounded text-purple-600 accent-purple-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Channel 2: LinkedIn Profile Optimization */}
        <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <Linkedin className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">LinkedIn Optimization</h4>
                <span className="text-[10px] text-white/50">Recruiter search indexing</span>
              </div>
            </div>

            <span className="text-sm font-black text-blue-300 font-mono">
              {breakdown.linkedIn.score}%
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <label 
              onClick={() => handleToggle('linkedIn', 'headline')}
              className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-black/40 transition-colors"
            >
              <span className="text-[#D4CDE6]">High-impact headline (e.g., "Full Stack AI @ NIT | Next.js & PyTorch")</span>
              <input
                type="checkbox"
                checked={breakdown.linkedIn.checklist.headline}
                onChange={() => {}}
                className="w-4 h-4 rounded text-blue-600 accent-blue-500 cursor-pointer"
              />
            </label>

            <label 
              onClick={() => handleToggle('linkedIn', 'about')}
              className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-black/40 transition-colors"
            >
              <span className="text-[#D4CDE6]">Story-driven "About" section with quantified achievements</span>
              <input
                type="checkbox"
                checked={breakdown.linkedIn.checklist.about}
                onChange={() => {}}
                className="w-4 h-4 rounded text-blue-600 accent-blue-500 cursor-pointer"
              />
            </label>

            <label 
              onClick={() => handleToggle('linkedIn', 'experience')}
              className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-black/40 transition-colors"
            >
              <span className="text-[#D4CDE6]">Internships & project bullets with STAR metrics</span>
              <input
                type="checkbox"
                checked={breakdown.linkedIn.checklist.experience}
                onChange={() => {}}
                className="w-4 h-4 rounded text-blue-600 accent-blue-500 cursor-pointer"
              />
            </label>

            <label 
              onClick={() => handleToggle('linkedIn', 'skills')}
              className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-black/40 transition-colors"
            >
              <span className="text-[#D4CDE6]">Top 5 endorsed skill badges aligned with target role</span>
              <input
                type="checkbox"
                checked={breakdown.linkedIn.checklist.skills}
                onChange={() => {}}
                className="w-4 h-4 rounded text-blue-600 accent-blue-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Channel 3: ATS Resume Health */}
        <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <FileText className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">ATS Placement Readiness</h4>
                <span className="text-[10px] text-white/50">Keyword coverage & bullet density</span>
              </div>
            </div>

            <span className="text-sm font-black text-emerald-400 font-mono">
              {breakdown.resumeAts.score}/100
            </span>
          </div>

          <div className="p-4 rounded-3xl bg-black/30 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-medium">Missing Keywords in Resume:</span>
              <span className="text-[10px] text-amber-300 font-bold">{breakdown.resumeAts.missingKeywords.length} Detected</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {breakdown.resumeAts.missingKeywords.map((kw, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-[10px] text-amber-200">
                  + {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Channel 4: Portfolio & Case Studies */}
        <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                <Globe className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Portfolio & Case Studies</h4>
                <span className="text-[10px] text-white/50">Visual craft & user storytelling</span>
              </div>
            </div>

            <span className="text-sm font-black text-pink-300 font-mono">
              {breakdown.portfolio.score}%
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <label 
              onClick={() => handleToggle('portfolio', 'responsive')}
              className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-black/40 transition-colors"
            >
              <span className="text-[#D4CDE6]">Mobile-responsive layout with sub-second page loads</span>
              <input
                type="checkbox"
                checked={breakdown.portfolio.responsive}
                onChange={() => {}}
                className="w-4 h-4 rounded text-pink-600 accent-pink-500 cursor-pointer"
              />
            </label>

            <label 
              onClick={() => handleToggle('portfolio', 'caseStudies')}
              className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-black/40 transition-colors"
            >
              <span className="text-[#D4CDE6]">Deep-dive case study with architecture diagram & trade-offs</span>
              <input
                type="checkbox"
                checked={breakdown.portfolio.caseStudies}
                onChange={() => {}}
                className="w-4 h-4 rounded text-pink-600 accent-pink-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

      </div>

    </div>
  );
};
