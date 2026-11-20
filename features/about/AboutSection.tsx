'use client';

import * as React from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/animations/Reveal';
import { Cpu, Code2, ShieldCheck, Terminal, GitBranch, ArrowUpRight } from 'lucide-react';

const engineeringPillars = [
  {
    title: 'Concurrency & Audio DSP',
    description:
      'Designing non-blocking async pipelines, Web Audio API DSP synthesis, and concurrent React 19 UI state machines without frame drops.',
    metric: '60 FPS UI · <420ms Latency',
    icon: Cpu,
  },
  {
    title: 'Algorithmic Problem Solving',
    description:
      'Designing algorithmic solutions in Java and C++ with strict asymptotic Big-O bounds, invariant verification, and optimal space complexity.',
    metric: 'Asymptotic Big-O Bounds',
    icon: Code2,
  },
  {
    title: 'Defensive Architecture & Contracts',
    description:
      'Zero loose "any" types, explicit Zod runtime schema boundaries, and normalized relational SQLite/PostgreSQL database schemas.',
    metric: 'Strict Types · Validated RPC',
    icon: ShieldCheck,
  },
  {
    title: 'CI/CD & Automated Verification',
    description:
      'Unit testing suites, pre-commit hygiene with Husky and lint-staged, and automated GitHub Actions verification workflows before merging.',
    metric: 'Automated CI Gates · Test-Driven',
    icon: Terminal,
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-secondary/10 dark:bg-transparent border-t border-border/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal delay={0.1}>
          <div className="flex flex-col mb-16">
            <span className="text-xs font-bold tracking-widest text-[#39FF14] uppercase font-mono mb-2 neon-text-glow">
              01 // Engineering Profile
            </span>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
                Engineering Discipline &amp; Systems
              </h2>
              <div className="h-[1px] bg-[#39FF14]/20 flex-grow max-w-[200px] hidden sm:block" />
            </div>
          </div>
        </Reveal>

        {/* Narrative & Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Crisp Profile & Avatar */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal delay={0.15}>
              <div className="p-6 md:p-8 rounded-2xl border border-[#39FF14]/30 bg-[#060806]/80 backdrop-blur-md shadow-[0_0_30px_rgba(57,255,20,0.08)] relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                  <div className="relative w-28 h-28 shrink-0 rounded-2xl overflow-hidden border-2 border-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.3)] bg-[#030503]">
                    <Image
                      src="/sriniwas-awasthi.jpeg"
                      alt="Sriniwas Awasthi - Software Engineer"
                      width={112}
                      height={112}
                      priority
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-extrabold text-foreground">
                      Sriniwas Awasthi
                    </h3>
                    <p className="text-xs font-mono text-[#39FF14] mt-1 font-bold">
                      Full-Stack Software Engineer
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      P.D.A College of Engineering, Kalaburagi
                    </p>
                  </div>
                </div>

                {/* The 3-Sentence Engineering Profile */}
                <p className="text-sm text-foreground/90 leading-relaxed font-sans mb-4">
                  I am a Full-Stack Software Engineer building high-performance web systems, Java &amp; C++ algorithmic tools, and applied AI workflows.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-4">
                  Currently pursuing Computer Science &amp; Engineering at P.D.A College of Engineering, my technical focus centers on concurrent UI state, audio DSP filtering, and relational database integrity.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  When not architecting web platforms, I solve daily competitive programming problems with verified test suites and strict asymptotic guarantees.
                </p>

                <div className="mt-6 pt-6 border-t border-[#39FF14]/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Algorithmic Problem Solving</span>
                  <a
                    href="https://github.com/SriniwasAwasthi/java-dsa-tracker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#39FF14] hover:underline flex items-center gap-1 font-bold"
                  >
                    View Solutions <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 4 Real Engineering Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {engineeringPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="p-6 rounded-2xl border border-[#39FF14]/20 bg-[#060806]/90 backdrop-blur-md hover:border-[#39FF14]/60 transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.05)] flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 rounded-xl bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono text-[#39FF14] bg-[#39FF14]/10 px-2 py-0.5 rounded border border-[#39FF14]/20 font-bold">
                            0{idx + 1}
                          </span>
                        </div>
                        <h3 className="font-heading font-extrabold text-base text-foreground mb-2 group-hover:text-[#39FF14] transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed font-sans mb-4">
                          {pillar.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#39FF14]/20 flex items-center justify-between text-[11px] font-mono text-[#39FF14]">
                        <span>Metric:</span>
                        <span className="font-bold">{pillar.metric}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Engineering Discipline Commitment */}
            <Reveal delay={0.35}>
              <div className="p-6 rounded-2xl border border-[#39FF14]/20 bg-[#060806]/80 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-3">
                  <GitBranch className="w-5 h-5 text-[#39FF14]" />
                  <h3 className="font-heading font-bold text-sm text-foreground">
                    Software Quality &amp; Production Philosophy
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Clean code is defined by clarity, maintainability, and measurable resilience under edge cases. Every production module incorporates type safety, automated tests, clean git commits, and benchmarked execution speed.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
