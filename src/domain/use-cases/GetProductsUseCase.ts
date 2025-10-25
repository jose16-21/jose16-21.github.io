import { ProductRepository } from '../repositories/ProductRepository';
import { ProductCategory } from '../entities/Product';

export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(category?: ProductCategory) {
    if (category) {
      return await this.productRepository.getByCategory(category);
    }
    return await this.productRepository.getAll();
  }
}
