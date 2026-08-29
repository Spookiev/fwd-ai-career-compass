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
  Compass,
  FileText,
  Terminal,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendAdvisorChatMessage } from '../lib/gemini';
import { sound } from '../lib/sound';

export const AdvisorChat: React.FC = () => {
  const { student } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'model'; content: string; timestamp: string }>>([
    {
      id: 'm1',
      role: 'model',
      content: `Hello **${student.displayName}**! 👋 I am your 24/7 **FWD Career Intelligence Advisor** powered by Gemini 2.5.\n\nI can analyze your **${student.major}** profile (CGPA: **${student.cgpa}**), recommend OER courses for **${student.dreamRole}**, or critique your resume and mock interview answers. How can I accelerate your pathway today?`,
      timestamp: 'Just now'
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
    const userMsg = {
      id: `u_${Date.now()}`,
      role: 'user' as const,
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await sendAdvisorChatMessage(history, text.trim(), student);
      
      sound.playLevelUp();
      const botMsg = {
        id: `b_${Date.now()}`,
        role: 'model' as const,
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const promptStarters = [
    'How do I bridge my Redis & Vector DB skill gaps?',
    'Give me 3 ATS bullet rewrites for my resume',
    'What are the highest-paying AI roles in 2025?',
    'What should I prioritize in my next 2-week sprint?'
  ];

  return (
    <>
      {/* Floating Trigger Pill */}
      {!isOpen && (
        <button
          onClick={() => {
            sound.playThemeSwitch();
            setIsOpen(true);
          }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F14938] text-white font-bold text-xs shadow-glow hover:scale-105 active:scale-95 transition-all duration-200 group border border-white/20"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span>24/7 AI Career Mentor</span>
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 z-50 rounded-4xl bg-[#120E1E]/95 backdrop-blur-2xl border border-purple-500/40 shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${
            isExpanded ? 'w-[92vw] sm:w-[600px] h-[80vh]' : 'w-[92vw] sm:w-[420px] h-[540px]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white font-display">FWD AI Advisor</h3>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[8px] font-bold">ONLINE</span>
                </div>
                <p className="text-[10px] text-[#D4CDE6]/70">Grounded in verified OER & Placement Guidelines</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                title={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => {
              const isBot = m.role === 'model';

              return (
                <div key={m.id} className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}>
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-white ${
                    isBot ? 'bg-purple-600/40 border border-purple-500/30' : 'bg-pink-600/40 border border-pink-500/30'
                  }`}>
                    {isBot ? <Sparkles className="w-3.5 h-3.5 text-amber-300" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    isBot 
                      ? 'bg-white/5 border border-white/10 text-[#D4CDE6]' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-glow'
                  }`}>
                    {m.content}
                    <div className="text-[9px] opacity-40 mt-1.5 text-right font-mono">{m.timestamp}</div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 text-[#D4CDE6] text-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
                <span>Synthesizing actionable advice with Gemini 2.5...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Starters */}
          <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex gap-1.5 overflow-x-auto scrollbar-none">
            {promptStarters.map((starter, i) => (
              <button
                key={i}
                onClick={() => handleSend(starter)}
                className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] text-[#D4CDE6] whitespace-nowrap border border-white/5 hover:border-purple-500/30 transition-all flex-shrink-0"
              >
                {starter}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask your career advisor anything..."
              className="flex-1 p-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs placeholder-white/30 focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white shadow-glow hover:scale-105 disabled:opacity-40 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
