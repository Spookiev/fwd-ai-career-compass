import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  DollarSign, 
  TrendingUp, 
  Briefcase, 
  Award, 
  Youtube, 
  FileText, 
  Bookmark, 
  BookmarkCheck,
  CheckCircle2
} from 'lucide-react';
import { CAREER_ROLES_DATA } from '../data/careerExplorerData';
import { useAuth } from '../context/AuthContext';
import { CareerExplorerRole, ResourceLink } from '../types';
import { sound } from '../lib/sound';

interface CareerExplorerProps {
  onAdoptRoadmap: (roleTitle: string) => void;
}

export const CareerExplorer: React.FC<CareerExplorerProps> = ({ onAdoptRoadmap }) => {
  const { savedCareers, toggleSaveCareer } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRole, setActiveRole] = useState<CareerExplorerRole>(CAREER_ROLES_DATA[0]);

  const categories = ['All', 'AI & Data', 'Software & Systems', 'Cloud & Security', 'Product & Strategy'];

  const filteredRoles = CAREER_ROLES_DATA.filter(role => {
    const matchesCat = selectedCategory === 'All' || role.category === selectedCategory;
    const matchesSearch = role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.topSkillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const getProviderIcon = (provider: ResourceLink['provider']) => {
    switch (provider) {
      case 'NPTEL':
        return <Award className="w-4 h-4 text-orange-400" />;
      case 'Coursera Free':
        return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'YouTube':
        return <Youtube className="w-4 h-4 text-red-400" />;
      case 'Book Summary':
        return <FileText className="w-4 h-4 text-emerald-400" />;
      default:
        return <ExternalLink className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-white font-display">
              Open Educational Resources (OER) Career Directory
            </h2>
          </div>
          <p className="text-xs text-[#D4CDE6]/80 mt-1 max-w-xl">
            Curated, 100% free learning pathways aligned with NPTEL/SWAYAM, Coursera audit tracks, and open-source textbook repositories.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles or skills..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-400 transition-all"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick();
              setSelectedCategory(cat);
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-glow'
                : 'bg-white/5 text-[#D4CDE6] hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Roles Directory (5 Cols) + Right OER Course Syllabus (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Role Cards */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300 px-1">
            Career Roles ({filteredRoles.length})
          </span>

          <div className="space-y-2.5">
            {filteredRoles.map((role) => {
              const isSelected = role.id === activeRole.id;
              const isSaved = savedCareers.includes(role.id);

              return (
                <div
                  key={role.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveRole(role);
                  }}
                  className={`p-4 rounded-3xl cursor-pointer border transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-900/60 to-pink-900/40 border-purple-400 shadow-glow scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-bold uppercase">
                        {role.category}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1 leading-tight">
                        {role.title}
                      </h4>
                      <p className="text-[11px] text-[#D4CDE6]/70 mt-0.5">
                        {role.averageSalary}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveCareer(role.id);
                      }}
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-amber-300 transition-colors"
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {role.topSkillsRequired.slice(0, 3).map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-lg bg-black/40 border border-white/5 text-[9px] text-white/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed OER Curriculum & Free Courses */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-6">
          
          <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                {activeRole.category}
              </span>
              <h3 className="text-2xl font-black text-white font-display mt-0.5">
                {activeRole.title}
              </h3>
              <p className="text-xs text-[#D4CDE6]/80 mt-1 max-w-lg">
                {activeRole.description}
              </p>
            </div>

            <button
              onClick={() => {
                sound.playLevelUp();
                onAdoptRoadmap(activeRole.title);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F14938] to-[#EC4899] text-white text-xs font-bold shadow-coral-glow hover:scale-105 transition-all"
            >
              Adopt This Roadmap →
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5">
              <span className="text-[10px] font-bold text-white/50 uppercase">Average Compensation</span>
              <div className="text-sm font-black text-emerald-400 mt-0.5">{activeRole.averageSalary}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5">
              <span className="text-[10px] font-bold text-white/50 uppercase">Industry Growth</span>
              <div className="text-sm font-black text-purple-300 mt-0.5">{activeRole.growthTrajectory}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-white/50 uppercase">Active Openings</span>
              <div className="text-sm font-black text-cyan-300 mt-0.5">{activeRole.openPositionsCount}+ Roles</div>
            </div>
          </div>

          {/* Verified OER Resources List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Verified Free OER Syllabus & Course Links</span>
              </h4>
              <span className="text-[10px] text-white/50 font-mono">100% Free / Open Access</span>
            </div>

            <div className="space-y-2.5">
              {activeRole.oerResources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 mt-0.5">
                      {getProviderIcon(res.provider)}
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                        {res.title}
                      </h5>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-[#D4CDE6]/70">
                        <span className="font-semibold text-purple-200">{res.provider}</span>
                        {res.duration && <span>• {res.duration}</span>}
                        {res.rating && <span>• ★ {res.rating}/5.0</span>}
                      </div>
                    </div>
                  </div>

                  <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors flex-shrink-0 mt-1" />
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
