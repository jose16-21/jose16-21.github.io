export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  category: ProductCategory;
  deliveryTime: string;
  featured?: boolean;
}

export type ProductCategory = 'development' | 'consulting' | 'training';

export class ProductEntity implements Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly currency: string,
    public readonly features: string[],
    public readonly category: ProductCategory,
    public readonly deliveryTime: string,
    public readonly featured: boolean = false
  ) {}

  static fromJson(json: any): ProductEntity {
    return new ProductEntity(
      json.id,
      json.name,
      json.description,
      json.price,
      json.currency,
      json.features,
      json.category,
      json.deliveryTime,
      json.featured
    );
  }

  toJson(): Product {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      currency: this.currency,
      features: this.features,
      category: this.category,
      deliveryTime: this.deliveryTime,
      featured: this.featured,
    };
  }
}
