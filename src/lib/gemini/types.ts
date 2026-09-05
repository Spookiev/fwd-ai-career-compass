export type CompanionMode =
  | 'EMOTIONAL_SUPPORT'
  | 'CAREER_GUIDANCE'
  | 'TECHNICAL_GUIDANCE'
  | 'ACCOUNTABILITY'
  | 'DECISION_SUPPORT'
  | 'CELEBRATION'
  | 'RECOVERY'
  | 'MIXED_SUPPORT';

export interface MemoryCandidate {
  shouldRemember: boolean;
  key: string;
  value: string;
  displaySummary: string; // e.g. "Prefers project-based learning over video lectures"
}

export interface SuggestedAction {
  type: 'small_task' | 'take_break' | 'career_trial' | 'quick_reflection';
  label: string;
  durationMinutes?: number;
}

export interface QuickAction {
  label: string;
  promptText: string;
}

export interface StructuredCompanionResponse {
  mode: CompanionMode;
  emotion: string;
  needs: string[];
  response: string;
  suggestedAction?: SuggestedAction;
  quickActions: QuickAction[];
  memoryCandidate?: MemoryCandidate;
}

export interface StudentContextPayload {
  name?: string;
  dreamRole?: string;
  targetTier?: 'Foundation' | 'Associate' | 'Advanced';
  cgpa?: string | number;
  skills?: string[];
  solvedProblemsCount?: number;
  projectsCount?: number;
  roadmapProgress?: number;
  currentStreak?: number;
  fatigueScore?: number;
  recentMood?: string;
  storedMemories?: Record<string, string>;
}

export interface CompanionChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  structuredData?: StructuredCompanionResponse;
  memoryAccepted?: boolean;
  memoryDismissed?: boolean;
}
