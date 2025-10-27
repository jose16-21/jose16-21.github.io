import { Service, ServiceCategory } from '../entities/Service';

export interface ServiceRepository {
  getAll(): Promise<Service[]>;
  getById(id: string): Promise<Service | null>;
  getByCategory(category: ServiceCategory): Promise<Service[]>;
  getFeatured(): Promise<Service[]>;
  getCategories(): Promise<ServiceCategory[]>;
}
