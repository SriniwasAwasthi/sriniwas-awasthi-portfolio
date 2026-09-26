import { NextResponse } from 'next/server';
import {
  GITHUB_USERNAME,
  TARGET_TOTAL_CONTRIBUTIONS,
  FALLBACK_REPOSITORIES,
  DisplayRepo,
  langColors,
  buildContributionCalendar,
  calculateLanguageDistribution,
} from '@/lib/github';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 minutes cache

export async function GET() {
  try {
    let rawContribs: Array<{ date?: string; count?: number; level?: number }> = [];
    let publicRepos = 18;
    let fetchedRepos: DisplayRepo[] = [];

    // 1. Fetch user repositories from GitHub REST API
    try {
      const reposRes = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        {
          headers: {
            'User-Agent': 'SriniwasAwasthi-Portfolio',
            Accept: 'application/vnd.github.v3+json',
          },
          next: { revalidate: 300 },
        }
      );

      if (reposRes.ok) {
        const reposData = await reposRes.json();
        if (Array.isArray(reposData) && reposData.length > 0) {
          publicRepos = reposData.length;
          fetchedRepos = reposData.map((repo: Record<string, any>) => {
            const lang = repo.language || 'Code';
            const dateObj = new Date(repo.updated_at || Date.now());
            const formattedDate = `Updated ${dateObj.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}`;

            return {
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
        }
      }
    } catch (_repoErr) {
      // Keep fallback
    }

    // 2. Fetch live contributions from jogruber API with ?y=last
    try {
      const contribRes = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
        {
          next: { revalidate: 300 },
        }
      );

      if (contribRes.ok) {
        const contribData = await contribRes.json();
        if (contribData && Array.isArray(contribData.contributions)) {
          rawContribs = contribData.contributions;
        }
      }
    } catch (_contribErr) {
      // Keep baseline
    }

    const calendar = buildContributionCalendar(rawContribs, TARGET_TOTAL_CONTRIBUTIONS);
    const finalRepos = fetchedRepos.length > 0 ? fetchedRepos : FALLBACK_REPOSITORIES;
    const finalLangDist = calculateLanguageDistribution(finalRepos);

    return NextResponse.json(
      {
        totalContributions: calendar.totalContributions,
        contributions: calendar.days,
        monthLabels: calendar.monthLabels,
        publicRepos: Math.max(publicRepos, finalRepos.length),
        repos: finalRepos,
        languageDistribution: finalLangDist,
        isLive: true,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    const calendar = buildContributionCalendar([], TARGET_TOTAL_CONTRIBUTIONS);
    const langDist = calculateLanguageDistribution(FALLBACK_REPOSITORIES);

    return NextResponse.json(
      {
        totalContributions: TARGET_TOTAL_CONTRIBUTIONS,
        contributions: calendar.days,
        monthLabels: calendar.monthLabels,
        publicRepos: 18,
        repos: FALLBACK_REPOSITORIES,
        languageDistribution: langDist,
        isLive: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 200 }
    );
  }
}
