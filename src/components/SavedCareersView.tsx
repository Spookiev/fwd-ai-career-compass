import React from 'react';
import { 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  TrendingUp, 
  DollarSign, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CAREER_ROLES_DATA } from '../data/careerExplorerData';
import { sound } from '../lib/sound';

interface SavedCareersViewProps {
  onAdoptRoadmap: (roleTitle: string) => void;
  onExploreRole: () => void;
}

export const SavedCareersView: React.FC<SavedCareersViewProps> = ({
  onAdoptRoadmap,
  onExploreRole,
}) => {
  const { savedCareers, toggleSaveCareer } = useAuth();

  const savedRoles = CAREER_ROLES_DATA.filter(role => savedCareers.includes(role.id));

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Bookmark className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-white font-display">
              Saved Career Pathways & Comparative Targets
            </h2>
          </div>
          <p className="text-xs text-[#D4CDE6]/80 mt-1">
            Bookmarked career trajectories for side-by-side compensation and syllabus review.
          </p>
        </div>

        <button
          onClick={onExploreRole}
          className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow-glass self-start md:self-auto"
        >
          Explore More Roles →
        </button>
      </div>

      {savedRoles.length === 0 ? (
        <div className="p-12 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass text-center space-y-3">
          <Bookmark className="w-12 h-12 text-white/30 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Bookmarked Careers Yet</h3>
          <p className="text-xs text-[#D4CDE6]/70 max-w-sm mx-auto">
            Browse the OER Explorer or AI Recommendations and click the bookmark icon to save roles for comparative analysis.
          </p>
          <button
            onClick={onExploreRole}
            className="px-5 py-2.5 rounded-2xl bg-purple-600 text-white text-xs font-bold shadow-glow hover:scale-105 transition-all mt-2"
          >
            Open Career Explorer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRoles.map((role) => (
            <div
              key={role.id}
              className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase">
                    {role.category}
                  </span>
                  <button
                    onClick={() => toggleSaveCareer(role.id)}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {role.title}
                  </h3>
                  <p className="text-xs text-[#D4CDE6]/70 mt-1 line-clamp-2">
                    {role.description}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-black/30 border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/50">Compensation:</span>
                    <span className="font-bold text-emerald-400">{role.averageSalary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Growth Rate:</span>
                    <span className="font-semibold text-purple-300">{role.growthTrajectory}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-white/50 uppercase">Key Prerequisite Skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {role.topSkillsRequired.slice(0, 4).map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-[#D4CDE6]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playLevelUp();
                  onAdoptRoadmap(role.title);
                }}
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-xs font-bold shadow-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5 mt-2"
              >
                <span>Adopt Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
