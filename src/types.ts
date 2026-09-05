export type UserRole = 'student' | 'faculty';

export type AptitudeTier = 'Foundation Tier' | 'Associate Tier' | 'Advanced Tier';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  starred?: boolean;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  verifiedByFaculty?: boolean;
}

export interface StudentProfile {
  uid: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  university: string;
  department: string;
  major: string;
  semester: string;
  gradYear: string;
  cgpa: string;
  aptitudeTier: AptitudeTier;
  readinessScore: number; // 0 - 100%
  skills: string[];
  programmingLanguages: string[];
  frameworks: string[];
  interests: string[];
  certifications: string[];
  achievements: string[];
  projects: Project[];
  internships: Internship[];
  dreamRole: string;
  dreamCompany: string;
  expectedSalary: string;
  workPreference: 'Remote' | 'Hybrid' | 'On-site';
  targetTimelineMonths: 3 | 6 | 9;
  radarScores: {
    technicalDepth: number;
    aptitudeLogic: number;
    systemDesign: number;
    problemSolving: number;
    communication: number;
    devOpsCloud: number;
  };
}

export interface WorkloadState {
  currentStreak: number; // days
  lastActiveDate: string;
  fatigueScore: number; // 0 - 100
  tasksCompletedToday: number;
  dailyTargetTasks: number;
  focusMinutesToday: number;
  pacingMode: 'Chill Mode' | 'Optimal Pace' | 'Crunch Alert';
}

export interface ResourceLink {
  title: string;
  type: 'Course' | 'Book' | 'Documentation' | 'Video' | 'Project';
  provider: 'NPTEL' | 'Coursera Free' | 'YouTube' | 'Book Summary' | 'GitHub' | 'Official Docs';
  url: string;
  duration?: string;
  rating?: number;
}

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  xp: number;
  estimatedHours: number;
  resource?: ResourceLink;
}

export interface WeeklyGoal {
  weekNumber: number;
  title: string;
  focus: string;
  tasks: TaskItem[];
}

export interface MonthlyGoal {
  monthNumber: number;
  title: string;
  summary: string;
  completed: boolean;
  weeklyGoals: WeeklyGoal[];
}

export interface Milestone {
  id: string;
  period: string; // e.g. "Phase 1: Foundations"
  title: string;
  description: string;
  completed: boolean;
  tasks: string[];
  recommendedResources: ResourceLink[];
  resumeBulletSuggestion: string;
}

export interface CareerRoadmap {
  id: string;
  roleTitle: string;
  roleCategory: string;
  overview: string;
  estimatedTimeToJobReady: string;
  milestones: Milestone[];
  monthlyGoals: MonthlyGoal[];
  capstoneProject: {
    title: string;
    description: string;
    deliverables: string[];
  };
}

export interface CareerRecommendation {
  id: string;
  roleTitle: string;
  matchScore: number; // 0 - 100
  marketDemand: 'Very High' | 'High' | 'Moderate';
  salaryRange: string;
  growthRate: string;
  whyFitRationale: string;
  strengths: string[];
  areasToDevelop: string[];
  priorityMissingSkills: string[];
  recommendedTimelineMonths: number;
}

export interface CareerExplorerRole {
  id: string;
  title: string;
  category: 'AI & Data' | 'Software & Systems' | 'Cloud & Security' | 'Product & Strategy';
  description: string;
  averageSalary: string;
  growthTrajectory: string;
  topSkillsRequired: string[];
  openPositionsCount: number;
  oerResources: ResourceLink[];
  sampleJobTitles: string[];
}

export interface SkillGapItem {
  skillName: string;
  category: 'Core Language' | 'Framework' | 'Cloud/DevOps' | 'Theory & Design' | 'Soft Skills';
  studentLevel: number; // 0 - 100
  requiredLevel: number; // 0 - 100
  status: 'Mastered' | 'In Progress' | 'Critical Gap';
  bridgeProject: string;
  recommendedOER: ResourceLink;
}

export interface ATSScoreBreakdown {
  impact: number; // 0 - 100
  brevity: number; // 0 - 100
  style: number; // 0 - 100
  skills: number; // 0 - 100
  overall: number; // 0 - 100
}

export interface ATSBulletRewrite {
  id: string;
  original: string;
  improved: string;
  rationale: string;
  metricImpact: string;
}

export interface ResumeAnalysisResult {
  score: ATSScoreBreakdown;
  detectedRole: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  bulletRewrites: ATSBulletRewrite[];
  formatHealthWarnings: string[];
  totalWordCount: number;
}

export type InterviewCategory = 'HR' | 'Technical' | 'Coding Logic' | 'Behavioral';

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  role: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  title: string;
  prompt: string;
  contextHint: string;
  starterCode?: string;
  expectedOutput?: string;
  solutionExplanation?: string;
}

export interface InterviewEvaluation {
  score: number; // 0 - 100
  starAdherence: {
    situation: boolean;
    task: boolean;
    action: boolean;
    result: boolean;
  };
  complexityAnalysis?: string;
  keyStrengths: string[];
  areasOfImprovement: string[];
  recruiterFeedback: string;
  modelAnswerSnippet: string;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Remote';
  salary: string;
  postedAgo: string;
  matchScore: number;
  requiredReadinessThreshold: number; // e.g. 75
  tags: string[];
  applyUrl: string;
}

export interface FacultyReview {
  id: string;
  studentId: string;
  studentName: string;
  facultyId: string;
  facultyName: string;
  category: 'Roadmap Milestone' | 'Interview Simulation' | 'Resume Audit' | 'Overall Academic';
  rating: number; // 1-5
  feedbackText: string;
  actionItems: string[];
  date: string;
  isConfidential: boolean;
  status: 'Approved' | 'Changes Requested' | 'Pending Review';
}

export interface DiagnosticQuestion {
  id: string;
  category: 'Quantitative Aptitude' | 'Logical Reasoning' | 'CS Core & Algorithms' | 'System Architecture';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  weight: number;
}

export type ThemeId =
  | 'wizard'
  | 'cyber'
  | 'ocean'
  | 'nature'
  | 'cafe'
  | 'kpop'
  | 'custom';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  emoji: string;
  tagline: string;
  primary: string;
  accent: string;
  surface: string;
  bgDark: string;
  glow: string;
  particleType: 'sparks' | 'matrix' | 'bubbles' | 'leaves' | 'steam' | 'stars' | 'custom';
}

// ==========================================
// FWD 2.0 DATA ARCHITECTURE & FIRESTORE TYPES
// ==========================================

export type AvatarCategory = 'animals' | 'robots' | 'fantasy' | 'anime' | 'professional' | 'minimalist';
export type AvatarTier = 'foundation' | 'associate' | 'advanced';

export interface AvatarIdentity {
  id: string;
  name: string;
  category: AvatarCategory;
  unlockedTier: AvatarTier;
  imageUrl: string;
  description: string;
}

export interface UserDocument {
  uid: string;
  email: string;
  displayName: string;
  role: 'student' | 'faculty';
  avatar: {
    id: string;
    category: AvatarCategory;
    unlockedTier: AvatarTier;
  };
  createdAt: string;
}

export interface EvidenceDocument {
  userId: string;
  // Professional
  resume?: {
    uploadedAt: string;
    rawText: string;
    extractedSkills: string[];
    extractedExperienceYears: number;
    extractedProjects: Array<{ title: string; tech: string[]; description: string }>;
  };
  linkedInUrl?: string;
  portfolioUrl?: string;
  // Technical Evidence
  github?: {
    username: string;
    connected: boolean;
    repoCount: number;
    topLanguages: Record<string, number>; // e.g. { TypeScript: 60, Python: 40 }
    totalStars: number;
    activityScore: number;
  };
  leetcode?: {
    username: string;
    connected: boolean;
    problemsSolved: { easy: number; medium: number; hard: number };
    contestRating?: number;
  };
  hackerrank?: { username: string; badges: string[] };
  // Academic Evidence
  academics?: {
    university: string;
    degree: string;
    semester: string;
    cgpa: number;
    strongSubjects: string[];
    weakSubjects: string[];
  };
  // Self-Narrative
  selfIntroduction?: {
    rawText: string;
    extractedInterests: string[];
    inferredStrengths: string[];
  };
  // Certifications
  certificates: Array<{
    id: string;
    name: string;
    provider: 'NPTEL' | 'Coursera' | 'Udemy' | 'Google' | 'Other';
    issueDate: string;
    credentialUrl?: string;
  }>;
}

export type SkillConfidence = 'Low' | 'Medium' | 'High';
export type EffectiveTier = 'Foundation' | 'Associate' | 'Advanced';

export interface WorkStyleVector {
  collaboration: number; // 0 (Solo) to 100 (Team)
  structure: number;     // 0 (Flexible) to 100 (Structured)
  orientation: number;   // 0 (Deep Tech) to 100 (People Focused)
  execution: number;     // 0 (Build) to 100 (Analyze)
}

export interface TriangulatedSkillItem {
  name: string;
  claimedLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  githubEvidenceScore?: number; // 0-100
  assessmentScore?: number;     // 0-100
  projectEvidenceScore?: number; // 0-100
  compositeConfidence: SkillConfidence;
  effectiveTier: EffectiveTier;
  growthHistory: Array<{ date: string; score: number }>;
}

export interface TriangulatedSkillProfile {
  userId: string;
  skills: Record<string, TriangulatedSkillItem>;
  interestVector: Record<string, number>; // e.g. { design: 0.85, analytics: 0.60, coding: 0.40, product: 0.70 }
  workStyle: WorkStyleVector;
}

export type CareerFamily = 'Technology' | 'Product & Business' | 'Creative' | 'Communication';
export type MatchType = 'Strong Match' | 'Emerging Match' | 'Exploratory Match';

export interface CareerMiniTrial {
  title: string;
  durationDays: 7;
  tasks: Array<{ day: number; task: string; testGoal: string; completed?: boolean }>;
}

export interface CareerPossibilityMatch {
  roleId: string;
  title: string;
  family: CareerFamily;
  compatibilityScore: number; // 0-100
  matchType: MatchType;
  salaryRange?: string;
  growthRate?: string;
  whyItSuitsYou: string[];
  whatMayChallengeYou: string[];
  skillGaps: Array<{ skill: string; criticality: 'Blocker' | 'Priority' | 'Differentiator' }>;
  miniTrial: CareerMiniTrial;
}

export interface CareerPossibilityMap {
  userId: string;
  updatedAt: string;
  matches: CareerPossibilityMatch[];
}

export interface CareerPresenceDocument {
  userId: string;
  overallScore: number; // 0-100
  breakdown: {
    github: { score: number; checklist: { bio: boolean; readme: boolean; pinnedRepos: boolean; liveLinks: boolean } };
    linkedIn: { score: number; checklist: { headline: boolean; about: boolean; experience: boolean; skills: boolean } };
    resumeAts: { score: number; missingKeywords: string[]; quantifiedBullets: boolean };
    portfolio: { score: number; responsive: boolean; caseStudies: boolean };
    certifications: { score: number; count: number };
  };
}

export type PacingRecommendation = 'Normal' | 'Slow Down & Break' | 'Recovery Day';

export interface DailyMoodLog {
  date: string;
  moodEmoji: string; // e.g. "😊" | "🙂" | "😐" | "😕" | "😫"
  vibeCard: string;  // e.g. "🌱 Growth" | "⚡ Energetic" | "🌧️ Drained" | "🌙 Resting" | "🔥 Fired Up"
  preEnergyLevel: number;  // 1 to 5
  postEnergyLevel?: number; // 1 to 5
  studyDurationMinutes: number;
}

export interface WellbeingDocument {
  userId: string;
  currentStreak: number;
  streakFrozen: boolean;
  freezeTokensRemaining: number;
  dailyLogs: DailyMoodLog[];
  fatigueScore: number; // 0-100
  pacingRecommendation: PacingRecommendation;
  lastSupportiveMessage?: string;
}

export interface DeconstructedReadiness {
  careerFitIndex: number;     // 0 - 100 based on interests + workstyle
  skillReadiness: number;     // 0 - 100 triangulated from code, projects, tests
  careerPresence: number;     // 0 - 100 github, linkedin, ats, portfolio
  interviewReadiness: number; // 0 - 100 STAR mock performance
  learningConsistency: number;// 0 - 100 weekly adherence & streak velocity
}

