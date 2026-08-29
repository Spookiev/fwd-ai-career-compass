import React from 'react';

export const FWDLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; showText?: boolean }> = ({ 
  size = 'md', 
  showText = true 
}) => {
  const dimension = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-13 h-13' : 'w-10 h-10';
  const iconDimension = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      <div className={`relative ${dimension} rounded-2xl bg-gradient-to-tr from-[#F14938] via-[#A855F7] to-[#10B981] p-[2px] shadow-glow group-hover:scale-105 transition-all duration-300`}>
        <div className="w-full h-full bg-[#16102a] rounded-[14px] flex items-center justify-center relative overflow-hidden backdrop-blur-md">
          {/* Ambient inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent pointer-events-none" />
          
          {/* 4-Leaf Lucky Charm Fast-Forward SVG */}
          <svg 
            className={`${iconDimension} text-white transition-transform group-hover:translate-x-0.5 duration-200`} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M13 19l6-7-6-7" />
            <path d="M6 19l6-7-6-7" />
            <circle cx="12" cy="12" r="2" fill="#10B981" />
          </svg>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-black text-2xl tracking-tighter text-white leading-none font-display">
              FWD<span className="text-[#F14938]">.</span>
            </span>
            <span className="px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
              AI 2.5
            </span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4CDE6]/80 mt-0.5">
            Skills & Career
          </span>
        </div>
      )}
    </div>
  );
};
