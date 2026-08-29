import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Timer, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Target, 
  Zap, 
  Check, 
  Compass, 
  TrendingUp, 
  BookOpen
} from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../data/diagnosticQuestions';
import { useAuth } from '../context/AuthContext';
import { AptitudeTier } from '../types';
import { sound } from '../lib/sound';

interface DiagnosticAssessmentProps {
  onViewRecommendations: () => void;
  onViewRoadmap: () => void;
}

export const DiagnosticAssessment: React.FC<DiagnosticAssessmentProps> = ({
  onViewRecommendations,
  onViewRoadmap,
}) => {
  const { student, updateStudent } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isTestActive, setIsTestActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    scorePercent: number;
    tier: AptitudeTier;
    recommendedTimelineMonths: 3 | 6 | 9;
    correctCount: number;
  } | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTestActive && !isCompleted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinishTest();
            return 0;
          }
          if (prev % 60 === 0 && prev < 300) {
            sound.playTimerTick();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestActive, isCompleted, timeLeft]);

  const handleStartTest = () => {
    sound.playLevelUp();
    setSelectedAnswers({});
    setCurrentIdx(0);
    setTimeLeft(300);
    setIsTestActive(true);
    setIsCompleted(false);
    setScoreResult(null);
  };

  const handleSelectOption = (optionIndex: number) => {
    sound.playClick();
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optionIndex
    }));
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      handleFinishTest();
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleFinishTest = () => {
    setIsTestActive(false);
    setIsCompleted(true);

    let totalWeight = 0;
    let earnedWeight = 0;
    let correctCount = 0;

    DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
      totalWeight += q.weight;
      if (selectedAnswers[idx] === q.correctIndex) {
        earnedWeight += q.weight;
        correctCount++;
      }
    });

    const scorePercent = Math.round((earnedWeight / totalWeight) * 100);
    
    let tier: AptitudeTier = 'Foundation Tier';
    let recommendedTimelineMonths: 3 | 6 | 9 = 9;

    if (scorePercent >= 85) {
      tier = 'Advanced Tier';
      recommendedTimelineMonths = 3;
    } else if (scorePercent >= 60) {
      tier = 'Associate Tier';
      recommendedTimelineMonths = 6;
    } else {
      tier = 'Foundation Tier';
      recommendedTimelineMonths = 9;
    }

    setScoreResult({
      scorePercent,
      tier,
      recommendedTimelineMonths,
      correctCount,
    });

    // Update active student profile in context
    updateStudent({
      aptitudeTier: tier,
      readinessScore: Math.max(student.readinessScore, scorePercent),
      targetTimelineMonths: recommendedTimelineMonths,
      radarScores: {
        ...student.radarScores,
        aptitudeLogic: Math.min(100, scorePercent),
        technicalDepth: Math.min(100, Math.round((student.radarScores.technicalDepth + scorePercent) / 2)),
      }
    });

    sound.playLevelUp();
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#7C3AED', '#EC4899']
      });
    } catch {
      // fallback
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = DIAGNOSTIC_QUESTIONS[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / DIAGNOSTIC_QUESTIONS.length) * 100);

  return (
    <div className="w-full space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                5-Minute Diagnostic Skill Calibrator
              </h2>
              <p className="text-xs text-[#D4CDE6]/80 mt-0.5">
                Evaluates algorithmic reasoning, quantitative aptitude, and distributed system design to establish your placement performance tier.
              </p>
            </div>
          </div>
        </div>

        {/* Live Timer Pill */}
        {isTestActive && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/40 border border-amber-500/30 text-amber-300 font-mono text-sm font-bold shadow-glow self-start md:self-auto">
            <Timer className="w-4 h-4 animate-spin-slow text-amber-400" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* State 1: Test Start Screen */}
      {!isTestActive && !isCompleted && (
        <div className="p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass text-center max-w-3xl mx-auto space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#7C3AED] via-[#EC4899] to-[#F59E0B] p-0.5 shadow-glow">
            <div className="w-full h-full bg-[#16102a] rounded-[22px] flex items-center justify-center">
              <Target className="w-10 h-10 text-amber-300" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black text-white font-display">
              Ready to Benchmark Your Aptitude?
            </h3>
            <p className="text-sm text-[#D4CDE6]/80 max-w-lg mx-auto mt-2 leading-relaxed">
              Answer 6 comprehensive multi-domain challenge questions. Your score directly tailors your career recommendations, estimated timeline, and roadmap difficulty.
            </p>
          </div>

          {/* Test Structure Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-bold text-purple-300 uppercase">Duration</span>
              <div className="text-base font-black text-white mt-1">5 Minutes</div>
              <div className="text-[10px] text-white/50">Timed Speed Test</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-bold text-cyan-300 uppercase">Questions</span>
              <div className="text-base font-black text-white mt-1">6 Challenges</div>
              <div className="text-[10px] text-white/50">Weighted Scoring</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-bold text-emerald-300 uppercase">Tier System</span>
              <div className="text-base font-black text-white mt-1">3 Tiers</div>
              <div className="text-[10px] text-white/50">Foundation to Adv.</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-bold text-pink-300 uppercase">Current Tier</span>
              <div className="text-base font-black text-white mt-1">{student.aptitudeTier.split(' ')[0]}</div>
              <div className="text-[10px] text-white/50">Ready to level up</div>
            </div>
          </div>

          <button
            onClick={handleStartTest}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] text-white font-bold text-sm tracking-wide shadow-glow hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Launch 5-Minute Calibration →
          </button>
        </div>
      )}

      {/* State 2: Active Test Stepper */}
      {isTestActive && !isCompleted && (
        <div className="p-6 sm:p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-6">
          
          {/* Progress Bar & Question Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#D4CDE6]">
              <span className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {currentQ.category}
                </span>
                <span>Question {currentIdx + 1} of {DIAGNOSTIC_QUESTIONS.length}</span>
              </span>
              <span className="font-mono text-purple-300">{progressPercent}% Completed</span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F59E0B] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Text & Code Snippet */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>

            {currentQ.codeSnippet && (
              <pre className="p-4 rounded-2xl bg-[#090614] border border-purple-500/30 text-emerald-300 font-mono text-xs overflow-x-auto">
                <code>{currentQ.codeSnippet}</code>
              </pre>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentIdx] === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`flex items-center justify-between p-4 rounded-2xl text-left text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? 'bg-purple-600/30 border-2 border-purple-400 text-white shadow-glow'
                      : 'bg-white/5 border border-white/10 text-[#D4CDE6] hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="pr-3">{opt}</span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-purple-500 text-white' : 'border border-white/20'
                  }`}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stepper Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#D4CDE6] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentIdx] === undefined}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-xs font-bold shadow-glow hover:scale-105 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1.5"
            >
              <span>{currentIdx === DIAGNOSTIC_QUESTIONS.length - 1 ? 'Finish Assessment' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* State 3: Test Completed Results View */}
      {isCompleted && scoreResult && (
        <div className="p-8 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Assessment Calibrated Successfully</span>
            </div>
            <h3 className="text-3xl font-black text-white font-display">
              Performance Classification: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">{scoreResult.tier}</span>
            </h3>
          </div>

          {/* Tri-Color Result Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#F14938] to-[#E11D48] text-white shadow-coral-glow">
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">Diagnostic Score</span>
              <div className="text-4xl font-black font-display mt-1">{scoreResult.scorePercent}%</div>
              <p className="text-xs text-white/90 mt-1">
                {scoreResult.correctCount} of {DIAGNOSTIC_QUESTIONS.length} Questions Correct
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-[#1F3668] text-white shadow-glass border border-blue-400/20">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Recommended Pathway</span>
              <div className="text-4xl font-black font-display mt-1">{scoreResult.recommendedTimelineMonths} Months</div>
              <p className="text-xs text-blue-200/90 mt-1">
                Optimized 15 hrs/week study schedule
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white text-[#120E1E] shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#120E1E]/70">Placement Confidence</span>
              <div className="text-4xl font-black font-display text-emerald-600 mt-1">
                {scoreResult.scorePercent >= 80 ? 'High' : 'Medium-High'}
              </div>
              <p className="text-xs text-[#120E1E]/70 mt-1">
                Tier-1 Product Company Eligibility
              </p>
            </div>

          </div>

          {/* Question Breakdown Accordion / List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Question Diagnostics & Explanations
            </h4>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {DIAGNOSTIC_QUESTIONS.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;
                return (
                  <div key={q.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-white flex items-center gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span>Q{idx + 1}: {q.question.slice(0, 75)}...</span>
                      </span>
                      <span className={isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                        {isCorrect ? `+${q.weight} Pts` : '0 Pts'}
                      </span>
                    </div>
                    <p className="text-[#D4CDE6]/70 pl-6 text-[11px]">
                      <strong>Explanation:</strong> {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Step Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
            <button
              onClick={handleStartTest}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#D4CDE6] flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Calibration</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onViewRecommendations();
                }}
                className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>View AI Career Matches</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onViewRoadmap();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-xs font-bold shadow-glow hover:scale-105 transition-all flex items-center gap-1.5"
              >
                <Target className="w-3.5 h-3.5" />
                <span>Open Personalized Roadmap →</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
