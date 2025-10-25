import React from 'react';
import { useAuth } from '../../application/hooks/useAuth';

interface Order {
  id: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'cancelled';
  items: OrderItem[];
  total: number;
}

interface OrderItem {
  name: string;
  price: number;
}

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrdersModal: React.FC<OrdersModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  // TODO: Fetch orders from backend
  const orders: Order[] = [];

  if (!isOpen || !user) return null;

  return (
    <div className="auth-modal active" onClick={onClose}>
      <div className="auth-modal-content orders-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <h2><i className="fas fa-shopping-bag"></i> Mis Órdenes</h2>
          <button className="auth-modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="orders-content">
          {orders.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-shopping-bag" style={{ fontSize: '4rem', color: 'var(--gray-light)', marginBottom: '1rem' }}></i>
              <h3>No tienes órdenes aún</h3>
              <p>Cuando realices tu primera compra, aparecerá aquí.</p>
              <button className="btn btn-primary" onClick={onClose}>
                Explorar Servicios
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-number">
                      <strong>Orden #{order.id}</strong>
                      <span className="order-date">{new Date(order.createdAt).toLocaleDateString('es-ES')}</span>
                    </div>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-items">
                    {order.items.map((item: OrderItem, index: number) => (
                      <div key={index} className="order-item">
                        <span>{item.name}</span>
                        <span>${item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-footer">
                    <strong>Total: ${order.total.toLocaleString()} USD</strong>
                    <button className="btn btn-secondary btn-sm">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;
