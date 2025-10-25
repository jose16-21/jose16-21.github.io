import { CartRepository } from '../repositories/CartRepository';

export class RemoveFromCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  execute(productId: string): void {
    const items = this.cartRepository.getItems();
    const filteredItems = items.filter(item => item.product.id !== productId);
    this.cartRepository.saveItems(filteredItems);
  }
}
