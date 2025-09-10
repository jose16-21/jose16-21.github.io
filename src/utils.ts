import type { NotificationOptions, AnimationOptions } from './types';

// Utilidades para validación
export class ValidationUtils {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  static minLength(value: string, min: number): boolean {
    return value.trim().length >= min;
  }
}

// Utilidades para DOM
export class DOMUtils {
  static querySelector<T extends Element>(selector: string): T | null {
    return document.querySelector<T>(selector);
  }

  static querySelectorAll<T extends Element>(selector: string): NodeListOf<T> {
    return document.querySelectorAll<T>(selector);
  }

  static createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options?: {
      className?: string;
      textContent?: string;
      innerHTML?: string;
      attributes?: Record<string, string>;
    }
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement(tagName);
    
    if (options?.className) {
      element.className = options.className;
    }
    
    if (options?.textContent) {
      element.textContent = options.textContent;
    }
    
    if (options?.innerHTML) {
      element.innerHTML = options.innerHTML;
    }
    
    if (options?.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }
    
    return element;
  }

  static addEventListeners<K extends keyof HTMLElementEventMap>(
    elements: NodeListOf<Element> | Element[],
    event: K,
    handler: (this: Element, ev: HTMLElementEventMap[K]) => void
  ): void {
    const elementArray = Array.from(elements);
    elementArray.forEach(element => {
      element.addEventListener(event, handler);
    });
  }
}

// Utilidades para animaciones
export class AnimationUtils {
  static fadeIn(element: HTMLElement, options: AnimationOptions = {}): void {
    const { duration = 300, delay = 0 } = options;
    
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;
    
    setTimeout(() => {
      element.style.opacity = '1';
    }, delay);
  }

  static slideUp(element: HTMLElement, options: AnimationOptions = {}): void {
    const { duration = 300, delay = 0 } = options;
    
    element.style.transform = 'translateY(30px)';
    element.style.opacity = '0';
    element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
    
    setTimeout(() => {
      element.style.transform = 'translateY(0)';
      element.style.opacity = '1';
    }, delay);
  }

  static animateOnScroll(elements: NodeListOf<Element>): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => observer.observe(element));
  }
}

// Utilidades para localStorage
export class StorageUtils {
  static setItem(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
}

// Utilidades para debounce y throttle
export class PerformanceUtils {
  static debounce<T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  static throttle<T extends (...args: unknown[]) => void>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}