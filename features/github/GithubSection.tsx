'use client';

import * as React from 'react';
import { Github, Code, ArrowUpRight, Loader2, RefreshCw } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import { cn } from '@/lib/utils';
import {
  fetchLiveGitHubStats,
  getFallbackGitHubData,
  ContributionDay,
  DisplayRepo,
  LanguageStat,
  TARGET_TOTAL_CONTRIBUTIONS,
  GITHUB_USERNAME,
} from '@/lib/github';

export function GithubSection() {
  const fallbackData = React.useMemo(() => getFallbackGitHubData(), []);

  const [contributions, setContributions] = React.useState<ContributionDay[]>(
    fallbackData.contributions
  );
  const [monthLabels, setMonthLabels] = React.useState(fallbackData.monthLabels);
  const [totalContributions, setTotalContributions] = React.useState<number>(
    TARGET_TOTAL_CONTRIBUTIONS
  );
  const [repos, setRepos] = React.useState<DisplayRepo[]>(fallbackData.repos);
  const [publicReposCount, setPublicReposCount] = React.useState<number>(fallbackData.publicRepos);
  const [languageDistribution, setLanguageDistribution] = React.useState<LanguageStat[]>(
    fallbackData.languageDistribution
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isLive, setIsLive] = React.useState<boolean>(true);

  // Sync real-time contributions and repositories from live API on mount
  React.useEffect(() => {
    let isMounted = true;

    async function syncGitHubData() {
      try {
        setLoading(true);
        const data = await fetchLiveGitHubStats();
        if (isMounted) {
          if (data.totalContributions > 0) {
            setTotalContributions(data.totalContributions);
          }
          if (Array.isArray(data.contributions) && data.contributions.length > 0) {
            setContributions(data.contributions);
          }
          if (Array.isArray(data.monthLabels) && data.monthLabels.length > 0) {
            setMonthLabels(data.monthLabels);
          }
          if (Array.isArray(data.repos) && data.repos.length > 0) {
            setRepos(data.repos);
          }
          if (data.publicRepos > 0) {
            setPublicReposCount(data.publicRepos);
          }
          if (Array.isArray(data.languageDistribution) && data.languageDistribution.length > 0) {
            setLanguageDistribution(data.languageDistribution);
          }
          setIsLive(data.isLive);
        }
      } catch (_err) {
        if (isMounted) {
          setIsLive(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    syncGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalRepos = Math.max(publicReposCount, repos.length);
  const topLanguage = languageDistribution[0]?.lang || 'TypeScript';

  const CIRCUMFERENCE = 251.327;
  let cumulativeOffset = 0;
  const pieSegments = languageDistribution.map((item) => {
    const dashLength = (item.count / (totalRepos || 1)) * CIRCUMFERENCE;
    const offset = -cumulativeOffset;
    cumulativeOffset += dashLength;
    return {
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
                {isLive ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
                    <span>GitHub API: Live Synchronized</span>
                  </>
                ) : (
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
              {totalRepos} public repositories on @{GITHUB_USERNAME}.
            </p>
          </div>
        </Reveal>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Block - Stats Summary & Contributions Heatmap */}
          <div className="lg:col-span-8 space-y-6">
            <Reveal delay={0.15}>
              <div className="p-6 rounded-xl border border-[#39FF14]/20 bg-[#060806]/90 backdrop-blur-md space-y-6 shadow-[0_0_20px_rgba(57,255,20,0.05)]">
                {/* Stats Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <Github className="w-5 h-5 text-[#39FF14]" />
                    <span>GitHub Profile Live Stats</span>
                  </div>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#39FF14] font-bold tracking-wider hover:underline flex items-center gap-1 transition-transform hover:translate-x-0.5"
                  >
                    @{GITHUB_USERNAME}
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

                {/* Contribution Heatmap Container */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-bold tracking-wider uppercase block font-heading">
                      {totalContributions} contributions in the last year
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Sep 2025 – Sep 2026
                    </span>
                  </div>

                  {/* Heatmap Graph Container - Fits 100% cleanly inside box with zero scrollbar */}
                  <div className="w-full p-3 sm:p-4 rounded-lg bg-[#0d1117]/90 border border-[#30363d]/60 shadow-inner">
                    <svg
                      viewBox="0 0 718 112"
                      className="w-full h-auto block select-none overflow-visible"
                      aria-label="GitHub Contribution Heatmap"
                    >
                      {/* Month Labels */}
                      {monthLabels.map((item, idx) => (
                        <text
                          key={idx}
                          x={32 + item.col * 12.8}
                          y={11}
                          fontSize="9.5"
                          fill="#8b949e"
                          fontFamily="monospace"
                          textAnchor="start"
                        >
                          {item.month}
                        </text>
                      ))}

                      {/* Weekday Labels */}
                      <text
                        x={24}
                        y={39}
                        fontSize="9"
                        fill="#8b949e"
                        fontFamily="monospace"
                        textAnchor="end"
                      >
                        Mon
                      </text>
                      <text
                        x={24}
                        y={64.5}
                        fontSize="9"
                        fill="#8b949e"
                        fontFamily="monospace"
                        textAnchor="end"
                      >
                        Wed
                      </text>
                      <text
                        x={24}
                        y={90}
                        fontSize="9"
                        fill="#8b949e"
                        fontFamily="monospace"
                        textAnchor="end"
                      >
                        Fri
                      </text>

                      {/* Contribution Day Cells (53 weeks x 7 days) */}
                      {contributions.map((day, idx) => {
                        const x = 32 + day.col * 12.8;
                        const y = 20 + day.row * 12.8;

                        let fill = '#161b22';
                        let stroke = '#30363d';
                        let strokeWidth = 0.6;
                        let strokeOpacity = 0.4;

                        if (day.level === 1) {
                          fill = '#0e4429';
                          stroke = '#006d32';
                          strokeWidth = 0.5;
                          strokeOpacity = 0.6;
                        } else if (day.level === 2) {
                          fill = '#006d32';
                          stroke = '#26a641';
                          strokeWidth = 0.5;
                          strokeOpacity = 0.8;
                        } else if (day.level === 3) {
                          fill = '#26a641';
                          stroke = '#39d353';
                          strokeWidth = 0.6;
                          strokeOpacity = 1;
                        } else if (day.level === 4) {
                          fill = '#39d353';
                          stroke = '#39FF14';
                          strokeWidth = 0.8;
                          strokeOpacity = 1;
                        }

                        return (
                          <rect
                            key={day.date || idx}
                            x={x}
                            y={y}
                            width={10}
                            height={10}
                            rx={2}
                            ry={2}
                            fill={fill}
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                            strokeOpacity={strokeOpacity}
                            className="cursor-pointer transition-all duration-150 hover:stroke-[#39FF14] hover:stroke-[1.5] hover:brightness-125"
                          >
                            <title>
                              {day.count === 0 ? 'No' : day.count} contribution
                              {day.count === 1 ? '' : 's'} on {day.formattedDate}
                            </title>
                          </rect>
                        );
                      })}
                    </svg>

                    {/* Heatmap Footer: Info & Legend */}
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-3 mt-2 border-t border-[#30363d]/40">
                      <a
                        href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#39FF14] transition-colors"
                      >
                        Learn how we count contributions
                      </a>

                      {/* Level Legend */}
                      <div className="flex items-center gap-1.5 select-none font-mono">
                        <span>Less</span>
                        <div
                          className="w-2.5 h-2.5 rounded-[2px] bg-[#161b22] border border-[#30363d]/40"
                          title="No contributions"
                        />
                        <div
                          className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429] border border-[#006d32]/50"
                          title="1-3 contributions"
                        />
                        <div
                          className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]"
                          title="4-9 contributions"
                        />
                        <div
                          className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641] shadow-[0_0_4px_#26a641]"
                          title="10-19 contributions"
                        />
                        <div
                          className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353] shadow-[0_0_6px_#39FF14]"
                          title="20+ contributions"
                        />
                        <span>More</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Repositories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {loading && repos.length === 0 ? (
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
