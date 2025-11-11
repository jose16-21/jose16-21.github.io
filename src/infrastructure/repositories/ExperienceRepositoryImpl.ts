import { ExperienceRepository } from '../../domain/repositories/ExperienceRepository';
import { ExperienceData } from '../../domain/entities/Experience';
import { experiencesData } from '../../data/experiences';

export class ExperienceRepositoryImpl implements ExperienceRepository {
  async getExperiences(): Promise<ExperienceData> {
    // Simulamos una llamada asíncrona como si fuera un servicio real
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(experiencesData);
      }, 100);
    });
  }
}
