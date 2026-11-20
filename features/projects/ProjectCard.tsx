'use client';

import * as React from 'react';
import { ArrowUpRight, FolderOpen, Star, GitFork, Calendar, Github, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ArchitectureDecisionRecord, WarStory, TelemetryMatrix, TestingHygiene } from '@/types';

export interface DynamicProject {
  id: string;
  name: string;
  displayName: string;
  summary: string;
  language: string;
  langColor: string;
  stars: number;
  forks: number;
  updatedAt: string;
  rawDate: string;
  githubUrl: string;
  tech: string[];
  coverColor: string;
  problem?: string;
  solution?: string;
  features?: string[];
  learnings?: string;
  future?: string[];
  videoUrl?: string;
  videoDuration?: string;
  adr?: ArchitectureDecisionRecord;
  warStory?: WarStory;
  telemetry?: TelemetryMatrix;
  testingHygiene?: TestingHygiene;
}

interface ProjectCardProps {
  project: DynamicProject;
  onOpenDetails: (project: DynamicProject) => void;
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  return (
    <div
      onClick={() => onOpenDetails(project)}
      className="group flex flex-col justify-between p-6 rounded-xl border border-[#39FF14]/20 bg-[#060806]/80 hover:bg-[#060806] hover:border-[#39FF14]/60 transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.08)] hover:shadow-[0_0_35px_rgba(57,255,20,0.25)] cursor-pointer relative backdrop-blur-md"
    >
      {/* Top Color Accent */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-all duration-300 opacity-70 group-hover:opacity-100 shadow-[0_0_10px_#39FF14]',
          project.coverColor,
        )}
      />

      <div>
        {/* Header: Folder Icon + External GitHub & Arrow icons */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-[#39FF14]/10 text-[#39FF14] group-hover:bg-[#39FF14]/20 transition-colors">
            <FolderOpen className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-md text-muted-foreground hover:text-[#39FF14] hover:bg-[#39FF14]/10 transition-colors"
              title="View Source Code on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <div className="text-muted-foreground group-hover:text-[#39FF14] transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-[#39FF14] transition-colors line-clamp-1">
          {project.displayName}
        </h3>

        {/* Summary / Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
          {project.summary}
        </p>
      </div>

      <div>
        {/* Meta Info: Primary Language, Stars, Last Updated */}
        <div className="flex items-center justify-between gap-2 mb-4 pt-3 border-t border-border/20 text-xs font-mono">
          {/* Primary Language */}
          <div className="flex items-center gap-1.5">
            <span className={cn('w-2.5 h-2.5 rounded-full', project.langColor)} />
            <span className="text-foreground/90 font-medium">{project.language}</span>
          </div>

          {/* Stars & Date */}
          <div className="flex items-center gap-3 text-muted-foreground text-[11px]">
            {project.stars > 0 && (
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                {project.stars}
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                {project.forks}
              </span>
            )}
            <span className="flex items-center gap-1 text-muted-foreground/80">
              <Calendar className="w-3 h-3" />
              {project.updatedAt}
            </span>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, 3).map((item) => (
            <span
              key={item}
              className="text-[9px] font-semibold bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30 px-2 py-0.5 rounded"
            >
              {item}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[9px] font-semibold text-muted-foreground px-1.5 py-0.5">
              +{project.tech.length - 3} more
            </span>
          )}
        </div>

        {/* Architectural Pillars Available Badges */}
        {(project.adr || project.warStory || project.telemetry || project.testingHygiene) && (
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {project.adr && (
              <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30">
                ADR
              </span>
            )}
            {project.warStory && (
              <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
                War Story
              </span>
            )}
            {project.telemetry && (
              <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Telemetry
              </span>
            )}
            {project.testingHygiene && (
              <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Defense
              </span>
            )}
          </div>
        )}

        {/* Case Study Callout */}
        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-[#39FF14] uppercase opacity-90 group-hover:opacity-100 group-hover:underline decoration-1 transition-all">
            <Code2 className="w-3 h-3" />
            View Project Details
          </span>
        </div>
      </div>
    </div>
  );
}
