import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { siteConfig } from '../config/site.ts';

test('Contact Form Resilience: verifies honest error handling and no fake success states', () => {
  const contactFilePath = path.resolve('features/contact/ContactSection.tsx');
  const source = fs.readFileSync(contactFilePath, 'utf-8');

  // Verify catch block does NOT set submitted=true (the bug that was fixed)
  assert.doesNotMatch(
    source,
    /catch\s*\([^)]*\)\s*\{[^}]*setSubmitted\s*\(\s*true\s*\)/s,
    'Catch block must never set submitted to true'
  );

  // Verify error state is populated on catch
  assert.match(
    source,
    /setErrorMessage\s*\(/,
    'Catch block must set an informative errorMessage'
  );

  // Verify direct email fallback links exist
  assert.ok(
    source.includes('directGmailUrl') && source.includes('directMailtoUrl'),
    'Must provide pre-filled direct Gmail and Mailto fallback links'
  );

  // Verify siteConfig has a valid email link
  assert.ok(
    siteConfig.links.email.startsWith('mailto:'),
    'siteConfig.links.email must be a valid mailto URI'
  );
  assert.ok(
    siteConfig.links.email.includes('@'),
    'siteConfig.links.email must contain a valid domain'
  );
});
