import { Service, ServiceCategory } from '../entities/Service';

export interface CategoryConfig {
  id: ServiceCategory;
  icon: string;
  label: string;
}

export interface ServiceRepository {
  getAll(): Promise<Service[]>;
  getById(id: string): Promise<Service | null>;
  getByCategory(category: ServiceCategory): Promise<Service[]>;
  getFeatured(): Promise<Service[]>;
  getCategories(): Promise<ServiceCategory[]>;
  getCategoryConfigs(): Promise<CategoryConfig[]>;
}
