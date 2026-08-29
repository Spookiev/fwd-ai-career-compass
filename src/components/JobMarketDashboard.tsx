import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Lock, 
  Unlock, 
  ExternalLink, 
  DollarSign, 
  Briefcase, 
  MapPin, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  SKILL_DEMAND_RADAR_DATA, 
  TECH_MOMENTUM_DATA, 
  SALARY_BY_EXPERIENCE_DATA, 
  SAMPLE_JOB_POSTINGS 
} from '../data/jobMarketData';
import { useAuth } from '../context/AuthContext';
import { sound } from '../lib/sound';

export const JobMarketDashboard: React.FC = () => {
  const { student } = useAuth();
  const [filterType, setFilterType] = useState<string>('All');

  const filteredJobs = filterType === 'All' 
    ? SAMPLE_JOB_POSTINGS 
    : SAMPLE_JOB_POSTINGS.filter(j => j.type.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-white font-display">
              Live Job Market Analytics & Direct Gateway
            </h2>
          </div>
          <p className="text-xs text-[#D4CDE6]/80 mt-1 max-w-xl">
            Real-time industry hiring trends, 2024–2027 tech momentum velocity, and gated direct apply portal.
          </p>
        </div>

        {/* Readiness Gate Banner */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3">
          <div className={`p-2 rounded-xl ${student.readinessScore >= 75 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
            {student.readinessScore >= 75 ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-xs font-bold text-white">
              {student.readinessScore >= 75 ? 'Direct Apply Unlocked' : 'Direct Apply Gated'}
            </div>
            <div className="text-[10px] text-[#D4CDE6]/70">
              Your Readiness: <strong className="text-emerald-400">{student.readinessScore}%</strong> (Requires 75%+)
            </div>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Multi-Year Tech Momentum Area Chart */}
        <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Tech Hiring Momentum (2023–2027 Projected)
              </h3>
              <p className="text-[11px] text-[#D4CDE6]/70">Relative talent demand index (%)</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
              Multi-Year Area
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TECH_MOMENTUM_DATA}>
                <defs>
                  <linearGradient id="colorGenAI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCloud" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFullStack" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="year" stroke="#D4CDE6" fontSize={10} />
                <YAxis stroke="#D4CDE6" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#140E24', borderColor: '#7C3AED', borderRadius: 12, fontSize: 11 }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="GenAI / LLMs" stroke="#EC4899" fillOpacity={1} fill="url(#colorGenAI)" />
                <Area type="monotone" dataKey="Cloud & DevOps" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorCloud)" />
                <Area type="monotone" dataKey="FullStack Web" stroke="#00F0FF" fillOpacity={1} fill="url(#colorFullStack)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Salary Progression by Experience Bar Chart */}
        <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Compensation Progression (₹ LPA in India / Tier-1)
              </h3>
              <p className="text-[11px] text-[#D4CDE6]/70">Min, Avg, and Max Salary Ranges by Experience</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
              Salary Bands
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALARY_BY_EXPERIENCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="experience" stroke="#D4CDE6" fontSize={10} />
                <YAxis stroke="#D4CDE6" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#140E24', borderColor: '#10B981', borderRadius: 12, fontSize: 11 }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="minSalary" fill="#1F3668" name="Min LPA" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avgSalary" fill="#10B981" name="Average LPA" radius={[4, 4, 0, 0]} />
                <Bar dataKey="maxSalary" fill="#F14938" name="Top 10% LPA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Gated Job Postings Directory */}
      <div className="p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold text-white font-display">
              Curated Open Positions & Fast-Track Direct Apply
            </h3>
            <p className="text-xs text-[#D4CDE6]/70">
              Direct application links unlocked when your readiness score matches the position criteria.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {['All', 'Full-time', 'Internship', 'Remote'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  sound.playClick();
                  setFilterType(type);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  filterType === type 
                    ? 'bg-purple-600 text-white shadow-glow' 
                    : 'bg-white/5 text-[#D4CDE6] hover:bg-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {filteredJobs.map((job) => {
            const isUnlocked = student.readinessScore >= job.requiredReadinessThreshold;

            return (
              <div 
                key={job.id}
                className={`p-5 rounded-3xl backdrop-blur-xl border transition-all duration-200 space-y-3 ${
                  isUnlocked 
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-400/40 shadow-glass' 
                    : 'bg-black/30 border-white/5 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase">
                      {job.type} • {job.postedAgo}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1 leading-tight">
                      {job.title}
                    </h4>
                    <span className="text-xs font-semibold text-purple-300">
                      {job.company}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-400 font-display">
                      {job.salary}
                    </span>
                    <div className="text-[10px] text-white/50">{job.location}</div>
                  </div>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1">
                  {job.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-lg bg-black/40 border border-white/5 text-[10px] text-[#D4CDE6]">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Bottom Status / Apply Gate */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-1 text-[11px]">
                    {isUnlocked ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Eligible ({job.requiredReadinessThreshold}% threshold met)</span>
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1 font-semibold">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Requires {job.requiredReadinessThreshold}% Readiness</span>
                      </span>
                    )}
                  </div>

                  {isUnlocked ? (
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-glow hover:scale-105 transition-all flex items-center gap-1"
                    >
                      <span>Direct Apply</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-1.5 rounded-xl bg-white/5 text-white/40 font-semibold text-xs border border-white/5 cursor-not-allowed flex items-center gap-1"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Locked</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
