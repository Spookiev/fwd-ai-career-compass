import React, { useState } from 'react';
import { 
  UserCheck, 
  X, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  LogIn, 
  ArrowRight,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sound } from '../lib/sound';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { role, setRole, switchDemoStudent } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playLevelUp();
    onClose();
  };

  const handleSelectStudentDemo = (index: number) => {
    sound.playLevelUp();
    setRole('student');
    switchDemoStudent(index);
    onClose();
  };

  const handleSelectFacultyDemo = () => {
    sound.playLevelUp();
    setRole('faculty');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-4xl bg-[#140E24] border border-purple-500/30 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-purple-600/30 text-purple-300 border border-purple-500/30">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-display">
                Institutional Gateway Login
              </h3>
              <p className="text-[11px] text-[#D4CDE6]/70">Firebase Auth & Demo Personas</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1-Click Instant Demo Personas */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Verified Demo Personas</span>
          </span>

          <div className="space-y-2">
            <button
              onClick={() => handleSelectStudentDemo(0)}
              className="flex items-center justify-between w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                  alt="Rahul Sharma"
                  className="w-8 h-8 rounded-xl object-cover border border-purple-400"
                />
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-purple-300">Rahul Sharma</div>
                  <div className="text-[10px] text-white/50">Full Stack AI • Associate Tier (82.5%)</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white" />
            </button>

            <button
              onClick={() => handleSelectStudentDemo(1)}
              className="flex items-center justify-between w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80"
                  alt="Priya Patel"
                  className="w-8 h-8 rounded-xl object-cover border border-pink-400"
                />
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-pink-300">Priya Patel</div>
                  <div className="text-[10px] text-white/50">ML Research • Advanced Tier (91.0%)</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white" />
            </button>

            <button
              onClick={handleSelectFacultyDemo}
              className="flex items-center justify-between w-full p-3 rounded-2xl bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/30 text-left transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-300">Dr. Ananya Sen</div>
                  <div className="text-[10px] text-white/50">Head of Placement & AI Research Advisor</div>
                </div>
              </div>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="absolute bg-[#140E24] px-2 text-[10px] uppercase tracking-widest text-white/40 font-mono">
            or password login
          </span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleLogin} className="space-y-3 text-xs">
          <div className="space-y-1">
            <label className="text-white/70 font-semibold">Institutional Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@university.edu"
              className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-white/70 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold shadow-glow hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5 pt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Institutional Portal</span>
          </button>
        </form>

      </div>
    </div>
  );
};
