import { InterviewQuestion } from '../types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'int-tech-01',
    category: 'Technical',
    role: 'Full Stack AI Engineer',
    difficulty: 'Medium',
    title: 'Explain Vector Embeddings & RAG Architecture',
    prompt: 'How would you architect a Retrieval-Augmented Generation (RAG) pipeline for a university with 500,000 PDF documents? Discuss chunking, embedding generation, hybrid search (dense + sparse BM25), and reranking.',
    contextHint: 'Focus on latency mitigation, context window limits, token optimization, and hallucination reduction mechanisms.'
  },
  {
    id: 'int-code-01',
    category: 'Coding Logic',
    role: 'Full Stack AI Engineer',
    difficulty: 'Medium',
    title: 'Implement Token Bucket Rate Limiter',
    prompt: 'Implement a Token Bucket rate limiter class in TypeScript/JavaScript that enforces a maximum capacity and refills at a constant token rate per second.',
    contextHint: 'Calculate elapsed time since last refill and add new tokens proportionally up to maximum capacity before granting tokens.',
    starterCode: `class TokenBucketRateLimiter {
  private capacity: number;
  private refillRatePerSec: number;
  private currentTokens: number;
  private lastRefillTimestamp: number;

  constructor(capacity: number, refillRatePerSec: number) {
    this.capacity = capacity;
    this.refillRatePerSec = refillRatePerSec;
    this.currentTokens = capacity;
    this.lastRefillTimestamp = Date.now();
  }

  public allowRequest(tokensRequested: number = 1): boolean {
    // 1. Calculate time passed since lastRefillTimestamp
    // 2. Replenish tokens up to capacity
    // 3. Check if currentTokens >= tokensRequested
    // 4. Return true and deduct tokens, or return false
    
    // YOUR IMPLEMENTATION HERE:
    return true;
  }
}`,
    expectedOutput: 'Should return true for first N requests within capacity and false when depleted.',
    solutionExplanation: 'Calculate now - lastRefillTimestamp in seconds, multiply by refillRatePerSec, add to currentTokens capped at capacity, and deduct tokens on success.'
  },
  {
    id: 'int-beh-01',
    category: 'Behavioral',
    role: 'General Placement / FAANG',
    difficulty: 'Medium',
    title: 'High-Stakes Technical Failure & Recovery (STAR Method)',
    prompt: 'Describe a situation where a software bug or architectural decision caused system degradation or project delay. Walk through the Situation, Task, Action taken to mitigate the issue, and the Resulting lesson learned.',
    contextHint: 'Use the STAR format explicitly: [Situation] Context -> [Task] Your responsibility -> [Action] The decisive steps you took -> [Result] Measurable outcome.'
  },
  {
    id: 'int-hr-01',
    category: 'HR',
    role: 'General Placement',
    difficulty: 'Easy',
    title: 'Career Trajectory & Growth Expectations',
    prompt: 'Why are you passionate about starting your career in this specific engineering track, and how do you plan to contribute to our engineering culture and continuous learning in your first 90 days?',
    contextHint: 'Highlight curiosity, mentorship, willingness to learn unglamorous tasks, and ownership of deliverables.'
  },
  {
    id: 'int-code-02',
    category: 'Coding Logic',
    role: 'Distributed Systems Engineer',
    difficulty: 'Hard',
    title: 'LRU Cache Implementation with O(1) Operations',
    prompt: 'Design and implement a Least Recently Used (LRU) Cache that supports get and put operations in O(1) time complexity.',
    contextHint: 'Use a Hash Map combined with a Doubly Linked List to achieve O(1) lookups, deletions, and head insertions.',
    starterCode: `class LRUCache {
  private capacity: number;
  private cache: Map<number, number>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: number): number {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}`,
    expectedOutput: 'Maintains items up to capacity, evicts the least recently accessed item when full.',
    solutionExplanation: 'JavaScript Map preserves insertion order, making delete + set operations effectively simulate an O(1) doubly linked list.'
  }
];
