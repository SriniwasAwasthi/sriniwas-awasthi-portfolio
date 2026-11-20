'use client';

import * as React from 'react';
import { Brain, Cpu, Workflow, MessageSquare, Terminal, Eye } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

const aiInterests = [
  {
    title: 'Language Models',
    description:
      'Exploring prompt engineering, model behavior, structured outputs, and practical AI applications.',
    icon: MessageSquare,
    badge: 'Core Interest',
  },
  {
    title: 'Intelligent Agents',
    description:
      'Building AI systems that can reason, automate tasks, and interact with real-world tools.',
    icon: Brain,
    badge: 'Active Coding',
  },
  {
    title: 'Automation',
    description:
      'Connecting APIs, databases, and intelligent workflows to reduce repetitive work and improve productivity.',
    icon: Workflow,
    badge: 'Tool Integration',
  },
  {
    title: 'AI-Assisted Development',
    description:
      'Using AI to prototype faster, write cleaner code, and improve development efficiency while maintaining engineering quality.',
    icon: Cpu,
    badge: 'Developer Productivity',
  },
];

export function AIEcosystem() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-card/10 border-t border-border/20 overflow-hidden">
      {/* Absolute floating glow shape */}
      <div className="absolute right-0 top-1/4 w-[30rem] h-[30rem] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal delay={0.1}>
          <div className="flex flex-col mb-16">
            <span className="text-xs font-bold tracking-widest text-[#39FF14] uppercase font-mono mb-2 neon-text-glow">
              03 // Applied AI Workflows
            </span>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
                Applied AI &amp; Intelligent Workflows
              </h2>
              <div className="h-[1px] bg-[#39FF14]/20 flex-grow max-w-[200px] hidden sm:block" />
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mt-4 leading-relaxed font-sans">
              Focusing on applied AI engineering: structured JSON-Schema RPC contracts, streaming SSE pipelines, and automated tool integrations that enhance developer and user workflows.
            </p>
          </div>
        </Reveal>

        {/* AI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {aiInterests.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === index;

            return (
              <Reveal key={item.title} delay={0.15 * (index + 1)}>
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`p-6 md:p-8 rounded-xl border border-border/60 bg-card/30 backdrop-blur-sm transition-all duration-300 relative group cursor-default overflow-hidden ${
                    isHovered
                      ? 'border-primary/30 bg-card/65 shadow-md shadow-primary/5'
                      : 'hover:border-border'
                  }`}
                >
                  {/* Glowing background highlights */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent transition-opacity duration-500 pointer-events-none ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`p-3 rounded-lg border transition-colors ${
                        isHovered
                          ? 'bg-primary/10 border-primary/20 text-primary'
                          : 'bg-secondary/40 border-border/60 text-muted-foreground'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-secondary/80 text-muted-foreground border border-border/30">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
