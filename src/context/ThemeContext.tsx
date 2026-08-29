import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ThemeId, ThemeConfig } from '../types';
import { sound } from '../lib/sound';

export const THEME_CONFIGS: Record<ThemeId, ThemeConfig> = {
  wizard: {
    id: 'wizard',
    name: 'Arcane Wizard',
    emoji: '🔮',
    tagline: 'Mystic Violet, Arcane Runes & Golden Sparkles',
    primary: '#7C3AED',
    accent: '#F59E0B',
    surface: 'rgba(24, 16, 42, 0.75)',
    bgDark: '#120E1E',
    glow: 'rgba(124, 58, 237, 0.45)',
    particleType: 'sparks',
  },
  cyber: {
    id: 'cyber',
    name: 'Cyber Arcade',
    emoji: '🕹️',
    tagline: 'Electric Cyan, Neon Grid & 8-Bit Laser Magenta',
    primary: '#00F0FF',
    accent: '#FF007F',
    surface: 'rgba(11, 16, 28, 0.82)',
    bgDark: '#0B0C10',
    glow: 'rgba(0, 240, 255, 0.45)',
    particleType: 'matrix',
  },
  ocean: {
    id: 'ocean',
    name: 'Bioluminescent Ocean',
    emoji: '🌊',
    tagline: 'Abyssal Navy, Teal Glow & Floating Bubbles',
    primary: '#14B8A6',
    accent: '#38BDF8',
    surface: 'rgba(10, 28, 48, 0.75)',
    bgDark: '#0A192F',
    glow: 'rgba(20, 184, 166, 0.45)',
    particleType: 'bubbles',
  },
  nature: {
    id: 'nature',
    name: 'Lush Botanical',
    emoji: '🌿',
    tagline: 'Forest Slate, Emerald Jade & Dew Flares',
    primary: '#10B981',
    accent: '#84CC16',
    surface: 'rgba(15, 32, 24, 0.75)',
    bgDark: '#0F1D15',
    glow: 'rgba(16, 185, 129, 0.45)',
    particleType: 'leaves',
  },
  cafe: {
    id: 'cafe',
    name: 'Cozy Mocha Café',
    emoji: '☕',
    tagline: 'Espresso Roast, Caramel Amber & Rising Steam',
    primary: '#D97706',
    accent: '#FDE68A',
    surface: 'rgba(32, 22, 14, 0.78)',
    bgDark: '#1A120B',
    glow: 'rgba(217, 119, 6, 0.45)',
    particleType: 'steam',
  },
  kpop: {
    id: 'kpop',
    name: 'Borahae Purple',
    emoji: '💜',
    tagline: 'Royal Violet, Magenta Neon & Shimmer Waves',
    primary: '#8B5CF6',
    accent: '#EC4899',
    surface: 'rgba(30, 15, 48, 0.75)',
    bgDark: '#150B24',
    glow: 'rgba(139, 92, 246, 0.45)',
    particleType: 'stars',
  },
  custom: {
    id: 'custom',
    name: 'Studio Custom',
    emoji: '🎨',
    tagline: 'Personalized Bespoke Color & Glass Space',
    primary: '#6366F1',
    accent: '#F43F5E',
    surface: 'rgba(20, 20, 35, 0.8)',
    bgDark: '#0D0E15',
    glow: 'rgba(99, 102, 241, 0.45)',
    particleType: 'custom',
  }
};

interface CustomThemeValues {
  primary: string;
  accent: string;
  surface: string;
  bgDark: string;
}

interface ThemeContextType {
  currentTheme: ThemeId;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeId) => void;
  customValues: CustomThemeValues;
  updateCustomTheme: (values: Partial<CustomThemeValues>) => void;
  isAudioMuted: boolean;
  toggleAudio: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('fwd_theme_id');
    return (saved && THEME_CONFIGS[saved as ThemeId]) ? (saved as ThemeId) : 'kpop';
  });

  const [customValues, setCustomValues] = useState<CustomThemeValues>(() => {
    const saved = localStorage.getItem('fwd_custom_theme');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      primary: '#6366F1',
      accent: '#F43F5E',
      surface: 'rgba(20, 20, 35, 0.8)',
      bgDark: '#0D0E15',
    };
  });

  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(() => sound.getIsMuted());

  const activeConfig: ThemeConfig = currentTheme === 'custom' 
    ? {
        ...THEME_CONFIGS.custom,
        primary: customValues.primary,
        accent: customValues.accent,
        surface: customValues.surface,
        bgDark: customValues.bgDark,
        glow: `${customValues.primary}66`,
      }
    : THEME_CONFIGS[currentTheme];

  // Apply CSS variables dynamically to the document root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', activeConfig.primary);
    root.style.setProperty('--theme-accent', activeConfig.accent);
    root.style.setProperty('--theme-surface', activeConfig.surface);
    root.style.setProperty('--theme-bg', activeConfig.bgDark);
    root.style.setProperty('--theme-glow', activeConfig.glow);

    // KPI colors
    root.style.setProperty('--kpi-coral', '#F14938');
    root.style.setProperty('--kpi-navy', '#1F3668');
    root.style.setProperty('--kpi-light', '#FFFFFF');
    root.style.setProperty('--kpi-purple', '#4D3380');

    // Document background
    document.body.style.backgroundColor = activeConfig.bgDark;
    localStorage.setItem('fwd_theme_id', currentTheme);
  }, [currentTheme, activeConfig]);

  const setTheme = (theme: ThemeId) => {
    setCurrentThemeState(theme);
    sound.playThemeSwitch();
  };

  const updateCustomTheme = (values: Partial<CustomThemeValues>) => {
    setCustomValues(prev => {
      const updated = { ...prev, ...values };
      localStorage.setItem('fwd_custom_theme', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeConfig: activeConfig,
        setTheme,
        customValues,
        updateCustomTheme,
        isAudioMuted,
        toggleAudio,
      }}
    >
      <ParticleCanvas themeConfig={activeConfig} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Canvas Particle Engine Component for high visual impact
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
  rotation: number;
  rotationSpeed: number;
  char?: string;
}

const ParticleCanvas: React.FC<{ themeConfig: ThemeConfig }> = ({ themeConfig }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 45;
    const particles: Particle[] = [];
    const runes = ['✧', '✦', '✦', 'ᛟ', 'ᚦ', 'ᛉ', '⚡', '★', '⟡', '◈', '0', '1', '>>'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 1.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: themeConfig.particleType === 'steam' 
          ? -Math.random() * 0.6 - 0.2 
          : themeConfig.particleType === 'leaves' 
          ? Math.random() * 0.5 + 0.1 
          : (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.15,
        color: Math.random() > 0.4 ? themeConfig.primary : themeConfig.accent,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        char: runes[Math.floor(Math.random() * runes.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle ambient radial gradient lights
      const gradient = ctx.createRadialGradient(
        width * 0.3,
        height * 0.25,
        50,
        width * 0.3,
        height * 0.25,
        width * 0.7
      );
      gradient.addColorStop(0, themeConfig.glow);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const secondaryGrad = ctx.createRadialGradient(
        width * 0.8,
        height * 0.75,
        30,
        width * 0.8,
        height * 0.75,
        width * 0.6
      );
      secondaryGrad.addColorStop(0, `${themeConfig.accent}25`);
      secondaryGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = secondaryGrad;
      ctx.fillRect(0, 0, width, height);

      // Render individual theme particles
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0.08, Math.min(0.65, p.alpha));

        if (themeConfig.particleType === 'sparks' || themeConfig.particleType === 'stars') {
          ctx.fillStyle = p.color;
          ctx.font = `${p.size * 3.5}px sans-serif`;
          ctx.fillText(p.char || '✦', -p.size, p.size);
        } else if (themeConfig.particleType === 'matrix') {
          ctx.fillStyle = p.color;
          ctx.font = `${p.size * 2.8}px monospace`;
          ctx.fillText(p.char || '1', -p.size, p.size);
        } else if (themeConfig.particleType === 'bubbles') {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = `${p.color}33`;
          ctx.fill();
        } else if (themeConfig.particleType === 'leaves') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 2.5, p.size * 1.2, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeConfig]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: 0.85 }}
    />
  );
};
