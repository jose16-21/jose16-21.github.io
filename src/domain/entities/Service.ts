export type ServiceCategory = 
  | 'web-development'
  | 'mobile-development'
  | 'devops'
  | 'consulting'
  | 'cloud-architecture'
  | 'training';

export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: ServiceCategory;
  icon: string;
  /** Resultado de negocio que obtiene el cliente (enfoque gerencial, "resultado primero"). */
  businessOutcome?: string;
  /** A quién está dirigido el servicio. */
  targetAudience?: string;
  features: string[];
  technologies: string[];
  price: {
    type: 'fixed' | 'hourly' | 'project';
    amount: number;
    currency: string;
    period?: string;
  };
  deliveryTime?: string;
  featured?: boolean;
  available: boolean;
  imageUrl?: string;
}
