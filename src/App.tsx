import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ProfileCard } from './components/ProfileCard';
import { IntakeRouter } from './components/IntakeRouter';
import { DiagnosticAssessment } from './components/DiagnosticAssessment';
import { CareerRecommendations } from './components/CareerRecommendations';
import { CareerPresence } from './components/CareerPresence';
import { WellbeingCheck } from './components/WellbeingCheck';
import { RoadmapView } from './components/RoadmapView';
import { SkillGapAnalysis } from './components/SkillGapAnalysis';
import { CareerExplorer } from './components/CareerExplorer';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';
import { InterviewPrep } from './components/InterviewPrep';
import { JobMarketDashboard } from './components/JobMarketDashboard';
import { FacultyDashboard } from './components/FacultyDashboard';
import { WorkloadMonitor } from './components/WorkloadMonitor';
import { SavedCareersView } from './components/SavedCareersView';
import { AdvisorChat } from './components/AdvisorChat';
import { ProfileBuilder } from './components/ProfileBuilder';
import { ApiKeyModal } from './components/ApiKeyModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { AvatarIdentityModal } from './components/AvatarIdentityModal';
import { useAuth } from './context/AuthContext';
import { FWDLogo } from './components/FWDLogo';
import { 
  Sparkles, 
  Compass, 
  Globe, 
  Heart, 
  Layers, 
  FileText, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';
import { sound } from './lib/sound';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isProfileBuilderOpen, setIsProfileBuilderOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const { student, possibilityMap, presence, wellbeing, deconstructedKPIs } = useAuth();

  const handleAdoptRoadmap = (_roleTitle: string) => {
    setActiveTab('roadmap');
  };

  const handleExploreRole = () => {
    setActiveTab('explorer');
  };

  const topMatch = possibilityMap.matches[0];

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-white selection:bg-purple-500 selection:text-white">
      
      {/* Top Floating Pill Dock Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenProfileBuilder={() => setIsProfileBuilderOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 space-y-6">
        
        {/* Dashboard / Athlete Pro Card */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <ProfileCard
              onTakeDiagnostic={() => setActiveTab('diagnostic')}
              onOpenATS={() => setActiveTab('resume')}
              onOpenRoadmap={() => setActiveTab('roadmap')}
              onOpenProfileBuilder={() => setIsProfileBuilderOpen(true)}
              onOpenIntake={() => setActiveTab('intake')}
              onOpenPresence={() => setActiveTab('presence')}
              onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
            />

            {/* Quick Multi-Module Dashboard Teasers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Teaser 1: Multi-Evidence Intake & Discovery */}
              <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        <Zap className="w-4 h-4" />
                      </span>
                      <h3 className="text-sm font-bold text-white font-display">
                        Intake & Discovery Hub
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                      3 Pathways
                    </span>
                  </div>

                  <p className="text-xs text-[#D4CDE6]/80 leading-relaxed">
                    Choose from <strong>Experience Ingestion</strong> (GitHub/LeetCode/PDF), <strong>Interest Discovery</strong> scenarios, or <strong>Foundation Discovery</strong> for zero-coding explorers.
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('intake');
                  }}
                  className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Launch Intake Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-300" />
                </button>
              </div>

              {/* Teaser 2: Top Dynamic Career Possibility */}
              <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <Compass className="w-4 h-4" />
                      </span>
                      <h3 className="text-sm font-bold text-white font-display">
                        Top Career Match
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold font-mono">
                      {topMatch?.compatibilityScore || 94}% Synergy
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                    <h4 className="text-sm font-bold text-white">
                      {topMatch?.title || student.dreamRole}
                    </h4>
                    <span className="text-[11px] text-purple-300 font-medium">
                      Family: {topMatch?.family || 'Technology'} • {topMatch?.salaryRange || '$120k - $160k'}
                    </span>
                  </div>

                  <p className="text-xs text-[#D4CDE6]/80 line-clamp-2">
                    {topMatch?.whyItSuitsYou[0] || 'Strong verified full-stack architecture evidence.'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('recommendations');
                  }}
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-xs font-bold text-white shadow-glow transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore Possibility Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Teaser 3: Career Presence & Wellbeing Pacing */}
              <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                        <Heart className="w-4 h-4" />
                      </span>
                      <h3 className="text-sm font-bold text-white font-display">
                        Presence & Wellbeing
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-bold font-mono">
                      {wellbeing.currentStreak}d Streak 🔥
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                      <div className="text-base font-black text-white font-display">
                        {presence.overallScore}%
                      </div>
                      <div className="text-[10px] text-purple-300 font-medium">
                        Public Presence
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                      <div className="text-base font-black text-emerald-400 font-display">
                        {wellbeing.pacingRecommendation}
                      </div>
                      <div className="text-[10px] text-white/50 font-medium">
                        Study Pacing
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#D4CDE6]/80 line-clamp-2">
                    {wellbeing.lastSupportiveMessage || 'Consistent 5-day study velocity maintained.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('presence');
                    }}
                    className="py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all text-center"
                  >
                    Audit Presence
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('wellbeing');
                    }}
                    className="py-2.5 rounded-2xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-xs font-bold text-pink-200 transition-all text-center"
                  >
                    Daily Check-in
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3-Track Intake Router */}
        {activeTab === 'intake' && (
          <IntakeRouter onExplorePossibilities={() => setActiveTab('recommendations')} />
        )}

        {/* Dynamic Career Possibility Map */}
        {activeTab === 'recommendations' && (
          <CareerRecommendations
            onAdoptRoadmap={handleAdoptRoadmap}
            onExploreRole={() => setActiveTab('explorer')}
          />
        )}

        {/* Multi-Channel Career Presence Hub */}
        {activeTab === 'presence' && (
          <CareerPresence />
        )}

        {/* Sustainable Wellbeing & Energy Engine */}
        {activeTab === 'wellbeing' && (
          <WellbeingCheck />
        )}

        {/* Diagnostic Assessment */}
        {activeTab === 'diagnostic' && (
          <DiagnosticAssessment
            onViewRecommendations={() => setActiveTab('recommendations')}
            onViewRoadmap={() => setActiveTab('roadmap')}
          />
        )}

        {/* Adaptive Roadmap */}
        {activeTab === 'roadmap' && <RoadmapView />}

        {/* Skill Gap Analysis */}
        {activeTab === 'skillgap' && <SkillGapAnalysis />}

        {/* OER Explorer */}
        {activeTab === 'explorer' && (
          <CareerExplorer onAdoptRoadmap={handleAdoptRoadmap} />
        )}

        {/* Resume ATS Auditor */}
        {activeTab === 'resume' && <ResumeAnalyzer />}

        {/* Interview Prep Simulator */}
        {activeTab === 'interview' && <InterviewPrep />}

        {/* Job Market Live Dashboard */}
        {activeTab === 'jobmarket' && <JobMarketDashboard />}

        {/* Faculty Hub */}
        {activeTab === 'faculty' && <FacultyDashboard />}

        {/* Workload & Cognitive Monitor */}
        {activeTab === 'workload' && <WorkloadMonitor />}

        {/* Saved Careers */}
        {activeTab === 'saved' && (
          <SavedCareersView
            onAdoptRoadmap={handleAdoptRoadmap}
            onExploreRole={handleExploreRole}
          />
        )}

      </main>

      {/* Persistent 24/7 AI Career Mentor Chat Drawer */}
      <AdvisorChat />

      {/* Global Modals */}
      <ProfileBuilder
        isOpen={isProfileBuilderOpen}
        onClose={() => setIsProfileBuilderOpen(false)}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <AvatarIdentityModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
      />

      {/* Footer with SDG Alignment & Academic Metadata */}
      <footer className="relative z-10 mt-12 py-8 px-4 border-t border-white/10 bg-black/40 text-xs text-[#D4CDE6]/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <FWDLogo size="sm" showText={false} />
            <div>
              <div className="font-bold text-white">
                FWD. 2.0 — <span className="text-purple-300 font-normal">Career Development Companion</span>
              </div>
              <div className="text-[10px] text-white/50">
                Academic Project PSAIAC_36 • Course: CSS7102 • Mini Project 2025–2026
              </div>
            </div>
          </div>

          {/* SDG Alignment Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px]">
            <span className="px-2.5 py-1 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
              SDG 4: Quality Education
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
              SDG 8: Decent Work & Economic Growth
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
              Gemini 2.5 Multi-Evidence
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};
