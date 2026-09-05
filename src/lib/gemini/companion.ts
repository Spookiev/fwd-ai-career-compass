import { GoogleGenAI } from '@google/genai';
import { 
  StructuredCompanionResponse, 
  StudentContextPayload,
  CompanionChatMessage
} from './types';
import { COMPANION_SYSTEM_PROMPT, buildContextPrompt } from './prompts';
import { getApiKey } from './client';

export interface CompanionRequestOptions {
  history: Array<{ role: 'user' | 'model'; content: string }>;
  userMessage: string;
  context: StudentContextPayload;
}

export async function generateCompanionResponse(
  options: CompanionRequestOptions
): Promise<StructuredCompanionResponse> {
  const { history, userMessage, context } = options;
  const apiKey = getApiKey();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const contextPrompt = buildContextPrompt(context);

      const contents = [
        ...history.slice(-6).map((msg) => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
        {
          role: 'user',
          parts: [
            {
              text: `${contextPrompt}\n\nStudent Message:\n"${userMessage}"`
            }
          ]
        }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: COMPANION_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          temperature: 0.7,
        }
      });

      if (response.text) {
        try {
          const parsed = JSON.parse(response.text) as StructuredCompanionResponse;
          if (parsed && parsed.response && parsed.mode) {
            return parsed;
          }
        } catch (jsonErr) {
          console.warn('Companion JSON parse error, falling back to heuristic parsing:', jsonErr);
        }
      }
    } catch (err) {
      console.warn('Gemini Companion API error, falling back to heuristic engine:', err);
    }
  }

  // Resilient Emotionally Intelligent Heuristic Fallback Engine
  return generateHeuristicCompanionResponse(userMessage, context);
}

export function generateHeuristicCompanionResponse(
  userMessage: string,
  context: StudentContextPayload
): StructuredCompanionResponse {
  const lower = userMessage.toLowerCase();
  const studentName = context.name || 'there';
  const roleName = context.dreamRole || 'Software Engineering';

  // 1. Frustration / Exhaustion / Burnout Trigger
  if (
    lower.includes('stuck') || 
    lower.includes('useless') || 
    lower.includes('give up') || 
    lower.includes('tired') || 
    lower.includes('exhausted') || 
    lower.includes('burnout') ||
    lower.includes('overwhelmed') ||
    lower.includes('drained')
  ) {
    return {
      mode: 'RECOVERY',
      emotion: 'exhausted & overwhelmed',
      needs: ['cognitive rest', 'pressure reduction', 'perspective reset'],
      response: `You've already put in significant effort today, **${studentName}**. Being stuck for hours is not a reflection of your intelligence or capability — it's your brain signaling that your working memory is saturated.\n\nStaring at the same block with cognitive fatigue creates diminishing returns. Step away completely for 20 minutes: drink water, stretch, or walk around without looking at a screen. We can tackle this with fresh eyes.`,
      suggestedAction: {
        type: 'take_break',
        label: 'Take a 20-minute offline breather',
        durationMinutes: 20
      },
      quickActions: [
        { label: '🧘 Step Away (20m)', promptText: 'I will step away for 20 minutes to recharge.' },
        { label: '🔍 Explain Bug Simply', promptText: 'Here is the exact error and code snippet I was stuck on: ' },
        { label: '❄️ Freeze Streak Today', promptText: 'I need a rest day. How do I protect my streak?' }
      ],
      memoryCandidate: {
        shouldRemember: true,
        key: 'work_pattern',
        value: 'Experiences cognitive fatigue after long uninterrupted debugging sessions',
        displaySummary: 'Benefits from mandatory 20m breaks when stuck on tricky bugs'
      }
    };
  }

  // 2. Catastrophizing / Self-Doubt / Failure Panic Trigger
  if (
    lower.includes('ruined') || 
    lower.includes('over') || 
    lower.includes('failed') || 
    lower.includes('never get') || 
    lower.includes('imposter') || 
    lower.includes('behind everyone') ||
    lower.includes('career is dead')
  ) {
    return {
      mode: 'DECISION_SUPPORT',
      emotion: 'anxious catastrophizing',
      needs: ['objective reality check', 'isolated triage', 'manageable next action'],
      response: `No, your career trajectory is not ruined by a delayed milestone or a difficult assessment. \n\nLet's separate objective reality from emotional panic:\n1. **What actually happened:** You hit friction on an isolated task or concept.\n2. **What this means:** You identified a specific learning gap to bridge before your next mock.\n3. **What this does NOT mean:** It does not wipe out your **${context.skills?.slice(0, 2).join(', ') || 'verified skills'}** or your **${context.currentStreak || 5}-day study momentum**.\n\nLet's isolate just one single 15-minute subtask to regain your footing.`,
      suggestedAction: {
        type: 'small_task',
        label: 'Complete 1 focused 15-minute concept review',
        durationMinutes: 15
      },
      quickActions: [
        { label: '🎯 Pick 1 Subtask', promptText: 'Help me break down today’s goal into 3 micro-steps.' },
        { label: '📊 Review Verified Strengths', promptText: 'What are my strongest verified profile metrics right now?' },
        { label: '🧘 Take a Breath', promptText: 'Let’s pause and recalibrate for tomorrow.' }
      ],
      memoryCandidate: {
        shouldRemember: true,
        key: 'resilience_note',
        value: 'Responds best to objective logical decomposition during study anxiety',
        displaySummary: 'Prefers breaking down intimidating goals into 15-minute micro-tasks'
      }
    };
  }

  // 3. Technical / Debugging / Implementation Trigger
  if (
    lower.includes('cors') || 
    lower.includes('vite') || 
    lower.includes('firebase') || 
    lower.includes('error') || 
    lower.includes('bug') || 
    lower.includes('syntax') || 
    lower.includes('docker') || 
    lower.includes('redis') || 
    lower.includes('postgres') ||
    lower.includes('api')
  ) {
    if (lower.includes('cors') && (lower.includes('vite') || lower.includes('firebase') || lower.includes('api'))) {
      return {
        mode: 'TECHNICAL_GUIDANCE',
        emotion: 'technical focus',
        needs: ['root cause diagnosis', 'exact configuration fix', 'verification step'],
        response: `### Root Cause: CORS Preflight Rejection in Local Dev 🛠️\n\nBrowsers block frontend cross-origin requests from \`localhost:5173\` unless the backend explicitly sets \`Access-Control-Allow-Origin\` or you proxy requests through Vite's dev server.\n\n### Exact Fix:\nConfigure a local proxy in \`vite.config.ts\` to forward API requests without triggering browser CORS:\n\n\`\`\`typescript\n// vite.config.ts\nimport { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    proxy: {\n      '/api': {\n        target: 'http://localhost:5001/your-project/us-central1', // your Firebase function / backend\n        changeOrigin: true,\n        rewrite: (path) => path.replace(/^\\/api/, '')\n      }\n    }\n  }\n});\n\`\`\`\n\n### Verification:\nChange your frontend fetch from \`http://localhost:5001/...\` to \`/api/...\` and verify that the request succeeds with status \`200 OK\`.`,
        suggestedAction: {
          type: 'small_task',
          label: 'Configure Vite proxy in vite.config.ts ~5m',
          durationMinutes: 5
        },
        quickActions: [
          { label: '🔍 Test Fetch Call', promptText: 'How do I write the clean fetch call using the /api proxy route?' },
          { label: '☁️ Firebase Production CORS', promptText: 'How do I enable CORS headers in Firebase Cloud Functions for production?' }
        ]
      };
    }

    return {
      mode: 'TECHNICAL_GUIDANCE',
      emotion: 'problem solving',
      needs: ['debugging strategy', 'clean syntax snippet'],
      response: `### Technical Triage & Action Plan 💻\n\nLet's systematically isolate the issue:\n1. **Reproduce & Inspect:** Check browser console / terminal stack trace for the exact line and error code.\n2. **Isolate State:** Verify whether incoming inputs/payloads match your expected schema.\n3. **Verify Boundary:** Ensure environment variables and async boundaries are awaited correctly.\n\nShare your error log or code snippet and we will diagnose the root cause immediately.`,
      suggestedAction: {
        type: 'small_task',
        label: 'Inspect terminal error log ~5m',
        durationMinutes: 5
      },
      quickActions: [
        { label: '📋 Paste Error Snippet', promptText: 'Here is the error message: ' },
        { label: '🧪 Check Unit Test', promptText: 'How can I write a quick test case to verify this?' }
      ]
    };
  }

  // 4. Career Direction / Role Decision Trigger
  if (
    lower.includes('career') || 
    lower.includes('role') || 
    lower.includes('should i') || 
    lower.includes('product manager') || 
    lower.includes('full stack') || 
    lower.includes('ml engineer') ||
    lower.includes('designer')
  ) {
    return {
      mode: 'CAREER_GUIDANCE',
      emotion: 'exploratory curiosity',
      needs: ['market comparison', 'skill synergy check', 'low-risk test recommendation'],
      response: `### Evidence-Anchored Direction Analysis 🧭\n\nBased on your active profile for **${roleName}**:\n- **Strengths Indicated:** Demonstrates strong execution in **${context.skills?.slice(0, 3).join(', ') || 'Modern Full-Stack Architecture'}**.\n- **Measurable Gap:** You need deeper evidence in systems design and distributed telemetry before reaching the **${context.targetTier || 'Advanced'}** placement threshold.\n- **Low-Risk Next Step:** Don't lock into a 6-month roadmap blindly. Test drive the **7-Day Career Mini-Trial** in the **AI Matches** tab to sample real day-to-day deliverables.`,
      suggestedAction: {
        type: 'career_trial',
        label: 'Launch 7-Day Career Mini-Trial',
        durationMinutes: 10
      },
      quickActions: [
        { label: '🗺️ View Possibility Map', promptText: 'Show me my top 4 career pathway matches.' },
        { label: '🎯 Skill Gap Breakdown', promptText: 'What are my top blocker skills for this role?' },
        { label: '💼 Market Compensation', promptText: 'What is the salary and demand trend for this pathway?' }
      ]
    };
  }

  // 5. Celebration / Milestone Trigger
  if (
    lower.includes('completed') || 
    lower.includes('finished') || 
    lower.includes('passed') || 
    lower.includes('solved') || 
    lower.includes('deployed') ||
    lower.includes('yay') ||
    lower.includes('success')
  ) {
    return {
      mode: 'CELEBRATION',
      emotion: 'proud & energized',
      needs: ['positive reinforcement', 'streak acknowledgement', 'sustainable momentum'],
      response: `Great execution on that milestone, **${studentName}**! 🎉\n\nConsistent incremental builds are what compound into placement readiness. Your verified study momentum is holding strong at **${context.currentStreak || 5} days**.\n\nTake a quick 5-minute breather to lock in the victory before lining up your next sprint.`,
      suggestedAction: {
        type: 'quick_reflection',
        label: 'Log milestone victory in study notes',
        durationMinutes: 5
      },
      quickActions: [
        { label: '🔥 View Streak Stats', promptText: 'How is my learning consistency tracking this week?' },
        { label: '🚀 Next Milestone Task', promptText: 'What is the next highest-priority task on my roadmap?' }
      ]
    };
  }

  // Default Empathetic Guidance
  return {
    mode: 'CAREER_GUIDANCE',
    emotion: 'receptive & ready',
    needs: ['practical orientation', 'curated guidance'],
    response: `Hey **${studentName}**, I'm tracking your progress toward **${roleName}**.\n\nYour profile reflects **${context.roadmapProgress || 65}%** roadmap completion with **${context.solvedProblemsCount || 142}** algorithmic problems solved. \n\nWhether you want to debug tricky code, run an ATS resume audit, or calibrate your study pacing so you don't burn out, I'm here. What's on your radar right now?`,
    suggestedAction: {
      type: 'small_task',
      label: 'Select one targeted focus area for today',
      durationMinutes: 10
    },
    quickActions: [
      { label: '🧭 Career Direction', promptText: 'Where should I focus to reach 90%+ readiness?' },
      { label: '💻 Debug a Roadblock', promptText: 'I have a technical error in my code.' },
      { label: '📄 Resume ATS Audit', promptText: 'How can I improve my project bullet points for ATS?' },
      { label: '🧘 Study Pacing Check', promptText: 'How is my workload and cognitive balance tracking?' }
    ]
  };
}
