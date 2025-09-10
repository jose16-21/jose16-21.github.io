// Interfaces para el tipado del portal
export interface ContactFormData {
  nombre: string;
  email: string;
  empresa?: string;
  presupuesto?: string;
  servicio: string;
  mensaje: string;
  recaptchaToken?: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  featured?: boolean;
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  title: string;
  icon: string;
  items: TechItem[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
}

export interface NotificationOptions {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  category: 'development' | 'consulting' | 'training';
  deliveryTime: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: string;
}

export interface PayPalOrderData {
  id: string;
  status: string;
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
  }>;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  lastLogin: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  currency: string;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  paypalOrderId?: string;
  createdAt: string;
  completedAt?: string;
  shippingAddress?: User['address'];
  notes?: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  company?: string;
  phone?: string;
  recaptchaToken?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  recaptchaToken?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
}

export interface ScrollPosition {
  x: number;
  y: number;
}

export interface NavItem {
  href: string;
  text: string;
  active?: boolean;
}

// Extend Window interface for reCAPTCHA
declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
      render: (container: string | HTMLElement, parameters: any) => number;
    };
  }
}