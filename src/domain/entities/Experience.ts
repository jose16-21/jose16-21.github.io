export interface ExperienceItem {
  id: number;
  period: string;
  title: string;
  company: string;
  companyUrl?: string;
  companyLogo?: string;
  description: string;
  skills: string[];
  delay: number;
}

export interface Achievement {
  icon: string;
  title: string;
  description: string;
}

export interface DevOpsTool {
  name: string;
  icon: string;
  color: string;
}

export interface ExperienceData {
  timeline: ExperienceItem[];
  achievements: Achievement[];
  devopsTools: DevOpsTool[];
}
