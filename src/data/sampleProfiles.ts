import { StudentProfile, WorkloadState, FacultyReview } from '../types';

export const SAMPLE_STUDENTS: StudentProfile[] = [
  {
    uid: 'student_001',
    displayName: 'Rahul Sharma',
    email: 'rahul.sharma@university.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    university: 'National Institute of Technology (NIT)',
    department: 'Computer Science & Engineering',
    major: 'B.Tech Computer Science',
    semester: 'Semester 6',
    gradYear: '2025',
    cgpa: '8.84',
    aptitudeTier: 'Associate Tier',
    readinessScore: 82.5,
    skills: ['TypeScript', 'React.js', 'Node.js', 'Python', 'Docker', 'PostgreSQL', 'Data Structures', 'REST APIs', 'Git'],
    programmingLanguages: ['TypeScript', 'JavaScript', 'Python', 'C++', 'SQL'],
    frameworks: ['React', 'Next.js', 'Express', 'Tailwind CSS', 'FastAPI'],
    interests: ['Full Stack AI Applications', 'Distributed Cloud Architecture', 'System Design'],
    certifications: ['AWS Certified Cloud Practitioner', 'Meta Front-End Developer Specialization', 'NPTEL Cloud Computing (Elite)'],
    achievements: ['Smart India Hackathon 2024 Finalist', 'Top 5% in LeetCode Global Contest', 'Department Dean\'s List (3 Semesters)'],
    projects: [
      {
        id: 'p1',
        title: 'DevPulse — Real-Time Developer Analytics Engine',
        description: 'Engineered a telemetry pipeline processing 50k+ GitHub webhook events/sec using Redis Streams and Next.js 14.',
        technologies: ['TypeScript', 'Next.js', 'Redis', 'Docker', 'PostgreSQL'],
        link: 'https://github.com/rahul/devpulse',
        starred: true,
      },
      {
        id: 'p2',
        title: 'MediScan AI — Chest X-Ray Multi-Label Classifier',
        description: 'Trained ResNet-50 on NIH Chest X-Ray dataset with 94.2% ROC-AUC; deployed FastAPI inference microservice.',
        technologies: ['Python', 'PyTorch', 'FastAPI', 'AWS ECS'],
        link: 'https://github.com/rahul/mediscan-ai',
      },
      {
        id: 'p3',
        title: 'CryptoVault — Multi-Sig Smart Contract Wallet',
        description: 'Solidity vault requiring 3/5 threshold signatures with automated gas refund relayers on Polygon testnet.',
        technologies: ['Solidity', 'Hardhat', 'Ethers.js', 'React'],
        link: 'https://github.com/rahul/cryptovault',
      }
    ],
    internships: [
      {
        id: 'i1',
        company: 'Zomato Engineering',
        role: 'Software Development Engineering Intern',
        duration: 'Jun 2024 – Aug 2024 (3 Months)',
        description: 'Optimized restaurant menu search caching with Redis Cluster, slashing 99th-percentile latency by 38% for 4.2M daily queries.',
        verifiedByFaculty: true,
      }
    ],
    dreamRole: 'Full Stack AI Engineer',
    dreamCompany: 'Google / Atlassian / Stripe',
    expectedSalary: '₹22 - ₹32 LPA ($90,000 - $130,000)',
    workPreference: 'Hybrid',
    targetTimelineMonths: 6,
    radarScores: {
      technicalDepth: 88,
      aptitudeLogic: 84,
      systemDesign: 76,
      problemSolving: 90,
      communication: 78,
      devOpsCloud: 72,
    }
  },
  {
    uid: 'student_002',
    displayName: 'Priya Patel',
    email: 'priya.patel@university.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    university: 'IIT Bombay',
    department: 'Artificial Intelligence & Data Science',
    major: 'B.Tech AI & Data Science',
    semester: 'Semester 7',
    gradYear: '2025',
    cgpa: '9.21',
    aptitudeTier: 'Advanced Tier',
    readinessScore: 91.0,
    skills: ['PyTorch', 'TensorFlow', 'LLMOps', 'Python', 'LangChain', 'Kubernetes', 'HuggingFace', 'SQL', 'C++'],
    programmingLanguages: ['Python', 'C++', 'SQL', 'Bash', 'R'],
    frameworks: ['PyTorch', 'HuggingFace', 'vLLM', 'FastAPI', 'Ray'],
    interests: ['Generative AI', 'Agentic Workflows', 'Multi-Modal Reasoning'],
    certifications: ['DeepLearning.AI Generative AI Specialization', 'NPTEL Deep Learning (Gold Medalist)'],
    achievements: ['Kaggle Grandmaster (Top 100 in NLP)', 'Published 1 Paper at IEEE ICASSP 2024'],
    projects: [
      {
        id: 'p201',
        title: 'OmniAgent — Multi-Modal Autonomous Workflow Agent',
        description: 'Built zero-shot visual reasoning agent orchestrated with Gemini Flash & LangGraph.',
        technologies: ['Python', 'LangGraph', 'Gemini API', 'ChromaDB'],
        starred: true,
      }
    ],
    internships: [
      {
        id: 'i201',
        company: 'Microsoft Research India',
        role: 'Research Fellow Intern',
        duration: 'Jan 2024 – Jun 2024 (6 Months)',
        description: 'Conducted fine-tuning on Small Language Models (SLMs) yielding 22% faster decoding.',
        verifiedByFaculty: true,
      }
    ],
    dreamRole: 'Machine Learning Research Engineer',
    dreamCompany: 'OpenAI / DeepMind / Microsoft Research',
    expectedSalary: '₹35 - ₹50 LPA',
    workPreference: 'Remote',
    targetTimelineMonths: 3,
    radarScores: {
      technicalDepth: 96,
      aptitudeLogic: 94,
      systemDesign: 85,
      problemSolving: 95,
      communication: 88,
      devOpsCloud: 82,
    }
  }
];

export const INITIAL_WORKLOAD_STATE: WorkloadState = {
  currentStreak: 14,
  lastActiveDate: new Date().toISOString().split('T')[0],
  fatigueScore: 28, // Healthy low-moderate fatigue
  tasksCompletedToday: 4,
  dailyTargetTasks: 5,
  focusMinutesToday: 135,
  pacingMode: 'Optimal Pace',
};

export const SAMPLE_FACULTY_REVIEWS: FacultyReview[] = [
  {
    id: 'rev_101',
    studentId: 'student_001',
    studentName: 'Rahul Sharma',
    facultyId: 'fac_01',
    facultyName: 'Dr. Ananya Sen, Head of Placement & AI Research',
    category: 'Roadmap Milestone',
    rating: 5,
    feedbackText: 'Rahul demonstrated exceptional grasp of distributed systems in the Phase 2 capstone review. His Zomato caching metrics show high industry maturity.',
    actionItems: [
      'Deepen System Design concurrency patterns (Raft / Paxos consensus)',
      'Prepare 3 STAR-format stories for behavioral rounds around high-load incidents'
    ],
    date: 'Yesterday at 4:30 PM',
    isConfidential: false,
    status: 'Approved',
  },
  {
    id: 'rev_102',
    studentId: 'student_001',
    studentName: 'Rahul Sharma',
    facultyId: 'fac_02',
    facultyName: 'Prof. Rajesh K., Placement Cell Incharge',
    category: 'Resume Audit',
    rating: 4,
    feedbackText: 'Resume ATS score is strong (88/100). The bullet points are quantified well. Ready for tier-1 product campus drives.',
    actionItems: [
      'Add GitHub link for MediScan AI project with live demo link'
    ],
    date: '3 days ago',
    isConfidential: false,
    status: 'Approved',
  }
];
