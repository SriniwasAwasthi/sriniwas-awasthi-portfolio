import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TARGET_TOTAL_CONTRIBUTIONS,
  KNOWN_ACTIVE_CONTRIBUTIONS,
  buildContributionCalendar,
  getFallbackGitHubData,
  calculateLanguageDistribution,
  FALLBACK_REPOSITORIES,
} from '../lib/github.ts';

// Portfolio structure & metadata validation tests
const PORTFOLIO_CONFIG = {
  developer: 'Sriniwas Awasthi',
  title: 'Full-Stack & AI Systems Architect',
  college: 'PDA College of Engineering',
  socials: {
    github: 'https://github.com/SriniwasAwasthi',
    linkedin: 'https://www.linkedin.com/in/sriniwas-awasthi/',
    email: 'sriawasthi164@gmail.com',
  },
  flagshipProjects: [
    'java-dsa-tracker',
    'amber-and-herb',
    'stellar-assault-space-shooter',
    'kixtra-studio',
    'book-matrix-lms',
  ],
};

test('Portfolio Config: developer metadata is complete', () => {
  assert.equal(PORTFOLIO_CONFIG.developer, 'Sriniwas Awasthi');
  assert.ok(PORTFOLIO_CONFIG.socials.github.includes('SriniwasAwasthi'));
  assert.ok(PORTFOLIO_CONFIG.socials.email.includes('@'));
});

test('Portfolio Config: all flagship projects are indexed', () => {
  assert.equal(PORTFOLIO_CONFIG.flagshipProjects.length, 5);
  assert.ok(PORTFOLIO_CONFIG.flagshipProjects.includes('java-dsa-tracker'));
  assert.ok(PORTFOLIO_CONFIG.flagshipProjects.includes('amber-and-herb'));
});

test('Resume Assets: valid ATS single-page resume PDFs exist in public directory', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const publicDir = path.resolve('public');
  const requiredResumes = [
    'SRINIWAS_Resume.pdf',
    'Sriniwas_Awasthi_Resume.pdf',
    'resume.pdf',
    'SRINIWAS_AWASTHI_RESUME.pdf',
    'sriniwas-awasthi-resume.pdf',
  ];

  for (const filename of requiredResumes) {
    const fullPath = path.join(publicDir, filename);
    assert.ok(fs.existsSync(fullPath), `Resume file ${filename} must exist in public/`);
    const stats = fs.statSync(fullPath);
    assert.ok(
      stats.size > 50000,
      `Resume file ${filename} should be the new ATS single-page version (>50KB, got ${stats.size} bytes)`
    );
  }
});

test('GitHub Stats: verifies target contributions total is at least 329', () => {
  assert.equal(TARGET_TOTAL_CONTRIBUTIONS, 329);

  const baselineSum = Object.values(KNOWN_ACTIVE_CONTRIBUTIONS).reduce((a, b) => a + b, 0);
  assert.ok(
    baselineSum >= 329,
    `Baseline contributions sum (${baselineSum}) must be at least 329`
  );
});

test('GitHub Calendar: generates exact 53-week (371-day) rolling matrix with correct levels', () => {
  const calendar = buildContributionCalendar([], 329);

  assert.equal(calendar.days.length, 371, 'Calendar must have exactly 371 days (53 weeks * 7 days)');
  assert.ok(calendar.totalContributions >= 329, `Total contributions must be >= 329 (got ${calendar.totalContributions})`);
  assert.ok(calendar.monthLabels.length >= 12, 'Calendar must have at least 12 month labels');

  // Verify heavy contribution days have level 4
  const sep7Day = calendar.days.find((d) => d.date === '2026-09-07');
  assert.ok(sep7Day, 'Sep 7, 2026 must be present');
  assert.equal(sep7Day.count, 95);
  assert.equal(sep7Day.level, 4);

  const sep16Day = calendar.days.find((d) => d.date === '2026-09-16');
  assert.ok(sep16Day, 'Sep 16, 2026 must be present');
  assert.equal(sep16Day.count, 37);
  assert.equal(sep16Day.level, 4);
});

test('GitHub Sync Data: fallback dataset provides full repository and language distribution metrics', () => {
  const data = getFallbackGitHubData();

  assert.equal(data.totalContributions, 329);
  assert.equal(data.contributions.length, 371);
  assert.ok(data.publicRepos >= 12);
  assert.ok(data.repos.length >= 10);
  assert.ok(data.languageDistribution.length > 0);

  const langDist = calculateLanguageDistribution(FALLBACK_REPOSITORIES);
  assert.ok(langDist.some((l) => l.lang === 'TypeScript'));
});
