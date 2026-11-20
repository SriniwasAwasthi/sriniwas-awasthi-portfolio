/**
 * ─────────────────────────────────────────────
 * EDUCATION DATA
 * ─────────────────────────────────────────────
 * Update `institution`, `degree`, `duration`, `coursework`,
 * and `nowLearning` here to keep the Education section current.
 * No component layout changes are needed.
 * ─────────────────────────────────────────────
 */

export interface CourseEntry {
  topic: string;
  status: string;
}

export const educationInfo = {
  degree: 'Bachelor of Engineering (B.E.)',
  field: 'Computer Science & Engineering',
  institution: 'P.D.A College of Engineering',
  location: 'Kalaburagi, Karnataka',
  duration: 'Undergraduate Program (Expected 2027 / 2028)',
};

/** Relevant coursework list displayed on the education card */
export const coursework: string[] = [
  'Data Structures & Algorithms (Java)',
  'Object-Oriented Programming (Java)',
  'Database Management Systems (SQL)',
  'Web Development & Web Systems',
  'Discrete Mathematical Structures',
];

/**
 * "Current Focus" tracker entries.
 * Add or update topics here — the component renders them dynamically.
 */
export const nowLearning: CourseEntry[] = [
  { topic: 'Java & Data Structures (DSA)', status: 'Core Focus · Daily Practice' },
  { topic: 'Full Stack Web Apps (Next.js & TS)', status: 'Active Project Work' },
  { topic: 'AI Agents & Gemini Integrations', status: 'Workflow Automation & Tools' },
  { topic: 'E-commerce & Systems Architecture', status: 'Building Production Web Apps' },
];
