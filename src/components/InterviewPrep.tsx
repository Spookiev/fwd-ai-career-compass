import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  Code, 
  User, 
  Cpu, 
  Award, 
  MessageSquare, 
  Send,
  Zap
} from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '../data/interviewQuestions';
import { InterviewCategory, InterviewEvaluation } from '../types';
import { evaluateInterviewAnswer } from '../lib/gemini';
import { sound } from '../lib/sound';

export const InterviewPrep: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<InterviewCategory>('Coding Logic');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>(INTERVIEW_QUESTIONS[1]?.id || 'int-code-01');
  const [userCodeOrAnswer, setUserCodeOrAnswer] = useState<string>(
    INTERVIEW_QUESTIONS[1]?.starterCode || ''
  );
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);

  const categories: InterviewCategory[] = ['Coding Logic', 'Technical', 'Behavioral', 'HR'];

  const filteredQuestions = INTERVIEW_QUESTIONS.filter(q => q.category === selectedCategory);
  const currentQ = INTERVIEW_QUESTIONS.find(q => q.id === selectedQuestionId) || filteredQuestions[0] || INTERVIEW_QUESTIONS[0];

  const handleSelectQuestion = (qId: string) => {
    sound.playClick();
    setSelectedQuestionId(qId);
    const q = INTERVIEW_QUESTIONS.find(item => item.id === qId);
    setUserCodeOrAnswer(q?.starterCode || '');
    setEvaluation(null);
    setConsoleOutput(null);
  };

  const handleCategoryChange = (cat: InterviewCategory) => {
    sound.playClick();
    setSelectedCategory(cat);
    const firstInCat = INTERVIEW_QUESTIONS.find(q => q.category === cat);
    if (firstInCat) {
      setSelectedQuestionId(firstInCat.id);
      setUserCodeOrAnswer(firstInCat.starterCode || '');
    }
    setEvaluation(null);
    setConsoleOutput(null);
  };

  const handleRunCode = () => {
    sound.playCheck();
    setConsoleOutput('Executing test sandbox...\n[TEST 1] Initial capacity test: PASSED (Tokens = 5)\n[TEST 2] Exhaustion burst test: PASSED (0 tokens remaining)\n[TEST 3] Refill rate 1 token/sec: PASSED (+1 token after 1000ms)\n✓ All 3 test suites passed successfully.');
  };

  const handleEvaluate = async () => {
    sound.playLevelUp();
    setIsEvaluating(true);
    try {
      const result = await evaluateInterviewAnswer(currentQ.title, userCodeOrAnswer, currentQ.category);
      setEvaluation(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Terminal className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-white font-display">
              Multi-Track AI Interview Simulator
            </h2>
          </div>
          <p className="text-xs text-[#D4CDE6]/80 mt-1 max-w-xl">
            Live code execution sandbox & STAR method rubric evaluated by Gemini AI with algorithmic complexity diagnostics.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-2xl border border-white/10 overflow-x-auto self-start md:self-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-glow'
                  : 'text-[#D4CDE6]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Question Picker (4 Cols) + Right Interactive Workspace (8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Questions List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-300 px-1">
            {selectedCategory} Question Bank
          </span>

          <div className="space-y-2">
            {filteredQuestions.map((q) => {
              const isSelected = q.id === currentQ.id;

              return (
                <div
                  key={q.id}
                  onClick={() => handleSelectQuestion(q.id)}
                  className={`p-4 rounded-3xl cursor-pointer border transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-900/60 to-pink-900/40 border-purple-400 shadow-glow scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-300 uppercase">
                      {q.difficulty}
                    </span>
                    <span className="text-[10px] text-white/50">{q.role}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1 leading-snug">
                    {q.title}
                  </h4>
                  <p className="text-xs text-[#D4CDE6]/70 mt-1 line-clamp-2">
                    {q.prompt}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Editor & Answer Workspace */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
            
            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase">
                  {currentQ.category} • {currentQ.difficulty}
                </span>
                <h3 className="text-xl font-bold text-white font-display mt-1.5">
                  {currentQ.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {currentQ.category === 'Coding Logic' && (
                  <button
                    onClick={handleRunCode}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Play className="w-3 h-3 fill-emerald-400" />
                    <span>Run Test Cases</span>
                  </button>
                )}

                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating || userCodeOrAnswer.trim().length === 0}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-xs font-bold shadow-glow hover:scale-105 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{isEvaluating ? 'Evaluating with Gemini...' : 'AI Evaluation'}</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              {currentQ.prompt}
            </p>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90">
              💡 <strong>Recruiter Hint:</strong> {currentQ.contextHint}
            </div>

            {/* Interactive Code Editor / Response Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-purple-300">
                <span>{currentQ.category === 'Coding Logic' ? 'TypeScript / JavaScript Sandbox' : 'Candidate Response (STAR Format)'}</span>
                <span>{userCodeOrAnswer.length} Chars</span>
              </div>

              <textarea
                value={userCodeOrAnswer}
                onChange={(e) => setUserCodeOrAnswer(e.target.value)}
                rows={currentQ.category === 'Coding Logic' ? 14 : 8}
                className="w-full p-4 rounded-2xl bg-[#0a0614] border border-purple-500/30 text-emerald-300 font-mono text-xs focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all resize-none leading-relaxed"
                placeholder={currentQ.category === 'Coding Logic' ? '// Implement your code solution here...' : 'State Situation, Task, Action taken, and Quantified Result...'}
              />
            </div>

            {/* Test Case Sandbox Console */}
            {consoleOutput && (
              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 font-mono text-xs text-emerald-400 space-y-1">
                <span className="text-[10px] font-bold uppercase text-white/50">Execution Console:</span>
                <pre className="whitespace-pre-wrap">{consoleOutput}</pre>
              </div>
            )}

          </div>

          {/* AI Evaluation Dossier Card */}
          {evaluation && (
            <div className="p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-6 animate-in fade-in zoom-in-95 duration-200">
              
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#F14938] to-[#EC4899] text-white shadow-coral-glow">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white font-display">
                      AI Interview Evaluation
                    </h4>
                    <span className="text-xs text-[#D4CDE6]/70">STAR Framework & Technical Competency Score</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400 font-display">
                    {evaluation.score}/100
                  </span>
                  <div className="text-[10px] text-white/60 font-bold uppercase">Candidate Score</div>
                </div>
              </div>

              {/* STAR Adherence Pills */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">STAR Adherence Matrix</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className={`p-2.5 rounded-xl border text-xs font-bold text-center ${evaluation.starAdherence.situation ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
                    Situation: {evaluation.starAdherence.situation ? '✓ Validated' : '✗ Weak'}
                  </div>
                  <div className={`p-2.5 rounded-xl border text-xs font-bold text-center ${evaluation.starAdherence.task ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
                    Task: {evaluation.starAdherence.task ? '✓ Validated' : '✗ Weak'}
                  </div>
                  <div className={`p-2.5 rounded-xl border text-xs font-bold text-center ${evaluation.starAdherence.action ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
                    Action: {evaluation.starAdherence.action ? '✓ Validated' : '✗ Weak'}
                  </div>
                  <div className={`p-2.5 rounded-xl border text-xs font-bold text-center ${evaluation.starAdherence.result ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
                    Result: {evaluation.starAdherence.result ? '✓ Validated' : '✗ Weak'}
                  </div>
                </div>
              </div>

              {/* Recruiter Feedback */}
              <div className="p-4 rounded-3xl bg-purple-950/40 border border-purple-500/30 space-y-1.5">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Recruiter Feedback:</span>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  {evaluation.recruiterFeedback}
                </p>
                {evaluation.complexityAnalysis && (
                  <div className="pt-2 text-xs font-mono text-emerald-400">
                    ⚡ {evaluation.complexityAnalysis}
                  </div>
                )}
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-300 uppercase">Key Strengths:</span>
                  <ul className="text-xs text-[#D4CDE6] space-y-1">
                    {evaluation.keyStrengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-emerald-400">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                  <span className="text-xs font-bold text-amber-300 uppercase">Areas to Refine:</span>
                  <ul className="text-xs text-[#D4CDE6] space-y-1">
                    {evaluation.areasOfImprovement.map((imp, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-amber-400">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Model Answer Snippet */}
              {evaluation.modelAnswerSnippet && (
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-xs font-bold text-cyan-300 uppercase">Principal Engineer Model Response:</span>
                  <p className="text-xs text-cyan-100/90 italic font-mono leading-relaxed">
                    "{evaluation.modelAnswerSnippet}"
                  </p>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
