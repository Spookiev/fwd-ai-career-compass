import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Check, 
  Lock, 
  Award, 
  ShieldCheck, 
  Flame,
  Palette
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AVAILABLE_AVATARS } from '../data/sampleProfiles';
import { AvatarCategory, AvatarIdentity, AvatarTier } from '../types';
import { sound } from '../lib/sound';

interface AvatarIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AvatarIdentityModal: React.FC<AvatarIdentityModalProps> = ({ isOpen, onClose }) => {
  const { avatar, updateAvatar, student } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<AvatarCategory | 'all'>('all');

  if (!isOpen) return null;

  const categories: Array<{ id: AvatarCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Avatars' },
    { id: 'animals', label: 'Animals' },
    { id: 'robots', label: 'Robots' },
    { id: 'anime', label: 'Anime' },
    { id: 'fantasy', label: 'Fantasy' },
    { id: 'professional', label: 'Professional' },
    { id: 'minimalist', label: 'Minimalist' }
  ];

  // User tier eligibility logic
  const isTierUnlocked = (tier: AvatarTier) => {
    if (tier === 'foundation') return true;
    if (tier === 'associate') return student.readinessScore >= 70;
    if (tier === 'advanced') return student.readinessScore >= 85;
    return true;
  };

  const filteredAvatars = AVAILABLE_AVATARS.filter(a => {
    return selectedCategory === 'all' || a.category === selectedCategory;
  });

  const handleSelectAvatar = (targetAvatar: AvatarIdentity) => {
    if (!isTierUnlocked(targetAvatar.unlockedTier)) {
      sound.playClick();
      return;
    }
    updateAvatar(targetAvatar);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl p-6 sm:p-8 rounded-4xl bg-[#140E24]/95 border border-purple-500/30 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white shadow-glow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white font-display">
                Tiered Avatar Identity Arena
              </h2>
              <p className="text-xs text-[#D4CDE6]/70">
                Unlock celebratory avatars as your Placement Readiness Index climbs.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(c.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-purple-600 text-white shadow-glow'
                  : 'bg-white/5 text-[#D4CDE6] hover:bg-white/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Current Active Avatar Summary */}
        <div className="p-4 rounded-3xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={avatar.imageUrl}
              alt={avatar.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-purple-400"
            />
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Active Avatar:</span>
                <span className="text-purple-300 font-extrabold">{avatar.name}</span>
              </div>
              <p className="text-[10px] text-white/50">{avatar.description}</p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase">
            Active
          </span>
        </div>

        {/* Avatar Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredAvatars.map((item) => {
            const isSelected = avatar.id === item.id;
            const unlocked = isTierUnlocked(item.unlockedTier);

            return (
              <div
                key={item.id}
                onClick={() => handleSelectAvatar(item)}
                className={`group cursor-pointer p-4 rounded-3xl border transition-all duration-200 flex flex-col items-center text-center relative overflow-hidden ${
                  isSelected
                    ? 'bg-purple-900/50 border-purple-400 shadow-glow scale-[1.03]'
                    : unlocked
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-purple-400/40'
                    : 'bg-black/40 border-white/5 opacity-50 cursor-not-allowed'
                }`}
              >
                {/* Avatar Image */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-3 border border-white/10">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {!unlocked && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-amber-300">
                      <Lock className="w-5 h-5" />
                      <span className="text-[9px] font-bold uppercase mt-1">{item.unlockedTier}</span>
                    </div>
                  )}
                </div>

                <div className="text-xs font-bold text-white leading-tight">{item.name}</div>
                <span className="text-[9px] text-purple-300 uppercase font-mono mt-0.5">{item.category}</span>
                <p className="text-[10px] text-[#D4CDE6]/70 mt-1 line-clamp-2">{item.description}</p>

                {isSelected && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                    <Check className="w-3 h-3" />
                    <span>Equipped</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
