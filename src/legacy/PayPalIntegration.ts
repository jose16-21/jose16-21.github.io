import { loadScript } from '@paypal/paypal-js';
import { Cart } from './Cart';
import { NotificationManager } from './NotificationManager';
import { StorageUtils } from '../utils';
import type { PayPalOrderData, User } from '../types';

export class PayPalIntegration {
  private cart: Cart;
  private notificationManager: NotificationManager;
  private paypalLoaded: boolean = false;

  constructor(cart: Cart) {
    this.cart = cart;
    this.notificationManager = new NotificationManager();
  }

  public async initializePayPal(): Promise<void> {
    try {
      const paypal = await loadScript({
        'client-id': 'AdCDeuiJ5CP-lnHdJ5NqrXKapjQvwaHYSFfHg4m6oKUxdqo-jC3OaPliaDjpeUE2mPVHNkVDzsnWDLJQ', // Reemplazar con tu Client ID real
        currency: 'USD',
        intent: 'capture'
      });

      if (paypal && paypal.Buttons) {
        this.paypalLoaded = true;
        this.renderPayPalButtons();
      }
    } catch (error) {
      console.error('Error loading PayPal SDK:', error);
      this.notificationManager.show({
        message: 'Error al cargar PayPal. Por favor, intenta más tarde.',
        type: 'error'
      });
    }
  }

  private renderPayPalButtons(): void {
    const paypalContainer = document.getElementById('paypal-button-container');
    if (!paypalContainer) return;

    // Clear existing buttons
    paypalContainer.innerHTML = '';

    if (!window.paypal) return;

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal'
      },

      createOrder: (data: any, actions: any) => {
        const items = this.cart.getItems();
        const totalAmount = this.cart.getTotalAmount();

        if (items.length === 0) {
          this.notificationManager.show({
            message: 'Tu carrito está vacío',
            type: 'error'
          });
          return Promise.reject('Empty cart');
        }

        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: totalAmount.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: totalAmount.toFixed(2)
                }
              }
            },
            items: items.map(item => ({
              name: item.product.name,
              description: item.product.description,
              unit_amount: {
                currency_code: item.product.currency,
                value: item.product.price.toFixed(2)
              },
              quantity: item.quantity.toString(),
              category: 'DIGITAL_GOODS'
            }))
          }],
          application_context: {
            shipping_preference: 'NO_SHIPPING'
          }
        });
      },

      onApprove: async (data: any, actions: any) => {
        try {
          const order = await actions.order.capture();
          await this.handleSuccessfulPayment(order);
        } catch (error) {
          console.error('Error capturing payment:', error);
          this.notificationManager.show({
            message: 'Error al procesar el pago. Por favor, contacta soporte.',
            type: 'error'
          });
        }
      },

      onError: (error: any) => {
        console.error('PayPal error:', error);
        this.notificationManager.show({
          message: 'Error en el procesamiento del pago. Por favor, intenta nuevamente.',
          type: 'error'
        });
      },

      onCancel: (data: any) => {
        this.notificationManager.show({
          message: 'Pago cancelado por el usuario.',
          type: 'info'
        });
      }
    }).render('#paypal-button-container');
  }

  private async handleSuccessfulPayment(order: PayPalOrderData): Promise<void> {
    try {
      // Check if user is logged in
      const currentUser = StorageUtils.getItem<User>('currentUser');
      if (!currentUser) {
        this.notificationManager.show({
          message: 'Debes iniciar sesión para completar la compra.',
          type: 'error'
        });
        return;
      }

      // Aquí puedes enviar los datos del pedido a tu backend
      const orderData = {
        paypalOrderId: order.id,
        userId: currentUser.id,
        items: this.cart.getItems(),
        totalAmount: this.cart.getTotalAmount(),
        status: order.status,
        timestamp: new Date().toISOString()
      };

      // Simular envío al backend
      await this.sendOrderToBackend(orderData);

      // Create order record
      const event = new CustomEvent('createOrder', {
        detail: {
          items: this.cart.getItems(),
          totalAmount: this.cart.getTotalAmount(),
          paypalOrderId: order.id
        }
      });
      document.dispatchEvent(event);

      // Mostrar confirmación
      this.showSuccessModal(order);

      // Limpiar carrito
      this.cart.clearCart();

    } catch (error) {
      console.error('Error handling successful payment:', error);
      this.notificationManager.show({
        message: 'Pago procesado, pero hubo un error al guardar el pedido. Te contactaremos pronto.',
        type: 'warning'
      });
    }
  }

  private async sendOrderToBackend(orderData: any): Promise<void> {
    // Aquí implementarías la llamada real a tu backend
    // Por ahora, simularemos con un delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Order sent to backend:', orderData);
        resolve();
      }, 1000);
    });
  }

  private showSuccessModal(order: PayPalOrderData): void {
    const currentUser = StorageUtils.getItem<User>('currentUser');
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
      <div class="success-modal-content">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h2>¡Pago Exitoso!</h2>
        <p>Hola ${currentUser?.firstName || 'Cliente'}, tu pedido ha sido procesado correctamente.</p>
        <div class="order-details">
          <p><strong>ID de Transacción:</strong> ${order.id}</p>
          <p><strong>Total:</strong> $${this.cart.getTotalAmount().toLocaleString()} USD</p>
        </div>
        <p class="success-message">
          Te contactaremos dentro de las próximas 24 horas para coordinar los detalles del proyecto.
          Puedes revisar el estado de tu pedido en "Mis Compras".
        </p>
        <div class="success-actions">
          <button class="btn btn-secondary" onclick="this.parentElement.parentElement.remove()">
            Continuar Comprando
          </button>
          <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove(); document.dispatchEvent(new CustomEvent('showOrders'))">
            Ver Mis Compras
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
      z-index: 10000;
    `;

    document.body.appendChild(modal);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (modal.parentElement) {
        modal.remove();
      }
    }, 15000);
  }

  public isLoaded(): boolean {
    return this.paypalLoaded;
  }
}

// Extend Window interface for PayPal
declare global {
  interface Window {
    paypal?: any;
  }
}