import { Order } from '../entities/Order';

export interface OrderRepository {
  create(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order>;
  getById(id: string): Promise<Order | null>;
  getByUserId(userId: string): Promise<Order[]>;
  update(id: string, updates: Partial<Order>): Promise<Order>;
}
