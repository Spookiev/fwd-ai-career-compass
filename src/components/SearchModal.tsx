import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Compass, 
  Layers, 
  FileText, 
  Terminal, 
  TrendingUp, 
  Activity, 
  BookOpen, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ActiveTab } from './Navbar';
import { CAREER_ROLES_DATA } from '../data/careerExplorerData';
import { sound } from '../lib/sound';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: ActiveTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playClick();
        if (isOpen) onClose();
        else onClose(); // parent toggles
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { label: '5-Minute Diagnostic Skill Calibrator', tab: 'diagnostic' as ActiveTab, icon: Sparkles, cat: 'Assessment' },
    { label: 'Top 5 AI Career Match Explanations', tab: 'recommendations' as ActiveTab, icon: Compass, cat: 'AI Guidance' },
    { label: 'Tiered Milestone Roadmap & Tasks', tab: 'roadmap' as ActiveTab, icon: Layers, cat: 'Curriculum' },
    { label: 'ATS Resume Auditor & Quantifier', tab: 'resume' as ActiveTab, icon: FileText, cat: 'Placement' },
    { label: 'Multi-Track AI Interview Simulator', tab: 'interview' as ActiveTab, icon: Terminal, cat: 'Preparation' },
    { label: 'Live Tech Momentum & Salary Charts', tab: 'jobmarket' as ActiveTab, icon: TrendingUp, cat: 'Analytics' },
    { label: 'Fatigue Gauge & Pomodoro Focus Timer', tab: 'workload' as ActiveTab, icon: Activity, cat: 'Workload' },
  ];

  const matchedRoles = CAREER_ROLES_DATA.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.topSkillsRequired.some(s => s.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedActions = quickActions.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.cat.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#140E24] border border-purple-500/30 shadow-2xl overflow-hidden">
        
        {/* Search Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-black/30">
          <Search className="w-5 h-5 text-purple-300" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a career role, skill, or platform tool..."
            className="flex-1 bg-transparent text-white placeholder-white/40 text-sm focus:outline-none"
          />
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4 text-xs">
          
          {/* Quick Tools */}
          {matchedActions.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 px-2">
                Platform Tools & Engines
              </span>
              <div className="space-y-1">
                {matchedActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.tab}
                      onClick={() => {
                        sound.playClick();
                        onSelectTab(action.tab);
                        onClose();
                      }}
                      className="flex items-center justify-between w-full p-2.5 rounded-2xl hover:bg-purple-600/20 text-[#D4CDE6] hover:text-white transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-xl bg-white/5 group-hover:bg-purple-500/30 text-purple-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-white">{action.label}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/50">{action.cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* OER Roles */}
          {matchedRoles.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 px-2">
                Career Pathways & OER Syllabi
              </span>
              <div className="space-y-1">
                {matchedRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      sound.playClick();
                      onSelectTab('explorer');
                      onClose();
                    }}
                    className="flex items-center justify-between w-full p-2.5 rounded-2xl hover:bg-cyan-600/20 text-[#D4CDE6] hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-xl bg-white/5 group-hover:bg-cyan-500/30 text-cyan-300">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-white">{role.title}</div>
                        <div className="text-[10px] text-white/50">{role.averageSalary} • {role.category}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-cyan-300" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
