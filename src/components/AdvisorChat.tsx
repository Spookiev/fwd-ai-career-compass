import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  RefreshCw,
  Zap,
  Check,
  Brain,
  ArrowRight,
  Clock,
  Heart,
  Target,
  Flame,
  ShieldCheck,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { sound } from '../lib/sound';
import { 
  generateCompanionResponse, 
  CompanionChatMessage, 
  StudentContextPayload,
  StructuredCompanionResponse,
  MemoryCandidate,
  SuggestedAction,
  QuickAction
} from '../lib/gemini';

interface AdvisorChatProps {
  studentContext?: StudentContextPayload;
}

export const AdvisorChat: React.FC<AdvisorChatProps> = ({ studentContext }) => {
  const { student, roadmap, wellbeing, triangulatedProfile, possibilityMap } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Stored memories persisted in localStorage
  const [storedMemories, setStoredMemories] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fwd_companion_memories');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return {
      learning_style: 'Prefers hands-on code examples over theoretical reading',
      primary_focus: 'Full-stack AI deployment and system design'
    };
  });

  // Calculate live student context payload
  const activeContext: StudentContextPayload = studentContext || {
    name: student.displayName,
    dreamRole: student.dreamRole,
    targetTier: student.aptitudeTier === 'Advanced Tier' ? 'Advanced' : student.aptitudeTier === 'Foundation Tier' ? 'Foundation' : 'Associate',
    cgpa: student.cgpa,
    skills: Object.keys(triangulatedProfile.skills || {}).slice(0, 5),
    solvedProblemsCount: 142,
    projectsCount: student.projects?.length || 3,
    roadmapProgress: student.readinessScore,
    currentStreak: wellbeing.currentStreak,
    fatigueScore: wellbeing.fatigueScore,
    recentMood: wellbeing.dailyLogs[0]?.moodEmoji || '😊',
    storedMemories
  };

  // Initial welcome message
  const [messages, setMessages] = useState<CompanionChatMessage[]>([
    {
      id: 'm-init',
      role: 'model',
      content: `Hey **${student.displayName}** 👋 I'm your **FWD AI Companion**.\n\nI'm tracking your trajectory toward **${student.dreamRole}** (${student.readinessScore}% readiness, ${wellbeing.currentStreak}d streak 🔥).\n\nWhether you need to debug a stubborn blocker, calibrate study fatigue, or pressure-test your roadmap strategy, let's talk. What's on your mind?`,
      timestamp: 'Just now',
      structuredData: {
        mode: 'CAREER_GUIDANCE',
        emotion: 'calm & supportive',
        needs: ['orientation', 'momentum'],
        response: '',
        quickActions: [
          { label: '🧭 Career Direction', promptText: 'Where should I focus to reach 90%+ readiness?' },
          { label: '💻 Debug a Roadblock', promptText: 'I am stuck on an error in my code.' },
          { label: '😫 Mentally Drained', promptText: 'I’ve been studying for hours and feel overwhelmed.' },
          { label: '❄️ Freeze Streak Today', promptText: 'I need a rest day today. Can I freeze my streak?' }
        ]
      }
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    sound.playClick();
    const userMsg: CompanionChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const structuredResult: StructuredCompanionResponse = await generateCompanionResponse({
        history,
        userMessage: text.trim(),
        context: activeContext
      });

      sound.playLevelUp();
      const botMsg: CompanionChatMessage = {
        id: `b_${Date.now()}`,
        role: 'model',
        content: structuredResult.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        structuredData: structuredResult
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error('Companion Chat Error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptMemory = (messageId: string, memory: MemoryCandidate) => {
    sound.playCheck();
    const updated = {
      ...storedMemories,
      [memory.key]: memory.value
    };
    setStoredMemories(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fwd_companion_memories', JSON.stringify(updated));
    }

    setMessages(prev => prev.map(m => {
      if (m.id === messageId) {
        return { ...m, memoryAccepted: true, memoryDismissed: false };
      }
      return m;
    }));
  };

  const handleDismissMemory = (messageId: string) => {
    sound.playClick();
    setMessages(prev => prev.map(m => {
      if (m.id === messageId) {
        return { ...m, memoryDismissed: true };
      }
      return m;
    }));
  };

  const handleActionClick = (action: SuggestedAction) => {
    sound.playClick();
    handleSend(`I would like to start this action: "${action.label}"`);
  };

  const topPossibility = possibilityMap.matches[0];
  const lastStructuredData = messages[messages.length - 1]?.structuredData;
  const activeQuickActions = lastStructuredData?.quickActions || [
    { label: '🧭 Career Direction', promptText: 'Where should I focus next?' },
    { label: '💻 Debug Code', promptText: 'Help me debug a technical error.' },
    { label: '😫 Mentally Drained', promptText: 'I feel overwhelmed and need to reset.' },
    { label: '🧘 Take a Break', promptText: 'How do I take a guilt-free recovery break?' }
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => {
            sound.playThemeSwitch();
            setIsOpen(true);
          }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F14938] text-white font-bold text-xs shadow-glow hover:scale-105 active:scale-95 transition-all duration-200 group border border-white/20"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="leading-tight font-extrabold font-display">FWD AI Companion</span>
            <span className="text-[10px] text-white/80 font-normal">Online Mentor & Coach</span>
          </div>
        </button>
      )}

      {/* Floating Glassmorphic Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-6 right-6 z-50 rounded-4xl bg-[#0E0A1A]/95 backdrop-blur-3xl border border-purple-500/40 shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${
              isExpanded ? 'w-[94vw] sm:w-[680px] h-[85vh]' : 'w-[94vw] sm:w-[440px] h-[580px]'
            }`}
          >
            {/* Header with Context Micro-Bar */}
            <div className="p-4 bg-gradient-to-r from-purple-950/90 via-[#180E2E]/95 to-pink-950/90 border-b border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white shadow-glow">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white font-display">
                        FWD AI Companion
                      </h3>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-black tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ACTIVE SYNC
                      </span>
                    </div>
                    <p className="text-[10px] text-[#D4CDE6]/70">
                      Senior Engineering Mentor & Career Coach
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title={isExpanded ? 'Minimize' : 'Expand'}
                  >
                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsOpen(false);
                    }}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Context-Aware Micro-Bar */}
              <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px]">
                <div className="flex items-center gap-1.5 text-purple-300">
                  <Target className="w-3 h-3 text-pink-400" />
                  <span>Target: <strong className="text-white">{topPossibility?.title || student.dreamRole}</strong></span>
                  <span className="text-emerald-400 font-mono">({topPossibility?.compatibilityScore || 94}% Match)</span>
                </div>
                
                <div className="flex items-center gap-2 text-white/60">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Flame className="w-3 h-3" />
                    <span>{wellbeing.currentStreak}d</span>
                  </span>
                  <span>•</span>
                  <span>{activeContext.targetTier} Tier</span>
                </div>
              </div>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((m) => {
                const isBot = m.role === 'model';
                const structured = m.structuredData;
                const memory = structured?.memoryCandidate;
                const action = structured?.suggestedAction;

                return (
                  <motion.div 
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} space-y-2`}
                  >
                    <div className={`flex gap-2.5 max-w-[90%] ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}>
                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-white ${
                        isBot 
                          ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 border border-purple-400/40 shadow-glow' 
                          : 'bg-gradient-to-tr from-pink-600 to-rose-600 border border-pink-400/40'
                      }`}>
                        {isBot ? <Sparkles className="w-3.5 h-3.5 text-amber-300" /> : <User className="w-3.5 h-3.5" />}
                      </div>

                      {/* Content Bubble */}
                      <div className="space-y-2">
                        <div className={`p-3.5 rounded-3xl leading-relaxed whitespace-pre-wrap ${
                          isBot 
                            ? 'bg-white/5 border border-white/10 text-[#E5DFF2] shadow-sm' 
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-glow'
                        }`}>
                          {m.content}
                          <div className="text-[9px] opacity-40 mt-1.5 text-right font-mono">{m.timestamp}</div>
                        </div>

                        {/* Interactive Memory Pill (User Control) */}
                        {isBot && memory && memory.shouldRemember && !m.memoryDismissed && (
                          <div className="p-2.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-[11px] text-[#D4CDE6] space-y-1.5 animate-in fade-in">
                            <div className="flex items-center gap-1.5 text-purple-300 font-bold text-[10px] uppercase">
                              <Brain className="w-3.5 h-3.5 text-pink-400" />
                              <span>{m.memoryAccepted ? 'Memory Saved to Context' : 'Context Memory Detected'}</span>
                            </div>

                            {m.memoryAccepted ? (
                              <div className="flex items-center gap-1 text-emerald-300 text-[10px] font-semibold">
                                <Check className="w-3.5 h-3.5" />
                                <span>Remembered: "{memory.displaySummary}"</span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between gap-2 pt-0.5">
                                <span className="text-white/80 text-[10px] line-clamp-1">
                                  "{memory.displaySummary}"
                                </span>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <button
                                    onClick={() => handleAcceptMemory(m.id, memory)}
                                    className="px-2 py-0.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold flex items-center gap-1"
                                  >
                                    <Check className="w-3 h-3" />
                                    <span>Accept</span>
                                  </button>
                                  <button
                                    onClick={() => handleDismissMemory(m.id)}
                                    className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white text-[10px]"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Single Next Action Button (Accent Glow) */}
                        {isBot && action && (
                          <button
                            onClick={() => handleActionClick(action)}
                            className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-[#F14938] to-[#EC4899] hover:opacity-95 text-white text-xs font-bold shadow-coral-glow transition-all flex items-center justify-between gap-2 text-left"
                          >
                            <div className="flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-amber-300 flex-shrink-0" />
                              <span>{action.label}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-mono text-white/80 flex-shrink-0">
                              <Clock className="w-3 h-3" />
                              <span>~{action.durationMinutes || 15}m</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[#D4CDE6] text-xs">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                  <span>Calibrating mentor response with Gemini 2.5...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Contextual Quick Pills */}
            <div className="px-4 py-2 border-t border-white/5 bg-black/30 flex gap-1.5 overflow-x-auto scrollbar-none">
              {activeQuickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(action.promptText)}
                  className="px-3 py-1 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 text-[11px] text-purple-200 whitespace-nowrap border border-purple-500/30 hover:border-purple-400 transition-all flex-shrink-0 flex items-center gap-1"
                >
                  <span>{action.label}</span>
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-3 border-t border-white/10 bg-black/50 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your senior mentor or career coach..."
                className="flex-1 p-2.5 rounded-2xl bg-black/60 border border-white/10 text-white text-xs placeholder-white/40 focus:outline-none focus:border-purple-400 transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-glow hover:scale-105 active:scale-95 disabled:opacity-40 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
