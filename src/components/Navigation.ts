import { DOMUtils, PerformanceUtils } from '../utils';
import type { NavItem, ScrollPosition } from '../types';

export class Navigation {
  private navbar: HTMLElement | null;
  private navToggle: HTMLElement | null;
  private navMenu: HTMLElement | null;
  private navLinks: NodeListOf<HTMLAnchorElement>;
  private isMenuOpen: boolean = false;

  constructor() {
    this.navbar = DOMUtils.querySelector<HTMLElement>('#navbar');
    this.navToggle = DOMUtils.querySelector<HTMLElement>('#nav-toggle');
    this.navMenu = DOMUtils.querySelector<HTMLElement>('#nav-menu');
    this.navLinks = DOMUtils.querySelectorAll<HTMLAnchorElement>('.nav-link');
    
    this.init();
  }

  private init(): void {
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupActiveNavigation();
  }

  private setupScrollEffect(): void {
    const handleScroll = PerformanceUtils.throttle(() => {
      if (!this.navbar) return;
      
      if (window.scrollY > 100) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    }, 16);

    window.addEventListener('scroll', handleScroll);
  }

  private setupMobileMenu(): void {
    if (!this.navToggle || !this.navMenu) return;

    this.navToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close menu when clicking on links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!this.navbar?.contains(target) && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  private toggleMobileMenu(): void {
    if (!this.navMenu || !this.navToggle) return;

    this.isMenuOpen = !this.isMenuOpen;
    this.navMenu.classList.toggle('active', this.isMenuOpen);
    this.navToggle.classList.toggle('active', this.isMenuOpen);
  }

  private closeMobileMenu(): void {
    if (!this.navMenu || !this.navToggle) return;

    this.isMenuOpen = false;
    this.navMenu.classList.remove('active');
    this.navToggle.classList.remove('active');
  }

  private setupSmoothScrolling(): void {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
          const targetSection = DOMUtils.querySelector<HTMLElement>(targetId);
          
          if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  private setupActiveNavigation(): void {
    const handleScroll = PerformanceUtils.throttle(() => {
      let current = '';
      const sections = DOMUtils.querySelectorAll<HTMLElement>('section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = '#' + section.getAttribute('id');
        }
      });

      this.updateActiveLink(current);
    }, 16);

    window.addEventListener('scroll', handleScroll);
  }

  private updateActiveLink(current: string): void {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  }

  public scrollToSection(sectionId: string): void {
    const targetSection = DOMUtils.querySelector<HTMLElement>(sectionId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
}