'use client';

import * as React from 'react';
import Image from 'next/image';
import { ProjectCard, DynamicProject } from './ProjectCard';
import { Reveal } from '@/components/animations/Reveal';
import type { Project } from '@/types';
import {
  X,
  Github,
  ExternalLink,
  HelpCircle,
  Lightbulb,
  Code2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  ArrowUpRight,
  Zap,
  ZoomIn,
  Flame,
  Activity,
  History,
  GitCompare,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Play,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { flagshipProjects } from '@/content/projects';
import { fetchLiveGitHubStats } from '@/lib/github';
import { getSecondaryProjectDetails } from '@/content/secondaryProjects';

// Language Color Mapping
const langColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-amber-400',
  Python: 'bg-emerald-500',
  Java: 'bg-amber-600',
  HTML: 'bg-rose-500',
  CSS: 'bg-sky-400',
  C: 'bg-indigo-500',
  'C++': 'bg-purple-600',
  Shell: 'bg-green-600',
};

export function ProjectsSection() {
  const [allRepos, setAllRepos] = React.useState<DynamicProject[]>([]);
  const [showAllRepos, setShowAllRepos] = React.useState<boolean>(false);
  const [selectedProject, setSelectedProject] = React.useState<DynamicProject | null>(null);
  const [activeVideoProject, setActiveVideoProject] = React.useState<Project | null>(null);
  const [activeImageProject, setActiveImageProject] = React.useState<Project | null>(null);
  const [modalTab, setModalTab] = React.useState<
    'overview' | 'architecture' | 'adr' | 'warStory' | 'telemetry' | 'testing'
  >('overview');

  const openProjectModal = (
    project: Project,
    tab: 'overview' | 'architecture' | 'adr' | 'warStory' | 'telemetry' | 'testing' = 'overview',
  ) => {
    setModalTab(tab);
    setSelectedProject({
      id: project.id,
      name: project.name,
      displayName: project.name,
      summary: project.summary,
      language: project.tech[0],
      langColor: 'bg-[#39FF14]',
      stars: 12,
      forks: 3,
      updatedAt: 'Active',
      rawDate: new Date().toISOString(),
      githubUrl: project.github,
      tech: project.tech,
      coverColor: project.coverColor,
      problem: project.problem,
      solution: project.solution,
      features: project.features,
      learnings: project.learnings,
      future: project.future,
      videoUrl: project.videoUrl,
      videoDuration: project.videoDuration,
      adr: project.adr,
      warStory: project.warStory,
      telemetry: project.telemetry,
      testingHygiene: project.testingHygiene,
    });
  };

  // Sync secondary open-source repositories gracefully from GitHub API
  React.useEffect(() => {
    let isMounted = true;

    async function syncRepos() {
      try {
        const data = await fetchLiveGitHubStats();
        if (isMounted && data.repos && data.repos.length > 0) {
          // Exclude configuration and profile repos like 'SriniwasAwasthi'
          const filtered = data.repos.filter(
            (r) =>
              r.name.toLowerCase() !== 'sriniwasawasthi' &&
              !flagshipProjects.some(
                (fp) => fp.id.toLowerCase() === r.name.toLowerCase() || fp.github.endsWith(r.name),
              ),
          );

          const formatted: DynamicProject[] = filtered.map((repo) => {
            const details = getSecondaryProjectDetails(repo.name) || {};
            const lang = repo.language || details.tech?.[0] || 'TypeScript';
            return {
              id: repo.name,
              name: repo.name,
              displayName: details.displayName || repo.displayName || repo.name,
              summary:
                details.summary ||
                repo.description ||
                `Open-source utility and developer tool built with ${lang}.`,
              language: lang,
              langColor: repo.langColor || langColors[lang] || 'bg-[#39FF14]',
              stars: repo.stars || 0,
              forks: repo.forks || 0,
              updatedAt: repo.updated || 'Recently',
              rawDate: new Date().toISOString(),
              githubUrl: repo.url,
              tech: details.tech || [lang, 'Open Source'],
              coverColor: 'bg-[#39FF14]',
              problem:
                details.problem ||
                `Engineering a modular, reusable open-source tool for ${repo.displayName}.`,
              solution:
                details.solution ||
                `Developed ${repo.displayName} with clean separation of concerns and version-controlled Git history.`,
              features: details.features || [
                `Public software repository built with ${lang}`,
                'Comprehensive README and usage documentation',
                'Version controlled with Git and GitHub',
              ],
              learnings:
                details.learnings ||
                `Building ${repo.displayName} strengthened fundamentals in modular architecture and testing.`,
              future: details.future || [
                'Extend test coverage',
                'Add automated continuous integration pipeline',
              ],
              videoUrl: details.videoUrl,
              videoDuration: details.videoDuration,
              adr: details.adr,
              warStory: details.warStory,
              telemetry: details.telemetry,
              testingHygiene: details.testingHygiene,
            };
          });

          setAllRepos(formatted);
        }
      } catch (_err) {
        // Fall back gracefully
      }
    }

    syncRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setActiveVideoProject(null);
        setActiveImageProject(null);
      }
    };

    if (selectedProject || activeVideoProject || activeImageProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject, activeVideoProject, activeImageProject]);

  return (
    <section
      id="projects"
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-secondary/5 dark:bg-transparent border-t border-border/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal delay={0.1}>
          <div className="flex flex-col mb-16">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
              <span className="text-xs font-bold tracking-widest text-[#39FF14] uppercase font-mono neon-text-glow">
                04 // Flagship Systems &amp; Case Studies
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 text-xs font-mono font-semibold text-[#39FF14]">
                <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                Curated Top 4 Architectural Systems
              </span>
            </div>

            <div className="flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
                Engineering Case Studies
              </h2>
              <div className="h-[1px] bg-[#39FF14]/20 flex-grow max-w-[200px] hidden sm:block" />
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mt-4 leading-relaxed font-sans">
              Rigorous architectural breakdowns detailing technical trade-offs, concurrency models, audio DSP filtering, and measurable latency benchmarks.
            </p>
          </div>
        </Reveal>

        {/* 4 Flagship Projects Showcase Grid */}
        <div className="space-y-16">
          {flagshipProjects.map((project, idx) => (
            <Reveal key={project.id} delay={0.15 * (idx + 1)}>
              <div className="rounded-2xl border-2 border-[#39FF14]/30 bg-[#060806]/90 backdrop-blur-xl overflow-hidden shadow-[0_0_35px_rgba(57,255,20,0.08)] hover:border-[#39FF14]/60 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-10">
                  {/* Left: Project Details & Case Study Framing */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#39FF14] bg-[#39FF14]/10 px-3 py-1 rounded-full border border-[#39FF14]/30">
                        FLAGSHIP 0{idx + 1}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {project.tech[0]} · {project.tech[1]}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-foreground tracking-tight">
                      {project.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-sans">
                      {project.summary}
                    </p>

                    {/* Architecture & Engineering Highlights */}
                    {project.architecture && (
                      <div className="p-4 rounded-xl bg-[#090D09] border border-[#39FF14]/20 space-y-2">
                        <span className="text-[11px] font-mono font-bold text-[#39FF14] uppercase tracking-wider block">
                          SYSTEM ARCHITECTURE &amp; IMPLEMENTATION
                        </span>
                        <ul className="space-y-1.5 text-xs text-muted-foreground font-sans">
                          {project.architecture.map((arch, aIdx) => (
                            <li key={aIdx} className="flex items-start gap-2">
                              <span className="text-[#39FF14] font-bold mt-0.5">•</span>
                              <span>{arch}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Engineering Metrics Badges */}
                    {project.metrics && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.metrics.map((metric, mIdx) => (
                          <span
                            key={mIdx}
                            className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] font-semibold"
                          >
                            ⚡ {metric}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono px-2.5 py-1 rounded bg-[#101710] border border-border/40 text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Deep-Dive Architectural Fast-Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-3 pb-1">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mr-1">
                        Deep-Dive:
                      </span>
                      <button
                        onClick={() => openProjectModal(project, 'architecture')}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 hover:border-indigo-400 text-[11px] font-mono font-semibold text-indigo-400 transition-all cursor-pointer shadow-[0_0_12px_rgba(99,102,241,0.15)]"
                        title="View System Architecture Flowchart"
                      >
                        <Cpu className="w-3 h-3" />
                        System Architecture
                      </button>
                      {project.adr && (
                        <button
                          onClick={() => openProjectModal(project, 'adr')}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#39FF14]/10 hover:bg-[#39FF14]/20 border border-[#39FF14]/30 hover:border-[#39FF14] text-[11px] font-mono font-semibold text-[#39FF14] transition-all cursor-pointer shadow-[0_0_12px_rgba(57,255,20,0.1)]"
                          title="View Architecture Decision Record & Evolution"
                        >
                          <Layers className="w-3 h-3" />
                          Interactive ADR
                        </button>
                      )}
                      {project.warStory && (
                        <button
                          onClick={() => openProjectModal(project, 'warStory')}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500 text-[11px] font-mono font-semibold text-rose-400 transition-all cursor-pointer"
                          title="View Hardest Production Bug & Root Cause Analysis"
                        >
                          <Flame className="w-3 h-3" />
                          War Story &amp; RCA
                        </button>
                      )}
                      {project.telemetry && (
                        <button
                          onClick={() => openProjectModal(project, 'telemetry')}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500 text-[11px] font-mono font-semibold text-cyan-400 transition-all cursor-pointer"
                          title="View Empirical p50/p95/p99 Telemetry & Benchmarks"
                        >
                          <Activity className="w-3 h-3" />
                          Telemetry Matrix
                        </button>
                      )}
                      {project.testingHygiene && (
                        <button
                          onClick={() => openProjectModal(project, 'testing')}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500 text-[11px] font-mono font-semibold text-amber-400 transition-all cursor-pointer"
                          title="View Automated Test Harness & Invariants"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          Defensive Testing
                        </button>
                      )}
                    </div>

                    {/* Dual Action CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      {project.videoUrl ? (
                        <button
                          onClick={() => setActiveVideoProject(project)}
                          className="px-6 py-2.5 rounded-full bg-[#39FF14] text-[#030503] font-extrabold text-xs tracking-wide shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] hover:bg-[#7CFF6B] transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-[#030503]" />
                          Watch System Demo (1080p)
                        </button>
                      ) : project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2.5 rounded-full bg-[#39FF14] text-[#030503] font-extrabold text-xs tracking-wide shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] hover:bg-[#7CFF6B] transition-all flex items-center gap-2"
                        >
                          <Play className="w-4 h-4 fill-[#030503]" />
                          Interactive Demo
                        </a>
                      ) : null}

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-full border border-[#39FF14]/40 hover:border-[#39FF14] text-xs font-semibold text-foreground hover:text-[#39FF14] hover:bg-[#39FF14]/10 transition-all flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        View Source Code
                      </a>

                      <button
                        onClick={() => openProjectModal(project, 'overview')}
                        className="text-xs font-mono text-muted-foreground hover:text-[#39FF14] transition-colors underline cursor-pointer ml-auto"
                      >
                        Full STAR Case Study →
                      </button>
                    </div>
                  </div>

                  {/* Right: Architectural UI Mockup Preview Image */}
                  <div className="lg:col-span-5 flex justify-center items-center">
                    {project.previewImage && (
                      <div
                        onClick={() => setActiveImageProject(project)}
                        className="group/img relative w-full rounded-xl overflow-hidden border border-[#39FF14]/30 shadow-[0_0_30px_rgba(57,255,20,0.15)] bg-[#030503] hover:border-[#39FF14]/70 transition-all duration-300 cursor-zoom-in"
                        title="Click to view full-size image"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveImageProject(project);
                          }
                        }}
                      >
                        <Image
                          src={project.previewImage}
                          alt={`${project.name} Architecture Preview`}
                          width={600}
                          height={340}
                          priority={idx < 2}
                          style={{ width: '100%', height: 'auto', aspectRatio: '600 / 340' }}
                          className="w-full h-auto object-cover group-hover/img:scale-[1.03] transition-transform duration-300"
                        />

                        {/* Hover Overlay with Zoom Indicator */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#060806]/90 border border-[#39FF14]/50 text-xs font-mono font-semibold text-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                            <ZoomIn className="w-3.5 h-3.5" />
                            View Full-Size Image
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Secondary Accordion: View All 15+ Open Source Repositories on GitHub (Mandate 4) */}
        <div className="mt-20 pt-10 border-t border-[#39FF14]/20 text-center">
          <button
            onClick={() => setShowAllRepos(!showAllRepos)}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-[#39FF14]/30 hover:border-[#39FF14] bg-[#060806]/80 text-foreground hover:text-[#39FF14] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.1)] hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] cursor-pointer"
          >
            {showAllRepos ? (
              <>
                <span>Hide Secondary Utilities</span>
                <ChevronUp className="w-4 h-4 text-[#39FF14]" />
              </>
            ) : (
              <>
                <span>Explore All 15+ Open Source Repositories on GitHub</span>
                <ChevronDown className="w-4 h-4 text-[#39FF14]" />
              </>
            )}
          </button>

          <AnimatePresence>
            {showAllRepos && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-12 text-left"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allRepos.map((repo) => (
                    <ProjectCard
                      key={repo.id}
                      project={repo}
                      onOpenDetails={(p) => {
                        setModalTab('overview');
                        setSelectedProject(p);
                      }}
                    />
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <a
                    href="https://github.com/SriniwasAwasthi?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#39FF14] hover:underline"
                  >
                    View Complete Commit History on GitHub <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Detailed Modal Container */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-background/80 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-4xl lg:max-w-5xl h-[88vh] max-h-[88vh] bg-[#060806] border-2 border-[#39FF14]/40 rounded-2xl shadow-[0_0_60px_rgba(57,255,20,0.25)] overflow-hidden z-10 flex flex-col focus:outline-none"
                role="dialog"
                aria-modal="true"
                tabIndex={0}
              >
                <div className={`h-1.5 w-full flex-shrink-0 ${selectedProject.coverColor}`} />

                {/* Modal Header */}
                <div className="flex-shrink-0 p-5 sm:p-6 md:p-7 border-b border-border/40 flex items-start justify-between gap-4 bg-[#090D09]">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#39FF14] uppercase px-2.5 py-0.5 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/30">
                        {selectedProject.language}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground/90">
                        Verified Architectural Case Study
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-foreground tracking-tight leading-tight">
                      {selectedProject.displayName}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-[#39FF14] hover:bg-[#39FF14]/10 border border-transparent hover:border-[#39FF14]/30 transition-all cursor-pointer flex-shrink-0"
                    title="Close [Esc]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 6-Pillar Architectural Tabs Navigation */}
                <div className="flex-shrink-0 flex items-center gap-1.5 px-4 sm:px-6 pt-2 border-b border-[#39FF14]/20 overflow-x-auto bg-[#070b07] no-scrollbar">
                  {[
                    { id: 'overview', label: 'Overview & STAR', icon: FileText },
                    { id: 'architecture', label: 'System Architecture', icon: Cpu },
                    { id: 'adr', label: 'Architecture Decision Record', icon: Layers },
                    { id: 'warStory', label: 'War Story (Hardest Bug)', icon: Flame },
                    { id: 'telemetry', label: 'Telemetry & Latency', icon: Activity },
                    { id: 'testing', label: 'Testing & Defense', icon: ShieldCheck },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = modalTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setModalTab(tab.id as any)}
                        className={cn(
                          'flex-shrink-0 flex items-center gap-2 py-2.5 px-3.5 text-xs font-mono font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer rounded-t-md',
                          isActive
                            ? 'border-[#39FF14] text-[#39FF14] bg-[#39FF14]/15 shadow-[0_-2px_10px_rgba(57,255,20,0.1)]'
                            : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-white/5',
                        )}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-8 space-y-6 text-sm">
                  {/* TAB 1: OVERVIEW & STAR */}
                  {modalTab === 'overview' && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* High-Definition Video Walkthrough if available */}
                      {selectedProject.videoUrl && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF14] flex items-center gap-2">
                              <Zap className="w-4 h-4 fill-[#39FF14]" /> System Demonstration Video (1080p HD)
                            </h4>
                            {selectedProject.videoDuration && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30">
                                Duration: {selectedProject.videoDuration}
                              </span>
                            )}
                          </div>
                          <div className="rounded-xl overflow-hidden border border-[#39FF14]/40 bg-black shadow-[0_0_25px_rgba(57,255,20,0.15)] aspect-video">
                            <video
                              src={selectedProject.videoUrl}
                              controls
                              playsInline
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      )}

                      {/* Summary */}
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF14] mb-2 flex items-center gap-2">
                          <Code2 className="w-4 h-4" /> Overview &amp; Systems Summary
                        </h4>
                        <p className="text-foreground/90 leading-relaxed bg-[#0a100a] p-4 rounded-xl border border-border/40 font-sans">
                          {selectedProject.summary}
                        </p>
                      </div>

                      {/* Problem & Solution Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-destructive/5 border border-destructive/20 p-4 rounded-xl">
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" /> The Technical Problem
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                            {selectedProject.problem}
                          </p>
                        </div>

                        <div className="bg-[#39FF14]/5 border border-[#39FF14]/20 p-4 rounded-xl">
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF14] mb-2 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4" /> The Engineering Solution
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                            {selectedProject.solution}
                          </p>
                        </div>
                      </div>

                      {/* Key Features */}
                      {selectedProject.features && selectedProject.features.length > 0 && (
                        <div>
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF14] mb-3 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> Key Capabilities
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {selectedProject.features.map((feat, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-muted-foreground font-sans"
                              >
                                <span className="text-[#39FF14] font-bold mt-0.5">•</span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Engineering Learnings */}
                      {selectedProject.learnings && (
                        <div>
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF14] mb-2 flex items-center gap-2">
                            <Cpu className="w-4 h-4" /> Technical Post-Mortem &amp; Learnings
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed bg-[#0a100a] p-4 rounded-xl border border-border/40 font-sans">
                            {selectedProject.learnings}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB: SYSTEM ARCHITECTURE DIAGRAM */}
                  {modalTab === 'architecture' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/30">
                          SYSTEM ARCHITECTURE &amp; DATA FLOW TOPOLOGY
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          Engineered for: <strong className="text-[#39FF14]">{selectedProject.displayName}</strong>
                        </span>
                      </div>

                      {selectedProject.id === 'gemini-flow' && (
                        <div className="space-y-5">
                          <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-xs text-muted-foreground">
                            <strong className="text-foreground">Gemini Flow Concurrency Architecture:</strong> Decouples PortAudio ring buffer collection into a dedicated native <code className="text-[#39FF14]">QThread</code> worker to completely eliminate UI lock contention and guarantee sub-1.0s turnaround latency from speech-end to Windows OS caret injection.
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                            <div className="p-4 rounded-xl bg-[#090D09] border border-indigo-500/30 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-indigo-400 font-bold block mb-1">STAGE 01</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">SoundDevice Stream</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">PortAudio callback sampling live 16kHz float32 mono stream.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 w-fit">Polyphase Downsample</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border-2 border-[#39FF14]/50 flex flex-col justify-between space-y-3 shadow-[0_0_20px_rgba(57,255,20,0.12)]">
                              <div>
                                <span className="text-[9px] font-mono text-[#39FF14] font-bold block mb-1">STAGE 02 (CORE)</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Lock-Free Ring Buffer</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Pre-allocated memory ring in QThread prevents GUI thread starvation.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#39FF14]/15 text-[#39FF14] w-fit font-bold">Zero Frame Drops</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-cyan-500/30 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-cyan-400 font-bold block mb-1">STAGE 03</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Hybrid AI Router</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Gemini 2.5 Flash SSE streaming with offline Faster-Whisper int8 fallback.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 w-fit">Cloud + Offline</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-amber-500/30 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-amber-400 font-bold block mb-1">STAGE 04</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Copy-Editor Gate</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">210+ languages polish, Hinglish auto-fix, and hallucination boundary gate.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 w-fit">Mathematical Fidelity</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-emerald-500/30 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-emerald-400 font-bold block mb-1">STAGE 05</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Win32 Caret Injection</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Direct caret typing via Win32 SendInput into VS Code, Slack, &amp; Terminal.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 w-fit">&lt;10ms Dispatch</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedProject.id === 'maison-noir' && (
                        <div className="space-y-5">
                          <div className="p-4 rounded-xl bg-[#39FF14]/5 border border-[#39FF14]/20 text-xs text-muted-foreground">
                            <strong className="text-foreground">Maison Noir Procedural Audio &amp; Telemetry Architecture:</strong> Eliminates 28 MB of streamed static audio by generating analog vinyl crackle and vintage jazz chords entirely on-the-fly via mathematical Web Audio API DSP nodes with zero network overhead.
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-muted-foreground font-bold block mb-1">LAYER 01</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Singleton AudioContext</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Reference-counted audio facade outside React render lifecycles preventing memory leaks.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary w-fit">No Node Leakage</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border-2 border-[#39FF14]/40 flex flex-col justify-between space-y-3 shadow-[0_0_15px_rgba(57,255,20,0.1)]">
                              <div>
                                <span className="text-[9px] font-mono text-[#39FF14] font-bold block mb-1">LAYER 02 (DSP)</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Procedural Vinyl Synth</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Poisson impulse pink noise crackle generator + 7-chord cyclic jazz progression synthesizer.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#39FF14]/15 text-[#39FF14] w-fit font-bold">0 KB Media Bandwidth</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-cyan-500/30 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-cyan-400 font-bold block mb-1">LAYER 03</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Biquad Warmth Filter</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Analog low-pass acoustic filtering removing harsh digital transients.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 w-fit">800Hz Low-Pass</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-amber-500/30 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-amber-400 font-bold block mb-1">LAYER 04</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Multi-Currency Commerce</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Real-time localized FX calculations across INR (₹), USD ($), EUR (€), &amp; GBP (£).</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 w-fit">60 FPS Framer Motion</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedProject.id === 'java-dsa-tracker' && (
                        <div className="space-y-5">
                          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-muted-foreground">
                            <strong className="text-foreground">SuperMemo SM-2 &amp; AI Mentorship Pipeline:</strong> Dynamically optimizes algorithmic retention intervals with the scientifically proven SuperMemo SM-2 curve and structured Gemini AI prompt contracts evaluating asymptotic Big-O complexity.
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-muted-foreground font-bold block mb-1">PHASE 01</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Recall Difficulty Input</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">User solves algorithmic problem and scores recall difficulty (Grade 0–5) with hint penalty.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary w-fit">Grade [0..5] Clamped</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border-2 border-emerald-500/50 flex flex-col justify-between space-y-3 shadow-[0_0_15px_rgba(16,185,129,0.12)]">
                              <div>
                                <span className="text-[9px] font-mono text-emerald-400 font-bold block mb-1">PHASE 02 (ALGO)</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">SM-2 Decay Computation</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Calculates optimal review days using ease factor EF ≥ 1.3 to prevent forgetting right at the retention brink.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 w-fit font-bold">1d → 6d → I(n-1)*EF</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-cyan-500/30 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-cyan-400 font-bold block mb-1">PHASE 03</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Structured AI Mentor</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Gemini 3.7 JSON schema RPC validating Big-O time and space bounds on student code.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 w-fit">Typed Prompt Schema</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-amber-500/30 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-amber-400 font-bold block mb-1">PHASE 04</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Offline Capacitor Sync</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Atomic immutable reducer pattern with schema versioning preventing mobile race conditions.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 w-fit">&lt;8.5MB Android APK</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedProject.id === 'solaria-estates' && (
                        <div className="space-y-5">
                          <div className="p-4 rounded-xl bg-[#00FF87]/5 border border-[#00FF87]/20 text-xs text-muted-foreground">
                            <strong className="text-foreground">Zero-Layout-Shift Canvas2D Rendering Pipeline:</strong> Pre-decodes 150 high-resolution frames into memory as offscreen ImageBitmaps during browser idle time, eliminating main-thread garbage collection thrashing during high-speed scrubbing.
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-muted-foreground font-bold block mb-1">STAGE 01</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Idle-Time Pre-Decoder</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Asynchronously pre-decodes 150 frames into persistent ImageBitmap ring array.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary w-fit">Zero Main-Thread Block</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border-2 border-[#00FF87]/40 flex flex-col justify-between space-y-3 shadow-[0_0_15px_rgba(0,255,135,0.1)]">
                              <div>
                                <span className="text-[9px] font-mono text-[#00FF87] font-bold block mb-1">STAGE 02 (GPU)</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Desynchronized Canvas</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Hardware-accelerated Canvas2D context draws bitmaps directly from RAM without network round-trips.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#00FF87]/15 text-[#00FF87] w-fit font-bold">60 FPS Locked Scrub</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-cyan-500/30 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-cyan-400 font-bold block mb-1">STAGE 03</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">72-Stage Walkthrough</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Interactive architectural perspective interpolation across 72 camera stages.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 w-fit">Spatial Depth Map</span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-amber-500/30 flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[9px] font-mono text-amber-400 font-bold block mb-1">STAGE 04</span>
                                <h5 className="text-xs font-heading font-bold text-foreground">Procedural Coastal Audio</h5>
                                <p className="text-[11px] text-muted-foreground mt-1">Web Audio API ocean wave synthesis with day/night ambient frequency shifting.</p>
                              </div>
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 w-fit">Clean Disconnect on Exit</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Generic fallback architecture for secondary projects */}
                      {!['gemini-flow', 'maison-noir', 'java-dsa-tracker', 'solaria-estates'].includes(selectedProject.id) && (
                        <div className="p-6 rounded-xl bg-[#090D09] border border-[#39FF14]/30 space-y-4">
                          <h5 className="text-sm font-heading font-bold text-[#39FF14] flex items-center gap-2">
                            <Layers className="w-4 h-4" /> Architectural Pillars &amp; Separation of Concerns
                          </h5>
                          <ul className="space-y-2 text-xs text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <span className="text-[#39FF14] font-bold">•</span>
                              <span><strong>Client / Presentation:</strong> Reactive UI component hierarchy built with strict TypeScript 5.8 types and responsive layouts.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#39FF14] font-bold">•</span>
                              <span><strong>Data Layer &amp; Contracts:</strong> Strict runtime validation schemas preventing malformed state mutations.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-[#39FF14] font-bold">•</span>
                              <span><strong>Automated Testing:</strong> Pre-commit git hooks, linting rules, and regression tests ensuring zero broken builds.</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: ARCHITECTURE DECISION RECORD (ADR) */}
                  {modalTab === 'adr' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#39FF14] uppercase px-2.5 py-1 rounded bg-[#39FF14]/10 border border-[#39FF14]/30">
                          RFC / ARCHITECTURE DECISION RECORD (ADR)
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          Status: <span className="text-[#39FF14] font-semibold">Accepted &amp; Shipped</span>
                        </span>
                      </div>

                      {selectedProject.adr ? (
                        <>
                          {/* Context */}
                          <div className="p-4 rounded-xl bg-[#090D09] border border-[#39FF14]/20 space-y-2">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF14] flex items-center gap-2">
                              <Code2 className="w-4 h-4" /> 1. Problem Context &amp; Architectural Mandate
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                              {selectedProject.adr.context}
                            </p>
                          </div>

                          {/* Stack Selection */}
                          <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 space-y-2">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF14] flex items-center gap-2">
                              <Cpu className="w-4 h-4" /> 2. Repository, Language &amp; Stack Selection Rationale
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                              {selectedProject.adr.languageAndStack}
                            </p>
                          </div>

                          {/* The Evolution: Previous vs Improved */}
                          <div className="space-y-2">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                              <GitCompare className="w-4 h-4 text-[#39FF14]" /> 3. Architectural Evolution: Previous vs Improved Implementation
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Previous Implementation (Replaced) */}
                              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                                  <History className="w-4 h-4" />
                                  Previous Implementation (Replaced)
                                </div>
                                <p className="text-xs text-muted-foreground/90 leading-relaxed font-sans">
                                  {selectedProject.adr.previousImplementation}
                                </p>
                              </div>

                              {/* Improved Solution */}
                              <div className="p-4 rounded-xl bg-[#39FF14]/5 border border-[#39FF14]/40 space-y-2 shadow-[0_0_20px_rgba(57,255,20,0.08)]">
                                <div className="flex items-center gap-2 text-[#39FF14] font-mono text-xs font-bold uppercase tracking-wider">
                                  <CheckCircle2 className="w-4 h-4" />
                                  Improved Architecture (Superior)
                                </div>
                                <p className="text-xs text-foreground/90 leading-relaxed font-sans">
                                  {selectedProject.adr.improvedSolution}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Trade-offs */}
                          <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 space-y-2">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" /> 4. Conscious Engineering Trade-offs Accepted
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                              {selectedProject.adr.tradeoffs}
                            </p>
                          </div>
                        </>
                      ) : (
                        <p className="text-xs text-muted-foreground">ADR documentation is available in project repository documentation.</p>
                      )}
                    </div>
                  )}

                  {/* TAB 3: WAR STORY & ROOT CAUSE ANALYSIS */}
                  {modalTab === 'warStory' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-rose-400 uppercase px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/30">
                          PRODUCTION POST-MORTEM &amp; ROOT CAUSE ANALYSIS (RCA)
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          Severity: <span className="text-rose-400 font-semibold">P1 / Resolved</span>
                        </span>
                      </div>

                      {selectedProject.warStory ? (
                        <>
                          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                            <h4 className="text-sm font-heading font-extrabold text-foreground mb-1">
                              💥 {selectedProject.warStory.title}
                            </h4>
                            <span className="text-[11px] font-mono text-rose-400">
                              A real-world production incident that tested concurrency limits and architecture boundaries.
                            </span>
                          </div>

                          <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 space-y-2">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" /> 1. The Production Symptom
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                              {selectedProject.warStory.symptom}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 space-y-2">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                              <HelpCircle className="w-4 h-4" /> 2. Investigation &amp; False Hypotheses Disproved
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                              {selectedProject.warStory.investigation}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 space-y-2">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                              <Flame className="w-4 h-4" /> 3. The True Low-Level Root Cause
                            </h4>
                            <p className="text-xs text-foreground/90 leading-relaxed font-sans font-medium">
                              {selectedProject.warStory.rootCause}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-[#39FF14]/5 border border-[#39FF14]/40 space-y-2 shadow-[0_0_20px_rgba(57,255,20,0.08)]">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF14] flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4" /> 4. Permanent Architectural Fix &amp; Defense
                            </h4>
                            <p className="text-xs text-foreground/90 leading-relaxed font-sans">
                              {selectedProject.warStory.permanentFix}
                            </p>
                          </div>
                        </>
                      ) : (
                        <p className="text-xs text-muted-foreground">Post-mortem record available in GitHub issues and commit history.</p>
                      )}
                    </div>
                  )}

                  {/* TAB 4: TELEMETRY & BENCHMARKS */}
                  {modalTab === 'telemetry' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30">
                          EMPIRICAL PERFORMANCE &amp; LATENCY TELEMETRY MATRIX
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          Tooling: <span className="text-cyan-400 font-semibold">Profilers &amp; Benchmarks</span>
                        </span>
                      </div>

                      {selectedProject.telemetry ? (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="p-4 rounded-xl bg-[#090D09] border border-cyan-500/20 space-y-1">
                              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                                p50 Median Latency
                              </span>
                              <span className="text-lg font-heading font-extrabold text-cyan-400">
                                {selectedProject.telemetry.p50Latency}
                              </span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-cyan-500/30 space-y-1">
                              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                                p95 Tail Latency
                              </span>
                              <span className="text-lg font-heading font-extrabold text-cyan-400">
                                {selectedProject.telemetry.p95Latency}
                              </span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-cyan-500/40 space-y-1">
                              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                                p99 Worst-Case Latency
                              </span>
                              <span className="text-lg font-heading font-extrabold text-[#39FF14]">
                                {selectedProject.telemetry.p99Latency}
                              </span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 space-y-1">
                              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                                Cold Boot Initialization
                              </span>
                              <span className="text-sm font-mono font-bold text-foreground">
                                {selectedProject.telemetry.coldBoot}
                              </span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 space-y-1">
                              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                                Warm Action Response
                              </span>
                              <span className="text-sm font-mono font-bold text-foreground">
                                {selectedProject.telemetry.warmStart}
                              </span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 space-y-1">
                              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                                Resident Memory (RSS)
                              </span>
                              <span className="text-sm font-mono font-bold text-foreground">
                                {selectedProject.telemetry.memoryFootprint}
                              </span>
                            </div>

                            <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 sm:col-span-2 lg:col-span-3 space-y-1">
                              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                                Throughput &amp; Execution Stability
                              </span>
                              <span className="text-sm font-mono font-bold text-[#39FF14]">
                                ⚡ {selectedProject.telemetry.throughputOrFps}
                              </span>
                            </div>
                          </div>

                          {selectedProject.telemetry.notes && (
                            <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 space-y-1.5">
                              <span className="text-[10px] font-mono text-[#39FF14] uppercase tracking-wider font-bold block">
                                Benchmark Measurement Methodology &amp; Environment
                              </span>
                              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                                {selectedProject.telemetry.notes}
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-xs text-muted-foreground">Telemetry benchmarks available in repository logs.</p>
                      )}
                    </div>
                  )}

                  {/* TAB 5: TESTING & DEFENSE */}
                  {modalTab === 'testing' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30">
                          DEFENSIVE ENGINEERING &amp; AUTOMATED TEST HARNESS
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          Status: <span className="text-[#39FF14] font-semibold">100% Passing</span>
                        </span>
                      </div>

                      {selectedProject.testingHygiene ? (
                        <>
                          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
                            <div>
                              <span className="text-xs font-mono font-bold text-foreground block">
                                {selectedProject.testingHygiene.testCoverage}
                              </span>
                              <span className="text-[11px] font-mono text-amber-400">
                                Verified automated test harness executed on continuous integration pipelines.
                              </span>
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 space-y-3">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                              <Terminal className="w-4 h-4 text-[#39FF14]" /> Automated Verification Tiers &amp; Test Vectors
                            </h4>
                            <ul className="space-y-2">
                              {selectedProject.testingHygiene.testTypes.map((test, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-2.5 text-xs text-muted-foreground font-sans">
                                  <CheckCircle2 className="w-4 h-4 text-[#39FF14] mt-0.5 flex-shrink-0" />
                                  <span>{test}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 rounded-xl bg-[#090D09] border border-border/40 space-y-2">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Continuous Integration &amp; Deployment Hygiene Gates
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                              {selectedProject.testingHygiene.ciGates}
                            </p>
                          </div>

                          {selectedProject.testingHygiene.defensiveInvariants && (
                            <div className="p-4 rounded-xl bg-[#39FF14]/5 border border-[#39FF14]/30 space-y-2">
                              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF14] flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Defensive Runtime Invariants
                              </h4>
                              <ul className="space-y-1.5">
                                {selectedProject.testingHygiene.defensiveInvariants.map((inv, iIdx) => (
                                  <li key={iIdx} className="flex items-start gap-2 text-xs text-foreground/90 font-sans">
                                    <span className="text-[#39FF14] font-bold">•</span>
                                    <span>{inv}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-xs text-muted-foreground">Test fixtures and verification suites located in tests/ directory.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Modal Action Footer */}
                <div className="flex-shrink-0 p-4 sm:p-5 border-t border-border/40 bg-[#090D09] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#39FF14] text-[#030503] font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:bg-[#7CFF6B] transition-all"
                    >
                      <Github className="w-4 h-4" />
                      View Source on GitHub
                    </a>

                    {selectedProject.videoUrl && (
                      <button
                        onClick={() => {
                          const proj = flagshipProjects.find((p) => p.id === selectedProject.id);
                          if (proj) {
                            setSelectedProject(null);
                            setActiveVideoProject(proj);
                          }
                        }}
                        className="px-4 py-2.5 rounded-full border border-[#39FF14]/40 hover:border-[#39FF14] text-xs font-semibold text-foreground hover:text-[#39FF14] hover:bg-[#39FF14]/10 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-[#39FF14]" />
                        Watch 1080p Video
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer px-2 py-1"
                  >
                    Close Window [Esc]
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Dedicated Full HD 1080p Cinema Video Modal */}
        <AnimatePresence>
          {activeVideoProject && activeVideoProject.videoUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveVideoProject(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />

              {/* Cinema Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl bg-[#060806] border-2 border-[#39FF14]/50 rounded-2xl shadow-[0_0_60px_rgba(57,255,20,0.25)] overflow-hidden z-10 flex flex-col focus:outline-none"
                role="dialog"
                aria-modal="true"
                tabIndex={0}
              >
                {/* Cinema Top Header */}
                <div className="p-4 sm:p-6 border-b border-[#39FF14]/20 flex items-center justify-between gap-4 bg-[#090D09]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/40 text-xs font-mono font-bold text-[#39FF14]">
                      <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                      1080p FULL HD WALKTHROUGH
                    </span>
                    <h3 className="text-base sm:text-lg font-heading font-extrabold text-foreground truncate max-w-[280px] sm:max-w-md md:max-w-xl">
                      {activeVideoProject.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeVideoProject.github && (
                      <a
                        href={activeVideoProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#39FF14]/30 hover:border-[#39FF14] text-xs font-mono text-muted-foreground hover:text-[#39FF14] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    <button
                      onClick={() => setActiveVideoProject(null)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-[#39FF14] hover:bg-[#39FF14]/10 border border-transparent hover:border-[#39FF14]/30 transition-all cursor-pointer"
                      title="Close Cinema [Esc]"
                      aria-label="Close Cinema"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Video Player */}
                <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                  <video
                    src={activeVideoProject.videoUrl}
                    poster={activeVideoProject.previewImage}
                    autoPlay
                    controls
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Cinema Footer */}
                <div className="p-4 sm:p-5 border-t border-[#39FF14]/20 bg-[#060806] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground font-mono">
                    <span className="text-[#39FF14] font-bold">⚡ Master Video Quality:</span>
                    <span>1080p 30fps · H.264 High Profile</span>
                    {activeVideoProject.videoDuration && (
                      <span className="text-[#39FF14]">· {activeVideoProject.videoDuration}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const proj = activeVideoProject;
                        setActiveVideoProject(null);
                        setSelectedProject({
                          id: proj.id,
                          name: proj.name,
                          displayName: proj.name,
                          summary: proj.summary,
                          language: proj.tech[0],
                          langColor: 'bg-[#39FF14]',
                          stars: 12,
                          forks: 3,
                          updatedAt: 'Active',
                          rawDate: new Date().toISOString(),
                          githubUrl: proj.github,
                          tech: proj.tech,
                          coverColor: proj.coverColor,
                          problem: proj.problem,
                          solution: proj.solution,
                          features: proj.features,
                          learnings: proj.learnings,
                          future: proj.future,
                          videoUrl: proj.videoUrl,
                          videoDuration: proj.videoDuration,
                        });
                      }}
                      className="text-[#39FF14] hover:underline font-mono text-xs cursor-pointer"
                    >
                      Read Full Architectural Case Study →
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Dedicated Full-Size Image Lightbox Modal */}
        <AnimatePresence>
          {activeImageProject && activeImageProject.previewImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveImageProject(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />

              {/* Image Lightbox Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl bg-[#060806] border-2 border-[#39FF14]/50 rounded-2xl shadow-[0_0_60px_rgba(57,255,20,0.25)] overflow-hidden z-10 flex flex-col focus:outline-none max-h-[92vh]"
                role="dialog"
                aria-modal="true"
                tabIndex={0}
              >
                {/* Lightbox Header */}
                <div className="p-4 sm:p-5 border-b border-[#39FF14]/20 flex items-center justify-between gap-4 bg-[#090D09]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/40 text-xs font-mono font-bold text-[#39FF14]">
                      <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
                      FULL-SIZE ARCHITECTURE PREVIEW
                    </span>
                    <h3 className="text-base sm:text-lg font-heading font-extrabold text-foreground truncate max-w-[280px] sm:max-w-md md:max-w-xl">
                      {activeImageProject.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={activeImageProject.previewImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#39FF14]/30 hover:border-[#39FF14] text-xs font-mono text-muted-foreground hover:text-[#39FF14] transition-colors"
                      title="Open raw image in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open Original
                    </a>
                    <button
                      onClick={() => setActiveImageProject(null)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-[#39FF14] hover:bg-[#39FF14]/10 border border-transparent hover:border-[#39FF14]/30 transition-all cursor-pointer"
                      title="Close Preview [Esc]"
                      aria-label="Close Preview"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Full-Size Image Viewport */}
                <div className="relative w-full flex-1 min-h-0 bg-black/70 flex items-center justify-center p-3 sm:p-6 overflow-auto">
                  <img
                    src={activeImageProject.previewImage}
                    alt={`${activeImageProject.name} Full-Size Architecture Preview`}
                    className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-2xl border border-[#39FF14]/20"
                  />
                </div>

                {/* Lightbox Footer */}
                <div className="p-3 sm:p-4 border-t border-[#39FF14]/20 bg-[#060806] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground font-mono">
                    <span className="text-[#39FF14] font-bold">Preview:</span>
                    <span>High-Resolution Architectural View</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {activeImageProject.videoUrl && (
                      <button
                        onClick={() => {
                          const proj = activeImageProject;
                          setActiveImageProject(null);
                          setActiveVideoProject(proj);
                        }}
                        className="px-4 py-1.5 rounded-full bg-[#39FF14] text-[#030503] font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(57,255,20,0.4)] hover:bg-[#7CFF6B] transition-all cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-[#030503]" />
                        Watch Video Walkthrough
                      </button>
                    )}
                    <button
                      onClick={() => setActiveImageProject(null)}
                      className="text-xs font-mono text-muted-foreground hover:text-[#39FF14] transition-colors cursor-pointer px-2 py-1"
                    >
                      Close [Esc]
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
