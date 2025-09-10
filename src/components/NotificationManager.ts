import { DOMUtils } from '../utils';
import type { NotificationOptions } from '../types';

export class NotificationManager {
  private container: HTMLElement;

  constructor() {
    this.container = this.createContainer();
  }

  private createContainer(): HTMLElement {
    let container = DOMUtils.querySelector<HTMLElement>('#notification-container');
    
    if (!container) {
      container = DOMUtils.createElement('div', {
        attributes: { id: 'notification-container' },
        className: 'notification-container'
      });
      
      container.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        pointer-events: none;
      `;
      
      document.body.appendChild(container);
    }
    
    return container;
  }

  public show(options: NotificationOptions): void {
    const { message, type, duration = 5000 } = options;
    
    // Remove existing notifications
    this.clearAll();

    const notification = this.createNotification(message, type);
    this.container.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
      notification.style.opacity = '1';
    }, 100);

    // Auto remove
    const autoRemove = setTimeout(() => {
      this.remove(notification);
    }, duration);

    // Manual close
    const closeButton = notification.querySelector('.notification-close') as HTMLButtonElement;
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        clearTimeout(autoRemove);
        this.remove(notification);
      });
    }
  }

  private createNotification(message: string, type: NotificationOptions['type']): HTMLElement {
    const notification = DOMUtils.createElement('div', {
      className: `notification notification-${type}`
    });

    const iconMap = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      info: 'fa-info-circle'
    };

    const colorMap = {
      success: '#10b981',
      error: '#ef4444',
      info: '#3b82f6'
    };

    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${iconMap[type]}"></i>
        <span>${message}</span>
        <button class="notification-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    notification.style.cssText = `
      background: ${colorMap[type]};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      transform: translateX(100%);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
      max-width: 400px;
      margin-bottom: 1rem;
      pointer-events: auto;
    `;

    const content = notification.querySelector('.notification-content') as HTMLElement;
    if (content) {
      content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
      `;
    }

    const closeButton = notification.querySelector('.notification-close') as HTMLButtonElement;
    if (closeButton) {
      closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s ease;
      `;

      closeButton.addEventListener('mouseenter', () => {
        closeButton.style.opacity = '1';
      });

      closeButton.addEventListener('mouseleave', () => {
        closeButton.style.opacity = '0.8';
      });
    }

    return notification;
  }

  private remove(notification: HTMLElement): void {
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  private clearAll(): void {
    const notifications = this.container.querySelectorAll('.notification');
    notifications.forEach(notification => {
      this.remove(notification as HTMLElement);
    });
  }
}