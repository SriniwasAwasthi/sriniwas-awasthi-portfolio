import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { siteConfig } from '../config/site.ts';

test('Contact Form Resilience: verifies honest error handling and no fake success states', () => {
  const contactFilePath = path.resolve('features/contact/ContactSection.tsx');
  const source = fs.readFileSync(contactFilePath, 'utf-8');

  // Verify catch block does NOT set submitted=true
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

test('Contact Form Cross-Device & Network Interruption: verifies no autofill traps and network error handling', () => {
  const contactFilePath = path.resolve('features/contact/ContactSection.tsx');
  const source = fs.readFileSync(contactFilePath, 'utf-8');

  // Verify bot-field honeypot is completely removed so mobile autofill never gets dropped
  assert.doesNotMatch(
    source,
    /bot-field/,
    'bot-field honeypot must be completely removed to prevent mobile autofill drops'
  );

  // Verify exact required error message
  assert.ok(
    source.includes("There is a network issue; I can't send the data."),
    'Must display exact error message: "There is a network issue; I can\'t send the data."'
  );

  // Verify offline navigator check and AbortController timeout handling
  assert.ok(
    source.includes('navigator.onLine'),
    'Must check navigator.onLine for immediate network disconnection detection'
  );
  assert.ok(
    source.includes('AbortController'),
    'Must utilize AbortController to handle network delays and slow connection timeouts'
  );

  // Verify dual-path endpoint fallback
  assert.ok(
    source.includes('/__forms.html') && source.includes("fetch('/'"),
    'Must support dual-path endpoints (/__forms.html with fallback to /) for cross-device CDNs'
  );
});
