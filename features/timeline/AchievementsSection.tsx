'use client';

import * as React from 'react';
import {
  Award,
  Trophy,
  Bookmark,
  GitPullRequest,
  FileText,
  ChevronRight,
  Star,
  Mic,
  Globe,
} from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import { achievements, achievementPlaceholders } from '@/content/achievements';

const iconMap = {
  Trophy,
  Award,
  Star,
  Medal: Award,
  Bookmark,
  GitPullRequest,
  FileText,
  Mic,
  Globe,
};

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="relative py-24 px-6 md:px-12 lg:px-24 border-t border-border/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal delay={0.1}>
          <div className="flex flex-col mb-16">
            <span className="text-xs font-bold tracking-widest text-[#39FF14] uppercase font-mono mb-2 neon-text-glow">
              06 // Milestones &amp; Honors
            </span>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
                Achievements
              </h2>
              <div className="h-[1px] bg-border flex-grow max-w-[200px] hidden sm:block" />
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Achievements cards */}
          <div className="lg:col-span-7 space-y-6">
            {achievements.map((item, idx) => {
              const Icon = iconMap[item.iconName];
              return (
                <Reveal key={item.title} delay={0.15 + idx * 0.1}>
                  <div className="p-6 rounded-xl border border-border/60 bg-card/30 backdrop-blur-sm flex gap-4 md:gap-6 hover:border-primary/20 hover:bg-card/50 transition-all duration-300 group">
                    <div className="p-3.5 rounded-xl bg-primary/5 dark:bg-primary/10 text-primary shrink-0 h-fit group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-primary bg-primary/5 dark:bg-primary/10 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">{item.date}</span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        {item.level}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Placeholders / Future targets */}
          <div className="lg:col-span-5 space-y-5">
            <Reveal delay={0.25}>
              <div className="p-6 rounded-xl border border-border/60 bg-card/10 backdrop-blur-sm space-y-6">
                <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase font-heading">
                  Vision & Growth
                </h3>

                <div className="space-y-4">
                  {achievementPlaceholders.map((item) => {
                    const PlaceIcon = iconMap[item.iconName];
                    return (
                      <div key={item.label} className="flex gap-3.5 items-start group">
                        <div className="p-2 rounded-lg bg-secondary/50 text-muted-foreground group-hover:text-primary transition-colors mt-0.5">
                          <PlaceIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-foreground flex items-center gap-1">
                            {item.label}
                            <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
