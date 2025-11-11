import { ProjectRepository } from '../repositories/ProjectRepository';
import { ProjectsData } from '../entities/Project';

export class GetProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(): Promise<ProjectsData> {
    return await this.projectRepository.getProjects();
  }
}
