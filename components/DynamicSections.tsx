'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AboutSection } from '@/features/about/AboutSection';
import { SkillsSection } from '@/features/skills/SkillsSection';
import { AIEcosystem } from '@/features/skills/AIEcosystem';
import { ProjectsSection } from '@/features/projects/ProjectsSection';
import { GithubSection } from '@/features/github/GithubSection';
import { AchievementsSection } from '@/features/timeline/AchievementsSection';
import { EducationSection } from '@/features/education/EducationSection';
import { JourneyTimeline } from '@/features/timeline/JourneyTimeline';
import { PhilosophySection } from '@/features/about/PhilosophySection';
import { ContactSection } from '@/features/contact/ContactSection';

/**
 * Sections container with error boundary isolation for each major area.
 * Pre-rendered and isolated to guarantee rock-solid stability and butter-smooth scrolling.
 */
export function DynamicSections() {
  return (
    <>
      <ErrorBoundary sectionName="About">
        <AboutSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Skills">
        <SkillsSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="AI Ecosystem">
        <AIEcosystem />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Projects">
        <ProjectsSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="GitHub">
        <GithubSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Achievements">
        <AchievementsSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Education">
        <EducationSection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Journey Timeline">
        <JourneyTimeline />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Philosophy">
        <PhilosophySection />
      </ErrorBoundary>

      <ErrorBoundary sectionName="Contact">
        <ContactSection />
      </ErrorBoundary>
    </>
  );
}
