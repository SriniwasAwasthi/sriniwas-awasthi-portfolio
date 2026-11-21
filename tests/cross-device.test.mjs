import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { educationInfo } from '../content/education.ts';

test('Cross-Device Verification: clipboard fallback and responsive viewport safeguards', () => {
  const utilsPath = path.resolve('lib/utils.ts');
  const utilsSource = fs.readFileSync(utilsPath, 'utf-8');

  // Verify universal clipboard copy helper exists and has execCommand fallback
  assert.ok(
    utilsSource.includes('export async function copyToClipboard'),
    'Must export copyToClipboard helper'
  );
  assert.ok(
    utilsSource.includes("document.execCommand('copy')"),
    'Must support fallback for iOS Safari and Android WebViews'
  );

  // Verify Hero has direct Resume CTA and uses copyToClipboard
  const heroPath = path.resolve('features/hero/Hero.tsx');
  const heroSource = fs.readFileSync(heroPath, 'utf-8');
  assert.ok(
    heroSource.includes('copyToClipboard'),
    'Hero must use safe cross-device copyToClipboard'
  );
  assert.ok(
    heroSource.includes('Resume (PDF)'),
    'Hero must feature direct Resume (PDF) CTA button'
  );

  // Verify Education graduation date consistency
  assert.ok(
    educationInfo.duration.includes('Expected June 2028'),
    'Education duration must consistently specify Expected June 2028'
  );

  // Verify Philosophy card stack mobile responsiveness
  const philosophyPath = path.resolve('features/about/PhilosophySection.tsx');
  const philosophySource = fs.readFileSync(philosophyPath, 'utf-8');
  assert.ok(
    philosophySource.includes('mobileClickOnly={true}'),
    'Philosophy stack must enable mobileClickOnly to prevent touch-scroll drag conflicts'
  );
});
