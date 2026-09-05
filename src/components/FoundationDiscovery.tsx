import React, { useState } from 'react';
import { 
  GraduationCap, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Brain, 
  HeartHandshake, 
  Lightbulb, 
  Palette, 
  ShieldCheck,
  Save,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sound } from '../lib/sound';

interface FoundationDiscoveryProps {
  onSaved: () => void;
  onBack: () => void;
}

interface FoundationModule {
  id: string;
  category: 'Core Reasoning' | 'Creative Intuition' | 'Human Empathy' | 'Technical Curiosity';
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
  options: Array<{
    id: string;
    text: string;
    insight: string;
  }>;
}

const MODULES: FoundationModule[] = [
  {
    id: 'f1',
    category: 'Core Reasoning',
    icon: Brain,
    prompt: 'You are planning a trip for 4 friends with different budgets and flight arrival times. How do you approach the itinerary?',
    options: [
      { id: 'f1_a', text: 'Build a spreadsheet table with constraints to find the mathematical sweet spot.', insight: 'Strong structured logic and systems analytical thinking.' },
      { id: 'f1_b', text: 'Call everyone individually to understand what they value most, then propose 2 flexible options.', insight: 'High empathy, stakeholder alignment, and product intuition.' },
      { id: 'f1_c', text: 'Map out the visual spots, aesthetic cafes, and neighborhood vibes first.', insight: 'Strong spatial creativity and human-centered design sense.' }
    ]
  },
  {
    id: 'f2',
    category: 'Creative Intuition',
    icon: Palette,
    prompt: 'When you look at a website or mobile app you dislike, what bothers you first?',
    options: [
      { id: 'f2_a', text: 'Cluttered layout, poor fonts, or confusing color contrast.', insight: 'Natural eye for visual hierarchy and UI/UX design.' },
      { id: 'f2_b', text: 'Too many steps just to buy a ticket or find basic account information.', insight: 'Strong product process orientation and user journey instincts.' },
      { id: 'f2_c', text: 'Laggy page load speeds, stuttering animations, or broken links.', insight: 'Inherent systems performance consciousness and engineering mindset.' }
    ]
  },
  {
    id: 'f3',
    category: 'Human Empathy',
    icon: HeartHandshake,
    prompt: 'A friend is struggling to understand how a complex digital service works. What is your style of explanation?',
    options: [
      { id: 'f3_a', text: 'Draw a simple diagram or visual analogy comparing it to something in everyday life.', insight: 'Elite developer advocacy and technical communication aptitude.' },
      { id: 'f3_b', text: 'Break it down into a numbered checklist with clear step-by-step instructions.', insight: 'Great technical writing and structured task orchestration.' },
      { id: 'f3_c', text: 'Take over the screen and guide them click-by-click patiently.', insight: 'High customer success and collaborative support capability.' }
    ]
  },
  {
    id: 'f4',
    category: 'Technical Curiosity',
    icon: Lightbulb,
    prompt: 'If you could learn any single modern skill this semester with zero barrier to entry, what would excite you most?',
    options: [
      { id: 'f4_a', text: 'Building a working AI assistant that answers questions from my own notes.', insight: 'Natural curiosity for applied generative AI engineering.' },
      { id: 'f4_b', text: 'Designing an interactive mobile app prototype in Figma that feels real.', insight: 'Natural affinity for design systems and product technologist roles.' },
      { id: 'f4_c', text: 'Launching a digital community newsletter or organizing technical study groups.', insight: 'Natural affinity for community evangelism and technical operations.' }
    ]
  }
];

export const FoundationDiscovery: React.FC<FoundationDiscoveryProps> = ({ onSaved, onBack }) => {
  const { runTriangulation, updateStudent } = useAuth();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({
    f1: 'f1_a',
    f2: 'f2_a',
    f3: 'f3_a',
    f4: 'f4_a'
  });

  const handleSelect = (moduleId: string, optionId: string) => {
    sound.playClick();
    setSelectedAnswers(prev => ({ ...prev, [moduleId]: optionId }));
  };

  const handleSaveFoundation = async () => {
    sound.playLevelUp();
    updateStudent({ aptitudeTier: 'Foundation Tier' });
    
    await runTriangulation({
      interests: { tech: 0.65, product: 0.70, creative: 0.75, communication: 0.75 },
      workStyle: { collaboration: 70, structure: 60, orientation: 50, execution: 65 }
    });

    onSaved();
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl font-black text-white font-display flex items-center gap-2">
              <span>Beginner Foundation Discovery</span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono">
                Zero-Coding Barrier
              </span>
            </h2>
            <p className="text-xs text-[#D4CDE6]/70">
              No technical background required. We evaluate your natural reasoning, design empathy, and problem solving instincts.
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveFoundation}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white text-xs font-bold shadow-glow transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Complete Foundation Mapping</span>
        </button>
      </div>

      {/* 4 Interactive Foundation Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODULES.map((mod, idx) => {
          const Icon = mod.icon;
          const currentSelection = selectedAnswers[mod.id];
          const selectedOptionObj = mod.options.find(o => o.id === currentSelection);

          return (
            <div
              key={mod.id}
              className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                        Module {idx + 1}: {mod.category}
                      </h4>
                      <span className="text-[10px] text-white/50">Intuition Challenge</span>
                    </div>
                  </div>

                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                <p className="text-xs text-white font-medium leading-relaxed">
                  {mod.prompt}
                </p>

                {/* Option List */}
                <div className="space-y-2 pt-1">
                  {mod.options.map((opt) => {
                    const isSelected = currentSelection === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(mod.id, opt.id)}
                        className={`w-full p-3.5 rounded-2xl text-left text-xs transition-all border ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-900/50 to-purple-900/40 border-cyan-400 text-white font-semibold shadow-glow'
                            : 'bg-white/5 hover:bg-white/10 border-white/5 text-[#D4CDE6]'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            isSelected ? 'bg-cyan-400' : 'bg-white/30'
                          }`} />
                          <span className="leading-snug">{opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Real-Time Insight Feedback Card */}
              {selectedOptionObj && (
                <div className="mt-3 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-cyan-200 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                  <span><strong>AI Insight:</strong> {selectedOptionObj.insight}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Confirmation Card */}
      <div className="p-6 rounded-4xl bg-gradient-to-r from-cyan-950/60 via-purple-950/40 to-pink-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Inclusive Foundation Tier Ready</span>
          </h4>
          <p className="text-xs text-[#D4CDE6]/80 max-w-xl">
            FWD adapts all subsequent roadmaps and mini-trials to your comfort zone, offering step-by-step guidance and verified zero-cost courses.
          </p>
        </div>

        <button
          onClick={handleSaveFoundation}
          className="px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all shadow-glow flex items-center gap-2 whitespace-nowrap"
        >
          <span>Save & View Recommendations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
