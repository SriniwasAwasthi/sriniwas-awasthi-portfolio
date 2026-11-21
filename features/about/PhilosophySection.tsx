'use client';

import * as React from 'react';
import { Lightbulb, Compass, Award, ShieldCheck, Heart } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import Stack from '@/components/ui/Stack';

export function PhilosophySection() {
  const cards = [
    {
      id: 'working-code',
      title: 'Working Code > Clever Code',
      icon: ShieldCheck,
      content:
        'Write code for the next engineer debugging production at 2 AM. Prioritize readable, explicit flow over dense, unreadable one-liners and premature optimization.',
    },
    {
      id: 'strict-types',
      title: 'Strict Types & Schema Boundaries',
      icon: Compass,
      content:
        'Never trust raw data across network or user boundaries. Enforce strict runtime validation with Zod/Pydantic so edge cases fail at compile time—not in front of users.',
    },
    {
      id: 'measure-first',
      title: 'Measure Before Optimizing',
      icon: Award,
      content:
        'Never guess performance bottlenecks. Profile CPU flamegraphs, measure network waterfalls, and benchmark tail latency (p95/p99) before changing a single line of code.',
    },
    {
      id: 'failure-modes',
      title: 'Design for Failure Modes First',
      icon: Lightbulb,
      content:
        'System reliability is defined by how software behaves when things break. Build offline fallbacks, graceful degradation, and idempotent retries into every service.',
    },
  ];

  return (
    <section
      id="philosophy"
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-card/10 border-t border-border/20 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute right-0 top-1/4 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-[#39FF14]/8 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Section Header */}
        <Reveal delay={0.1}>
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold tracking-widest text-[#39FF14] uppercase font-mono mb-2 neon-text-glow">
              09 // Beyond Code &amp; Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
              Personal Philosophy
            </h2>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              (Drag or click cards to cycle through my mindset)
            </p>
          </div>
        </Reveal>

        {/* Stack Container with Mobile-Adaptive Sizing */}
        <div className="w-full max-w-xl mx-auto h-[310px] sm:h-[280px] md:h-[260px] relative py-4">
          <Stack
            randomRotation={true}
            sensitivity={150}
            sendToBackOnClick={true}
            mobileClickOnly={true}
            autoplay={false}
            cards={cards.map((card, index) => (
              <div
                key={card.id}
                className="w-full h-full bg-[#060806] border-2 border-[#39FF14]/40 hover:border-[#39FF14] backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-[0_0_30px_rgba(57,255,20,0.15)] flex flex-col justify-between text-left select-none cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="p-3.5 rounded-xl bg-[#39FF14]/10 text-[#39FF14] shrink-0 border border-[#39FF14]/30 shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                    <card.icon className="w-7 h-7 text-[#39FF14]" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-heading font-extrabold text-xl md:text-2xl text-foreground group-hover:text-[#39FF14] transition-colors duration-200">
                        {card.title}
                      </h3>
                      <span className="text-xs font-mono text-[#39FF14] bg-[#39FF14]/10 px-2.5 py-0.5 rounded-full border border-[#39FF14]/30 font-bold">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-sans">
                      {card.content}
                    </p>
                  </div>
                </div>
                <div className="pt-2 text-[11px] font-mono text-[#39FF14] opacity-80 flex items-center gap-1">
                  <span>✦ Click or drag card to send to back</span>
                </div>
              </div>
            ))}
          />
        </div>

        {/* Small personal closing quote */}
        <Reveal delay={0.35}>
          <div className="pt-6 border-t border-[#39FF14]/20 flex flex-col items-center gap-2 text-muted-foreground">
            <Heart className="w-5 h-5 text-[#39FF14] fill-[#39FF14]" />
            <p className="text-xs font-mono italic">
              &quot;Curiosity, discipline, and execution.&quot;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
