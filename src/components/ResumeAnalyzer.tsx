import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Copy, 
  Check, 
  AlertCircle, 
  Sparkles, 
  RefreshCw, 
  Zap, 
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { parsePdfResume, extractResumeMetadata } from '../lib/pdfParser';
import { analyzeResumeATS } from '../lib/gemini';
import { ResumeAnalysisResult } from '../types';
import { sound } from '../lib/sound';

export const ResumeAnalyzer: React.FC = () => {
  const { student, updateStudent } = useAuth();
  const [isParsing, setIsParsing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState<string>(
    `Rahul Sharma — B.Tech Computer Science & Engineering (CGPA 8.84)
Email: rahul.sharma@university.edu | Phone: +91 98765 43210 | GitHub: github.com/rahul

TECHNICAL SKILLS:
- Languages: TypeScript, JavaScript, Python, C++, SQL
- Frameworks & Tools: React, Next.js, FastAPI, Node.js, Express, Docker, Redis, PostgreSQL, Git

EXPERIENCE:
Software Development Engineering Intern — Zomato (Jun 2024 - Aug 2024)
- Worked on restaurant menu caching and made database queries faster for users.
- Assisted in debugging microservice issues and API endpoints.

PROJECTS:
1. DevPulse — Real-Time Developer Analytics Engine
- Created real-time event analytics dashboard for GitHub developers.
- Used Next.js, Redis Streams, and Docker containerization.

2. MediScan AI — Deep Learning Classifier
- Built a deep learning model for chest x-ray scans using python and pytorch.`
  );

  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playClick();
    setIsParsing(true);
    try {
      const extracted = await parsePdfResume(file);
      setResumeText(extracted.rawText);
      const analysis = await analyzeResumeATS(extracted.rawText, student.dreamRole);
      setAnalysisResult(analysis);
      sound.playLevelUp();

      // Automatically sync detected skills with student profile
      if (extracted.extractedSkills.length > 0) {
        updateStudent({
          skills: Array.from(new Set([...student.skills, ...extracted.extractedSkills])),
          programmingLanguages: Array.from(new Set([...student.programmingLanguages, ...extracted.extractedLanguages])),
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsParsing(false);
    }
  };

  const handleRunAudit = async () => {
    sound.playLevelUp();
    setIsParsing(true);
    try {
      const analysis = await analyzeResumeATS(resumeText, student.dreamRole);
      setAnalysisResult(analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setIsParsing(false);
    }
  };

  const handleCopyBullet = (id: string, text: string) => {
    sound.playCheck();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyKeyword = (kw: string) => {
    sound.playCheck();
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 1500);
  };

  // Run initial fallback audit if empty
  React.useEffect(() => {
    if (!analysisResult) {
      analyzeResumeATS(resumeText, student.dreamRole).then(res => setAnalysisResult(res));
    }
  }, []);

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-white font-display">
              ATS Resume Auditor & Quantifier
            </h2>
          </div>
          <p className="text-xs text-[#D4CDE6]/80 mt-1 max-w-xl">
            Parses PDF resumes client-side via <code>pdfjs-dist</code>, computes ATS compatibility scores, and uses Gemini AI to rewrite passive bullets into high-impact STAR metrics.
          </p>
        </div>

        {/* Upload Button */}
        <label className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-xs font-bold shadow-glow hover:scale-105 transition-all cursor-pointer self-start md:self-auto">
          <UploadCloud className="w-4 h-4" />
          <span>Upload PDF Resume</span>
          <input 
            type="file" 
            accept="application/pdf,.docx,.txt" 
            onChange={handleFileUpload} 
            className="hidden" 
          />
        </label>
      </div>

      {/* Main Grid: Left Resume Editor (5 Cols) + Right ATS Score Dossier (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Raw Resume Content */}
        <div className="lg:col-span-5 p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-purple-400" />
              Resume Text Content
            </span>
            <span className="text-[10px] text-purple-300 font-mono">
              {resumeText.split(/\s+/).filter(Boolean).length} Words
            </span>
          </div>

          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={15}
            className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 text-[#D4CDE6] font-mono text-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none leading-relaxed"
            placeholder="Paste raw resume text or upload a PDF above..."
          />

          <button
            onClick={handleRunAudit}
            disabled={isParsing}
            className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-glass disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isParsing ? 'animate-spin' : ''}`} />
            <span>{isParsing ? 'Auditing Resume with Gemini...' : 'Run Real-Time ATS Audit'}</span>
          </button>
        </div>

        {/* Right Column: Score Breakdown & Quantified Rewrites */}
        {analysisResult && (
          <div className="lg:col-span-7 space-y-6">
            
            {/* Score Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-[#F14938] to-[#E11D48] text-white shadow-coral-glow text-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-white/80">Overall ATS</span>
                <div className="text-3xl font-black font-display mt-0.5">{analysisResult.score.overall}/100</div>
                <div className="text-[9px] text-white/90 font-medium mt-0.5">Campus Drive Ready</div>
              </div>

              <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] font-bold uppercase text-purple-300">Action Impact</span>
                <div className="text-2xl font-black text-white font-display mt-0.5">{analysisResult.score.impact}%</div>
                <div className="text-[9px] text-white/50">STAR Adherence</div>
              </div>

              <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] font-bold uppercase text-cyan-300">Brevity</span>
                <div className="text-2xl font-black text-white font-display mt-0.5">{analysisResult.score.brevity}%</div>
                <div className="text-[9px] text-white/50">Conciseness</div>
              </div>

              <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-300">Skills Match</span>
                <div className="text-2xl font-black text-white font-display mt-0.5">{analysisResult.score.skills}%</div>
                <div className="text-[9px] text-white/50">Keyword Density</div>
              </div>
            </div>

            {/* Missing Keywords Ribbon (1-Click Copy) */}
            <div className="p-5 rounded-3xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Missing ATS Keywords (Click to Copy)
                </span>
                <span className="text-[10px] text-white/50">Paste directly into resume</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {analysisResult.missingKeywords.map((kw, idx) => {
                  const isCopied = copiedKeyword === kw;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleCopyKeyword(kw)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isCopied
                          ? 'bg-emerald-500 text-white shadow-glow'
                          : 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/30'
                      }`}
                    >
                      <span>{kw}</span>
                      {isCopied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 opacity-60" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI-Quantified Bullet Rewrites */}
            <div className="p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white font-display flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>AI-Quantified Bullet Point Improvements</span>
                </h3>
                <span className="text-xs text-purple-300 font-bold">1-Click Clipboard Copy</span>
              </div>

              <div className="space-y-4">
                {analysisResult.bulletRewrites.map((bullet) => {
                  const isCopied = copiedId === bullet.id;

                  return (
                    <div key={bullet.id} className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-3">
                      
                      {/* Before: Original Bullet */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider">
                          Original (Passive Phrasing):
                        </span>
                        <p className="text-xs text-white/60 line-through">
                          "{bullet.original}"
                        </p>
                      </div>

                      {/* After: Quantified STAR Bullet */}
                      <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span>Improved (Quantified STAR Bullet)</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                            {bullet.metricImpact}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                          "{bullet.improved}"
                        </p>

                        <div className="flex items-center justify-between pt-1 text-[11px] text-[#D4CDE6]/70">
                          <span className="italic pr-2">Why: {bullet.rationale}</span>
                          <button
                            onClick={() => handleCopyBullet(bullet.id, bullet.improved)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all flex-shrink-0 ${
                              isCopied
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Bullet</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
