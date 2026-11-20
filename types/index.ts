import * as React from 'react';

export interface Skill {
  name: string;
  category: 'languages' | 'fundamentals' | 'frontend' | 'backend' | 'databases' | 'tools' | 'ai';
  description: string;
  level: 'Advanced Learner' | 'Intermediate' | 'Familiar' | 'Exploratory';
  icon: React.ComponentType<{ className?: string }>;
}

export interface ArchitectureDecisionRecord {
  context: string;
  languageAndStack: string;
  previousImplementation: string;
  improvedSolution: string;
  tradeoffs: string;
}

export interface WarStory {
  title: string;
  symptom: string;
  investigation: string;
  rootCause: string;
  permanentFix: string;
}

export interface TelemetryMatrix {
  coldBoot: string;
  warmStart: string;
  p50Latency: string;
  p95Latency: string;
  p99Latency: string;
  memoryFootprint: string;
  throughputOrFps: string;
  notes?: string;
}

export interface TestingHygiene {
  testCoverage: string;
  testTypes: string[];
  ciGates: string;
  defensiveInvariants: string[];
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  problem: string;
  solution: string;
  architecture?: string[];
  metrics?: string[];
  features: string[];
  tech: string[];
  learnings: string;
  future: string[];
  github: string;
  demo?: string;
  coverColor: string;
  previewImage?: string;
  videoUrl?: string;
  videoDuration?: string;
  adr?: ArchitectureDecisionRecord;
  warStory?: WarStory;
  telemetry?: TelemetryMatrix;
  testingHygiene?: TestingHygiene;
}
