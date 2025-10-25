import { Product, ProductCategory } from '../entities/Product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  getByCategory(category: ProductCategory): Promise<Product[]>;
  getFeatured(): Promise<Product[]>;
}
