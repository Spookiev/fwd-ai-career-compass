import { DiagnosticQuestion } from '../types';

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'q1',
    category: 'Quantitative Aptitude',
    question: 'A distributed caching cluster reduces database queries by 80%. If the original database response time was 120ms and cache hit response time is 10ms, what is the new average effective response time?',
    options: [
      '32 ms',
      '24 ms',
      '34 ms',
      '42 ms'
    ],
    correctIndex: 0,
    explanation: 'Average latency = (0.80 * 10ms) + (0.20 * 120ms) = 8ms + 24ms = 32ms.',
    weight: 10,
  },
  {
    id: 'q2',
    category: 'Logical Reasoning',
    question: 'In a microservice mesh, Service A depends on B and C. Service B depends on D. Service C depends on E. If Service D fails, which services are guaranteed to be impacted in this strict synchronous dependency graph?',
    options: [
      'Only Service B',
      'Services B and A only',
      'Services A, B, and C',
      'All services fail'
    ],
    correctIndex: 1,
    explanation: 'D fails -> B fails (direct dependency) -> A fails (depends on B). C depends on E which is unaffected.',
    weight: 10,
  },
  {
    id: 'q3',
    category: 'CS Core & Algorithms',
    question: 'What is the tight worst-case time complexity of inserting N elements into an empty Hash Table with separate chaining using balanced Red-Black trees for collision buckets?',
    codeSnippet: `// Worst-case hash table insertion with treeified buckets\nfor (let i = 0; i < N; i++) {\n  hashTable.put(keys[i], values[i]);\n}`,
    options: [
      'O(N^2)',
      'O(N log N)',
      'O(N)',
      'O(log N)'
    ],
    correctIndex: 1,
    explanation: 'With treeified buckets (like Java 8 HashMap), each insertion into a collision bucket takes O(log K). For N elements, worst case is O(N log N).',
    weight: 15,
  },
  {
    id: 'q4',
    category: 'System Architecture',
    question: 'You are designing a real-time collaborative code editor with 50,000 concurrent typists across the globe. Which protocol and consistency model is most suitable for character-level syncing?',
    options: [
      'HTTP Long-Polling with Strong Two-Phase Commit',
      'WebSockets with CRDT (Conflict-free Replicated Data Types)',
      'GraphQL Queries with Strict Serializability',
      'Server-Sent Events with Relational Table Locking'
    ],
    correctIndex: 1,
    explanation: 'WebSockets provide low-latency full-duplex streaming, while CRDTs (or Operational Transformation) allow decentralized, eventually consistent document convergence without lock contention.',
    weight: 15,
  },
  {
    id: 'q5',
    category: 'CS Core & Algorithms',
    question: 'Which of the following database isolation levels guarantees prevention of Dirty Reads, Non-Repeatable Reads, and Phantom Reads according to the ANSI SQL standard?',
    options: [
      'Read Committed',
      'Repeatable Read',
      'Serializable',
      'Snapshot Isolation'
    ],
    correctIndex: 2,
    explanation: 'Serializable is the highest isolation level and completely prevents dirty reads, non-repeatable reads, and phantom reads.',
    weight: 15,
  },
  {
    id: 'q6',
    category: 'System Architecture',
    question: 'In a vector search application using cosine similarity embeddings, which index structure provides sub-linear nearest-neighbor retrieval for 10 million high-dimensional vectors?',
    options: [
      'B-Tree Index on Primary Key',
      'HNSW (Hierarchical Navigable Small World) Graph',
      'Bitmap Index',
      'LSM-Tree (Log-Structured Merge-Tree)'
    ],
    correctIndex: 1,
    explanation: 'HNSW is the industry gold standard approximate nearest neighbor (ANN) graph algorithm for sub-linear high-dimensional vector search.',
    weight: 15,
  }
];
