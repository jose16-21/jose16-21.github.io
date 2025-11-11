import { ExperienceData } from '../entities/Experience';

export interface ExperienceRepository {
  getExperiences(): Promise<ExperienceData>;
}
