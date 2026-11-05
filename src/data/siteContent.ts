export interface Metric { value: number; label: string; }
export interface Honor { icon: string; title: string; subtitle: string; }

export const defaultRoles: string[] = [
  'Independent Researcher',
  'Innovator & Builder',
  'Mechanical Engineering',
  'Certified First Aid Responder',
  'Indian Scientist (Aspirant)',
  'National Martial Artist',
  'World Record Holder',
];

export const defaultMetrics: Metric[] = [
  { value: 30, label: 'Projects Completed' },
  { value: 5, label: 'Active Research Themes' },
  { value: 20, label: 'Prototypes & Experiments' },
  { value: 8, label: 'Hackathons & Exhibitions' },
  { value: 7, label: 'Domains Explored' },
  { value: 5, label: 'Methodologies Applied' },
];

export const defaultHonors: Honor[] = [
  { icon: 'Trophy', title: 'World Record Holder', subtitle: 'Distinction' },
  { icon: 'HeartPulse', title: 'Certified First Aid Responder', subtitle: 'Certification' },
  { icon: 'Medal', title: 'National Martial Artist', subtitle: 'Achievement' },
];

export const honorIconNames = ['Trophy', 'Medal', 'HeartPulse', 'Award', 'Star', 'Shield', 'Rocket', 'GraduationCap', 'Lightbulb', 'Crown'] as const;
