import { DOMUtils, StorageUtils } from '../utils';
import { NotificationManager } from '../infrastructure/services/NotificationManager';
import type { Order, CartItem, User, PaginationOptions, PaginatedResult } from '../types';

export class OrderManager {
  private notificationManager: NotificationManager;
  private ordersModal: HTMLElement | null = null;
  private currentPage: number = 1;
  private itemsPerPage: number = 5;

  constructor() {
    this.notificationManager = new NotificationManager();
    this.init();
  }

  private init(): void {
    this.createOrdersModal();
    this.setupEventListeners();
  }

  private createOrdersModal(): void {
    const modal = DOMUtils.createElement('div', {
      attributes: { id: 'orders-modal' },
      className: 'orders-modal'
    });

    modal.innerHTML = `
      <div class="orders-modal-content">
        <div class="orders-modal-header">
          <h2><i class="fas fa-shopping-bag"></i> Historial de Compras</h2>
          <button class="orders-modal-close">&times;</button>
        </div>
        <div class="orders-modal-body">
          <div class="orders-filters">
            <select id="orders-status-filter" class="filter-select">
              <option value="all">Todos los estados</option>
              <option value="completed">Completadas</option>
              <option value="pending">Pendientes</option>
              <option value="cancelled">Canceladas</option>
              <option value="refunded">Reembolsadas</option>
            </select>
            <select id="orders-sort" class="filter-select">
              <option value="createdAt-desc">Más recientes</option>
              <option value="createdAt-asc">Más antiguas</option>
              <option value="totalAmount-desc">Mayor valor</option>
              <option value="totalAmount-asc">Menor valor</option>
            </select>
          </div>
          <div id="orders-list" class="orders-list">
            <!-- Orders will be rendered here -->
          </div>
          <div id="orders-pagination" class="pagination">
            <!-- Pagination will be rendered here -->
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.ordersModal = modal;
    this.setupModalEvents();
  }

  private setupEventListeners(): void {
    document.addEventListener('showOrders', () => {
      this.showOrdersModal();
    });
  }

  private setupModalEvents(): void {
    if (!this.ordersModal) return;

    // Close modal
    const closeBtn = this.ordersModal.querySelector('.orders-modal-close');
    closeBtn?.addEventListener('click', () => this.hideOrdersModal());

    this.ordersModal.addEventListener('click', (e) => {
      if (e.target === this.ordersModal) this.hideOrdersModal();
    });

    // Filters
    const statusFilter = DOMUtils.querySelector('#orders-status-filter');
    const sortSelect = DOMUtils.querySelector('#orders-sort');

    statusFilter?.addEventListener('change', () => this.renderOrders());
    sortSelect?.addEventListener('change', () => this.renderOrders());
  }

  private showOrdersModal(): void {
    if (!this.ordersModal) return;

    this.ordersModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    this.currentPage = 1;
    this.renderOrders();
  }

  private hideOrdersModal(): void {
    if (!this.ordersModal) return;

    this.ordersModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  private renderOrders(): void {
    const ordersContainer = DOMUtils.querySelector('#orders-list');
    if (!ordersContainer) return;

    const statusFilter = DOMUtils.querySelector<HTMLSelectElement>('#orders-status-filter');
    const sortSelect = DOMUtils.querySelector<HTMLSelectElement>('#orders-sort');
    
    const status = statusFilter?.value || 'all';
    const [sortBy, sortOrder] = (sortSelect?.value || 'createdAt-desc').split('-');

    const paginationOptions: PaginationOptions = {
      page: this.currentPage,
      limit: this.itemsPerPage,
      sortBy,
      sortOrder: sortOrder as 'asc' | 'desc'
    };

    const result = this.getUserOrders(status, paginationOptions);

    if (result.data.length === 0) {
      ordersContainer.innerHTML = `
        <div class="orders-empty">
          <i class="fas fa-shopping-bag"></i>
          <h3>No hay compras registradas</h3>
          <p>Cuando realices tu primera compra, aparecerá aquí.</p>
          <button class="btn btn-primary" onclick="document.getElementById('orders-modal').style.display='none'">
            Explorar Servicios
          </button>
        </div>
      `;
      this.renderPagination(result);
      return;
    }

    ordersContainer.innerHTML = result.data.map(order => this.createOrderCard(order)).join('');
    this.renderPagination(result);
    this.setupOrderCardEvents();
  }

  private createOrderCard(order: Order): string {
    const statusIcons = {
      completed: 'fa-check-circle',
      pending: 'fa-clock',
      cancelled: 'fa-times-circle',
      refunded: 'fa-undo'
    };

    const statusColors = {
      completed: 'success',
      pending: 'warning',
      cancelled: 'error',
      refunded: 'info'
    };

    const statusLabels = {
      completed: 'Completada',
      pending: 'Pendiente',
      cancelled: 'Cancelada',
      refunded: 'Reembolsada'
    };

    return `
      <div class="order-card" data-order-id="${order.id}">
        <div class="order-header">
          <div class="order-info">
            <h4>Orden #${order.id.slice(-8).toUpperCase()}</h4>
            <p class="order-date">
              <i class="fas fa-calendar"></i>
              ${new Date(order.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div class="order-status">
            <span class="status-badge status-${statusColors[order.status]}">
              <i class="fas ${statusIcons[order.status]}"></i>
              ${statusLabels[order.status]}
            </span>
          </div>
        </div>
        <div class="order-items">
          ${order.items.map(item => `
            <div class="order-item">
              <div class="item-info">
                <h5>${item.product.name}</h5>
                <p>Cantidad: ${item.quantity}</p>
                ${item.customizations ? `<p class="item-customization">Personalización: ${item.customizations}</p>` : ''}
              </div>
              <div class="item-price">
                $${(item.product.price * item.quantity).toLocaleString()} ${item.product.currency}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="order-footer">
          <div class="order-total">
            <strong>Total: $${order.totalAmount.toLocaleString()} ${order.currency}</strong>
          </div>
          <div class="order-actions">
            <button class="btn btn-secondary view-order-btn" data-order-id="${order.id}">
              <i class="fas fa-eye"></i>
              Ver Detalles
            </button>
            ${order.status === 'completed' ? `
              <button class="btn btn-primary reorder-btn" data-order-id="${order.id}">
                <i class="fas fa-redo"></i>
                Volver a Comprar
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private renderPagination(result: PaginatedResult<Order>): void {
    const paginationContainer = DOMUtils.querySelector('#orders-pagination');
    if (!paginationContainer) return;

    if (result.totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    const pagination = [];
    
    // Previous button
    if (result.page > 1) {
      pagination.push(`
        <button class="pagination-btn" data-page="${result.page - 1}">
          <i class="fas fa-chevron-left"></i>
        </button>
      `);
    }

    // Page numbers
    const startPage = Math.max(1, result.page - 2);
    const endPage = Math.min(result.totalPages, result.page + 2);

    if (startPage > 1) {
      pagination.push(`<button class="pagination-btn" data-page="1">1</button>`);
      if (startPage > 2) {
        pagination.push(`<span class="pagination-ellipsis">...</span>`);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(`
        <button class="pagination-btn ${i === result.page ? 'active' : ''}" data-page="${i}">
          ${i}
        </button>
      `);
    }

    if (endPage < result.totalPages) {
      if (endPage < result.totalPages - 1) {
        pagination.push(`<span class="pagination-ellipsis">...</span>`);
      }
      pagination.push(`<button class="pagination-btn" data-page="${result.totalPages}">${result.totalPages}</button>`);
    }

    // Next button
    if (result.page < result.totalPages) {
      pagination.push(`
        <button class="pagination-btn" data-page="${result.page + 1}">
          <i class="fas fa-chevron-right"></i>
        </button>
      `);
    }

    paginationContainer.innerHTML = `
      <div class="pagination-info">
        Mostrando ${((result.page - 1) * result.limit) + 1}-${Math.min(result.page * result.limit, result.total)} de ${result.total} compras
      </div>
      <div class="pagination-buttons">
        ${pagination.join('')}
      </div>
    `;

    // Setup pagination events
    const paginationBtns = paginationContainer.querySelectorAll('.pagination-btn');
    paginationBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const page = parseInt(target.dataset.page || '1');
        this.currentPage = page;
        this.renderOrders();
      });
    });
  }

  private setupOrderCardEvents(): void {
    // View order details
    const viewBtns = DOMUtils.querySelectorAll('.view-order-btn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const orderId = target.dataset.orderId || target.closest('.view-order-btn')?.getAttribute('data-order-id');
        if (orderId) {
          this.showOrderDetails(orderId);
        }
      });
    });

    // Reorder
    const reorderBtns = DOMUtils.querySelectorAll('.reorder-btn');
    reorderBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const orderId = target.dataset.orderId || target.closest('.reorder-btn')?.getAttribute('data-order-id');
        if (orderId) {
          this.reorder(orderId);
        }
      });
    });
  }

  private getUserOrders(status: string, options: PaginationOptions): PaginatedResult<Order> {
    const currentUser = StorageUtils.getItem<User>('currentUser');
    if (!currentUser) {
      return {
        data: [],
        total: 0,
        page: options.page,
        limit: options.limit,
        totalPages: 0
      };
    }

    let orders = this.getAllOrders().filter(order => order.userId === currentUser.id);

    // Filter by status
    if (status !== 'all') {
      orders = orders.filter(order => order.status === status);
    }

    // Sort
    if (options.sortBy) {
      orders.sort((a, b) => {
        const aValue = (a as any)[options.sortBy!];
        const bValue = (b as any)[options.sortBy!];
        
        if (options.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        } else {
          return aValue > bValue ? 1 : -1;
        }
      });
    }

    // Paginate
    const total = orders.length;
    const totalPages = Math.ceil(total / options.limit);
    const startIndex = (options.page - 1) * options.limit;
    const endIndex = startIndex + options.limit;
    const data = orders.slice(startIndex, endIndex);

    return {
      data,
      total,
      page: options.page,
      limit: options.limit,
      totalPages
    };
  }

  private getAllOrders(): Order[] {
    return StorageUtils.getItem<Order[]>('orders') || [];
  }

  private showOrderDetails(orderId: string): void {
    const order = this.getOrderById(orderId);
    if (!order) return;

    const modal = document.createElement('div');
    modal.className = 'order-details-modal';
    modal.innerHTML = `
      <div class="order-details-content">
        <div class="order-details-header">
          <h2>Detalles de la Orden #${order.id.slice(-8).toUpperCase()}</h2>
          <button class="order-details-close">&times;</button>
        </div>
        <div class="order-details-body">
          <div class="order-summary">
            <div class="summary-item">
              <label>Estado:</label>
              <span class="status-badge status-${this.getStatusColor(order.status)}">
                ${this.getStatusLabel(order.status)}
              </span>
            </div>
            <div class="summary-item">
              <label>Fecha de compra:</label>
              <span>${new Date(order.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
            ${order.completedAt ? `
              <div class="summary-item">
                <label>Fecha de completado:</label>
                <span>${new Date(order.completedAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            ` : ''}
            <div class="summary-item">
              <label>Total:</label>
              <span class="order-total-amount">$${order.totalAmount.toLocaleString()} ${order.currency}</span>
            </div>
            ${order.paypalOrderId ? `
              <div class="summary-item">
                <label>ID de PayPal:</label>
                <span class="paypal-id">${order.paypalOrderId}</span>
              </div>
            ` : ''}
          </div>
          
          <div class="order-items-detail">
            <h3>Servicios Contratados</h3>
            ${order.items.map(item => `
              <div class="order-item-detail">
                <div class="item-header">
                  <h4>${item.product.name}</h4>
                  <span class="item-price">$${item.product.price.toLocaleString()} ${item.product.currency}</span>
                </div>
                <p class="item-description">${item.product.description}</p>
                <div class="item-meta">
                  <span class="item-quantity">Cantidad: ${item.quantity}</span>
                  <span class="item-delivery">Entrega: ${item.product.deliveryTime}</span>
                </div>
                ${item.customizations ? `
                  <div class="item-customizations">
                    <h5>Personalizaciones:</h5>
                    <p>${item.customizations}</p>
                  </div>
                ` : ''}
                <div class="item-features">
                  <h5>Características incluidas:</h5>
                  <ul>
                    ${item.product.features.map(feature => `<li>${feature}</li>`).join('')}
                  </ul>
                </div>
              </div>
            `).join('')}
          </div>

          ${order.notes ? `
            <div class="order-notes">
              <h3>Notas adicionales</h3>
              <p>${order.notes}</p>
            </div>
          ` : ''}
        </div>
        <div class="order-details-footer">
          <button class="btn btn-secondary" onclick="this.closest('.order-details-modal').remove()">
            Cerrar
          </button>
          ${order.status === 'completed' ? `
            <button class="btn btn-primary" onclick="orderManager.reorder('${order.id}'); this.closest('.order-details-modal').remove();">
              <i class="fas fa-redo"></i>
              Volver a Comprar
            </button>
          ` : ''}
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
      z-index: 10001;
    `;

    document.body.appendChild(modal);

    // Close events
    const closeBtn = modal.querySelector('.order-details-close');
    closeBtn?.addEventListener('click', () => modal.remove());
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  private reorder(orderId: string): void {
    const order = this.getOrderById(orderId);
    if (!order) return;

    // Dispatch event to add items to cart
    const event = new CustomEvent('reorderItems', {
      detail: { items: order.items }
    });
    document.dispatchEvent(event);

    this.notificationManager.show({
      message: 'Productos agregados al carrito exitosamente.',
      type: 'success'
    });
  }

  private getOrderById(orderId: string): Order | null {
    const orders = this.getAllOrders();
    return orders.find(order => order.id === orderId) || null;
  }

  private getStatusColor(status: Order['status']): string {
    const colors = {
      completed: 'success',
      pending: 'warning',
      cancelled: 'error',
      refunded: 'info'
    };
    return colors[status];
  }

  private getStatusLabel(status: Order['status']): string {
    const labels = {
      completed: 'Completada',
      pending: 'Pendiente',
      cancelled: 'Cancelada',
      refunded: 'Reembolsada'
    };
    return labels[status];
  }

  public createOrder(items: any[], totalAmount: number, paypalOrderId?: string): Order {
    const currentUser = StorageUtils.getItem<User>('currentUser');
    if (!currentUser) {
      throw new Error('User must be logged in to create order');
    }

    const order: Order = {
      id: this.generateOrderId(),
      userId: currentUser.id,
      items,
      totalAmount,
      currency: 'USD',
      status: 'completed',
      paypalOrderId,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };

    this.saveOrder(order);
    return order;
  }

  private generateOrderId(): string {
    return 'order_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private saveOrder(order: Order): void {
    const orders = this.getAllOrders();
    orders.push(order);
    StorageUtils.setItem('orders', orders);
  }
}