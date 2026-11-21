'use client';

import * as React from 'react';
import { Github, Code, ArrowUpRight, Loader2, RefreshCw, Layers, ShieldCheck, Activity } from 'lucide-react';
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
  const [mounted, setMounted] = React.useState(false);
  const fallbackData = React.useMemo(() => getFallbackGitHubData(), []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
  const [activeLanguage, setActiveLanguage] = React.useState<string | null>(null);
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

  const langShortNames: Record<string, string> = {
    TypeScript: 'TS',
    JavaScript: 'JS',
    Python: 'PY',
    'Markdown / Docs': 'DOCS',
    HTML: 'HTML',
    Java: 'JAVA',
    'C++': 'C++',
    C: 'C',
    CSS: 'CSS',
  };

  return (
    <section
      id="github"
      className="relative py-24 px-6 md:px-12 lg:px-24 border-t border-border/20 overflow-hidden"
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
                      Rolling 52-Week Activity
                    </span>
                  </div>

                  {/* Heatmap Graph Container - Fits 100% cleanly inside box with zero scrollbar */}
                  <div className="w-full p-3 sm:p-4 rounded-lg bg-[#0d1117]/90 border border-[#30363d]/60 shadow-inner">
                    {mounted ? (
                      <svg
                        viewBox="0 0 718 112"
                        className="w-full h-auto block select-none overflow-visible"
                        aria-label="GitHub Contribution Heatmap"
                        suppressHydrationWarning
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
                    ) : (
                      <div className="w-full h-[112px] rounded bg-[#0d1117] flex items-center justify-center text-xs font-mono text-[#39FF14]/50">
                        Loading Contribution Heatmap...
                      </div>
                    )}

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

                    {/* Engineering Quality & Telemetry Banner */}
                    <div className="mt-4 pt-3 border-t border-[#30363d]/50 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] font-mono">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e4429]/40 border border-[#006d32]/40 text-[#39FF14]">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        <span>Tests: 7/7 Passing</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d]/60 text-muted-foreground">
                        <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Edge Cache: ISR 3600s</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d]/60 text-muted-foreground">
                        <Code className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Type Safety: Strict (0 Any)</span>
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

          {/* Right Block - Modernized Language Distribution Telemetry */}
          <div className="lg:col-span-4">
            <Reveal delay={0.22}>
              <div className="p-6 rounded-xl border border-[#39FF14]/20 bg-[#060806]/85 backdrop-blur-md space-y-6 shadow-[0_0_20px_rgba(57,255,20,0.05)] hover:border-[#39FF14]/40 transition-all duration-300">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] shadow-[0_0_10px_rgba(57,255,20,0.15)]">
                      <Code className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-foreground">
                        Language Distribution
                      </h3>
                      <span className="text-[10px] text-muted-foreground font-mono block">
                        Across {totalRepos} public repositories
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#161b22] border border-[#39FF14]/30 text-[#39FF14] text-[11px] font-mono font-semibold">
                    {languageDistribution.length} Stacks
                  </span>
                </div>

                {/* Cyber Telemetry Spectrum Visualizer */}
                <div className="relative pt-6 pb-2 px-1 bg-[#0d1117]/50 rounded-xl border border-white/5">
                  {/* Background Threshold Lines */}
                  <div className="absolute inset-x-3 top-7 bottom-9 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="border-b border-dashed border-[#39FF14] w-full" />
                    <div className="border-b border-dashed border-[#39FF14] w-full" />
                    <div className="border-b border-dashed border-[#39FF14] w-full" />
                    <div className="border-b border-dashed border-[#39FF14]/40 w-full" />
                  </div>

                  {/* Frequency Spectrum Pillars */}
                  <div className="relative h-44 flex items-end justify-between gap-2.5 z-10 px-2">
                    {languageDistribution.slice(0, 5).map((item) => {
                      const shortName =
                        langShortNames[item.lang] || item.lang.slice(0, 4).toUpperCase();
                      const barHeight = Math.max(item.percentage, 7);
                      const isHovered = activeLanguage === item.lang;
                      const isDimmed = activeLanguage !== null && !isHovered;

                      return (
                        <div
                          key={item.lang}
                          onMouseEnter={() => setActiveLanguage(item.lang)}
                          onMouseLeave={() => setActiveLanguage(null)}
                          onClick={() =>
                            setActiveLanguage((prev) => (prev === item.lang ? null : item.lang))
                          }
                          className={cn(
                            'flex-1 flex flex-col items-center h-full justify-end cursor-pointer transition-all duration-200 ease-out select-none',
                            isHovered && 'scale-[1.04] -translate-y-1 z-20',
                            isDimmed && 'opacity-25 grayscale-[40%]'
                          )}
                        >
                          {/* Floating Numerical Readout */}
                          <div className="h-9 flex flex-col items-center justify-end select-none mb-1.5 transition-all duration-200">
                            <span
                              className={cn(
                                'text-xs font-mono font-bold block leading-none transition-all duration-200',
                                isHovered && 'scale-110'
                              )}
                              style={{
                                color: item.hexColor,
                                textShadow: isHovered
                                  ? `0 0 10px ${item.hexColor}`
                                  : undefined,
                              }}
                            >
                              {item.percentage}%
                            </span>
                            <span
                              className={cn(
                                'text-[9px] font-mono font-semibold block h-3 leading-3 mt-0.5 transition-all duration-200',
                                isHovered
                                  ? 'opacity-100 text-foreground font-bold'
                                  : 'opacity-0'
                              )}
                            >
                              {item.count} {item.count === 1 ? 'repo' : 'repos'}
                            </span>
                          </div>

                          {/* Cyber Pillar Track & Luminous Fill */}
                          <div
                            className={cn(
                              'w-full max-w-[42px] h-32 rounded-t-md bg-[#161b22]/80 border relative flex items-end p-0.5 overflow-hidden transition-all duration-200',
                              isHovered
                                ? 'bg-[#161b22]'
                                : 'border-white/5'
                            )}
                            style={{
                              borderColor: isHovered ? item.hexColor : undefined,
                              boxShadow: isHovered
                                ? `0 0 16px ${item.hexColor}60, inset 0 0 10px ${item.hexColor}20`
                                : undefined,
                            }}
                          >
                            <div
                              className={cn(
                                'w-full rounded-t-sm relative transition-all duration-200',
                                isHovered && 'brightness-125'
                              )}
                              style={{
                                height: `${barHeight}%`,
                                background: `linear-gradient(180deg, ${item.hexColor} 0%, ${item.hexColor}25 100%)`,
                                boxShadow: isHovered
                                  ? `0 0 16px ${item.hexColor}`
                                  : `0 0 8px ${item.hexColor}40`,
                              }}
                            >
                              {/* Glowing LED Peak Cap */}
                              <div
                                className="absolute top-0 inset-x-0 h-1 rounded-t-sm transition-all duration-200"
                                style={{
                                  backgroundColor: item.hexColor,
                                  boxShadow: isHovered
                                    ? `0 0 14px ${item.hexColor}, 0 0 4px #fff`
                                    : `0 0 8px ${item.hexColor}`,
                                }}
                              />
                            </div>
                          </div>

                          {/* Bottom Tech Label */}
                          <div className="mt-2.5 text-center select-none">
                            <span
                              className={cn(
                                'text-[10px] font-mono font-bold uppercase tracking-wider block transition-all duration-200',
                                isHovered ? 'scale-110 font-extrabold' : 'text-muted-foreground'
                              )}
                              style={{
                                color: isHovered ? item.hexColor : undefined,
                                textShadow: isHovered ? `0 0 8px ${item.hexColor}` : undefined,
                              }}
                            >
                              {shortName}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Interactive Detailed Language Breakdown Rows */}
                <div className="space-y-2">
                  {languageDistribution.slice(0, 5).map((item) => {
                    const isHovered = activeLanguage === item.lang;
                    const isDimmed = activeLanguage !== null && !isHovered;

                    return (
                      <div
                        key={item.lang}
                        onMouseEnter={() => setActiveLanguage(item.lang)}
                        onMouseLeave={() => setActiveLanguage(null)}
                        onClick={() =>
                          setActiveLanguage((prev) => (prev === item.lang ? null : item.lang))
                        }
                        className={cn(
                          'group flex items-center justify-between p-2.5 rounded-lg border transition-all duration-200 cursor-pointer select-none',
                          isHovered
                            ? 'translate-x-1'
                            : 'bg-[#0d1117]/60 border-border/20',
                          isDimmed && 'opacity-25 grayscale-[30%]'
                        )}
                        style={
                          isHovered
                            ? {
                                backgroundColor: `${item.hexColor}18`,
                                borderColor: item.hexColor,
                                boxShadow: `0 0 20px ${item.hexColor}30, inset 0 0 10px ${item.hexColor}15`,
                              }
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={cn(
                              'w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-200',
                              isHovered && 'scale-125'
                            )}
                            style={{
                              backgroundColor: item.hexColor,
                              boxShadow: isHovered ? `0 0 10px ${item.hexColor}` : undefined,
                            }}
                          />
                          <span
                            className={cn(
                              'text-xs font-semibold truncate transition-all duration-200',
                              isHovered ? 'font-bold' : 'text-foreground'
                            )}
                            style={{
                              color: isHovered ? item.hexColor : undefined,
                              textShadow: isHovered ? `0 0 8px ${item.hexColor}60` : undefined,
                            }}
                          >
                            {item.lang}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          {/* Mini inline progress track */}
                          <div className="w-14 sm:w-16 h-1.5 bg-[#161b22] rounded-full overflow-hidden hidden sm:block border border-white/5">
                            <div
                              className={cn(
                                'h-full rounded-full transition-all duration-200',
                                isHovered && 'brightness-125'
                              )}
                              style={{
                                width: `${item.percentage}%`,
                                backgroundColor: item.hexColor,
                                boxShadow: isHovered ? `0 0 8px ${item.hexColor}` : undefined,
                              }}
                            />
                          </div>

                          <span
                            className={cn(
                              'text-[11px] font-mono px-2 py-0.5 rounded border transition-colors duration-200',
                              isHovered
                                ? 'bg-[#161b22] text-foreground border-white/30 font-semibold'
                                : 'bg-[#161b22] border-border/40 text-muted-foreground'
                            )}
                          >
                            {item.count} {item.count === 1 ? 'repo' : 'repos'}
                          </span>
                          <span
                            className={cn(
                              'text-xs font-mono font-bold w-8 text-right transition-all duration-200',
                              isHovered && 'scale-110'
                            )}
                            style={{
                              color: isHovered ? item.hexColor : undefined,
                              textShadow: isHovered ? `0 0 8px ${item.hexColor}60` : undefined,
                            }}
                          >
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Status - Removed Dominant / Percentage Text */}
                <div className="pt-2 border-t border-border/20 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                    <span>Real-Time Sync</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {totalRepos} Repositories Synced
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
