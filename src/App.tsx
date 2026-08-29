import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ProfileCard } from './components/ProfileCard';
import { DiagnosticAssessment } from './components/DiagnosticAssessment';
import { CareerRecommendations } from './components/CareerRecommendations';
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
import { useAuth } from './context/AuthContext';
import { FWDLogo } from './components/FWDLogo';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isProfileBuilderOpen, setIsProfileBuilderOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { student } = useAuth();

  const handleAdoptRoadmap = (roleTitle: string) => {
    setActiveTab('roadmap');
  };

  const handleExploreRole = () => {
    setActiveTab('explorer');
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-white selection:bg-purple-500 selection:text-white">
      
      {/* Top Floating Pill Dock Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenProfileBuilder={() => setIsProfileBuilderOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 space-y-6">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <ProfileCard
              onTakeDiagnostic={() => setActiveTab('diagnostic')}
              onOpenATS={() => setActiveTab('resume')}
              onOpenRoadmap={() => setActiveTab('roadmap')}
              onOpenProfileBuilder={() => setIsProfileBuilderOpen(true)}
            />

            {/* Quick Multi-Module Dashboard Teasers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Teaser 1: AI Career Recommendations */}
              <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse" />
                    <h3 className="text-base font-bold text-white font-display">
                      Top Matched Career Trajectory
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('recommendations')}
                    className="text-xs font-bold text-purple-300 hover:text-purple-200"
                  >
                    View All 5 Matches →
                  </button>
                </div>

                <div className="p-4 rounded-3xl bg-black/30 border border-white/5 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">{student.dreamRole}</h4>
                      <span className="text-xs text-purple-300 font-semibold">{student.dreamCompany}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono">
                      94% Synergy
                    </span>
                  </div>
                  <p className="text-xs text-[#D4CDE6]/80 line-clamp-2">
                    High synergy between React UI architecture, Redis microservice streaming, and algorithmic problem solving.
                  </p>
                </div>
              </div>

              {/* Teaser 2: ATS Resume Score */}
              <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <h3 className="text-base font-bold text-white font-display">
                      ATS Placement Readiness Audit
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('resume')}
                    className="text-xs font-bold text-purple-300 hover:text-purple-200"
                  >
                    Open ATS Auditor →
                  </button>
                </div>

                <div className="p-4 rounded-3xl bg-black/30 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-white font-display">88 / 100</div>
                    <div className="text-xs text-emerald-400 font-semibold">Tier-1 Product Drive Ready</div>
                    <div className="text-[11px] text-white/50 mt-0.5">3 Quantified STAR bullet suggestions available</div>
                  </div>
                  <button
                    onClick={() => setActiveTab('resume')}
                    className="px-3.5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 text-purple-200 border border-purple-500/30 text-xs font-bold transition-all"
                  >
                    View Rewrites
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'diagnostic' && (
          <DiagnosticAssessment
            onViewRecommendations={() => setActiveTab('recommendations')}
            onViewRoadmap={() => setActiveTab('roadmap')}
          />
        )}

        {activeTab === 'recommendations' && (
          <CareerRecommendations
            onAdoptRoadmap={handleAdoptRoadmap}
            onExploreRole={() => setActiveTab('explorer')}
          />
        )}

        {activeTab === 'roadmap' && <RoadmapView />}

        {activeTab === 'skillgap' && <SkillGapAnalysis />}

        {activeTab === 'explorer' && (
          <CareerExplorer onAdoptRoadmap={handleAdoptRoadmap} />
        )}

        {activeTab === 'resume' && <ResumeAnalyzer />}

        {activeTab === 'interview' && <InterviewPrep />}

        {activeTab === 'jobmarket' && <JobMarketDashboard />}

        {activeTab === 'faculty' && <FacultyDashboard />}

        {activeTab === 'workload' && <WorkloadMonitor />}

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

      {/* Footer with SDG Alignment & Academic Metadata */}
      <footer className="relative z-10 mt-12 py-8 px-4 border-t border-white/10 bg-black/40 text-xs text-[#D4CDE6]/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <FWDLogo size="sm" showText={false} />
            <div>
              <div className="font-bold text-white">
                FWD. — <span className="text-purple-300 font-normal">Forward with Skills, Forward with Career</span>
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
              Gemini 2.5 Pro Powered
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
};
