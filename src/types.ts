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
