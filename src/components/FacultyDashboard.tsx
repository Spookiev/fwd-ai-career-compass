import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  Clock, 
  Star, 
  Send, 
  Award, 
  Download, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  Search,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_STUDENTS } from '../data/sampleProfiles';
import { FacultyReview } from '../types';
import { sound } from '../lib/sound';

export const FacultyDashboard: React.FC = () => {
  const { student, facultyReviews, addFacultyReview } = useAuth();
  const [selectedStudentId, setSelectedStudentId] = useState<string>(student.uid);
  const [rating, setRating] = useState<number>(5);
  const [category, setCategory] = useState<FacultyReview['category']>('Roadmap Milestone');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [actionItem1, setActionItem1] = useState<string>('');
  const [actionItem2, setActionItem2] = useState<string>('');
  const [isConfidential, setIsConfidential] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const mentees = SAMPLE_STUDENTS;
  const activeMentee = mentees.find(m => m.uid === selectedStudentId) || mentees[0];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const actionItems = [actionItem1, actionItem2].filter(Boolean);

    addFacultyReview({
      studentId: activeMentee.uid,
      studentName: activeMentee.displayName,
      facultyId: 'fac_curr',
      facultyName: 'Prof. Placement & Academic Dean',
      category,
      rating,
      feedbackText,
      actionItems: actionItems.length > 0 ? actionItems : ['Continue high-velocity milestone completions'],
      isConfidential,
      status: 'Approved',
    });

    setFeedbackText('');
    setActionItem1('');
    setActionItem2('');
  };

  const handleExportAuditPDF = () => {
    sound.playLevelUp();
    alert(`[Academic Governance Audit] Generated verified Institutional Placement Portfolio PDF for ${activeMentee.displayName} (CGPA: ${activeMentee.cgpa}, Readiness: ${activeMentee.readinessScore}%). Ready for university placement committee archives.`);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-white font-display">
              Faculty & Placement Mentorship Hub
            </h2>
          </div>
          <p className="text-xs text-[#D4CDE6]/80 mt-1 max-w-xl">
            Institutional governance portal for academic advisors: review student milestones, sign off on internship credits, and submit verified placement endorsements.
          </p>
        </div>

        <button
          onClick={handleExportAuditPDF}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all shadow-glass self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export University Audit PDF</span>
        </button>
      </div>

      {/* Main Grid: Left Mentee Directory (4 Cols) + Right Mentee Dossier & Review Form (8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Mentee Directory */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Assigned Mentees ({mentees.length})
            </span>
          </div>

          <div className="space-y-2.5">
            {mentees.map((m) => {
              const isSelected = m.uid === activeMentee.uid;

              return (
                <div
                  key={m.uid}
                  onClick={() => {
                    sound.playClick();
                    setSelectedStudentId(m.uid);
                  }}
                  className={`p-4 rounded-3xl cursor-pointer border transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-900/60 to-pink-900/40 border-purple-400 shadow-glow scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={m.avatarUrl}
                      alt={m.displayName}
                      className="w-10 h-10 rounded-2xl object-cover border border-purple-400/40"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white leading-tight truncate">
                        {m.displayName}
                      </h4>
                      <p className="text-[11px] text-[#D4CDE6]/70 truncate">
                        CGPA {m.cgpa} • {m.major}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-emerald-400 font-display">
                        {m.readinessScore}%
                      </span>
                      <div className="text-[9px] text-white/50">Readiness</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Mentee Review Submission & Endorsement Dossier */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Mentee Quick Summary Card */}
          <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={activeMentee.avatarUrl}
                  alt={activeMentee.displayName}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-purple-400/50"
                />
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {activeMentee.displayName}
                  </h3>
                  <p className="text-xs text-[#D4CDE6]/80">
                    {activeMentee.university} • {activeMentee.semester} ({activeMentee.gradYear})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
                  {activeMentee.aptitudeTier}
                </span>
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  {activeMentee.readinessScore}% Job Ready
                </span>
              </div>
            </div>

            {/* Target & Internships */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                <span className="text-[10px] font-bold text-white/50 uppercase">Career Aspiration</span>
                <div className="font-semibold text-white">{activeMentee.dreamRole}</div>
                <div className="text-[11px] text-purple-300">Target: {activeMentee.dreamCompany}</div>
              </div>

              <div className="p-3 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                <span className="text-[10px] font-bold text-white/50 uppercase">Verified Industry Internship</span>
                <div className="font-semibold text-white">{activeMentee.internships[0]?.company || 'None Recorded'}</div>
                <div className="text-[11px] text-emerald-400">{activeMentee.internships[0]?.role}</div>
              </div>
            </div>
          </div>

          {/* Review & Endorsement Submission Form */}
          <form 
            onSubmit={handleSubmitReview}
            className="p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h4 className="text-base font-bold text-white font-display flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Submit Institutional Faculty Review & Endorsement</span>
              </h4>
              
              {/* Star Rating Selector */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setRating(star);
                    }}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star 
                      className={`w-4 h-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-purple-300">Review Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FacultyReview['category'])}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="Roadmap Milestone">Roadmap Milestone Approval</option>
                  <option value="Resume Audit">Resume ATS & Portfolio Sign-off</option>
                  <option value="Interview Simulation">Mock Interview Performance</option>
                  <option value="Overall Academic">Overall Academic & Internship Endorsement</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="confidential"
                  checked={isConfidential}
                  onChange={(e) => setIsConfidential(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 bg-black/40 border-white/10"
                />
                <label htmlFor="confidential" className="text-xs text-[#D4CDE6] cursor-pointer">
                  Confidential Advisory Note (Internal Faculty Eyes Only)
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-purple-300">Faculty Advisory Feedback</label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={3}
                required
                className="w-full p-3.5 rounded-2xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-400 transition-all resize-none"
                placeholder="Provide structured feedback on student readiness, architecture maturity, and campus drive placement fitness..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-white/60">Action Item 1 (Optional)</label>
                <input
                  type="text"
                  value={actionItem1}
                  onChange={(e) => setActionItem1(e.target.value)}
                  placeholder="e.g. Refine Redis concurrency patterns"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-white/60">Action Item 2 (Optional)</label>
                <input
                  type="text"
                  value={actionItem2}
                  onChange={(e) => setActionItem2(e.target.value)}
                  placeholder="e.g. Schedule mock STAR interview with mentor"
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-glow hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Official Faculty Endorsement</span>
            </button>
          </form>

          {/* Past Review Logs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider px-1">
              Active Institutional Review History ({facultyReviews.length})
            </h4>

            <div className="space-y-2.5">
              {facultyReviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{rev.facultyName}</span>
                      <span className="text-[10px] text-white/50">• {rev.date}</span>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <span className="inline-block px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-bold">
                    {rev.category}
                  </span>

                  <p className="text-xs text-[#D4CDE6] leading-relaxed">
                    "{rev.feedbackText}"
                  </p>

                  {rev.actionItems.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-white/5 text-[11px] text-emerald-300">
                      {rev.actionItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
