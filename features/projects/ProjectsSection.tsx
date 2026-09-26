'use client';

import * as React from 'react';
import { ProjectCard, DynamicProject } from './ProjectCard';
import { Reveal } from '@/components/animations/Reveal';
import {
  X,
  Github,
  ExternalLink,
  HelpCircle,
  Lightbulb,
  Code2,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Loader2,
  Calendar,
  Star,
  GitFork,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { projectsData } from '@/content/projects';
import { fetchLiveGitHubStats } from '@/lib/github';

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
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-600',
  Shell: 'bg-green-600',
};

const coverColors = [
  'bg-[#39FF14]', // Electric Neon Green (Primary)
  'bg-[#7CFF6B]', // Bright Mint Green
  'bg-[#50FA7B]', // Cyber Spring Green
  'bg-[#00FF87]', // Bright Aqua Lime Green
  'bg-[#10B981]', // Emerald Green
  'bg-[#22C55E]', // Vibrant Leaf Green
  'bg-[#4ADE80]', // Soft Neon Green
  'bg-[#86EFAC]', // Light Pastel Emerald
];

// Helper to format ISO date string to human-readable format
function formatDate(isoString: string): string {
  if (!isoString) return 'Recently';
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (_e) {
    return 'Recently';
  }
}

// Convert static projectsData to initial DynamicProject format
const staticFallbackProjects: DynamicProject[] = projectsData.map((p, idx) => ({
  id: p.id,
  name: p.name,
  displayName: p.name,
  summary: p.summary,
  language: p.tech[0] || 'TypeScript',
  langColor: langColors[p.tech[0]] || 'bg-[#39FF14]',
  stars: 10 - idx,
  forks: 2,
  updatedAt: 'Recently',
  rawDate: new Date().toISOString(),
  githubUrl: p.github,
  tech: p.tech,
  coverColor: p.coverColor || coverColors[idx % coverColors.length],
  problem: p.problem,
  solution: p.solution,
  features: p.features,
  learnings: p.learnings,
  future: p.future,
}));

export function ProjectsSection() {
  const [projects, setProjects] = React.useState<DynamicProject[]>(staticFallbackProjects);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isLive, setIsLive] = React.useState<boolean>(true);
  const [selectedProject, setSelectedProject] = React.useState<DynamicProject | null>(null);

  // Sync live public repositories gracefully in background
  React.useEffect(() => {
    let isMounted = true;

    async function syncRepos() {
      try {
        const data = await fetchLiveGitHubStats();
        if (isMounted && data.repos && data.repos.length > 0) {
          const formattedProjects: DynamicProject[] = data.repos.map((repo, idx) => {
            const lang = repo.language || 'TypeScript';

            const matchingCurated = staticFallbackProjects.find(
              (cp) =>
                cp.githubUrl.toLowerCase() === (repo.url || '').toLowerCase() ||
                cp.name.toLowerCase().includes(repo.name.toLowerCase()) ||
                repo.name.toLowerCase().includes(cp.id.toLowerCase()),
            );

            const techList: string[] = [lang];
            if (matchingCurated?.tech) {
              matchingCurated.tech.forEach((t) => {
                if (t && !techList.includes(t)) techList.push(t);
              });
            }
            if (techList.length === 1) {
              techList.push('GitHub', 'Open Source');
            }

            return {
              id: repo.name,
              name: repo.name,
              displayName: matchingCurated ? matchingCurated.displayName : repo.displayName,
              summary:
                repo.description ||
                matchingCurated?.summary ||
                `Public software repository built with ${lang} and modern developer tooling.`,
              language: lang,
              langColor: repo.langColor || langColors[lang] || 'bg-[#39FF14]',
              stars: repo.stars || 0,
              forks: repo.forks || 0,
              updatedAt: repo.updated,
              rawDate: new Date().toISOString(),
              githubUrl: repo.url,
              tech: techList,
              coverColor: matchingCurated?.coverColor || coverColors[idx % coverColors.length],
              problem:
                matchingCurated?.problem ||
                `Developing robust, maintainable open-source code for ${repo.displayName}.`,
              solution:
                matchingCurated?.solution ||
                `Built ${repo.displayName} using ${lang} with clean architecture and modular components.`,
              features: matchingCurated?.features || [
                `Public GitHub repository built with ${lang}`,
                `Live source code available on GitHub`,
                `Version controlled with Git and modern build tooling`,
              ],
              learnings:
                matchingCurated?.learnings ||
                `Building ${repo.displayName} provided key experience in ${lang} system design and state management.`,
              future: matchingCurated?.future || [
                'Add interactive live demo link',
                'Expand documentation and test coverage',
              ],
            };
          });

          setProjects(formattedProjects);
          setIsLive(data.isLive);
        }
      } catch (_err) {
        // Fall back gracefully
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    syncRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-secondary/5 dark:bg-transparent border-t border-border/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal delay={0.1}>
          <div className="flex flex-col mb-12">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
              <span className="text-xs font-bold tracking-widest text-[#39FF14] uppercase font-mono neon-text-glow">
                04 // GitHub Projects Integration
              </span>

              {/* Real-time GitHub API Sync Badge */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 text-xs font-mono font-semibold text-[#39FF14]">
                {loading ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin text-[#39FF14]" />
                    <span>Syncing GitHub Repos...</span>
                  </>
                ) : isLive ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                    <span>Live GitHub Sync ({projects.length} Repos)</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>GitHub Repositories ({projects.length})</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
                Featured Projects
              </h2>
              <div className="h-[1px] bg-border flex-grow max-w-[200px] hidden sm:block" />
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mt-4 leading-relaxed">
              Real-time feed of public GitHub repositories sorted by latest update. Any new
              repository created on GitHub appears here automatically.
            </p>
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <Reveal key={project.id} delay={0.05 * ((idx % 6) + 1)}>
              <ProjectCard project={project} onOpenDetails={setSelectedProject} />
            </Reveal>
          ))}
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
                className="relative w-full max-w-3xl max-h-[85vh] bg-card border border-border/80 rounded-xl shadow-2xl overflow-y-auto z-10 flex flex-col focus:outline-none"
                role="dialog"
                aria-modal="true"
                tabIndex={0}
              >
                {/* Top Highlight Accent */}
                <div className={`h-2 w-full ${selectedProject.coverColor}`} />

                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-border/40 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#39FF14] uppercase px-2 py-0.5 rounded bg-[#39FF14]/10 border border-[#39FF14]/30">
                        {selectedProject.language}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Updated {selectedProject.updatedAt}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-foreground">
                      {selectedProject.displayName}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 space-y-8 text-sm">
                  {/* Summary */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF14] mb-2 flex items-center gap-2">
                      <Code2 className="w-4 h-4" /> Overview
                    </h4>
                    <p className="text-foreground/90 leading-relaxed bg-secondary/20 p-4 rounded-lg border border-border/40">
                      {selectedProject.summary}
                    </p>
                  </div>

                  {/* Problem & Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-destructive/5 border border-destructive/20 p-4 rounded-lg">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-destructive mb-2 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" /> Problem Addressed
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {selectedProject.problem}
                      </p>
                    </div>

                    <div className="bg-[#39FF14]/5 border border-[#39FF14]/20 p-4 rounded-lg">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF14] mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" /> Solution Built
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>

                  {/* Key Features */}
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#39FF14] mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Key Features
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedProject.features.map((feat, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <span className="text-[#39FF14] font-bold mt-0.5">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack Tags */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Technologies & Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono font-semibold bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30 px-2.5 py-1 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Learnings */}
                  {selectedProject.learnings && (
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        Key Engineering Learnings
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed italic bg-secondary/10 p-3 rounded border border-border/30">
                        &quot;{selectedProject.learnings}&quot;
                      </p>
                    </div>
                  )}
                </div>

                {/* Modal Footer CTAs */}
                <div className="p-6 md:p-8 bg-secondary/10 border-t border-border/40 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      {selectedProject.stars} Stars
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {selectedProject.forks} Forks
                    </span>
                  </div>

                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      'bg-[#39FF14] text-black hover:bg-[#39FF14]/90 font-bold gap-2 shadow-[0_0_15px_rgba(57,255,20,0.4)]',
                    )}
                  >
                    <Github className="w-4 h-4" />
                    View Repository on GitHub
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
