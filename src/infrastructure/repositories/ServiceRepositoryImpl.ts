import { Service, ServiceCategory } from '../../domain/entities/Service';
import { ServiceRepository, CategoryConfig } from '../../domain/repositories/ServiceRepository';
import { servicesData, serviceCategories, categoryConfigs } from '../../data/services';

export class ServiceRepositoryImpl implements ServiceRepository {
  async getAll(): Promise<Service[]> {
    return Promise.resolve(servicesData);
  }

  async getById(id: string): Promise<Service | null> {
    const service = servicesData.find(s => s.id === id);
    return Promise.resolve(service || null);
  }

  async getByCategory(category: ServiceCategory): Promise<Service[]> {
    const filtered = servicesData.filter(s => s.category === category);
    return Promise.resolve(filtered);
  }

  async getFeatured(): Promise<Service[]> {
    const featured = servicesData.filter(s => s.featured);
    return Promise.resolve(featured);
  }

  async getCategories(): Promise<ServiceCategory[]> {
    return Promise.resolve(serviceCategories);
  }

  async getCategoryConfigs(): Promise<CategoryConfig[]> {
    return Promise.resolve(categoryConfigs);
  }
}
