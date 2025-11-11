export interface Project {
  id: number;
  title: string;
  company: string;
  country: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  icon: string;
  url?: string;
  delay: number;
}

export interface ProjectsData {
  projects: Project[];
}
