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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="product-detail-header">
          {product.featured && <div className="featured-badge-large">Más Popular</div>}
          <h2>{product.name}</h2>
          <div className="product-category-badge">
            <i className="fas fa-tag"></i>
            {getCategoryLabel(product.category)}
          </div>
        </div>

        <div className="product-detail-body">
          <div className="product-description">
            <h3>Descripción</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-features-full">
            <h3>Características Completas</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>
                  <i className="fas fa-check-circle"></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-details-grid">
            <div className="detail-item">
              <i className="fas fa-clock"></i>
              <div>
                <span className="detail-label">Tiempo de Entrega</span>
                <span className="detail-value">{product.deliveryTime}</span>
              </div>
            </div>
            <div className="detail-item">
              <i className="fas fa-dollar-sign"></i>
              <div>
                <span className="detail-label">Precio</span>
                <span className="detail-value">${product.price.toLocaleString()} {product.currency}</span>
              </div>
            </div>
            <div className="detail-item">
              <i className="fas fa-list"></i>
              <div>
                <span className="detail-label">Características</span>
                <span className="detail-value">{product.features.length} incluidas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-detail-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button 
            className="btn btn-primary" 
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
