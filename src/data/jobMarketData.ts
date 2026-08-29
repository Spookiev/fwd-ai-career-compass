import { JobPosting } from '../types';

export const SKILL_DEMAND_RADAR_DATA = [
  { subject: 'Generative AI & LLMs', demand: 96, growth: 92, fullMark: 100 },
  { subject: 'System Design & Arch', demand: 90, growth: 85, fullMark: 100 },
  { subject: 'Cloud & Kubernetes', demand: 88, growth: 82, fullMark: 100 },
  { subject: 'Full Stack React/TS', demand: 92, growth: 78, fullMark: 100 },
  { subject: 'Data Pipelines & Kafka', demand: 84, growth: 86, fullMark: 100 },
  { subject: 'Cybersecurity & ZeroTrust', demand: 82, growth: 89, fullMark: 100 },
];

export const TECH_MOMENTUM_DATA = [
  { year: '2023', 'GenAI / LLMs': 42, 'Cloud & DevOps': 68, 'FullStack Web': 78, 'Legacy Frameworks': 62 },
  { year: '2024', 'GenAI / LLMs': 68, 'Cloud & DevOps': 74, 'FullStack Web': 82, 'Legacy Frameworks': 50 },
  { year: '2025 (Now)', 'GenAI / LLMs': 92, 'Cloud & DevOps': 84, 'FullStack Web': 88, 'Legacy Frameworks': 38 },
  { year: '2026 (Proj)', 'GenAI / LLMs': 97, 'Cloud & DevOps': 89, 'FullStack Web': 91, 'Legacy Frameworks': 28 },
  { year: '2027 (Proj)', 'GenAI / LLMs': 99, 'Cloud & DevOps': 94, 'FullStack Web': 93, 'Legacy Frameworks': 20 },
];

export const SALARY_BY_EXPERIENCE_DATA = [
  { experience: 'Fresher / Entry', minSalary: 8, avgSalary: 14, maxSalary: 24 },
  { experience: '1-2 Yrs (Mid-Junior)', minSalary: 14, avgSalary: 22, maxSalary: 35 },
  { experience: '3-5 Yrs (Senior)', minSalary: 26, avgSalary: 38, maxSalary: 58 },
  { experience: '5+ Yrs (Lead/Staff)', minSalary: 45, avgSalary: 65, maxSalary: 95 },
];

export const SAMPLE_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'job-01',
    title: 'Associate Full Stack AI Engineer',
    company: 'Atlassian India',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    salary: '₹24 - ₹30 LPA + Equity',
    postedAgo: '1 day ago',
    matchScore: 94,
    requiredReadinessThreshold: 75,
    tags: ['React', 'TypeScript', 'LangChain', 'Python', 'AWS'],
    applyUrl: 'https://www.atlassian.com/company/careers'
  },
  {
    id: 'job-02',
    title: 'Junior Cloud Platform & DevOps Engineer',
    company: 'Stripe',
    location: 'Remote (India / Global)',
    type: 'Full-time',
    salary: '₹28 - ₹36 LPA ($100k)',
    postedAgo: '3 days ago',
    matchScore: 89,
    requiredReadinessThreshold: 78,
    tags: ['Kubernetes', 'Terraform', 'Go', 'Docker', 'AWS'],
    applyUrl: 'https://stripe.com/jobs'
  },
  {
    id: 'job-03',
    title: 'AI Research & Engineering Fellow (2025 Batch)',
    company: 'Google DeepMind / Research',
    location: 'Bengaluru / Hyderabad',
    type: 'Internship',
    salary: '₹1.5 Lakhs / Month Stipend',
    postedAgo: '5 hours ago',
    matchScore: 92,
    requiredReadinessThreshold: 85,
    tags: ['PyTorch', 'Gemini API', 'JAX', 'C++', 'Linear Algebra'],
    applyUrl: 'https://careers.google.com'
  },
  {
    id: 'job-04',
    title: 'Frontend Systems Engineer (React 19 / Vite)',
    company: 'Postman',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    salary: '₹20 - ₹26 LPA',
    postedAgo: '2 days ago',
    matchScore: 88,
    requiredReadinessThreshold: 70,
    tags: ['React', 'TypeScript', 'Performance', 'WebSockets'],
    applyUrl: 'https://www.postman.com/company/careers/'
  },
  {
    id: 'job-05',
    title: 'Distributed Backend Developer (Go / Microservices)',
    company: 'Swiggy Tech',
    location: 'Bengaluru',
    type: 'Full-time',
    salary: '₹18 - ₹25 LPA',
    postedAgo: '4 days ago',
    matchScore: 83,
    requiredReadinessThreshold: 72,
    tags: ['Go', 'Redis', 'Kafka', 'PostgreSQL', 'Docker'],
    applyUrl: 'https://careers.swiggy.com'
  },
  {
    id: 'job-06',
    title: 'Product Operations Analyst (APM Program)',
    company: 'Razorpay',
    location: 'Bengaluru / On-site',
    type: 'Full-time',
    salary: '₹16 - ₹22 LPA',
    postedAgo: '6 days ago',
    matchScore: 78,
    requiredReadinessThreshold: 68,
    tags: ['SQL', 'Product Analytics', 'PRDs', 'A/B Testing'],
    applyUrl: 'https://razorpay.com/jobs/'
  }
];
