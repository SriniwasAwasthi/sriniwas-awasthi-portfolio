'use client';

import * as React from 'react';
import { Circle, Terminal, GitBranch, BrainCircuit, Target, Code } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import { motion } from 'framer-motion';

import { journeyData } from '@/content/journey';
import type { JourneyNode } from '@/content/journey';

const iconMap = { Terminal, Code, BrainCircuit, Target, Rocket: Target, GitBranch };

export function JourneyTimeline() {
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);

  return (
    <section
      id="journey"
      className="relative py-24 px-6 md:px-12 lg:px-24 border-t border-border/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal delay={0.1}>
          <div className="flex flex-col mb-16">
            <span className="text-xs font-bold tracking-widest text-[#39FF14] uppercase font-mono mb-2 neon-text-glow">
              08 // Engineering Journey
            </span>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
                Journey
              </h2>
              <div className="h-[1px] bg-[#39FF14]/20 flex-grow max-w-[200px] hidden sm:block" />
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mt-4 leading-relaxed">
              A roadmap of where I started, what I&apos;m building now, and where I&apos;m headed.
            </p>
          </div>
        </Reveal>

        {/* Vertical Timeline Nodes */}
        <div className="relative border-l border-[#39FF14]/30 ml-6 pl-8 space-y-12 py-4 max-w-3xl mx-auto">
          {journeyData.map((node, idx) => {
            const NodeIcon = iconMap[node.iconName];

            const isHovered = hoveredNode === node.id;

            return (
              <div
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="relative group/timeline-node"
              >
                {/* Node Dot / Marker */}
                <div
                  className={`absolute -left-[45px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${node.accentClass} ${
                    isHovered ? 'scale-110 shadow-[0_0_20px_#39FF14]' : ''
                  }`}
                >
                  <NodeIcon className="w-4 h-4" />
                </div>

                {/* Card Container */}
                <Reveal delay={0.1 * (idx + 1)}>
                  <div
                    className={`p-6 rounded-xl border border-[#39FF14]/20 bg-[#060806]/80 backdrop-blur-md transition-all duration-300 cursor-default ${
                      isHovered
                        ? 'border-[#39FF14]/60 bg-[#060806] shadow-[0_0_30px_rgba(57,255,20,0.25)]'
                        : 'hover:border-[#39FF14]/40'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground">
                        {node.stage}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest text-[#39FF14] bg-[#39FF14]/10 border border-[#39FF14]/30 px-2 py-0.5 rounded uppercase">
                        Stage {idx + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-heading font-bold text-foreground mb-2 group-hover/timeline-node:text-[#39FF14] transition-colors">
                      {node.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                      {node.description}
                    </p>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {node.skills.map((s) => (
                        <span
                          key={s}
                          className="text-[9px] font-semibold bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30 px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
