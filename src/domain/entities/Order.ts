import { CartItem } from './Cart';
import { Address } from './User';

export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'refunded';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  currency: string;
  status: OrderStatus;
  paypalOrderId?: string;
  createdAt: string;
  completedAt?: string;
  shippingAddress?: Address;
  notes?: string;
}

export class OrderEntity implements Order {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly items: CartItem[],
    public readonly totalAmount: number,
    public readonly currency: string,
    public readonly status: OrderStatus,
    public readonly createdAt: string,
    public readonly paypalOrderId?: string,
    public readonly completedAt?: string,
    public readonly shippingAddress?: Address,
    public readonly notes?: string
  ) {}

  static fromJson(json: any): OrderEntity {
    return new OrderEntity(
      json.id,
      json.userId,
      json.items,
      json.totalAmount,
      json.currency,
      json.status,
      json.createdAt,
      json.paypalOrderId,
      json.completedAt,
      json.shippingAddress,
      json.notes
    );
  }

  toJson(): Order {
    return {
      id: this.id,
      userId: this.userId,
      items: this.items,
      totalAmount: this.totalAmount,
      currency: this.currency,
      status: this.status,
      paypalOrderId: this.paypalOrderId,
      createdAt: this.createdAt,
      completedAt: this.completedAt,
      shippingAddress: this.shippingAddress,
      notes: this.notes,
    };
  }
}
