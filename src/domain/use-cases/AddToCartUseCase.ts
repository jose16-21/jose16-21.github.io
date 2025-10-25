import { Product } from '../entities/Product';
import { CartRepository } from '../repositories/CartRepository';

export class AddToCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  execute(product: Product, quantity: number = 1, customizations?: string): void {
    const items = this.cartRepository.getItems();
    const existingItem = items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      if (customizations) {
        existingItem.customizations = customizations;
      }
    } else {
      items.push({ product, quantity, customizations });
    }

    this.cartRepository.saveItems(items);
  }
}
