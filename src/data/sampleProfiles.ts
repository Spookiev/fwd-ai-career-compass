import { 
  StudentProfile, 
  WorkloadState, 
  FacultyReview,
  EvidenceDocument,
  TriangulatedSkillProfile,
  CareerPossibilityMap,
  CareerPresenceDocument,
  WellbeingDocument,
  AvatarIdentity,
  DeconstructedReadiness
} from '../types';

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
    readinessScore: 84.0,
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
  },
  {
    uid: 'student_003',
    displayName: 'Ananya Rao',
    email: 'ananya.rao@university.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    university: 'Delhi Technological University (DTU)',
    department: 'Design & Human-Centered Computing',
    major: 'B.Des & Interactive Technology',
    semester: 'Semester 4',
    gradYear: '2026',
    cgpa: '8.40',
    aptitudeTier: 'Foundation Tier',
    readinessScore: 76.0,
    skills: ['Figma', 'User Research', 'Information Architecture', 'HTML/CSS Basics', 'Design Systems', 'Storyboarding', 'Technical Writing'],
    programmingLanguages: ['HTML/CSS', 'Basic JavaScript'],
    frameworks: ['Tailwind CSS', 'Figma Tokens'],
    interests: ['Product Design', 'Accessible EdTech', 'Design Systems', 'Developer Advocates'],
    certifications: ['Google UX Design Professional Certificate', 'Interaction Design Foundation (IxDF)'],
    achievements: ['Won 1st Place at National College Designathon 2024', 'Led University UX Club (150+ members)'],
    projects: [
      {
        id: 'p301',
        title: 'EduLens — Neurodivergent-Friendly Study Companion UI',
        description: 'Designed a high-contrast, distraction-free study portal with custom typography & cognitive load throttling.',
        technologies: ['Figma', 'User Testing', 'WCAG AAA'],
        starred: true,
      }
    ],
    internships: [],
    dreamRole: 'Product Designer & Design Technologist',
    dreamCompany: 'Notion / Airbnb / Canva',
    expectedSalary: '₹14 - ₹24 LPA',
    workPreference: 'Remote',
    targetTimelineMonths: 6,
    radarScores: {
      technicalDepth: 55,
      aptitudeLogic: 78,
      systemDesign: 68,
      problemSolving: 80,
      communication: 92,
      devOpsCloud: 45,
    }
  }
];

export const INITIAL_EVIDENCE: EvidenceDocument = {
  userId: 'student_001',
  resume: {
    uploadedAt: '2025-02-28T10:30:00Z',
    rawText: 'Rahul Sharma - National Institute of Technology (NIT). Skills: TypeScript, React, Next.js, Python, Redis, Docker, PostgreSQL. Projects: DevPulse Real-Time Telemetry Engine (50k webhook events/sec), MediScan AI (94.2% ROC-AUC). Zomato Intern (Redis Cluster caching, 38% P99 latency reduction).',
    extractedSkills: ['TypeScript', 'React', 'Next.js', 'Python', 'Redis', 'Docker', 'PostgreSQL', 'FastAPI'],
    extractedExperienceYears: 1.5,
    extractedProjects: [
      { title: 'DevPulse Analytics', tech: ['TypeScript', 'Next.js', 'Redis'], description: '50k webhook events/sec ingestion' },
      { title: 'MediScan AI', tech: ['Python', 'PyTorch', 'FastAPI'], description: '94.2% ROC-AUC classifier' }
    ]
  },
  linkedInUrl: 'https://linkedin.com/in/rahul-sharma-dev',
  portfolioUrl: 'https://rahulsharma.dev',
  github: {
    username: 'rahul-sharma-nit',
    connected: true,
    repoCount: 18,
    topLanguages: { 'TypeScript': 55, 'Python': 30, 'SQL': 10, 'C++': 5 },
    totalStars: 142,
    activityScore: 86
  },
  leetcode: {
    username: 'rahul_codes',
    connected: true,
    problemsSolved: { easy: 160, medium: 140, hard: 25 },
    contestRating: 1845
  },
  hackerrank: {
    username: 'rahul_sharma',
    badges: ['5 Stars Problem Solving', '5 Stars Python', 'Gold SQL']
  },
  academics: {
    university: 'National Institute of Technology (NIT)',
    degree: 'B.Tech Computer Science',
    semester: 'Semester 6',
    cgpa: 8.84,
    strongSubjects: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management', 'Object-Oriented Design'],
    weakSubjects: ['Compiler Design', 'Formal Automata Theory']
  },
  selfIntroduction: {
    rawText: 'I love building high-performance web systems and tinkering with LLM workflows. I prefer working in dynamic small teams where I can take full ownership of backend pipelines, telemetry, and fast frontend UI experiences.',
    extractedInterests: ['Distributed Systems', 'Generative AI Agent Workflows', 'Developer Tooling UI'],
    inferredStrengths: ['Fast Execution', 'High Resilience', 'Pragmatic Systems Instincts']
  },
  certificates: [
    { id: 'c1', name: 'AWS Certified Cloud Practitioner', provider: 'Google', issueDate: '2024-05-15', credentialUrl: 'https://aws.amazon.com/verify' },
    { id: 'c2', name: 'NPTEL Cloud Computing (Elite)', provider: 'NPTEL', issueDate: '2024-11-20' },
    { id: 'c3', name: 'Meta Front-End Developer Specialization', provider: 'Coursera', issueDate: '2024-08-10' }
  ]
};

export const INITIAL_TRIANGULATED_PROFILE: TriangulatedSkillProfile = {
  userId: 'student_001',
  skills: {
    'TypeScript & React UI': {
      name: 'TypeScript & React UI',
      claimedLevel: 'Advanced',
      githubEvidenceScore: 88,
      assessmentScore: 84,
      projectEvidenceScore: 92,
      compositeConfidence: 'High',
      effectiveTier: 'Advanced',
      growthHistory: [{ date: '2025-01-01', score: 70 }, { date: '2025-02-01', score: 82 }, { date: '2025-03-01', score: 90 }]
    },
    'Python & Systems': {
      name: 'Python & Systems',
      claimedLevel: 'Intermediate',
      githubEvidenceScore: 82,
      assessmentScore: 86,
      projectEvidenceScore: 85,
      compositeConfidence: 'High',
      effectiveTier: 'Associate',
      growthHistory: [{ date: '2025-01-01', score: 65 }, { date: '2025-02-01', score: 78 }, { date: '2025-03-01', score: 85 }]
    },
    'Redis Streams & Caching': {
      name: 'Redis Streams & Caching',
      claimedLevel: 'Intermediate',
      githubEvidenceScore: 85,
      assessmentScore: 78,
      projectEvidenceScore: 90,
      compositeConfidence: 'High',
      effectiveTier: 'Associate',
      growthHistory: [{ date: '2025-01-15', score: 60 }, { date: '2025-03-01', score: 85 }]
    },
    'Cloud & Docker Containerization': {
      name: 'Cloud & Docker Containerization',
      claimedLevel: 'Beginner',
      githubEvidenceScore: 68,
      assessmentScore: 72,
      projectEvidenceScore: 70,
      compositeConfidence: 'Medium',
      effectiveTier: 'Associate',
      growthHistory: [{ date: '2025-01-20', score: 50 }, { date: '2025-03-01', score: 70 }]
    },
    'Multi-Agent Orchestration (LangGraph)': {
      name: 'Multi-Agent Orchestration (LangGraph)',
      claimedLevel: 'Beginner',
      githubEvidenceScore: 40,
      assessmentScore: 55,
      projectEvidenceScore: 50,
      compositeConfidence: 'Low',
      effectiveTier: 'Foundation',
      growthHistory: [{ date: '2025-02-10', score: 30 }, { date: '2025-03-01', score: 50 }]
    }
  },
  interestVector: {
    tech: 0.90,
    product: 0.70,
    creative: 0.65,
    communication: 0.60
  },
  workStyle: {
    collaboration: 65,
    structure: 70,
    orientation: 80,
    execution: 85
  }
};

export const INITIAL_POSSIBILITY_MAP: CareerPossibilityMap = {
  userId: 'student_001',
  updatedAt: new Date().toISOString(),
  matches: [
    {
      roleId: 'role-fullstack-ai',
      title: 'Full Stack AI Engineer',
      family: 'Technology',
      compatibilityScore: 94,
      matchType: 'Strong Match',
      salaryRange: '₹18 - ₹35 LPA ($115k - $160k)',
      growthRate: '+34% YoY',
      whyItSuitsYou: [
        'Demonstrated mastery of React/TypeScript combined with Python microservices',
        'Real-world high-throughput caching optimization at Zomato internship (38% latency drop)',
        'Top 5% algorithmic problem solving in LeetCode & competitive tests'
      ],
      whatMayChallengeYou: [
        'Stateful multi-agent DAG architectures (LangGraph / LangChain)',
        'Fine-grained vector database parameter tuning (HNSW & vector quantization)'
      ],
      skillGaps: [
        { skill: 'LangGraph Multi-Agent Workflows', criticality: 'Blocker' },
        { skill: 'Vector DB HNSW Tuning (pgvector)', criticality: 'Priority' },
        { skill: 'Kubernetes Helm Deployments', criticality: 'Differentiator' }
      ],
      miniTrial: {
        title: '7-Day Full Stack AI Mini-Trial',
        durationDays: 7,
        tasks: [
          { day: 1, task: 'Set up Next.js 14 API route with @google/genai streaming output', testGoal: 'Verify live SSE text token stream in UI', completed: true },
          { day: 2, task: 'Implement cosine similarity embeddings search with local ChromaDB', testGoal: 'Query top-3 semantic document chunks', completed: true },
          { day: 3, task: 'Define a strict JSON schema function call for weather/data lookups', testGoal: 'Ensure deterministic tool execution', completed: false },
          { day: 4, task: 'Build a rate-limited Redis queue for API requests', testGoal: 'Sustain 100 requests with zero dropped packets', completed: false },
          { day: 5, task: 'Create a responsive chat drawer with auto-scrolling markdown', testGoal: 'Test smooth UI transitions across mobile & desktop', completed: false },
          { day: 6, task: 'Dockerize the application under 150MB with multi-stage build', testGoal: 'Run container locally with zero CVE alerts', completed: false },
          { day: 7, task: 'Deploy live prototype to Vercel/Render and write a 200-word devlog', testGoal: 'Share link with peer for feedback', completed: false }
        ]
      }
    },
    {
      roleId: 'role-cloud-architect',
      title: 'Cloud Solutions & DevOps Architect',
      family: 'Technology',
      compatibilityScore: 88,
      matchType: 'Strong Match',
      salaryRange: '₹20 - ₹40 LPA ($125k - $175k)',
      growthRate: '+28% YoY',
      whyItSuitsYou: [
        'Active AWS Cloud Practitioner certification and Docker containerization experience',
        'Strong foundational Linux and microservices networking principles',
        'High aptitude scores in System Design and Architecture'
      ],
      whatMayChallengeYou: [
        'Terraform Infrastructure-as-Code state management across multi-region VPCs',
        'Kubernetes Custom Resource Definitions (CRDs) and cluster auto-scaling policies'
      ],
      skillGaps: [
        { skill: 'Terraform IaC', criticality: 'Blocker' },
        { skill: 'Kubernetes (K8s)', criticality: 'Priority' },
        { skill: 'Prometheus & Grafana Observability', criticality: 'Differentiator' }
      ],
      miniTrial: {
        title: '7-Day Cloud Architect Mini-Trial',
        durationDays: 7,
        tasks: [
          { day: 1, task: 'Write a Terraform script provisioning AWS VPC and security groups', testGoal: 'Run terraform plan with clean state output', completed: false },
          { day: 2, task: 'Set up a local k3s / minikube cluster with 2 worker nodes', testGoal: 'Verify cluster health with kubectl get nodes', completed: false },
          { day: 3, task: 'Deploy a microservice with Ingress NGINX controller and TLS', testGoal: 'Access endpoint via localhost with valid SSL', completed: false },
          { day: 4, task: 'Configure Prometheus scrape metrics from an Express backend', testGoal: 'Query http_requests_total in Grafana dashboard', completed: false },
          { day: 5, task: 'Create a GitHub Actions CI/CD workflow pushing to Docker Hub', testGoal: 'Trigger automated build on git push tag', completed: false },
          { day: 6, task: 'Simulate a pod failure and observe Kubernetes self-healing restarts', testGoal: 'Ensure zero downtime through RollingUpdate', completed: false },
          { day: 7, task: 'Draft a 1-page Disaster Recovery & SLA protocol document', testGoal: 'Define RPO/RTO targets under 15 minutes', completed: false }
        ]
      }
    },
    {
      roleId: 'role-product-manager',
      title: 'Technical Product Manager (AI & SaaS)',
      family: 'Product & Business',
      compatibilityScore: 83,
      matchType: 'Emerging Match',
      salaryRange: '₹18 - ₹36 LPA ($115k - $165k)',
      growthRate: '+26% YoY',
      whyItSuitsYou: [
        'High systems literacy allows effortless alignment with senior engineering leads',
        'Proven track record in hackathons leading multi-disciplinary 4-person teams',
        'Clear, structured verbal communication style in mock reviews'
      ],
      whatMayChallengeYou: [
        'Balancing technical debt refactoring against customer go-to-market priorities',
        'Statistical sample size requirements for multi-variant A/B experiments'
      ],
      skillGaps: [
        { skill: 'Product Analytics (PostHog/Mixpanel)', criticality: 'Blocker' },
        { skill: 'PRD Specifications & User Story Mapping', criticality: 'Priority' },
        { skill: 'Unit Economics & ROI Modeling', criticality: 'Differentiator' }
      ],
      miniTrial: {
        title: '7-Day Technical PM Mini-Trial',
        durationDays: 7,
        tasks: [
          { day: 1, task: 'Draft a 1-page PRD for an AI-powered code review feature', testGoal: 'Define user persona, problem statement, and success KPIs', completed: false },
          { day: 2, task: 'Conduct 2 user interviews with student developers about study blockers', testGoal: 'Extract top 3 recurring friction points', completed: false },
          { day: 3, task: 'Build an interactive Figma wireframe with 4 key screens', testGoal: 'Walkthrough complete user onboarding flow', completed: false },
          { day: 4, task: 'Design an A/B test hypothesis with sample size calculation', testGoal: 'Determine minimum detectable effect for +15% conversion', completed: false },
          { day: 5, task: 'Prioritize a 10-ticket backlog using the RICE framework', testGoal: 'Rank items by Reach, Impact, Confidence, Effort', completed: false },
          { day: 6, task: 'Map out the telemetry funnel events (Signup → Activation → Retention)', testGoal: 'Define event taxonomy in Mixpanel/PostHog schema', completed: false },
          { day: 7, task: 'Deliver a 3-minute video pitch summarizing the release strategy', testGoal: 'Present concise business case and roadmap timeline', completed: false }
        ]
      }
    },
    {
      roleId: 'role-devrel-evangelist',
      title: 'Developer Relations & Technical Advocate',
      family: 'Communication',
      compatibilityScore: 78,
      matchType: 'Exploratory Match',
      salaryRange: '₹16 - ₹30 LPA ($100k - $150k)',
      growthRate: '+29% YoY',
      whyItSuitsYou: [
        'Enjoys explaining complex architectures via open-source repositories and devlogs',
        'Strong open-source hygiene with documented GitHub README files and live demos',
        'Empathetic approach to debugging community issues'
      ],
      whatMayChallengeYou: [
        'Frequent public speaking and live coding under high-pressure webinar conditions',
        'Managing community forum burnout across multiple time zones'
      ],
      skillGaps: [
        { skill: 'Technical Writing (Docs-as-Code)', criticality: 'Blocker' },
        { skill: 'Community Engagement Analytics', criticality: 'Priority' },
        { skill: 'Live Coding Presentation', criticality: 'Differentiator' }
      ],
      miniTrial: {
        title: '7-Day DevRel Advocate Mini-Trial',
        durationDays: 7,
        tasks: [
          { day: 1, task: 'Write a beginner-friendly 500-word tutorial explaining Vector Databases', testGoal: 'Use clear analogies and zero jargon', completed: false },
          { day: 2, task: 'Build a 5-minute interactive sandbox on CodeSandbox or StackBlitz', testGoal: 'Ensure zero-install instant code runnable', completed: false },
          { day: 3, task: 'Record a 2-minute video explaining how to use the Gemini API', testGoal: 'Clear voiceover with code walkthrough', completed: false },
          { day: 4, task: 'Answer 3 developer questions on GitHub Discussions or StackOverflow', testGoal: 'Provide accurate, empathetic solutions', completed: false },
          { day: 5, task: 'Create a curated "Awesome List" repository for student AI resources', testGoal: 'Add README, badges, and contribution guidelines', completed: false },
          { day: 6, task: 'Host a virtual 20-minute study session or demo with classmates', testGoal: 'Gather feedback on clarity and engagement', completed: false },
          { day: 7, task: 'Write a comprehensive release changelog for an open-source project', testGoal: 'Highlight breaking changes and migration steps', completed: false }
        ]
      }
    }
  ]
};

export const INITIAL_PRESENCE: CareerPresenceDocument = {
  userId: 'student_001',
  overallScore: 82,
  breakdown: {
    github: {
      score: 85,
      checklist: { bio: true, readme: true, pinnedRepos: true, liveLinks: false }
    },
    linkedIn: {
      score: 80,
      checklist: { headline: true, about: true, experience: true, skills: true }
    },
    resumeAts: {
      score: 88,
      missingKeywords: ['LangGraph', 'Vector DB HNSW', 'Kubernetes Helm'],
      quantifiedBullets: true
    },
    portfolio: {
      score: 75,
      responsive: true,
      caseStudies: false
    },
    certifications: {
      score: 85,
      count: 3
    }
  }
};

export const INITIAL_WELLBEING: WellbeingDocument = {
  userId: 'student_001',
  currentStreak: 14,
  streakFrozen: false,
  freezeTokensRemaining: 2,
  dailyLogs: [
    { date: '2025-03-01', moodEmoji: '😊', vibeCard: '🌱 Growth', preEnergyLevel: 4, postEnergyLevel: 4, studyDurationMinutes: 90 },
    { date: '2025-03-02', moodEmoji: '⚡', vibeCard: '🔥 Fired Up', preEnergyLevel: 5, postEnergyLevel: 4, studyDurationMinutes: 120 },
    { date: '2025-03-03', moodEmoji: '🙂', vibeCard: '🌱 Growth', preEnergyLevel: 4, postEnergyLevel: 3, studyDurationMinutes: 75 },
    { date: '2025-03-04', moodEmoji: '😊', vibeCard: '⚡ Energetic', preEnergyLevel: 4, postEnergyLevel: 4, studyDurationMinutes: 105 }
  ],
  fatigueScore: 28,
  pacingRecommendation: 'Normal',
  lastSupportiveMessage: "Energy is primed! Keep your steady 4-task rhythm going."
};

export const DECONSTRUCTED_KPIS: DeconstructedReadiness = {
  careerFitIndex: 92,
  skillReadiness: 85,
  careerPresence: 82,
  interviewReadiness: 80,
  learningConsistency: 88
};

export const AVAILABLE_AVATARS: AvatarIdentity[] = [
  // Animals
  { id: 'av-fox', name: 'Cyber Fox', category: 'animals', unlockedTier: 'foundation', imageUrl: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?w=200&auto=format&fit=crop&q=80', description: 'Curious, nimble, and quick at untangling complex code.' },
  { id: 'av-owl', name: 'Sage Owl', category: 'animals', unlockedTier: 'associate', imageUrl: 'https://images.unsplash.com/photo-1579380656108-328e42a8e411?w=200&auto=format&fit=crop&q=80', description: 'Master of deep focus, memory retrieval, and system architecture.' },
  { id: 'av-wolf', name: 'Alpha Wolf', category: 'animals', unlockedTier: 'advanced', imageUrl: 'https://images.unsplash.com/photo-1564865878688-9a244444042a?w=200&auto=format&fit=crop&q=80', description: 'Resilient team leader pushing boundaries under pressure.' },
  // Robots
  { id: 'av-spark-bot', name: 'Spark Bot', category: 'robots', unlockedTier: 'foundation', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&auto=format&fit=crop&q=80', description: 'Energetic micro-assistant eager to execute first tasks.' },
  { id: 'av-nexus-core', name: 'Nexus Core', category: 'robots', unlockedTier: 'associate', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80', description: 'Stateful intelligence unit orchestrating distributed agents.' },
  { id: 'av-quantum-mech', name: 'Quantum Mech', category: 'robots', unlockedTier: 'advanced', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', description: 'Apex automation titan processing multi-modal pipelines.' },
  // Anime
  { id: 'av-shinobi', name: 'Code Shinobi', category: 'anime', unlockedTier: 'foundation', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', description: 'Silent learner mastering algorithms in the shadows.' },
  { id: 'av-alchemist', name: 'Logic Alchemist', category: 'anime', unlockedTier: 'associate', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80', description: 'Transmutes raw ideas into production SaaS gold.' },
  { id: 'av-valkyrie', name: 'Cyber Valkyrie', category: 'anime', unlockedTier: 'advanced', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80', description: 'Champion of placement gauntlets and tier-1 engineering.' },
  // Fantasy
  { id: 'av-phoenix', name: 'Aether Phoenix', category: 'fantasy', unlockedTier: 'associate', imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&auto=format&fit=crop&q=80', description: 'Rises stronger from compiler errors and failed tests.' },
  // Professional
  { id: 'av-pro-exec', name: 'Product Lead', category: 'professional', unlockedTier: 'foundation', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80', description: 'Sharp, strategic, and polished for executive reviews.' },
  // Minimalist
  { id: 'av-monolith', name: 'Dark Monolith', category: 'minimalist', unlockedTier: 'foundation', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80', description: 'Pure geometric simplicity with zero cognitive distraction.' }
];

export const INITIAL_WORKLOAD_STATE: WorkloadState = {
  currentStreak: 14,
  lastActiveDate: new Date().toISOString().split('T')[0],
  fatigueScore: 28,
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

