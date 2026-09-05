import React, { useState } from 'react';
import { 
  Sparkles, 
  Sliders, 
  Compass, 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Users, 
  Cpu, 
  Palette, 
  MessageSquare,
  Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { WorkStyleVector } from '../types';
import { sound } from '../lib/sound';

interface InterestDiscoveryProps {
  onSaved: () => void;
  onBack: () => void;
}

interface ScenarioQuestion {
  id: string;
  title: string;
  scenario: string;
  options: Array<{
    id: string;
    text: string;
    domain: 'tech' | 'product' | 'creative' | 'communication';
    weight: number;
  }>;
}

const SCENARIOS: ScenarioQuestion[] = [
  {
    id: 'sc-1',
    title: 'Saturday Hackathon Energy',
    scenario: 'You have 48 hours with a blank slate. What is your instinctual first instinct?',
    options: [
      { id: 'o1', text: 'Architect the distributed data flow and database schema.', domain: 'tech', weight: 0.9 },
      { id: 'o2', text: 'Define the target user persona, pain points, and product wireframe.', domain: 'product', weight: 0.9 },
      { id: 'o3', text: 'Craft the typography, dark-mode color palette, and micro-interactions.', domain: 'creative', weight: 0.9 },
      { id: 'o4', text: 'Write the project storytelling pitch and coordinate the team presentation.', domain: 'communication', weight: 0.9 }
    ]
  },
  {
    id: 'sc-2',
    title: 'Debugging Friction',
    scenario: 'An unexpected regression breaks on production. Where do you gravitate?',
    options: [
      { id: 'o1', text: 'Dive into logs, network traces, and profiler flamegraphs.', domain: 'tech', weight: 0.85 },
      { id: 'o2', text: 'Assess user impact, blast radius, and prioritize the customer communication.', domain: 'product', weight: 0.85 },
      { id: 'o3', text: 'Design an intuitive fallback empty state or recovery modal.', domain: 'creative', weight: 0.85 },
      { id: 'o4', text: 'Write the incident post-mortem and explain the root cause clearly to stakeholders.', domain: 'communication', weight: 0.85 }
    ]
  },
  {
    id: 'sc-3',
    title: 'Curiosity Spark',
    scenario: 'You find a fascinating new open-source project. What do you do first?',
    options: [
      { id: 'o1', text: 'Inspect the core algorithms and test how it scales under load.', domain: 'tech', weight: 0.85 },
      { id: 'o2', text: 'Think about how to package it into a commercial SaaS product.', domain: 'product', weight: 0.85 },
      { id: 'o3', text: 'Redesign its landing page and UX to make it breathtaking.', domain: 'creative', weight: 0.85 },
      { id: 'o4', text: 'Write a step-by-step tutorial or record a demo explaining how it works.', domain: 'communication', weight: 0.85 }
    ]
  },
  {
    id: 'sc-4',
    title: 'Ideal Daily Flow',
    scenario: 'At the end of an awesome work session, what made you feel most satisfied?',
    options: [
      { id: 'o1', text: 'Solving a hairy concurrency race condition with elegant code.', domain: 'tech', weight: 0.9 },
      { id: 'o2', text: 'Seeing real users complete their goals faster because of a feature you launched.', domain: 'product', weight: 0.9 },
      { id: 'o3', text: 'Creating a visual interface that looks like it belongs in the year 2030.', domain: 'creative', weight: 0.9 },
      { id: 'o4', text: 'Helping 5 colleagues or community members overcome a difficult blocker.', domain: 'communication', weight: 0.9 }
    ]
  }
];

export const InterestDiscovery: React.FC<InterestDiscoveryProps> = ({ onSaved, onBack }) => {
  const { triangulatedProfile, runTriangulation } = useAuth();

  // Selected scenario choices
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({
    'sc-1': 'o1',
    'sc-2': 'o2',
    'sc-3': 'o4',
    'sc-4': 'o1'
  });

  // 4 Interactive bi-directional range sliders
  const [workStyle, setWorkStyle] = useState<WorkStyleVector>(triangulatedProfile.workStyle || {
    collaboration: 65,
    structure: 60,
    orientation: 75,
    execution: 80
  });

  const handleSelectOption = (scenarioId: string, optionId: string) => {
    sound.playClick();
    setSelectedChoices(prev => ({ ...prev, [scenarioId]: optionId }));
  };

  const handleSliderChange = (key: keyof WorkStyleVector, val: number) => {
    setWorkStyle(prev => ({ ...prev, [key]: val }));
  };

  // Compute live interest weights from scenarios & sliders
  let techScore = 0.5;
  let productScore = 0.5;
  let creativeScore = 0.5;
  let commScore = 0.5;

  Object.entries(selectedChoices).forEach(([sId, optId]) => {
    const sc = SCENARIOS.find(s => s.id === sId);
    const opt = sc?.options.find(o => o.id === optId);
    if (opt) {
      if (opt.domain === 'tech') techScore += 0.25;
      if (opt.domain === 'product') productScore += 0.25;
      if (opt.domain === 'creative') creativeScore += 0.25;
      if (opt.domain === 'communication') commScore += 0.25;
    }
  });

  // Factor in sliders
  if (workStyle.orientation > 60) techScore += 0.15;
  if (workStyle.orientation < 40) commScore += 0.15;
  if (workStyle.collaboration > 60) productScore += 0.15;
  if (workStyle.execution < 40) creativeScore += 0.15;

  const total = techScore + productScore + creativeScore + commScore;
  const normalizedInterests = {
    tech: Number((techScore / total).toFixed(2)),
    product: Number((productScore / total).toFixed(2)),
    creative: Number((creativeScore / total).toFixed(2)),
    communication: Number((commScore / total).toFixed(2))
  };

  const handleSaveAndCalculate = async () => {
    sound.playLevelUp();
    await runTriangulation({
      interests: normalizedInterests,
      workStyle: workStyle
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
              <span>Rapid Interest & Workstyle Discovery</span>
              <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-mono">
                Micro-Scenarios
              </span>
            </h2>
            <p className="text-xs text-[#D4CDE6]/70">
              No tedious 50-question inventories. 4 quick scenario cards and 4 bi-directional workstyle sliders.
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveAndCalculate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-glow transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Interests & Formulate Profile</span>
        </button>
      </div>

      {/* Main Grid: Left Scenarios (7 Cols) + Right Sliders & Vector (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: 4 Scenario Cards */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-300 px-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Scenario Cards</span>
          </span>

          <div className="space-y-3.5">
            {SCENARIOS.map((sc, idx) => (
              <div
                key={sc.id}
                className="p-5 rounded-3xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg bg-pink-500/20 text-pink-300 flex items-center justify-center font-mono text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{sc.title}</span>
                  </span>
                </div>

                <p className="text-xs text-[#D4CDE6]/90 leading-relaxed font-medium">
                  {sc.scenario}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {sc.options.map((opt) => {
                    const isSelected = selectedChoices[sc.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(sc.id, opt.id)}
                        className={`p-3 rounded-2xl text-left text-xs transition-all border ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-900/60 to-purple-900/40 border-pink-400 text-white font-semibold shadow-glow scale-[1.01]'
                            : 'bg-white/5 hover:bg-white/10 border-white/5 text-[#D4CDE6]'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            isSelected ? 'bg-pink-400 animate-pulse' : 'bg-white/30'
                          }`} />
                          <span className="leading-snug">{opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 4 Bi-Directional Sliders & Live Interest Vector */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Bi-Directional Sliders */}
          <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                <span>Workstyle Sliders</span>
              </span>
              <span className="text-[10px] text-white/50">Bi-directional range</span>
            </div>

            {/* Slider 1: Solo vs Team */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-white">
                <span className="text-purple-300">Solo Deep Work</span>
                <span className="text-cyan-300">Team Collaboration</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={workStyle.collaboration}
                onChange={(e) => handleSliderChange('collaboration', parseInt(e.target.value))}
                className="w-full h-2 rounded-lg bg-black/40 accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40">
                <span>Autonomous</span>
                <span className="font-mono text-white/80">{workStyle.collaboration}%</span>
                <span>Co-creative</span>
              </div>
            </div>

            {/* Slider 2: Structured vs Flexible */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-white">
                <span className="text-purple-300">Structured & Rigorous</span>
                <span className="text-emerald-300">Flexible & Exploratory</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={workStyle.structure}
                onChange={(e) => handleSliderChange('structure', parseInt(e.target.value))}
                className="w-full h-2 rounded-lg bg-black/40 accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40">
                <span>Strict Spec</span>
                <span className="font-mono text-white/80">{workStyle.structure}%</span>
                <span>Iterative Chaos</span>
              </div>
            </div>

            {/* Slider 3: Deep Technical vs People-Focused */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-white">
                <span className="text-purple-300">Deep Technical</span>
                <span className="text-pink-300">People-Focused</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={workStyle.orientation}
                onChange={(e) => handleSliderChange('orientation', parseInt(e.target.value))}
                className="w-full h-2 rounded-lg bg-black/40 accent-pink-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40">
                <span>Under the Hood</span>
                <span className="font-mono text-white/80">{workStyle.orientation}%</span>
                <span>User Empathy</span>
              </div>
            </div>

            {/* Slider 4: Build vs Analyze */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-white">
                <span className="text-purple-300">Fast Build (0 to 1)</span>
                <span className="text-amber-300">Analytical Optimization</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={workStyle.execution}
                onChange={(e) => handleSliderChange('execution', parseInt(e.target.value))}
                className="w-full h-2 rounded-lg bg-black/40 accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40">
                <span>Rapid Prototype</span>
                <span className="font-mono text-white/80">{workStyle.execution}%</span>
                <span>System Tuning</span>
              </div>
            </div>

          </div>

          {/* Live Synthesized Interest Vector Display */}
          <div className="p-6 rounded-4xl bg-[var(--theme-surface)]/80 backdrop-blur-2xl border border-white/10 shadow-glass space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Live Interest Vector</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Normalized</span>
            </div>

            <div className="space-y-3">
              {/* Tech Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    <span>Technology & Deep Architecture</span>
                  </span>
                  <span className="font-bold text-purple-300">{Math.round(normalizedInterests.tech * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full transition-all duration-300" style={{ width: `${normalizedInterests.tech * 100}%` }} />
                </div>
              </div>

              {/* Product Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Product & Business Strategy</span>
                  </span>
                  <span className="font-bold text-cyan-300">{Math.round(normalizedInterests.product * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full transition-all duration-300" style={{ width: `${normalizedInterests.product * 100}%` }} />
                </div>
              </div>

              {/* Creative Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-pink-400" />
                    <span>Creative & UI/UX Design</span>
                  </span>
                  <span className="font-bold text-pink-300">{Math.round(normalizedInterests.creative * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full transition-all duration-300" style={{ width: `${normalizedInterests.creative * 100}%` }} />
                </div>
              </div>

              {/* Communication Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Communication & Community</span>
                  </span>
                  <span className="font-bold text-amber-300">{Math.round(normalizedInterests.communication * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${normalizedInterests.communication * 100}%` }} />
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveAndCalculate}
              className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold shadow-glow transition-all"
            >
              Confirm Interests & Return to Hub
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
