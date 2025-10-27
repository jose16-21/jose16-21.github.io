import { Service, ServiceCategory } from '../entities/Service';
import { ServiceRepository, CategoryConfig } from '../repositories/ServiceRepository';

export class GetServicesUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(category?: ServiceCategory): Promise<Service[]> {
    if (category) {
      return await this.serviceRepository.getByCategory(category);
    }
    return await this.serviceRepository.getAll();
  }

  async executeById(id: string): Promise<Service | null> {
    return await this.serviceRepository.getById(id);
  }

  async executeFeatured(): Promise<Service[]> {
    return await this.serviceRepository.getFeatured();
  }

  async executeGetCategories(): Promise<ServiceCategory[]> {
    return await this.serviceRepository.getCategories();
  }

  async executeGetCategoryConfigs(): Promise<CategoryConfig[]> {
    return await this.serviceRepository.getCategoryConfigs();
  }
}
