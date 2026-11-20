'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/animations/Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Terminal,
  Database,
  GitBranch,
  Layers,
  ArrowUpRight,
  Cpu,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface VerifiedSkill {
  name: string;
  category: string;
  description: string;
  proof: string;
  proofLink?: string;
}

const skillCategories = [
  {
    id: 'languages',
    title: 'Core Languages',
    icon: Code2,
    description:
      'Building with TypeScript, Java, C++, and SQL with strict typing, memory awareness, and idiomatic patterns.',
    skills: [
      {
        name: 'Java',
        category: 'languages',
        description: 'Object-oriented systems, collections framework, and algorithmic optimization.',
        proof: 'Core Paradigms & Algorithm Practice',
        proofLink: 'https://github.com/SriniwasAwasthi/java-dsa-tracker',
      },
      {
        name: 'TypeScript',
        category: 'languages',
        description: 'Strict type contracts, generics, discriminant unions, and runtime Zod validation.',
        proof: 'Production Next.js 15 Architectures',
        proofLink: 'https://github.com/SriniwasAwasthi/maison-noir-luxury-coffee',
      },
      {
        name: 'C++ & C',
        category: 'languages',
        description: 'Algorithmic problem solving, pointer manipulation, and asymptotic efficiency.',
        proof: 'LeetCode & Problem-Solving Practice',
        proofLink: 'https://github.com/SriniwasAwasthi/java-dsa-tracker',
      },
      {
        name: 'SQL',
        category: 'languages',
        description: 'Relational schemas, foreign key cascades, complex joins, and B-tree indexing.',
        proof: 'Indexed SQLite & Relational Models',
        proofLink: 'https://github.com/SriniwasAwasthi/book-matrix-lms',
      },
    ] as VerifiedSkill[],
  },
  {
    id: 'systems-web',
    title: 'Web & Systems Architecture',
    icon: Layers,
    description:
      'Modern web application engineering, concurrent client states, and low-latency audio processing.',
    skills: [
      {
        name: 'Next.js 15 & React 19',
        category: 'systems-web',
        description: 'App Router architecture, server/client boundaries, SSR/SSG, and concurrent mode.',
        proof: 'Multi-SKU High-Fidelity Platforms',
        proofLink: 'https://github.com/SriniwasAwasthi/maison-noir-luxury-coffee',
      },
      {
        name: 'Web Audio API & DSP',
        category: 'systems-web',
        description: 'Procedural sound synthesis, audio node graphs, and Python digital frequency filtering.',
        proof: '<420ms Streaming Latency Pipeline',
        proofLink: 'https://github.com/SriniwasAwasthi/gemini-flow',
      },
      {
        name: 'Tailwind CSS v4',
        category: 'systems-web',
        description: 'Zero-runtime styling tokens, responsive grids, and dark-mode neon design systems.',
        proof: 'Production v4 Token Architecture',
        proofLink: 'https://github.com/SriniwasAwasthi/maison-noir-luxury-coffee',
      },
      {
        name: 'Canvas & 3D WebGL',
        category: 'systems-web',
        description: 'GPU-desynchronized canvas rendering, 150-frame flythrough engines, and Three.js.',
        proof: '60 FPS Canvas Flythrough Engine',
        proofLink: 'https://github.com/SriniwasAwasthi/solaria-luxury-estates',
      },
    ] as VerifiedSkill[],
  },
  {
    id: 'quality-tooling',
    title: 'Software Quality & Tooling',
    icon: ShieldCheck,
    description:
      'Production engineering discipline: automated testing suites, CI/CD pipelines, and defensive coding.',
    skills: [
      {
        name: 'Automated Testing',
        category: 'quality-tooling',
        description: 'Node Test Runner, Vitest unit tests, and regression prevention suites.',
        proof: 'Automated Test Suites in CI',
        proofLink: 'https://github.com/SriniwasAwasthi/portfolio',
      },
      {
        name: 'GitHub Actions CI/CD',
        category: 'quality-tooling',
        description: 'Automated build matrices, typechecking, linting gates, and continuous delivery.',
        proof: 'Automated Pre-Merge Quality Gates',
        proofLink: 'https://github.com/SriniwasAwasthi',
      },
      {
        name: 'Type-Safe Validation (Zod)',
        category: 'quality-tooling',
        description: 'Defensive schema boundaries verifying API payloads and external inputs.',
        proof: 'Structured JSON RPC Contracts',
        proofLink: 'https://github.com/SriniwasAwasthi/java-dsa-tracker',
      },
      {
        name: 'Git & Linux CLI',
        category: 'quality-tooling',
        description: 'Branch protection, interactive rebasing, atomic commits, and shell scripting.',
        proof: 'Clean Commit & PR History',
        proofLink: 'https://github.com/SriniwasAwasthi',
      },
    ] as VerifiedSkill[],
  },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  const filteredCategories =
    activeCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeCategory);

  return (
    <section
      id="skills"
      className="relative py-24 px-6 md:px-12 lg:px-24 border-t border-border/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal delay={0.1}>
          <div className="flex flex-col mb-12">
            <span className="text-xs font-bold tracking-widest text-[#39FF14] uppercase font-mono mb-2 neon-text-glow">
              02 // Technical Competencies
            </span>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
                Verified Technical Skills
              </h2>
              <div className="h-[1px] bg-[#39FF14]/20 flex-grow max-w-[200px] hidden sm:block" />
            </div>
            <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
              Concrete technical competencies backed by code repositories, algorithmic benchmarks, and automated CI verification—not self-certified labels.
            </p>
          </div>
        </Reveal>

        {/* Algorithmic Problem Solving Benchmark Banner (Mandate 7) */}
        <Reveal delay={0.15}>
          <div className="mb-12 p-6 md:p-8 rounded-2xl border-2 border-[#39FF14]/40 bg-[#060806]/90 backdrop-blur-md shadow-[0_0_30px_rgba(57,255,20,0.1)] relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#39FF14]/15 border border-[#39FF14]/40 text-[#39FF14] font-mono text-xs font-bold">
                    ALGORITHMIC ANCHOR
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    Competitive Programming &amp; DSA
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-extrabold text-foreground">
                  Algorithmic Foundations in Java &amp; C++
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  Daily focus on optimal time &amp; space complexities across <strong className="text-foreground">Trees, Graphs (BFS/DFS, Dijkstra), Dynamic Programming, Heaps, and Binary Search</strong>.
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <a
                  href="https://github.com/SriniwasAwasthi/java-dsa-tracker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#39FF14] text-[#030503] font-bold text-xs shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] hover:bg-[#7CFF6B] transition-all flex items-center gap-1.5"
                >
                  Inspect DSA Tracker
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/SriniwasAwasthi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-[#39FF14]/30 hover:border-[#39FF14] text-xs font-semibold text-foreground hover:text-[#39FF14] transition-all flex items-center gap-1.5"
                >
                  GitHub Profile
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Filter Controls */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-2.5 mb-10">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'relative px-5 py-2 rounded-full text-xs font-bold tracking-wide border transition-all duration-300 cursor-pointer select-none',
                activeCategory === 'all'
                  ? 'bg-[#39FF14] text-[#030503] font-black border-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.5)] scale-105'
                  : 'bg-[#060806]/90 text-slate-200 border-[#39FF14]/30 hover:border-[#39FF14] hover:text-[#39FF14] hover:bg-[#39FF14]/10',
              )}
            >
              All Competencies
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'relative px-5 py-2 rounded-full text-xs font-bold tracking-wide border transition-all duration-300 cursor-pointer select-none',
                  activeCategory === cat.id
                    ? 'bg-[#39FF14] text-[#030503] font-black border-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.5)] scale-105'
                    : 'bg-[#060806]/90 text-slate-200 border-[#39FF14]/30 hover:border-[#39FF14] hover:text-[#39FF14] hover:bg-[#39FF14]/10',
                )}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Skill Groups */}
        <motion.div layout className="space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => {
              const GroupIcon = cat.icon;

              return (
                <motion.div
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="border border-[#39FF14]/20 bg-[#060806]/80 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-[0_0_20px_rgba(57,255,20,0.05)]"
                >
                  {/* Category Title */}
                  <div className="flex items-center gap-3 mb-2 pb-4 border-b border-[#39FF14]/20">
                    <GroupIcon className="w-5 h-5 text-[#39FF14]" />
                    <h3 className="font-heading font-bold text-lg text-foreground">{cat.title}</h3>
                  </div>
                  {/* Category Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {cat.skills.map((skill) => {
                      return (
                        <div
                          key={skill.name}
                          className="flex flex-col justify-between p-5 rounded-xl border border-[#39FF14]/20 bg-[#090B09]/80 transition-all duration-300 hover:border-[#39FF14]/60 hover:bg-[#060806] hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(57,255,20,0.15)] group"
                        >
                          <div>
                            {/* Skill Header */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-[#39FF14] transition-colors">
                                {skill.name}
                              </h4>
                            </div>
                            {/* Description */}
                            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                              {skill.description}
                            </p>
                          </div>

                          {/* Concrete Evidence Proof Line (Replaced Competency Verified) */}
                          <div className="pt-3 border-t border-[#39FF14]/15">
                            {skill.proofLink ? (
                              <a
                                href={skill.proofLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between text-[11px] font-mono text-[#39FF14] hover:underline"
                              >
                                <span className="truncate pr-1">Evidence: {skill.proof}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                              </a>
                            ) : (
                              <div className="flex items-center gap-1 text-[11px] font-mono text-[#39FF14]">
                                <Check className="w-3 h-3 text-[#39FF14] shrink-0" />
                                <span className="truncate">Evidence: {skill.proof}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
