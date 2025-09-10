import { DOMUtils, StorageUtils } from '../utils';
import { NotificationManager } from './NotificationManager';
import type { CartItem, Product, User } from '../types';

export class Cart {
  private items: CartItem[] = [];
  private notificationManager: NotificationManager;
  private cartButton: HTMLElement | null;
  private cartModal: HTMLElement | null;
  private cartCount: HTMLElement | null;

  constructor() {
    this.notificationManager = new NotificationManager();
    this.cartButton = DOMUtils.querySelector('#cart-button');
    this.cartModal = DOMUtils.querySelector('#cart-modal');
    this.cartCount = DOMUtils.querySelector('#cart-count');
    
    this.loadCart();
    this.init();
  }

  private init(): void {
    this.setupCartButton();
    this.setupCartModal();
    this.setupReorderListener();
    this.updateCartDisplay();
  }

  private setupCartButton(): void {
    if (!this.cartButton) return;

    this.cartButton.addEventListener('click', () => {
      this.toggleCartModal();
    });
  }

  private setupCartModal(): void {
    if (!this.cartModal) return;

    // Close modal when clicking outside
    this.cartModal.addEventListener('click', (e) => {
      if (e.target === this.cartModal) {
        this.closeCartModal();
      }
    });

    // Close button
    const closeButton = this.cartModal.querySelector('.cart-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.closeCartModal();
      });
    }
  }

  public addItem(product: Product, quantity: number = 1, customizations?: string): void {
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

    this.saveCart();
    this.updateCartDisplay();
    
    this.notificationManager.show({
      message: `${product.name} agregado al carrito`,
      type: 'success',
      duration: 3000
    });
  }

  public removeItem(productId: string): void {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.saveCart();
    this.updateCartDisplay();
  }

  public updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartDisplay();
      }
    }
  }

  public getItems(): CartItem[] {
    return [...this.items];
  }

  public getTotalAmount(): number {
    return this.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  public getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  public clearCart(): void {
    this.items = [];
    this.saveCart();
    this.updateCartDisplay();
  }

  private toggleCartModal(): void {
    if (!this.cartModal) return;

    if (this.cartModal.classList.contains('active')) {
      this.closeCartModal();
    } else {
      this.openCartModal();
    }
  }

  private openCartModal(): void {
    if (!this.cartModal) return;

    // Check if user is logged in for checkout
    const currentUser = StorageUtils.getItem<User>('currentUser');
    if (!currentUser && this.items.length > 0) {
      this.notificationManager.show({
        message: 'Debes iniciar sesión para proceder con la compra.',
        type: 'info'
      });
    }

    this.renderCartItems();
    this.cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  private closeCartModal(): void {
    if (!this.cartModal) return;

    this.cartModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  private renderCartItems(): void {
    const cartItemsContainer = DOMUtils.querySelector('#cart-items');
    const cartTotal = DOMUtils.querySelector('#cart-total');
    const currentUser = StorageUtils.getItem<User>('currentUser');
    
    if (!cartItemsContainer || !cartTotal) return;

    if (this.items.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-cart"></i>
          <p>Tu carrito está vacío</p>
          <button class="btn btn-primary" onclick="document.getElementById('cart-modal').classList.remove('active')">
            Explorar Servicios
          </button>
        </div>
      `;
      cartTotal.textContent = '$0.00 USD';
      return;
    }

    cartItemsContainer.innerHTML = this.items.map(item => `
      <div class="cart-item" data-product-id="${item.product.id}">
        <div class="cart-item-info">
          <h4>${item.product.name}</h4>
          <p class="cart-item-price">$${item.product.price.toLocaleString()} ${item.product.currency}</p>
          ${item.customizations ? `<p class="cart-item-custom">Personalización: ${item.customizations}</p>` : ''}
        </div>
        <div class="cart-item-controls">
          <div class="quantity-controls">
            <button class="quantity-btn" onclick="cart.updateQuantity('${item.product.id}', ${item.quantity - 1})">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" onclick="cart.updateQuantity('${item.product.id}', ${item.quantity + 1})">+</button>
          </div>
          <button class="remove-btn" onclick="cart.removeItem('${item.product.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');

    // Add login prompt if not authenticated
    if (!currentUser && this.items.length > 0) {
      cartItemsContainer.innerHTML += `
        <div class="cart-login-prompt">
          <div class="login-prompt-content">
            <i class="fas fa-info-circle"></i>
            <p>Inicia sesión para proceder con la compra</p>
            <button class="btn btn-primary btn-sm" onclick="document.dispatchEvent(new CustomEvent('showLogin'))">
              Iniciar Sesión
            </button>
          </div>
        </div>
      `;
    }
    cartTotal.textContent = `$${this.getTotalAmount().toLocaleString()} USD`;
  }

  private updateCartDisplay(): void {
    if (this.cartCount) {
      const count = this.getItemCount();
      this.cartCount.textContent = count.toString();
      this.cartCount.style.display = count > 0 ? 'block' : 'none';
    }

    // Update cart modal if it's open
    if (this.cartModal?.classList.contains('active')) {
      this.renderCartItems();
    }
  }

  private saveCart(): void {
    StorageUtils.setItem('cart', this.items);
  }

  private loadCart(): void {
    const savedCart = StorageUtils.getItem<CartItem[]>('cart');
    if (savedCart) {
      this.items = savedCart;
    }
  }

  private setupReorderListener(): void {
    document.addEventListener('reorderItems', (e: any) => {
      const { items } = e.detail;
      
      // Clear current cart
      this.clearCart();
      
      // Add items from order
      items.forEach((item: CartItem) => {
        this.addItem(item.product, item.quantity, item.customizations);
      });
    });
  }
}