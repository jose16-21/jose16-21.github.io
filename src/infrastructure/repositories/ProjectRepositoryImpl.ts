import { ProjectRepository } from '../../domain/repositories/ProjectRepository';
import { ProjectsData } from '../../domain/entities/Project';
import { projectsData } from '../../data/projects';

export class ProjectRepositoryImpl implements ProjectRepository {
  async getProjects(): Promise<ProjectsData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(projectsData);
      }, 100);
    });
  }
}
