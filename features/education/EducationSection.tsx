'use client';

import * as React from 'react';
import { GraduationCap, BookOpen, Calendar, Circle, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

import { coursework, nowLearning } from '@/content/education';

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-card/10 border-t border-border/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal delay={0.1}>
          <div className="flex flex-col mb-16">
            <span className="text-xs font-bold tracking-widest text-[#39FF14] uppercase font-mono mb-2 neon-text-glow">
              07 // Academic Journey
            </span>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
                Education
              </h2>
              <div className="h-[1px] bg-border flex-grow max-w-[200px] hidden sm:block" />
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Block - Academic Background & Coursework */}
          <div className="lg:col-span-6 space-y-8">
            <Reveal delay={0.15}>
              <div className="p-6 md:p-8 rounded-xl border border-border/60 bg-card/30 backdrop-blur-sm relative overflow-hidden group">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary/40 rounded-t-xl" />

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/5 dark:bg-primary/10 text-primary">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-primary">
                        Bachelor of Engineering
                      </span>
                      <h3 className="text-lg md:text-xl font-heading font-bold text-foreground mt-0.5">
                        Computer Science Engineering
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Currently focused on software development, system design, algorithms,
                      databases, artificial intelligence, and modern web technologies.
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>2024 &mdash; 2028 (Expected)</span>
                    </div>
                  </div>
                </div>

                {/* Coursework List */}
                <div className="mt-8 border-t border-border/40 pt-6">
                  <h4 className="text-xs font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-1.5 font-heading mb-4">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Key Completed Coursework
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-muted-foreground pl-1">
                    {coursework.map((course) => (
                      <li key={course} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Block - Currently Learning (Now) Module */}
          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <div className="p-6 md:p-8 rounded-xl border border-border/60 bg-card/30 backdrop-blur-sm relative overflow-hidden group">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500/40 rounded-t-xl" />

                <div className="flex items-center gap-2 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase font-heading">
                    Current Focus
                  </h3>
                </div>

                <div className="space-y-4">
                  {nowLearning.map((item) => (
                    <div
                      key={item.topic}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border/40 bg-secondary/15 hover:border-emerald-500/20 hover:bg-card/50 transition-all duration-300 group"
                    >
                      <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-heading font-bold text-foreground">
                          {item.topic}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-muted-foreground font-mono mt-0.5">
                          {item.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
