import test from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig } from '../config/site.ts';

test('Mobile Navigation: verifies required 6 sections exist with correct labels and anchors', () => {
  const expectedSections = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'GITHUB', href: '#github' },
    { label: 'CONTACT', href: '#contact' },
  ];

  assert.equal(siteConfig.navItems.length, 6, 'Should have exactly 6 navigation items');

  expectedSections.forEach((expected, idx) => {
    const item = siteConfig.navItems[idx];
    assert.equal(
      item.label.toUpperCase(),
      expected.label,
      `Nav item ${idx} label should match ${expected.label}`
    );
    assert.equal(
      item.href,
      expected.href,
      `Nav item ${idx} href should match ${expected.href}`
    );
  });
});
