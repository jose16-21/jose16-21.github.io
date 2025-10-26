import React from 'react';
import { Product } from '../../domain/entities/Product';
import { useCart } from '../../application/hooks/useCart';
import { NotificationManager } from '../../infrastructure/services/NotificationManager';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const notificationManager = new NotificationManager();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    notificationManager.show({
      message: `${product.name} agregado al carrito`,
      type: 'success'
    });
    onClose();
  };

  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      development: 'Desarrollo',
      consulting: 'Consultoría',
      training: 'Capacitación'
    };
    return labels[category] || category;
  };

  return (
    <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white hover:bg-gray-lighter rounded-full flex items-center justify-center text-gray-dark hover:text-dark transition-all shadow-lg z-10" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="p-8">
          {product.featured && <div className="inline-block px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-semibold mb-4">Más Popular</div>}
          <h2 className="text-3xl font-bold text-dark mb-3">{product.name}</h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <i className="fas fa-tag"></i>
            {getCategoryLabel(product.category)}
          </div>
        </div>

        <div className="px-8 pb-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-dark mb-3">Descripción</h3>
            <p className="text-gray-medium leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-dark mb-3">Características Completas</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-success text-lg mt-0.5"></i>
                  <span className="text-gray-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-lighter rounded-lg p-4 flex items-start gap-3">
              <i className="fas fa-clock text-primary text-xl mt-1"></i>
              <div>
                <span className="block text-sm text-gray-medium mb-1">Tiempo de Entrega</span>
                <span className="block text-dark font-semibold">{product.deliveryTime}</span>
              </div>
            </div>
            <div className="bg-gray-lighter rounded-lg p-4 flex items-start gap-3">
              <i className="fas fa-dollar-sign text-primary text-xl mt-1"></i>
              <div>
                <span className="block text-sm text-gray-medium mb-1">Precio</span>
                <span className="block text-dark font-semibold">${product.price.toLocaleString()} {product.currency}</span>
              </div>
            </div>
            <div className="bg-gray-lighter rounded-lg p-4 flex items-start gap-3">
              <i className="fas fa-list text-primary text-xl mt-1"></i>
              <div>
                <span className="block text-sm text-gray-medium mb-1">Características</span>
                <span className="block text-dark font-semibold">{product.features.length} incluidas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 p-8 pt-4 border-t border-gray-lighter">
          <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-dark font-semibold rounded-lg border-2 border-gray-light hover:bg-gray-lighter transition-all" onClick={onClose}>
            Cerrar
          </button>
          <button 
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all" 
            onClick={handleAddToCart}
          >
            <i className="fas fa-shopping-cart"></i>
            Agregar al Carrito - ${product.price.toLocaleString()} {product.currency}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
