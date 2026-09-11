/**
 * Live GitHub Synchronizer Service
 * Automatically fetches real-time contributions and repository stats
 * with automatic fallback, multi-source calculation, and cache-busting.
 */

export interface GitHubSyncData {
  totalContributions: number;
  contributionsGrid: number[];
  publicRepos: number;
  isLive: boolean;
}

const GITHUB_USERNAME = 'SriniwasAwasthi';
const BASELINE_TOTAL = 269;

export async function fetchLiveGitHubStats(): Promise<GitHubSyncData> {
  let totalContributions = BASELINE_TOTAL;
  let contributionsGrid: number[] = [];
  let publicRepos = 16;
  let isLive = false;

  // 1. Fetch live user profile stats from GitHub REST API
  try {
    const userRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}?_t=${Date.now()}`,
      { cache: 'no-store' }
    );
    if (userRes.ok) {
      const userData = await userRes.json();
      if (typeof userData.public_repos === 'number' && userData.public_repos > 0) {
        publicRepos = userData.public_repos;
        isLive = true;
      }
    }
  } catch (_e) {
    // Keep fallback public repos
  }

  // 2. Fetch live contribution history from real-time API
  try {
    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?_t=${Date.now()}`,
      { cache: 'no-store' }
    );
    if (contribRes.ok) {
      const contribData = await contribRes.json();

      if (contribData) {
        let sumFromYears = 0;
        if (contribData.total && typeof contribData.total === 'object') {
          sumFromYears = Object.values(contribData.total as Record<string, number>).reduce(
            (acc, val) => (typeof val === 'number' ? acc + val : acc),
            0
          );
        }

        let sumFromDays = 0;
        if (Array.isArray(contribData.contributions) && contribData.contributions.length > 0) {
          sumFromDays = contribData.contributions.reduce(
            (acc: number, item: { count?: number }) => acc + (item.count || 0),
            0
          );

          // Extract rolling 364 days for the heatmap
          contributionsGrid = contribData.contributions
            .slice(-364)
            .map((item: { count?: number; level?: number }) => item.count || item.level || 0);
        }

        const computedTotal = Math.max(
          sumFromDays,
          sumFromYears,
          contribData.total?.lastYear || 0,
          BASELINE_TOTAL
        );

        if (computedTotal > 0) {
          totalContributions = computedTotal;
          isLive = true;
        }
      }
    }
  } catch (_e) {
    // Keep fallback
  }

  return {
    totalContributions,
    contributionsGrid,
    publicRepos,
    isLive,
  };
}
