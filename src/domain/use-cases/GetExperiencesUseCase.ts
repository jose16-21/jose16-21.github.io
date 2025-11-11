import { ExperienceRepository } from '../repositories/ExperienceRepository';
import { ExperienceData } from '../entities/Experience';

export class GetExperiencesUseCase {
  constructor(private experienceRepository: ExperienceRepository) {}

  async execute(): Promise<ExperienceData> {
    return await this.experienceRepository.getExperiences();
  }
}
