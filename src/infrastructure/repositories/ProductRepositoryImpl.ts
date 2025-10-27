import { Product, ProductCategory } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { products } from '../../data/products';

export class ProductRepositoryImpl implements ProductRepository {
  async getAll(): Promise<Product[]> {
    return Promise.resolve(products);
  }

  async getById(id: string): Promise<Product | null> {
    const product = products.find(p => p.id === id);
    return Promise.resolve(product || null);
  }

  async getByCategory(category: ProductCategory): Promise<Product[]> {
    const filtered = products.filter(p => p.category === category);
    return Promise.resolve(filtered);
  }

  async getFeatured(): Promise<Product[]> {
    const featured = products.filter(p => p.featured);
    return Promise.resolve(featured);
  }
}
