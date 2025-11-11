import { ProjectsData } from '../entities/Project';

export interface ProjectRepository {
  getProjects(): Promise<ProjectsData>;
}
