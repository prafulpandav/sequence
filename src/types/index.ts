export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  stats: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
