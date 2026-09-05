import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  Target, 
  Layers, 
  FileText, 
  Terminal, 
  TrendingUp, 
  Activity, 
  GraduationCap, 
  Palette, 
  Volume2, 
  VolumeX, 
  Key, 
  UserCheck, 
  BookOpen, 
  CheckCircle,
  Menu,
  X,
  Search,
  Globe,
  Heart,
  Flame,
  Award,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { FWDLogo } from './FWDLogo';
import { useTheme, THEME_CONFIGS } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { ThemeId } from '../types';
import { sound } from '../lib/sound';
import { getGeminiApiKey } from '../lib/gemini';

export type ActiveTab = 
  | 'dashboard'
  | 'intake'
  | 'diagnostic'
  | 'recommendations'
  | 'presence'
  | 'wellbeing'
  | 'explorer'
  | 'skillgap'
  | 'roadmap'
  | 'resume'
  | 'interview'
  | 'jobmarket'
  | 'workload'
  | 'faculty'
  | 'saved';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenApiKeyModal: () => void;
  onOpenProfileBuilder: () => void;
  onOpenSearch: () => void;
  onOpenAvatarModal?: () => void;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenApiKeyModal,
  onOpenProfileBuilder,
  onOpenSearch,
  onOpenAvatarModal,
}) => {
  const { currentTheme, setTheme, isAudioMuted, toggleAudio, customValues, updateCustomTheme } = useTheme();
  const { role, setRole, student, presence, wellbeing, avatar, switchDemoStudent } = useAuth();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hasApiKey = !!getGeminiApiKey();

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    sound.playClick();
    setIsMobileMenuOpen(false);
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Pro Card', icon: Target },
    { id: 'intake', label: 'Intake Hub', icon: Zap, badge: '3-Track' },
    { id: 'recommendations', label: 'AI Matches', icon: Compass },
    { id: 'presence', label: 'Career Presence', icon: Globe, badge: `${presence.overallScore}%` },
    { id: 'wellbeing', label: 'Wellbeing', icon: Heart, badge: `${wellbeing.currentStreak}🔥` },
    { id: 'roadmap', label: 'Roadmap', icon: Layers, badge: `${student.readinessScore}%` },
    { id: 'diagnostic', label: 'Diagnostic', icon: Sparkles, badge: '5-Min' },
    { id: 'skillgap', label: 'Skill Gap', icon: CheckCircle },
    { id: 'explorer', label: 'OER Explorer', icon: BookOpen },
    { id: 'resume', label: 'ATS Auditor', icon: FileText },
    { id: 'interview', label: 'Interview Prep', icon: Terminal },
    { id: 'jobmarket', label: 'Job Market', icon: TrendingUp },
    { id: 'workload', label: 'Workload', icon: Activity },
    { id: 'faculty', label: 'Faculty Hub', icon: GraduationCap, badge: role === 'faculty' ? 'Admin' : undefined },
  ];

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-6 max-w-7xl mx-auto w-full">
      <nav className="relative flex items-center justify-between px-3.5 py-2.5 rounded-3xl bg-[var(--theme-surface)]/90 backdrop-blur-2xl border border-white/10 shadow-glass transition-all duration-300">
        
        {/* Brand Logo */}
        <div onClick={() => handleTabClick('dashboard')} className="flex-shrink-0 cursor-pointer">
          <FWDLogo size="md" />
        </div>

        {/* Desktop Navigation Pill Dock */}
        <div className="hidden xl:flex items-center gap-1 bg-black/30 p-1 rounded-2xl border border-white/5 overflow-x-auto max-w-3xl scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id as ActiveTab)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)] text-white shadow-glow scale-[1.02]'
                    : 'text-[#D4CDE6]/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-purple-300'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/30 text-white' : 'bg-purple-500/20 text-purple-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls (Search, Sound, Quick Mood, API Key, Theme, User Avatar) */}
        <div className="flex items-center gap-2">
          
          {/* Quick Search Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSearch();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#D4CDE6] text-xs transition-colors"
            title="Search Careers, Skills & Tools (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-purple-300" />
            <span className="hidden sm:inline text-[11px] text-white/60">Search</span>
            <kbd className="hidden sm:inline px-1 py-0.5 text-[9px] bg-black/40 rounded text-white/40 border border-white/10">⌘K</kbd>
          </button>

          {/* Quick 5-Second Wellbeing Trigger */}
          <button
            onClick={() => {
              handleTabClick('wellbeing');
            }}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              activeTab === 'wellbeing'
                ? 'bg-pink-600/30 border-pink-500/40 text-pink-200 shadow-glow'
                : 'bg-white/5 border-white/10 text-pink-300 hover:bg-white/10'
            }`}
            title="5-Second Daily Energy & Mood Check"
          >
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/30" />
            <span className="text-[11px] font-mono">{wellbeing.currentStreak}d</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-xl border transition-all ${
              isAudioMuted 
                ? 'bg-red-500/10 border-red-500/30 text-red-300' 
                : 'bg-white/5 border-white/10 text-emerald-300 hover:bg-white/10'
            }`}
            title={isAudioMuted ? 'Unmute Audio Micro-Interactions' : 'Mute Audio Micro-Interactions'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Gemini AI Status / API Key Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenApiKeyModal();
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              hasApiKey 
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20' 
                : 'bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 animate-pulse-slow'
            }`}
            title="Configure Gemini 2.5 Pro API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-mono text-[10px]">
              {hasApiKey ? 'Gemini 2.5' : 'AI Config'}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${hasApiKey ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          </button>

          {/* Theme Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setShowThemeMenu(!showThemeMenu);
                setShowRoleMenu(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-white text-xs font-medium transition-all"
              title="Select Visual Theme"
            >
              <Palette className="w-4 h-4 text-purple-300" />
              <span className="hidden sm:inline">{THEME_CONFIGS[currentTheme].emoji}</span>
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-72 p-3 rounded-2xl bg-[#140E24]/95 backdrop-blur-2xl border border-purple-500/30 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    7 Animated Themes
                  </span>
                  <span className="text-[10px] text-purple-300 font-mono">Dynamic Mesh</span>
                </div>

                <div className="grid grid-cols-1 gap-1.5 max-h-80 overflow-y-auto pr-1">
                  {(Object.keys(THEME_CONFIGS) as ThemeId[]).map((tId) => {
                    const theme = THEME_CONFIGS[tId];
                    const isSelected = currentTheme === tId;
                    return (
                      <button
                        key={tId}
                        onClick={() => {
                          setTheme(tId);
                          setShowThemeMenu(false);
                        }}
                        className={`flex items-center justify-between w-full px-2.5 py-2 rounded-xl text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-purple-600/30 border border-purple-400 text-white font-bold'
                            : 'hover:bg-white/5 text-[#D4CDE6] border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{theme.emoji}</span>
                          <div>
                            <div className="font-semibold text-white leading-tight">{theme.name}</div>
                            <div className="text-[9px] text-white/50">{theme.tagline}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Color Studio Controls */}
                {currentTheme === 'custom' && (
                  <div className="mt-3 pt-2 border-t border-white/10 space-y-2">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">Live Studio Color Pickers</span>
                    <div className="flex items-center justify-between text-xs text-white/80">
                      <span>Primary Accent:</span>
                      <input 
                        type="color" 
                        value={customValues.primary} 
                        onChange={(e) => updateCustomTheme({ primary: e.target.value })}
                        className="w-7 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/80">
                      <span>Secondary Glow:</span>
                      <input 
                        type="color" 
                        value={customValues.accent} 
                        onChange={(e) => updateCustomTheme({ accent: e.target.value })}
                        className="w-7 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Persona & Role Selector */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setShowRoleMenu(!showRoleMenu);
                setShowThemeMenu(false);
              }}
              className="flex items-center gap-2 p-1 pl-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-[11px] font-bold text-white leading-tight">{student.displayName}</span>
                <span className="text-[9px] text-purple-300 font-medium capitalize">{role}</span>
              </div>
              <img
                src={avatar.imageUrl || student.avatarUrl}
                alt={student.displayName}
                className="w-7 h-7 rounded-xl object-cover border border-purple-400/40"
              />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 p-3 rounded-2xl bg-[#140E24]/95 backdrop-blur-2xl border border-white/10 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="pb-2 mb-2 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{student.displayName}</div>
                    <div className="text-[10px] text-[#D4CDE6]/70 truncate">{student.email}</div>
                    <div className="text-[9px] font-mono text-emerald-400 mt-0.5">CGPA {student.cgpa} • {student.major}</div>
                  </div>
                  <button
                    onClick={() => {
                      if (onOpenAvatarModal) onOpenAvatarModal();
                      setShowRoleMenu(false);
                    }}
                    className="p-1.5 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-[10px] font-bold uppercase"
                    title="Change Celebratory Tier Avatar"
                  >
                    🎭 {avatar.unlockedTier}
                  </button>
                </div>

                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      onOpenProfileBuilder();
                      setShowRoleMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-xl text-left hover:bg-white/10 text-white"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                    <span>Edit Athlete Profile</span>
                  </button>

                  <div className="pt-2 border-t border-white/5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/50 px-1">Switch Multi-Persona Demo</span>
                    <button
                      onClick={() => {
                        switchDemoStudent(0);
                        setShowRoleMenu(false);
                      }}
                      className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-xl text-left hover:bg-white/10 text-white mt-1 text-[11px]"
                    >
                      <span>Rahul Sharma (Full Stack AI)</span>
                      <span className="text-[9px] text-purple-300">NIT</span>
                    </button>
                    <button
                      onClick={() => {
                        switchDemoStudent(1);
                        setShowRoleMenu(false);
                      }}
                      className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-xl text-left hover:bg-white/10 text-white text-[11px]"
                    >
                      <span>Priya Patel (ML Research)</span>
                      <span className="text-[9px] text-purple-300">IIT Bombay</span>
                    </button>
                    <button
                      onClick={() => {
                        switchDemoStudent(2);
                        setShowRoleMenu(false);
                      }}
                      className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-xl text-left hover:bg-white/10 text-white text-[11px]"
                    >
                      <span>Ananya Rao (Product & UX Explorer)</span>
                      <span className="text-[9px] text-purple-300">PES Univ</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/50 px-1">Active Role</span>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      <button
                        onClick={() => {
                          setRole('student');
                          setShowRoleMenu(false);
                        }}
                        className={`px-2 py-1 rounded-lg text-center text-xs font-semibold transition-all ${
                          role === 'student' ? 'bg-purple-600 text-white shadow-glow' : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        Student
                      </button>
                      <button
                        onClick={() => {
                          setRole('faculty');
                          handleTabClick('faculty');
                          setShowRoleMenu(false);
                        }}
                        className={`px-2 py-1 rounded-lg text-center text-xs font-semibold transition-all ${
                          role === 'faculty' ? 'bg-emerald-600 text-white shadow-glow' : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        Faculty Hub
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden mt-2 p-4 rounded-3xl bg-[#140E24]/95 backdrop-blur-2xl border border-white/10 shadow-2xl grid grid-cols-2 sm:grid-cols-3 gap-2 z-50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id as ActiveTab)}
                className={`flex items-center gap-2 p-2.5 rounded-2xl text-xs font-semibold text-left transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-glow'
                    : 'bg-white/5 text-[#D4CDE6] hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4 text-purple-300" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
