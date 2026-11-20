/**
 * ─────────────────────────────────────────────
 * ACHIEVEMENTS DATA
 * ─────────────────────────────────────────────
 * To add a new achievement: append to the `achievements` array.
 * To add a future goal/placeholder: append to the `placeholders` array.
 *
 * icon values map to Lucide icon names — import them in the component.
 * ─────────────────────────────────────────────
 */

export interface Achievement {
  title: string;
  level: string;
  description: string;
  date: string;
  iconName: 'Trophy' | 'Award' | 'Star' | 'Medal';
  category: string;
}

export interface AchievementPlaceholder {
  label: string;
  description: string;
  iconName: 'Bookmark' | 'GitPullRequest' | 'FileText' | 'Mic' | 'Globe';
}

export const achievements: Achievement[] = [
  {
    title: '2nd Place — Techno Maze Competition',
    level: 'College Level Technical Event',
    description:
      'Designed logical pathway solutions under strict constraints, debugging algorithms in real-time to solve complex problems efficiently.',
    date: '2025',
    iconName: 'Trophy',
    category: 'Competition',
  },
  {
    title: '3rd Place — Mini Hackathon',
    level: 'Inter-department Hackathon',
    description:
      'Collaborated with a team to design and build a functional web solution within a 24-hour window, presenting to a jury panel.',
    date: '2025',
    iconName: 'Award',
    category: 'Hackathon',
  },
];

export const achievementPlaceholders: AchievementPlaceholder[] = [
  {
    label: 'Open-Source Tooling & Repositories',
    description: 'Maintaining 16+ public repositories with automated CI pipelines, strict TypeScript types, and clean Git history.',
    iconName: 'GitPullRequest',
  },
  {
    label: 'Algorithmic Problem-Solving Discipline',
    description: 'Continuous practice in Java & C++ focusing on optimal asymptotic time & space complexity guarantees.',
    iconName: 'Bookmark',
  },
  {
    label: 'Applied AI Tooling & Prompt Contracts',
    description: 'Engineering structured JSON schema RPC validation and hybrid model fallbacks for desktop voice agents.',
    iconName: 'FileText',
  },
];
