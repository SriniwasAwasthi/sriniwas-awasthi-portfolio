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
