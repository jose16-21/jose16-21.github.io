import { Product } from './Product';

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: string;
}

export class CartEntity {
  constructor(private items: CartItem[] = []) {}

  addItem(product: Product, quantity: number = 1, customizations?: string): void {
    const existingItem = this.items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      if (customizations) {
        existingItem.customizations = customizations;
      }
    } else {
      this.items.push({
        product,
        quantity,
        customizations
      });
    }
  }

  removeItem(productId: string): void {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
      }
    }
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotalAmount(): number {
    return this.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clear(): void {
    this.items = [];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
