import test from 'node:test';
import assert from 'node:assert/strict';

// Portfolio structure & metadata validation tests
const PORTFOLIO_CONFIG = {
  developer: 'Sriniwas Awasthi',
  title: 'Full-Stack & AI Systems Architect',
  college: 'PDA College of Engineering',
  socials: {
    github: 'https://github.com/SriniwasAwasthi',
    linkedin: 'https://www.linkedin.com/in/sriniwas-awasthi/',
    email: 'sriawasthi164@gmail.com'
  },
  flagshipProjects: [
    'java-dsa-tracker',
    'amber-and-herb',
    'stellar-assault-space-shooter',
    'kixtra-studio',
    'book-matrix-lms'
  ]
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
  const requiredResumes = ['SRINIWAS_Resume.pdf', 'resume.pdf', 'SRINIWAS_AWASTHI_RESUME.pdf'];

  for (const filename of requiredResumes) {
    const fullPath = path.join(publicDir, filename);
    assert.ok(fs.existsSync(fullPath), `Resume file ${filename} must exist in public/`);
    const stats = fs.statSync(fullPath);
    assert.ok(stats.size > 50000, `Resume file ${filename} should be the new ATS single-page version (>50KB, got ${stats.size} bytes)`);
  }
});
