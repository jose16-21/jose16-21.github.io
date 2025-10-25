import { CartItem } from '../entities/Cart';

export interface CartRepository {
  getItems(): CartItem[];
  saveItems(items: CartItem[]): void;
  clear(): void;
}
