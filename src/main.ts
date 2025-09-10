import { Navigation } from './components/Navigation';
import { ContactForm } from './components/ContactForm';
import { ServiceManager } from './components/ServiceManager';
import { AnimationManager } from './components/AnimationManager';
import { Cart } from './components/Cart';
import { ProductCatalog } from './components/ProductCatalog';
import { PayPalIntegration } from './components/PayPalIntegration';
import { AuthManager } from './components/AuthManager';
import { OrderManager } from './components/OrderManager';
import { ProfileManager } from './components/ProfileManager';
import { DOMUtils } from './utils';

class PortalApp {
  private navigation: Navigation;
  private contactForm: ContactForm;
  private serviceManager: ServiceManager;
  private animationManager: AnimationManager;
  private cart: Cart;
  private productCatalog: ProductCatalog;
  private paypalIntegration: PayPalIntegration;
  private authManager: AuthManager;
  private orderManager: OrderManager;
  private profileManager: ProfileManager;

  constructor() {
    this.navigation = new Navigation();
    this.contactForm = new ContactForm();
    this.serviceManager = new ServiceManager();
    this.animationManager = new AnimationManager();
    this.cart = new Cart();
    this.productCatalog = new ProductCatalog(this.cart);
    this.paypalIntegration = new PayPalIntegration(this.cart);
    this.authManager = new AuthManager();
    this.orderManager = new OrderManager();
    this.profileManager = new ProfileManager();
    
    this.init();
  }

  private init(): void {
    this.setupTechItemInteractions();
    this.setupPortfolioInteractions();
    this.setupLoadingComplete();
    this.setupOrderCreation();
    this.initializePayPal();
    
    console.log('Portal de servicios de Juan José Hernández cargado exitosamente!');
  }

  private async initializePayPal(): Promise<void> {
    try {
      await this.paypalIntegration.initializePayPal();
    } catch (error) {
      console.error('Error initializing PayPal:', error);
    }
  }

  private setupTechItemInteractions(): void {
    const techItems = DOMUtils.querySelectorAll<HTMLElement>('.tech-item');
    
    techItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.05)';
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  private setupPortfolioInteractions(): void {
    const portfolioItems = DOMUtils.querySelectorAll<HTMLElement>('.portfolio-item');
    
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const title = item.querySelector('h3')?.textContent || 'Proyecto';
        
        // Simulate opening project details
        console.log(`Opening project: ${title}`);
        
        // You could implement a modal or redirect here
        // For now, we'll just show a notification
        // this.notificationManager.show({
        //   message: `Abriendo detalles del proyecto: ${title}`,
        //   type: 'info'
        // });
      });
    });
  }

  private setupLoadingComplete(): void {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });
  }

  private setupOrderCreation(): void {
    document.addEventListener('createOrder', (e: any) => {
      const { items, totalAmount, paypalOrderId } = e.detail;
      try {
        this.orderManager.createOrder(items, totalAmount, paypalOrderId);
      } catch (error) {
        console.error('Error creating order:', error);
      }
    });
  }

  // Public methods for external access
  public getNavigation(): Navigation {
    return this.navigation;
  }

  public getServiceManager(): ServiceManager {
    return this.serviceManager;
  }

  public getAnimationManager(): AnimationManager {
    return this.animationManager;
  }

  public getCart(): Cart {
    return this.cart;
  }

  public getProductCatalog(): ProductCatalog {
    return this.productCatalog;
  }

  public getAuthManager(): AuthManager {
    return this.authManager;
  }

  public getOrderManager(): OrderManager {
    return this.orderManager;
  }

  public getProfileManager(): ProfileManager {
    return this.profileManager;
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortalApp();
  
  // Make app globally accessible for debugging
  (window as any).portalApp = app;
  (window as any).cart = app.getCart();
  (window as any).productCatalog = app.getProductCatalog();
  (window as any).authManager = app.getAuthManager();
  (window as any).orderManager = app.getOrderManager();
  (window as any).profileManager = app.getProfileManager();
});

// Export for potential module usage
export default PortalApp;