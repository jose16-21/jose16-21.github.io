import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../application/hooks/useAuth';
import { FaShoppingBag, FaTimes } from 'react-icons/fa';

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
  const { t } = useTranslation();
  const { user } = useAuth();

  // TODO: Fetch orders from backend
  const orders: Order[] = [];

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="orders-modal-title"
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-lighter">
          <h2 id="orders-modal-title" className="text-2xl font-bold text-dark flex items-center gap-3"><FaShoppingBag className="text-primary" /> {t('orders.title')}</h2>
          <button aria-label={t('common.close')} className="w-10 h-10 bg-gray-lighter hover:bg-gray-light rounded-full flex items-center justify-center text-gray-dark hover:text-dark transition-colors" onClick={onClose}><FaTimes aria-hidden="true" /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FaShoppingBag className="text-8xl text-gray-light mb-6" />
              <h3 className="text-2xl font-bold text-dark mb-2">{t('orders.empty')}</h3>
              <p className="text-gray-medium mb-6">{t('orders.emptyDescription')}</p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all" onClick={onClose}>
                {t('orders.explore')}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-lighter rounded-lg border border-gray-light p-6">
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-light">
                    <div>
                      <strong className="text-lg text-dark block mb-1">Orden #{order.id}</strong>
                      <span className="text-gray-medium text-sm">{new Date(order.createdAt).toLocaleDateString('es-ES')}</span>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${order.status === 'completed' ? 'bg-success/20 text-success' : order.status === 'cancelled' ? 'bg-danger/20 text-danger' : 'bg-warning/20 text-warning'}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {order.items.map((item: OrderItem, index: number) => (
                      <div key={index} className="flex justify-between text-gray-dark">
                        <span>{item.name}</span>
                        <span className="font-semibold">${item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-light">
                    <strong className="text-lg text-dark">Total: ${order.total.toLocaleString()} USD</strong>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-all text-sm">
                      {t('orders.viewDetails')}
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
