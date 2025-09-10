import { DOMUtils, StorageUtils } from '../utils';
import { NotificationManager } from './NotificationManager';
import type { ServiceCard } from '../types';

export class ServiceManager {
  private serviceCards: NodeListOf<HTMLElement>;
  private selectedService: string | null = null;
  private notificationManager: NotificationManager;

  constructor() {
    this.serviceCards = DOMUtils.querySelectorAll<HTMLElement>('.service-card');
    this.notificationManager = new NotificationManager();
    
    this.init();
  }

  private init(): void {
    this.setupServiceSelection();
    this.setupServiceInteractions();
    this.loadSelectedService();
  }

  private setupServiceSelection(): void {
    this.serviceCards.forEach(card => {
      card.addEventListener('click', () => {
        this.selectService(card);
      });
    });
  }

  private selectService(card: HTMLElement): void {
    // Remove previous selection
    this.serviceCards.forEach(btn => btn.classList.remove('selected'));
    
    // Add selection to clicked card
    card.classList.add('selected');
    
    const serviceTitle = card.querySelector('h3')?.textContent || '';
    this.selectedService = serviceTitle;
    
    // Save selection
    StorageUtils.setItem('selectedService', this.selectedService);
    
    // Pre-fill contact form
    this.prefillContactForm(serviceTitle);
    
    this.notificationManager.show({
      message: `Servicio seleccionado: ${serviceTitle}. ¡Contáctame para más detalles!`,
      type: 'info',
      duration: 3000
    });
  }

  private prefillContactForm(serviceTitle: string): void {
    const serviceSelect = DOMUtils.querySelector<HTMLSelectElement>('#servicio');
    if (!serviceSelect) return;

    // Map service titles to form values
    const serviceMap: Record<string, string> = {
      'Desarrollo Web Full-Stack': 'web',
      'Desarrollo de Aplicaciones Móviles': 'mobile',
      'Consultoría y Arquitectura': 'consultoria',
      'Sistemas de Base de Datos': 'database',
      'Seguridad y DevOps': 'devops',
      'Capacitación Técnica': 'capacitacion'
    };
    
    const serviceValue = serviceMap[serviceTitle];
    if (serviceValue) {
      serviceSelect.value = serviceValue;
      serviceSelect.parentElement?.classList.add('focused');
    }
  }

  private setupServiceInteractions(): void {
    this.serviceCards.forEach(card => {
      // Enhanced hover effects
      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('selected')) {
          card.style.transform = 'translateY(-10px) scale(1.02)';
        }
      });

      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('selected')) {
          card.style.transform = 'translateY(0) scale(1)';
        }
      });
    });
  }

  private loadSelectedService(): void {
    const savedService = StorageUtils.getItem<string>('selectedService');
    if (!savedService) return;

    // Find and select the saved service
    this.serviceCards.forEach(card => {
      const serviceTitle = card.querySelector('h3')?.textContent || '';
      if (serviceTitle === savedService) {
        card.classList.add('selected');
        this.selectedService = savedService;
      }
    });
  }

  public getSelectedService(): string | null {
    return this.selectedService;
  }

  public clearSelection(): void {
    this.serviceCards.forEach(card => card.classList.remove('selected'));
    this.selectedService = null;
    StorageUtils.removeItem('selectedService');
  }
}