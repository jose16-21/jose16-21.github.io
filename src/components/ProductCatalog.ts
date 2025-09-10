import { DOMUtils } from '../utils';
import { Cart } from './Cart';
import { products } from '../data/products';
import type { Product } from '../types';

export class ProductCatalog {
  private cart: Cart;
  private currentFilter: string = 'all';

  constructor(cart: Cart) {
    this.cart = cart;
    this.init();
  }

  private init(): void {
    this.renderProducts();
    this.setupFilters();
    this.setupProductInteractions();
  }

  private renderProducts(filter: string = 'all'): void {
    const container = DOMUtils.querySelector('#services-grid');
    if (!container) return;

    let filteredProducts = products;
    if (filter !== 'all') {
      filteredProducts = products.filter(product => product.category === filter);
    }

    container.innerHTML = filteredProducts.map(product => this.createProductCard(product)).join('');
    
    // Re-attach event listeners
    this.setupProductInteractions();
  }

  private createProductCard(product: Product): string {
    return `
      <div class="service-card product-card ${product.featured ? 'featured' : ''}" data-product-id="${product.id}">
        ${product.featured ? '<div class="featured-badge">Más Popular</div>' : ''}
        <div class="service-icon">
          <i class="fas ${this.getProductIcon(product.category)}"></i>
        </div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <ul class="service-features">
          ${product.features.slice(0, 4).map(feature => `<li>${feature}</li>`).join('')}
          ${product.features.length > 4 ? `<li class="more-features">+${product.features.length - 4} características más</li>` : ''}
        </ul>
        <div class="product-info">
          <div class="service-price">$${product.price.toLocaleString()} ${product.currency}</div>
          <div class="delivery-time">
            <i class="fas fa-clock"></i>
            ${product.deliveryTime}
          </div>
        </div>
        <div class="product-actions">
          <button class="btn btn-secondary view-details-btn" data-product-id="${product.id}">
            <i class="fas fa-info-circle"></i>
            Ver Detalles
          </button>
          <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
            <i class="fas fa-shopping-cart"></i>
            Agregar al Carrito
          </button>
        </div>
      </div>
    `;
  }

  private getProductIcon(category: Product['category']): string {
    const icons = {
      development: 'fa-code',
      consulting: 'fa-lightbulb',
      training: 'fa-graduation-cap'
    };
    return icons[category] || 'fa-cog';
  }

  private setupFilters(): void {
    const filterButtons = DOMUtils.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const filter = target.dataset.filter || 'all';
        
        // Update active filter
        filterButtons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        
        this.currentFilter = filter;
        this.renderProducts(filter);
      });
    });
  }

  private setupProductInteractions(): void {
    // Add to cart buttons
    const addToCartButtons = DOMUtils.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const productId = target.dataset.productId || target.closest('.add-to-cart-btn')?.getAttribute('data-product-id');
        if (productId) {
          this.handleAddToCart(productId);
        }
      });
    });

    // View details buttons
    const viewDetailsButtons = DOMUtils.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const productId = target.dataset.productId || target.closest('.view-details-btn')?.getAttribute('data-product-id');
        if (productId) {
          this.showProductDetails(productId);
        }
      });
    });
  }

  private handleAddToCart(productId: string): void {
    const product = products.find(p => p.id === productId);
    if (product) {
      this.cart.addItem(product);
    }
  }

  private showProductDetails(productId: string): void {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
      <div class="product-modal-content">
        <button class="product-modal-close">&times;</button>
        <div class="product-modal-header">
          <div class="product-modal-icon">
            <i class="fas ${this.getProductIcon(product.category)}"></i>
          </div>
          <div>
            <h2>${product.name}</h2>
            <p class="product-modal-price">$${product.price.toLocaleString()} ${product.currency}</p>
          </div>
        </div>
        <div class="product-modal-body">
          <p class="product-description">${product.description}</p>
          <div class="delivery-info">
            <i class="fas fa-clock"></i>
            <span>Tiempo de entrega: ${product.deliveryTime}</span>
          </div>
          <h3>Características incluidas:</h3>
          <ul class="product-features-full">
            ${product.features.map(feature => `<li><i class="fas fa-check"></i>${feature}</li>`).join('')}
          </ul>
          <div class="customization-section">
            <h3>Personalización (opcional):</h3>
            <textarea id="product-customization" placeholder="Describe cualquier personalización o requerimiento específico para tu proyecto..."></textarea>
          </div>
        </div>
        <div class="product-modal-footer">
          <button class="btn btn-secondary" onclick="this.closest('.product-modal').remove()">
            Cancelar
          </button>
          <button class="btn btn-primary" onclick="productCatalog.addToCartWithCustomization('${product.id}')">
            <i class="fas fa-shopping-cart"></i>
            Agregar al Carrito
          </button>
        </div>
      </div>
    `;

    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `;

    document.body.appendChild(modal);

    // Close modal events
    const closeBtn = modal.querySelector('.product-modal-close');
    closeBtn?.addEventListener('click', () => modal.remove());
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  public addToCartWithCustomization(productId: string): void {
    const product = products.find(p => p.id === productId);
    const customizationTextarea = document.getElementById('product-customization') as HTMLTextAreaElement;
    const customization = customizationTextarea?.value.trim() || undefined;

    if (product) {
      this.cart.addItem(product, 1, customization);
      
      // Close modal
      const modal = document.querySelector('.product-modal');
      if (modal) {
        modal.remove();
      }
    }
  }
}