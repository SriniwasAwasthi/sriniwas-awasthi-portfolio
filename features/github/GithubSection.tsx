'use client';

import * as React from 'react';
import { Github, Code, ArrowUpRight, Loader2, RefreshCw } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import { cn } from '@/lib/utils';

// Fallback Repositories (if GitHub API rate-limited or offline)
const fallbackRepos = [
  {
    name: 'E-commerce-Meridian-Living-',
    displayName: 'Meridian Living (E-commerce)',
    description:
      'Online luxury shopping website for smart home devices, desk setups, home decor, wellness, and gifts with 90 items and interactive room scenes.',
    language: 'TypeScript',
    langColor: 'bg-blue-500',
    stars: 12,
    forks: 2,
    updated: 'Updated recently',
    url: 'https://github.com/SriniwasAwasthi/E-commerce-Meridian-Living-',
  },
  {
    name: 'Java-DSA-tracker',
    displayName: 'Java & DSA Tracker',
    description:
      'Master Java & DSA for coding interviews with an adaptive AI study planner, spaced repetition memory engine, and 5-in-1 Gemini AI mentor.',
    language: 'TypeScript',
    langColor: 'bg-indigo-500',
    stars: 10,
    forks: 2,
    updated: 'Updated recently',
    url: 'https://github.com/SriniwasAwasthi/Java-DSA-tracker',
  },
  {
    name: 'Engineering-Student-Assistant',
    displayName: 'Engineering Student Assistant',
    description:
      'All-in-one dashboard for engineering students: manage studies, track attendance, calculate GPA, organize exams, and practice coding.',
    language: 'TypeScript',
    langColor: 'bg-sky-500',
    stars: 8,
    forks: 1,
    updated: 'Updated Jun 20',
    url: 'https://github.com/SriniwasAwasthi/Engineering-Student-Assistant',
  },
  {
    name: 'THINKR_AI',
    displayName: 'THINKR AI Study Assistant',
    description:
      'Autonomous study schedule builder and AI chat assistant that breaks down complex learning goals into step-by-step roadmaps.',
    language: 'HTML',
    langColor: 'bg-amber-500',
    stars: 14,
    forks: 3,
    updated: 'Updated Jun 16',
    url: 'https://github.com/SriniwasAwasthi/THINKR_AI',
  },
  {
    name: '-stellar-assault-space-shooter',
    displayName: 'Stellar Assault Space Shooter',
    description:
      'Browser space shooter arcade game with delta-time physics engine, alien invasion waves, upgrade shop, and giant boss fights.',
    language: 'TypeScript',
    langColor: 'bg-[#39FF14]',
    stars: 9,
    forks: 2,
    updated: 'Updated Jun 16',
    url: 'https://github.com/SriniwasAwasthi/-stellar-assault-space-shooter',
  },
  {
    name: 'FocusFlow',
    displayName: 'FocusFlow Ultimate',
    description:
      'Full-stack AI-powered productivity platform featuring Kanban task management, Pomodoro sessions, smart planning, and analytics.',
    language: 'TypeScript',
    langColor: 'bg-purple-500',
    stars: 11,
    forks: 2,
    updated: 'Updated Jun 16',
    url: 'https://github.com/SriniwasAwasthi/FocusFlow',
  },
  {
    name: 'Book-Matrix-Library-Management-system-',
    displayName: 'Book Matrix LMS',
    description:
      'Modern AI-powered Library Management System built with Python, SQLite, C, HTML, CSS, and JS with automated fine logic.',
    language: 'Python',
    langColor: 'bg-emerald-500',
    stars: 9,
    forks: 1,
    updated: 'Updated Jun 16',
    url: 'https://github.com/SriniwasAwasthi/Book-Matrix-Library-Management-system-',
  },
  {
    name: 'calcall-universal-calculator-platform',
    displayName: 'CalcAll Calculator Platform',
    description:
      'High-performance, privacy-focused calculator ecosystem featuring 190+ tools across Math, Finance, Health, and Construction.',
    language: 'JavaScript',
    langColor: 'bg-cyan-500',
    stars: 7,
    forks: 1,
    updated: 'Updated Jun 11',
    url: 'https://github.com/SriniwasAwasthi/calcall-universal-calculator-platform',
  },
  {
    name: 'AI-Agents-for-hackathons',
    displayName: 'HackForge (AI Agents)',
    description:
      'Hackathon command center with AI tool suggestions, tech stack recommendations, task planning, and API testing scratchpad.',
    language: 'TypeScript',
    langColor: 'bg-rose-500',
    stars: 6,
    forks: 1,
    updated: 'Updated Jun 5',
    url: 'https://github.com/SriniwasAwasthi/AI-Agents-for-hackathons',
  },
  {
    name: 'color-puzzle-2024-source',
    displayName: 'Color Puzzle 2024',
    description:
      'Vibrant 2048-style grid puzzle game featuring RPG campaign levels, daily quests, Web Audio ambient music, and power-ups.',
    language: 'TypeScript',
    langColor: 'bg-[#39FF14]',
    stars: 1,
    forks: 0,
    updated: 'Updated recently',
    url: 'https://github.com/SriniwasAwasthi/color-puzzle-2024-source',
  },
  {
    name: 'Portfolio',
    displayName: 'Engineering Portfolio',
    description:
      'Personal showcase website built with Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, and live GitHub API integration.',
    language: 'TypeScript',
    langColor: 'bg-sky-500',
    stars: 1,
    forks: 0,
    updated: 'Updated recently',
    url: 'https://github.com/SriniwasAwasthi/Portfolio',
  },
];

const langColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-emerald-500',
  Java: 'bg-amber-600',
  HTML: 'bg-rose-500',
  CSS: 'bg-sky-400',
  C: 'bg-indigo-500',
  'C++': 'bg-purple-600',
};

// Generate fallback contribution activity matching exact GitHub activity (269 contributions)
const generateContributions = () => {
  const list = new Array(364).fill(0);
  list[55] = 1; // Oct 18, 2025
  list[246] = 2; // Apr 27, 2026
  list[277] = 2; // May 28, 2026
  list[283] = 4; // Jun 3, 2026
  list[284] = 1; // Jun 4, 2026
  list[285] = 1; // Jun 5, 2026
  list[291] = 3; // Jun 11, 2026
  list[296] = 10; // Jun 16, 2026
  list[300] = 2; // Jun 20, 2026
  list[326] = 1; // Jul 16, 2026
  list[333] = 13; // Jul 23, 2026
  list[334] = 8; // Jul 24, 2026
  list[335] = 8; // Jul 25, 2026
  list[336] = 10; // Jul 26, 2026
  list[337] = 3; // Jul 27, 2026
  list[338] = 3; // Jul 28, 2026
  list[345] = 5; // Aug 4, 2026
  list[346] = 1; // Aug 5, 2026
  list[348] = 9; // Aug 7, 2026
  list[350] = 3; // Aug 9, 2026
  list[355] = 5; // Aug 14, 2026
  list[356] = 1; // Aug 23, 2026
  list[357] = 31; // Aug 24, 2026
  list[358] = 5; // Aug 25, 2026
  list[359] = 95; // Sep 7, 2026
  list[360] = 36; // Sep 8, 2026
  list[363] = 14; // Sep 11, 2026
  return list;
};

interface DisplayRepo {
  name: string;
  displayName: string;
  description: string;
  language: string;
  langColor: string;
  stars: number;
  forks: number;
  updated: string;
  url: string;
}

const langHexColors: Record<string, string> = {
  TypeScript: '#3b82f6',
  JavaScript: '#eab308',
  Python: '#10b981',
  Java: '#d97706',
  HTML: '#f43f5e',
  CSS: '#38bdf8',
  C: '#6366f1',
  'C++': '#9333ea',
  Code: '#39FF14',
  Other: '#a855f7',
};

export function GithubSection() {
  const [contributions, setContributions] = React.useState<number[]>(generateContributions);
  const [totalContributions, setTotalContributions] = React.useState<number>(269);
  const [repos, setRepos] = React.useState<DisplayRepo[]>(fallbackRepos);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isLive, setIsLive] = React.useState<boolean>(false);

  // Fetch live public repositories & live contribution heatmap directly from GitHub APIs
  React.useEffect(() => {
    async function fetchLiveRepos() {
      try {
        const response = await fetch(
          'https://api.github.com/users/SriniwasAwasthi/repos?sort=updated&per_page=100',
        );
        if (!response.ok) throw new Error('GitHub API response error');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const liveFormatted: DisplayRepo[] = data.map((repo: Record<string, any>) => {
            const lang = repo.language || 'Code';
            const dateObj = new Date(repo.updated_at || Date.now());
            const formattedDate = `Updated ${dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

            return {\
              name: repo.name,
              displayName: repo.name.replace(/[-_]/g, ' '),
              description: repo.description || 'Public GitHub project repository.',
              language: lang,
              langColor: langColors[lang] || 'bg-primary',
              stars: repo.stargazers_count || 0,
              forks: repo.forks_count || 0,
              updated: formattedDate,
              url: repo.html_url,
            };
          });

          setRepos(liveFormatted);
          setIsLive(true);
        }
      } catch (_err) {
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    }

    async function fetchLiveContributions() {
      try {
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/SriniwasAwasthi?y=last');
        if (!res.ok) return;
        const data = await res.json();
        let total = 0;
        if (data && data.total && typeof data.total.lastYear === 'number' && data.total.lastYear > 0) {
          total = data.total.lastYear;
        }
        if (data && Array.isArray(data.contributions) && data.contributions.length > 0) {
          const sum = data.contributions.reduce((acc: number, item: { count?: number }) => acc + (item.count || 0), 0);
          if (sum > total) {
            total = sum;
          }
          const mapped = data.contributions.slice(-364).map((item: { count?: number; level?: number }) => item.count || item.level || 0);
          if (mapped.length > 0) {
            setContributions(mapped);
          }
        }
        if (total > 0) {
          setTotalContributions(total);
        }
      } catch (_err) {
        // Keeps default 269 fallback
      }
    }

    fetchLiveRepos();
    fetchLiveContributions();
  }, []);

  const totalRepos = repos.length;

  const languageDistribution = React.useMemo(() => {
    const counts: Record<string, number> = {};
    repos.forEach((repo) => {
      const lang = repo.language || 'Other';
      counts[lang] = (counts[lang] || 0) + 1;
    });

    const total = repos.length || 1;
    return Object.entries(counts)
      .map(([lang, count]) => ({\
        lang,
        count,
        percentage: Math.round((count / total) * 100),
        color: langColors[lang] || 'bg-primary',
        hexColor: langHexColors[lang] || '#39FF14',\
      }))
      .sort((a, b) => b.count - a.count);
  }, [repos]);

  const topLanguage = languageDistribution[0]?.lang || 'TypeScript';

  const CIRCUMFERENCE = 251.327;
  let cumulativeOffset = 0;
  const pieSegments = languageDistribution.map((item) => {
    const dashLength = (item.count / totalRepos) * CIRCUMFERENCE;
    const offset = -cumulativeOffset;
    cumulativeOffset += dashLength;
    return {\
      ...item,
      dashLength,
      offset,
    };
  });

  return (
    <section
      id="github"
      className="relative py-24 px-6 md:px-12 lg:px-24 border-t border-border/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <Reveal delay={0.1}>
          <div className="flex flex-col mb-16">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest text-[#39FF14] uppercase font-mono mb-2 neon-text-glow">
                05 // GitHub Live Sync
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 text-[11px] font-mono font-semibold text-[#39FF14]">
                {isLive ? (\
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                    <span>GitHub API: Live Synchronized</span>
                  </>
                ) : (\
                  <>
                    <RefreshCw className="w-3 h-3 text-[#39FF14]" />
                    <span>Auto-Sync Ready</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-4 mt-1">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
                GitHub Activity &amp; Repositories
              </h2>
              <div className="h-[1px] bg-[#39FF14]/20 flex-grow max-w-[200px] hidden sm:block" />
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mt-4 leading-relaxed">
              Real contribution history ({totalContributions} contributions) dynamically synced with{' '}
              {totalRepos} public repositories on @SriniwasAwasthi.
            </p>
          </div>
        </Reveal>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Block - Stats Summary & Contributions Heatmap */}
          <div className="lg:col-span-8 space-y-6">
            <Reveal delay={0.15}>
              <div className="p-6 rounded-xl border border-[#39FF14]/20 bg-[#060806]/80 backdrop-blur-md space-y-6 shadow-[0_0_20px_rgba(57,255,20,0.05)]">
                {/* Stats Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <Github className="w-5 h-5 text-[#39FF14]" />
                    <span>GitHub Profile Live Stats</span>
                  </div>
                  <a
                    href="https://github.com/SriniwasAwasthi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#39FF14] font-bold tracking-wider hover:underline flex items-center gap-1"
                  >
                    @SriniwasAwasthi
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Micro Stats Columns */}
                <div className="grid grid-cols-3 gap-4 border-y border-[#39FF14]/20 py-4">
                  <div className="text-center md:text-left">
                    <span className="text-xs text-muted-foreground block mb-1">
                      Yearly Contributions
                    </span>
                    <span className="text-xl md:text-2xl font-bold text-[#39FF14] font-heading neon-text-glow">
                      {totalContributions}
                    </span>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-xs text-muted-foreground block mb-1">
                      Public Repositories
                    </span>
                    <span className="text-xl md:text-2xl font-bold text-foreground font-heading">
                      {totalRepos}
                    </span>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-xs text-muted-foreground block mb-1">
                      Primary College
                    </span>
                    <span className="text-xs md:text-sm font-bold text-[#7CFF6B] font-heading leading-tight">
                      P.D.A College of Engg.
                    </span>
                  </div>
                </div>

                {/* Contribution Heatmap */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-bold tracking-wider uppercase block font-heading">
                      {totalContributions} contributions in the last year
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Aug 2025 – Sep 2026
                    </span>
                  </div>

                  {/* Grid Container */}
                  <div className="overflow-x-auto pb-2">
                    <div className="grid grid-flow-col grid-rows-7 gap-[3px] w-[500px] md:w-full min-w-[500px]">
                      {contributions.map((level, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            'w-2.5 h-2.5 rounded-[1px] transition-colors duration-300',
                            level === 0
                              ? 'bg-[#39FF14]/5'
                              : level === 1
                                ? 'bg-[#39FF14]/25'
                                : level === 2
                                  ? 'bg-[#39FF14]/50'
                                  : level === 3
                                    ? 'bg-[#39FF14]/80'
                                    : 'bg-[#39FF14] shadow-[0_0_8px_#39FF14]',
                          )}
                          title={`${level} contributions`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground pt-1">
                    <span>Less</span>
                    <div className="w-2 h-2 rounded-[1px] bg-[#39FF14]/5" />
                    <div className="w-2 h-2 rounded-[1px] bg-[#39FF14]/25" />
                    <div className="w-2 h-2 rounded-[1px] bg-[#39FF14]/50" />
                    <div className="w-2 h-2 rounded-[1px] bg-[#39FF14]/80" />
                    <div className="w-2 h-2 rounded-[1px] bg-[#39FF14] shadow-[0_0_5px_#39FF14]" />
                    <span>More</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Repositories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {loading ? (
                <div className="col-span-2 flex items-center justify-center p-12 text-[#39FF14] font-mono text-xs gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Fetching live GitHub repositories...</span>
                </div>
              ) : (
                repos.map((repo, idx) => (
                  <Reveal key={repo.name} delay={0.05 + idx * 0.03}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-5 rounded-xl border border-[#39FF14]/20 bg-[#060806]/80 hover:bg-[#060806] hover:border-[#39FF14]/60 transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.05)] hover:shadow-[0_0_30px_rgba(57,255,20,0.25)] relative overflow-hidden backdrop-blur-md"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-[#39FF14] transition-colors">
                            {repo.name}
                          </h4>
                          <span className="text-[11px] text-[#7CFF6B] font-mono block">
                            {repo.displayName}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#39FF14] transition-colors transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 min-h-[38px] line-clamp-2">
                        {repo.description}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                        <div className="flex items-center gap-1.5">
                          <div className={cn('w-2 h-2 rounded-full', repo.langColor)} />
                          <span>{repo.language}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{repo.updated}</span>
                      </div>
                    </a>
                  </Reveal>
                ))
              )}
            </div>
          </div>

          {/* Right Block - Language Distribution */}
          <div className="lg:col-span-4">
            <Reveal delay={0.22}>
              <div className="p-6 rounded-xl border border-[#39FF14]/20 bg-[#060806]/80 backdrop-blur-sm space-y-6 shadow-[0_0_20px_rgba(57,255,20,0.05)]">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <Code className="w-5 h-5 text-[#39FF14]" />
                  <span>Language Distribution</span>
                </div>

                {/* SVG Pie Chart */}
                <div className="flex justify-center py-4 relative">
                  <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="var(--border)"
                      strokeWidth="8"
                      className="opacity-20"
                    />
                    {pieSegments.map((seg) => (
                      <circle
                        key={seg.lang}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={seg.hexColor}
                        strokeWidth="8"
                        strokeDasharray={`${seg.dashLength} ${CIRCUMFERENCE}`}
                        strokeDashoffset={seg.offset}
                        className="transition-all duration-500"
                      />
                    ))}
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                    <span className="text-[10px] text-muted-foreground uppercase font-mono">
                      {totalRepos} Public Repos
                    </span>
                    <span className="text-sm font-bold text-[#39FF14] font-heading">
                      {topLanguage}
                    </span>
                  </div>
                </div>

                {/* Dynamic Language Legend List */}
                <div className="space-y-2.5 text-xs">
                  {languageDistribution.slice(0, 5).map((item) => (
                    <div key={item.lang} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn('w-2.5 h-2.5 rounded', item.color)} />
                        <span className="text-muted-foreground">{item.lang}</span>
                      </div>
                      <span className="font-bold text-foreground font-mono">
                        {item.count} {item.count === 1 ? 'repo' : 'repos'} ({item.percentage}%)
                      </span>
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
