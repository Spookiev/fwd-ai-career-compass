import { CareerExplorerRole, CareerRecommendation, CareerRoadmap } from '../types';

export const CAREER_ROLES_DATA: CareerExplorerRole[] = [
  {
    id: 'role-fullstack-ai',
    title: 'Full Stack AI Engineer',
    category: 'AI & Data',
    description: 'Bridges modern frontend experiences (React/Next.js) with scalable backend services and Generative AI foundation models (Gemini, LangChain, Vector DBs).',
    averageSalary: '₹18 - ₹35 LPA ($115k - $160k)',
    growthTrajectory: '+34% YoY Hiring Surge (2024–2028)',
    topSkillsRequired: ['React/Next.js', 'Python/TypeScript', 'LangChain/LangGraph', 'Vector DBs (Chroma/Pinecone)', 'Docker & Kubernetes', 'System Design'],
    openPositionsCount: 4280,
    sampleJobTitles: ['AI Product Engineer', 'Full Stack LLM Developer', 'Generative Applications Architect'],
    oerResources: [
      {
        title: 'NPTEL: Deep Learning & Generative Architectures',
        type: 'Course',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106106184',
        duration: '12 Weeks',
        rating: 4.9
      },
      {
        title: 'Full Stack Open — University of Helsinki (Free Verified Track)',
        type: 'Course',
        provider: 'Official Docs',
        url: 'https://fullstackopen.com/en/',
        duration: 'Self-Paced (13 Parts)',
        rating: 5.0
      },
      {
        title: 'Building LLM Applications with LangChain & LangGraph',
        type: 'Course',
        provider: 'Coursera Free',
        url: 'https://www.coursera.org/learn/generative-ai-with-llms',
        duration: '3 Weeks',
        rating: 4.8
      },
      {
        title: 'Designing Data-Intensive Applications (Martin Kleppmann Summary)',
        type: 'Book',
        provider: 'Book Summary',
        url: 'https://github.com/ept/ddia-references',
        duration: '65 Pages Summary',
        rating: 4.9
      },
      {
        title: 'Hussein Nasser: Modern Backend Engineering Masterclass',
        type: 'Video',
        provider: 'YouTube',
        url: 'https://www.youtube.com/@hnasr',
        duration: '45+ Videos',
        rating: 4.9
      }
    ]
  },
  {
    id: 'role-cloud-architect',
    title: 'Cloud Solutions & DevOps Architect',
    category: 'Cloud & Security',
    description: 'Designs resilient, high-availability multi-region cloud infrastructure on AWS/GCP, automating CI/CD pipelines, Kubernetes clusters, and zero-trust security.',
    averageSalary: '₹20 - ₹40 LPA ($125k - $175k)',
    growthTrajectory: '+28% YoY Global Growth',
    topSkillsRequired: ['Kubernetes (K8s)', 'Terraform (IaC)', 'AWS / GCP Architecture', 'CI/CD (GitHub Actions)', 'Prometheus & Grafana', 'Linux Kernel Internals'],
    openPositionsCount: 3150,
    sampleJobTitles: ['Site Reliability Engineer (SRE)', 'Cloud Infrastructure Engineer', 'Platform Architect'],
    oerResources: [
      {
        title: 'NPTEL: Cloud Computing & Distributed Systems',
        type: 'Course',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106105167',
        duration: '8 Weeks',
        rating: 4.8
      },
      {
        title: 'Nana Janashia: Complete Kubernetes Crash Course',
        type: 'Video',
        provider: 'YouTube',
        url: 'https://www.youtube.com/watch?v=X48VuDVv0do',
        duration: '4 Hours',
        rating: 4.9
      },
      {
        title: 'Site Reliability Engineering (Google O\'Reilly Open Book)',
        type: 'Book',
        provider: 'Book Summary',
        url: 'https://sre.google/sre-book/table-of-contents/',
        duration: 'Free Full Text',
        rating: 5.0
      },
      {
        title: 'AWS Fundamentals: Going Cloud-Native (Audit Track)',
        type: 'Course',
        provider: 'Coursera Free',
        url: 'https://www.coursera.org/learn/aws-fundamentals-cloud-native',
        duration: '4 Weeks',
        rating: 4.7
      }
    ]
  },
  {
    id: 'role-ml-research',
    title: 'Machine Learning Research Engineer',
    category: 'AI & Data',
    description: 'Develops mathematical models, transformer architectures, and reinforcement learning systems pushing the boundaries of multimodal intelligence.',
    averageSalary: '₹25 - ₹55 LPA ($140k - $210k)',
    growthTrajectory: '+42% YoY Surging Demand',
    topSkillsRequired: ['PyTorch / JAX', 'Transformers & Attention Mechanisms', 'Linear Algebra & Optimization', 'CUDA & GPU Kernels', 'Distributed Training (DeepSpeed/Ray)'],
    openPositionsCount: 2890,
    sampleJobTitles: ['AI Scientist', 'Applied ML Engineer', 'NLP Research Specialist'],
    oerResources: [
      {
        title: 'Stanford CS229: Machine Learning (Prof. Andrew Ng)',
        type: 'Course',
        provider: 'YouTube',
        url: 'https://youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU',
        duration: '20 Lectures',
        rating: 5.0
      },
      {
        title: 'NPTEL: Deep Learning for Computer Vision',
        type: 'Course',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106105216',
        duration: '12 Weeks',
        rating: 4.9
      },
      {
        title: 'Understanding Deep Learning (Simon J.D. Prince Free MIT Press)',
        type: 'Book',
        provider: 'Book Summary',
        url: 'https://udlbook.github.io/udlbook/',
        duration: 'Complete Book PDF',
        rating: 5.0
      }
    ]
  },
  {
    id: 'role-cybersecurity',
    title: 'Cybersecurity & Offensive Security Specialist',
    category: 'Cloud & Security',
    description: 'Defends digital assets against sophisticated threat actors through red-teaming penetration tests, SIEM monitoring, reverse engineering, and threat modeling.',
    averageSalary: '₹16 - ₹32 LPA ($105k - $155k)',
    growthTrajectory: '+31% Global Talent Deficit',
    topSkillsRequired: ['Ethical Hacking & Metasploit', 'Network Protocols (Wireshark)', 'Reverse Engineering & Ghidra', 'SIEM / SOC Analysis', 'OWASP Top 10 Security'],
    openPositionsCount: 1940,
    sampleJobTitles: ['SOC Analyst', 'Penetration Tester', 'Application Security Engineer'],
    oerResources: [
      {
        title: 'NPTEL: Information Security & Cyber Forensics',
        type: 'Course',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106106178',
        duration: '8 Weeks',
        rating: 4.7
      },
      {
        title: 'John Hammond: Cyber Defense & Malware Decompilation',
        type: 'Video',
        provider: 'YouTube',
        url: 'https://www.youtube.com/@_JohnHammond',
        duration: '100+ CTF Walkthroughs',
        rating: 4.9
      }
    ]
  },
  {
    id: 'role-data-engineer',
    title: 'Big Data & Real-Time Analytics Engineer',
    category: 'AI & Data',
    description: 'Constructs low-latency data pipelines handling petabyte-scale streams using Apache Spark, Kafka, Apache Flink, and cloud data warehouses like BigQuery and Snowflake.',
    averageSalary: '₹17 - ₹34 LPA ($110k - $150k)',
    growthTrajectory: '+29% Enterprise Adoption',
    topSkillsRequired: ['Apache Spark / PySpark', 'Apache Kafka / Flink', 'SQL & Data Modeling', 'Snowflake / BigQuery', 'dbt & Airflow Pipelines'],
    openPositionsCount: 2750,
    sampleJobTitles: ['Data Platform Engineer', 'Streaming Pipeline Architect', 'Analytics Engineer'],
    oerResources: [
      {
        title: 'NPTEL: Big Data Computing Architecture',
        type: 'Course',
        provider: 'NPTEL',
        url: 'https://nptel.ac.in/courses/106104189',
        duration: '8 Weeks',
        rating: 4.8
      },
      {
        title: 'Data Engineering Zoomcamp (Free Complete Bootcamp)',
        type: 'Course',
        provider: 'Official Docs',
        url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp',
        duration: '9 Modules',
        rating: 5.0
      }
    ]
  },
  {
    id: 'role-product-manager',
    title: 'Technical Product Manager (AI & SaaS)',
    category: 'Product & Strategy',
    description: 'Drives product roadmap vision, user research, API metrics, and algorithmic go-to-market strategies collaborating with engineering and design leads.',
    averageSalary: '₹18 - ₹36 LPA ($115k - $165k)',
    growthTrajectory: '+26% Demand',
    topSkillsRequired: ['Product Analytics (Mixpanel/PostHog)', 'System Architecture Literacy', 'A/B Testing & Statistics', 'Agile & PRD Writing', 'Stakeholder Negotiation'],
    openPositionsCount: 1620,
    sampleJobTitles: ['Associate Product Manager (APM)', 'AI Product Lead', 'Growth Product Manager'],
    oerResources: [
      {
        title: 'Inspired: How to Create Tech Products Customers Love (Marty Cagan Summary)',
        type: 'Book',
        provider: 'Book Summary',
        url: 'https://www.svpg.com/inspired-how-to-create-tech-products-customers-love/',
        duration: 'Core Chapter Breakdown',
        rating: 4.9
      },
      {
        title: 'Product Management Fundamentals (University of Virginia)',
        type: 'Course',
        provider: 'Coursera Free',
        url: 'https://www.coursera.org/learn/uva-darden-digital-product-management',
        duration: '4 Weeks Audit',
        rating: 4.7
      }
    ]
  }
];

export const INITIAL_ROADMAP: CareerRoadmap = {
  id: 'rd_001',
  roleTitle: 'Full Stack AI Engineer',
  roleCategory: 'AI & Data',
  overview: 'A high-impact 6-month progression trajectory engineered to transform solid React & Python fundamentals into elite distributed AI application mastery.',
  estimatedTimeToJobReady: '6 Months (15 hrs/week)',
  milestones: [
    {
      id: 'm1',
      period: 'Phase 1 (Months 1–2): High-Throughput Core & System Foundations',
      title: 'Advanced Concurrency, Vector Storage & Microservices',
      description: 'Master asynchronous pipelines, vector embeddings storage, and Redis clustering for low-latency stateful inference.',
      completed: true,
      tasks: [
        'Build Redis Streams async worker for LLM token rate-limiting',
        'Implement vector cosine similarity search with Pinecone and pgvector',
        'Pass NPTEL Cloud Computing milestone assessment with >80%'
      ],
      recommendedResources: [
        {
          title: 'NPTEL: Distributed Computing Concepts',
          type: 'Course',
          provider: 'NPTEL',
          url: 'https://nptel.ac.in/courses/106106168'
        },
        {
          title: 'FastAPI High Performance Async Patterns',
          type: 'Documentation',
          provider: 'Official Docs',
          url: 'https://fastapi.tiangolo.com/async/'
        }
      ],
      resumeBulletSuggestion: 'Architected async event streaming pipeline using Redis Streams & FastAPI, achieving sub-45ms P95 latency across 1.2M daily requests.'
    },
    {
      id: 'm2',
      period: 'Phase 2 (Months 3–4): Autonomous AI Agents & LangGraph',
      title: 'Multi-Agent Orchestration & Stateful Memory Pipelines',
      description: 'Design self-correcting agent graphs with tool calling, human-in-the-loop validation, and structured Gemini Flash outputs.',
      completed: false,
      tasks: [
        'Construct a multi-agent research workflow using LangGraph and Gemini 2.5',
        'Implement semantic caching with Redis to reduce LLM API cost by 40%',
        'Deploy production Docker container to AWS ECS / GCP Cloud Run with TLS'
      ],
      recommendedResources: [
        {
          title: 'LangGraph Multi-Agent Architecture Guide',
          type: 'Documentation',
          provider: 'Official Docs',
          url: 'https://langchain-ai.github.io/langgraph/'
        },
        {
          title: 'DeepLearning.AI: Functions, Tools and Agents with LLMs',
          type: 'Course',
          provider: 'Coursera Free',
          url: 'https://www.deeplearning.ai/short-courses/'
        }
      ],
      resumeBulletSuggestion: 'Engineered multi-agent code evaluation engine with LangGraph & Gemini Flash, slashing code review turnaround time by 62%.'
    },
    {
      id: 'm3',
      period: 'Phase 3 (Months 5–6): Tier-1 Capstone & Placement Readiness',
      title: 'Enterprise Capstone & Mock Interview Gauntlet',
      description: 'Complete end-to-end full stack AI SaaS product with auth, payments, CI/CD, and pass 10+ mock technical interviews.',
      completed: false,
      tasks: [
        'Complete Capstone: "AutoPulse" Real-Time AI Telemetry Platform',
        'Pass 5 Technical Mock Coding Simulations with >85% score on STAR rubric',
        'Obtain Faculty Endorsement from Placement Advisor'
      ],
      recommendedResources: [
        {
          title: 'System Design Interview – Alex Xu (High-Level Summary)',
          type: 'Book',
          provider: 'Book Summary',
          url: 'https://bytebytego.com/'
        },
        {
          title: 'LeetCode 75 Curated Algorithm Mastery',
          type: 'Project',
          provider: 'Official Docs',
          url: 'https://leetcode.com/studyplan/leetcode-75/'
        }
      ],
      resumeBulletSuggestion: 'Built and open-sourced AutoPulse, a real-time AI telemetry SaaS supporting 10k MAUs with zero-downtime Blue/Green deployments.'
    }
  ],
  monthlyGoals: [
    {
      monthNumber: 1,
      title: 'Month 1: Vector Databases & High-Throughput APIs',
      summary: 'Embeddings generation, pgvector indexing, and FastAPI async architecture.',
      completed: true,
      weeklyGoals: [
        {
          weekNumber: 1,
          title: 'Week 1: Embeddings & Similarity Math',
          focus: 'Cosine distance vs dot product, chunking strategies for long docs.',
          tasks: [
            { id: 't1_1', title: 'Implement hierarchical text chunker in TypeScript & Python', completed: true, xp: 50, estimatedHours: 4 },
            { id: 't1_2', title: 'Set up local ChromaDB & run benchmark queries on 10k documents', completed: true, xp: 60, estimatedHours: 5 }
          ]
        },
        {
          weekNumber: 2,
          title: 'Week 2: PostgreSQL with pgvector & HNSW Indexing',
          focus: 'Creating vector columns, IVFFlat vs HNSW performance tuning.',
          tasks: [
            { id: 't2_1', title: 'Write SQL migration for HNSW index on 1536-dim vectors', completed: true, xp: 75, estimatedHours: 6 },
            { id: 't2_2', title: 'Connect pgvector to Next.js API routes with connection pooling', completed: true, xp: 80, estimatedHours: 5 }
          ]
        }
      ]
    },
    {
      monthNumber: 2,
      title: 'Month 2: Agent Workflows & Tool Calling',
      summary: 'Function calling schemas, LangGraph stateful loops, and streaming responses.',
      completed: false,
      weeklyGoals: [
        {
          weekNumber: 3,
          title: 'Week 3: Gemini 2.5 Structured JSON & Function Calling',
          focus: 'Defining JSON schemas for deterministic tool execution.',
          tasks: [
            { id: 't3_1', title: 'Build weather & calculator function calling agent with @google/genai', completed: true, xp: 90, estimatedHours: 6 },
            { id: 't3_2', title: 'Implement SSE (Server-Sent Events) live streaming to React UI', completed: false, xp: 85, estimatedHours: 5 }
          ]
        },
        {
          weekNumber: 4,
          title: 'Week 4: LangGraph Self-Correcting Code Loops',
          focus: 'State transitions, retry loops, and hallucination guardrails.',
          tasks: [
            { id: 't4_1', title: 'Build cyclic graph with code execution sandbox node', completed: false, xp: 120, estimatedHours: 8 },
            { id: 't4_2', title: 'Write automated unit tests verifying fallback behaviour', completed: false, xp: 70, estimatedHours: 4 }
          ]
        }
      ]
    },
    {
      monthNumber: 3,
      title: 'Month 3: Production Deployment & Cloud Observability',
      summary: 'Docker multi-stage builds, Prometheus metrics, and automated CI/CD.',
      completed: false,
      weeklyGoals: [
        {
          weekNumber: 5,
          title: 'Week 5: Container Optimization & Secrets Management',
          focus: 'Multi-stage Dockerfile sizing under 120MB, GitHub Actions pipeline.',
          tasks: [
            { id: 't5_1', title: 'Write optimized Dockerfile with non-root security context', completed: false, xp: 80, estimatedHours: 5 },
            { id: 't5_2', title: 'Configure GitHub Actions for automated lint, test, and container push', completed: false, xp: 90, estimatedHours: 6 }
          ]
        }
      ]
    }
  ],
  capstoneProject: {
    title: 'AutoPulse: Autonomous Telemetry & Distributed AI Observability Platform',
    description: 'An enterprise-grade SaaS system that ingests distributed log streams, uses Gemini Flash to detect anomalous error clusters, and creates automated GitHub pull requests with proposed hotfixes.',
    deliverables: [
      'Interactive Next.js 14 Dashboard with Recharts telemetry visualizations',
      'Redis Streams consumer microservice with 10k msgs/sec throughput',
      'Automated PR generator verified with GitHub REST API and Gemini 2.5',
      'Comprehensive architecture documentation (C4 Model) and live demo deployment'
    ]
  }
};

export const SAMPLE_CAREER_RECOMMENDATIONS: CareerRecommendation[] = [
  {
    id: 'rec-1',
    roleTitle: 'Full Stack AI Engineer',
    matchScore: 94,
    marketDemand: 'Very High',
    salaryRange: '₹20 - ₹35 LPA',
    growthRate: '+38% YoY',
    whyFitRationale: 'Rahul exhibits exceptional synergy between modern React/TypeScript UI mastery and strong Python data structures. His Zomato caching internship highlights high-throughput backend maturity, making him prime for full-stack AI orchestration.',
    strengths: [
      'Proficient in React, Next.js & modern frontend state',
      'Solid foundational understanding of Redis Streams & caching',
      'Top 5% aptitude & algorithmic problem solving'
    ],
    areasToDevelop: [
      'Formal LangGraph stateful multi-agent workflows',
      'Vector DB indexing (HNSW parameters & pgvector tuning)'
    ],
    priorityMissingSkills: ['LangGraph', 'Vector DB HNSW', 'Kubernetes Helm'],
    recommendedTimelineMonths: 6
  },
  {
    id: 'rec-2',
    roleTitle: 'Cloud Solutions & DevOps Architect',
    matchScore: 88,
    marketDemand: 'High',
    salaryRange: '₹18 - ₹32 LPA',
    growthRate: '+28% YoY',
    whyFitRationale: 'With active AWS Cloud Practitioner credentials and proven Docker containerization in academic projects, transitioning into scalable platform architecture is a natural high-ROI pathway.',
    strengths: [
      'Certified AWS Cloud Practitioner',
      'Linux & Docker microservices experience',
      'Consistent Git workflow & CI/CD basics'
    ],
    areasToDevelop: [
      'Terraform Infrastructure as Code (IaC)',
      'Kubernetes operator patterns & Ingress controllers'
    ],
    priorityMissingSkills: ['Terraform', 'Kubernetes (K8s)', 'Prometheus/Grafana'],
    recommendedTimelineMonths: 6
  },
  {
    id: 'rec-3',
    roleTitle: 'Machine Learning Systems Engineer',
    matchScore: 82,
    marketDemand: 'Very High',
    salaryRange: '₹22 - ₹40 LPA',
    growthRate: '+34% YoY',
    whyFitRationale: 'His MediScan AI project demonstrated PyTorch training capabilities with 94.2% ROC-AUC. Combining this with backend microservices creates a potent ML Systems profile.',
    strengths: [
      'PyTorch & ResNet model training experience',
      'FastAPI inference deployment',
      'Solid mathematical foundations (CGPA 8.84)'
    ],
    areasToDevelop: [
      'Model quantization (vLLM, GGUF, TensorRT-LLM)',
      'Distributed training with Ray / DeepSpeed'
    ],
    priorityMissingSkills: ['vLLM Quantization', 'DeepSpeed', 'CUDA Basics'],
    recommendedTimelineMonths: 9
  },
  {
    id: 'rec-4',
    roleTitle: 'High-Throughput Backend Specialist',
    matchScore: 80,
    marketDemand: 'High',
    salaryRange: '₹18 - ₹30 LPA',
    growthRate: '+24% YoY',
    whyFitRationale: 'Demonstrated real-world experience optimizing restaurant menu caching at Zomato with 38% latency reduction. Strong candidate for distributed platform teams.',
    strengths: [
      'Redis Cluster & cache invalidation strategies',
      'SQL & PostgreSQL query optimization',
      'REST API design principles'
    ],
    areasToDevelop: [
      'gRPC & Protocol Buffers microservices',
      'Apache Kafka event sourcing & partition strategies'
    ],
    priorityMissingSkills: ['gRPC / Protobuf', 'Apache Kafka', 'Distributed Locking'],
    recommendedTimelineMonths: 3
  },
  {
    id: 'rec-5',
    roleTitle: 'Technical Product Specialist (Developer Tools)',
    matchScore: 76,
    marketDemand: 'Moderate',
    salaryRange: '₹16 - ₹28 LPA',
    growthRate: '+22% YoY',
    whyFitRationale: 'High communication ability combined with diverse full-stack project portfolio enables effective bridging between developer workflows and product strategy.',
    strengths: [
      'High project execution speed and documentation quality',
      'Intuitive UX design for developer tools (DevPulse)',
      'Strong team leadership in Smart India Hackathon'
    ],
    areasToDevelop: [
      'Product telemetry instrumentation (PostHog / Mixpanel)',
      'A/B experimentation frameworks'
    ],
    priorityMissingSkills: ['Product Analytics', 'A/B Testing Frameworks', 'GTM Strategy'],
    recommendedTimelineMonths: 3
  }
];
