import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Layers, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  BookOpen, 
  Youtube, 
  FileText, 
  TrendingUp, 
  Target,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ResourceLink } from '../types';
import { sound } from '../lib/sound';

export const RoadmapView: React.FC = () => {
  const { student, roadmap, toggleTaskCompletion } = useAuth();
  const [expandedMonths, setExpandedMonths] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
  });

  const toggleMonth = (mNum: number) => {
    sound.playClick();
    setExpandedMonths(prev => ({
      ...prev,
      [mNum]: !prev[mNum]
    }));
  };

  // Helper for OER Provider badge icons and colors
  const getResourceBadge = (resource: ResourceLink) => {
    switch (resource.provider) {
      case 'NPTEL':
        return {
          bg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
          icon: Award,
          label: 'NPTEL / SWAYAM (Govt. India)'
        };
      case 'Coursera Free':
        return {
          bg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          icon: BookOpen,
          label: 'Coursera (Free Audit Track)'
        };
      case 'YouTube':
        return {
          bg: 'bg-red-500/20 text-red-300 border-red-500/30',
          icon: Youtube,
          label: 'YouTube Verified Playlist'
        };
      case 'Book Summary':
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          icon: FileText,
          label: 'Open-Access Textbook Summary'
        };
      default:
        return {
          bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          icon: ExternalLink,
          label: resource.provider
        };
    }
  };

  // Calculate task counts
  let totalTasks = 0;
  let completedTasks = 0;
  roadmap.monthlyGoals.forEach(m => {
    m.weeklyGoals.forEach(w => {
      w.tasks.forEach(t => {
        totalTasks++;
        if (t.completed) completedTasks++;
      });
    });
  });

  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Layers className="w-5 h-5" />
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                {roadmap.roleTitle} Progression Matrix
              </h2>
            </div>
            <p className="text-xs text-[#D4CDE6]/80 mt-1 max-w-2xl">
              {roadmap.overview}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-right">
              <span className="text-[10px] font-bold text-white/50 uppercase">Readiness</span>
              <div className="text-2xl font-black text-emerald-400 font-display leading-none mt-0.5">
                {student.readinessScore}%
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-right">
              <span className="text-[10px] font-bold text-white/50 uppercase">Tasks Cleared</span>
              <div className="text-2xl font-black text-purple-300 font-display leading-none mt-0.5">
                {completedTasks}/{totalTasks}
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-[#D4CDE6]">
            <span>Roadmap Completion Velocity</span>
            <span className="text-purple-300 font-mono">{completionPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-[#F14938] via-[#A855F7] to-[#10B981] rounded-full transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* High-Level Milestone Phases Carousel / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roadmap.milestones.map((milestone, idx) => (
          <div 
            key={milestone.id}
            className={`p-5 rounded-3xl backdrop-blur-xl border transition-all ${
              milestone.completed 
                ? 'bg-emerald-950/20 border-emerald-500/30' 
                : 'bg-[var(--theme-surface)]/80 border-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 font-mono">
                Phase {idx + 1}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                milestone.completed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-white/60'
              }`}>
                {milestone.completed ? 'Mastered' : 'In Progress'}
              </span>
            </div>

            <h4 className="text-sm font-bold text-white mt-2 leading-tight">
              {milestone.title}
            </h4>
            <p className="text-xs text-[#D4CDE6]/70 mt-1 line-clamp-2">
              {milestone.description}
            </p>

            {/* Resume Bullet Recommendation Card */}
            <div className="mt-3 p-2.5 rounded-2xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Resume Bullet to Earn</span>
              </span>
              <p className="text-[10px] text-[#D4CDE6] italic">
                "{milestone.resumeBulletSuggestion}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Goals & Weekly Interactive Task Checklists */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-black text-white font-display uppercase tracking-wider flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span>Structured Monthly Milestones & Weekly Actions</span>
          </h3>
          <span className="text-xs text-purple-300 font-semibold">
            {roadmap.estimatedTimeToJobReady}
          </span>
        </div>

        {roadmap.monthlyGoals.map((month) => {
          const isExpanded = expandedMonths[month.monthNumber] ?? true;

          return (
            <div 
              key={month.monthNumber}
              className="rounded-3xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass overflow-hidden transition-all"
            >
              {/* Monthly Accordion Header */}
              <div 
                onClick={() => toggleMonth(month.monthNumber)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors border-b border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    month.completed ? 'bg-emerald-500 text-white' : 'bg-purple-600/30 text-purple-300 border border-purple-500/30'
                  }`}>
                    M{month.monthNumber}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white leading-tight">
                      {month.title}
                    </h4>
                    <p className="text-xs text-[#D4CDE6]/70 mt-0.5">
                      {month.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                    month.completed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-white/60'
                  }`}>
                    {month.completed ? 'Completed' : 'Active'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-[#D4CDE6]" /> : <ChevronDown className="w-5 h-5 text-[#D4CDE6]" />}
                </div>
              </div>

              {/* Weekly Goals Container */}
              {isExpanded && (
                <div className="p-5 space-y-4 bg-black/20">
                  {month.weeklyGoals.map((week) => (
                    <div key={week.weekNumber} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                          {week.title}
                        </span>
                        <span className="text-[11px] text-[#D4CDE6]/70 italic">
                          Focus: {week.focus}
                        </span>
                      </div>

                      {/* Tasks Checkbox List */}
                      <div className="space-y-2">
                        {week.tasks.map((task) => (
                          <div 
                            key={task.id}
                            onClick={() => toggleTaskCompletion(task.id)}
                            className={`flex items-start justify-between p-3 rounded-xl cursor-pointer transition-all ${
                              task.completed 
                                ? 'bg-emerald-950/30 border border-emerald-500/40 text-white' 
                                : 'bg-white/5 hover:bg-white/10 border border-white/5 text-[#D4CDE6]'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <button className="mt-0.5 flex-shrink-0">
                                {task.completed ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <Circle className="w-4 h-4 text-white/40 hover:text-purple-400" />
                                )}
                              </button>
                              <div>
                                <span className={`text-xs font-medium ${task.completed ? 'line-through text-white/60' : 'text-white'}`}>
                                  {task.title}
                                </span>
                                <div className="flex items-center gap-2 mt-1 text-[10px] text-white/50 font-mono">
                                  <span>+{task.xp} XP</span>
                                  <span>•</span>
                                  <span>Est: {task.estimatedHours} hrs</span>
                                </div>
                              </div>
                            </div>

                            <span className="text-[10px] font-bold text-purple-400 flex-shrink-0">
                              {task.completed ? 'DONE' : 'CHECK'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Capstone Project Showcase Card */}
      <div className="p-6 sm:p-8 rounded-4xl bg-gradient-to-br from-[#1F3668]/90 to-[#120E1E]/90 backdrop-blur-2xl border border-blue-400/30 shadow-glass space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/20 text-cyan-300 border border-blue-500/30">
              <Zap className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300">
                Industry Capstone Specification
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                {roadmap.capstoneProject.title}
              </h3>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 text-xs font-bold">
            Phase 3 Deliverable
          </span>
        </div>

        <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
          {roadmap.capstoneProject.description}
        </p>

        <div className="space-y-1.5 pt-2">
          <span className="text-[11px] font-bold text-white uppercase tracking-wider">Required Submission Deliverables:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-100">
            {roadmap.capstoneProject.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-black/30 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
