import React, { useState, useEffect } from 'react';
import { Product, ProductCategory } from '../../domain/entities/Product';
import { LocalProductRepository } from '../../infrastructure/repositories/LocalProductRepository';
import { GetProductsUseCase } from '../../domain/use-cases/GetProductsUseCase';
import { useCart } from '../../application/hooks/useCart';
import { NotificationManager } from '../../infrastructure/services/NotificationManager';
import ProductDetailModal from './ProductDetailModal';

const Services: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<ProductCategory | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { addToCart } = useCart();
  const notificationManager = new NotificationManager();

  const productRepository = new LocalProductRepository();
  const getProductsUseCase = new GetProductsUseCase(productRepository);

  const loadProducts = async (category: ProductCategory | 'all') => {
    const fetchedProducts = category === 'all' 
      ? await getProductsUseCase.execute()
      : await getProductsUseCase.execute(category);
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    loadProducts(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const getProductIcon = (category: ProductCategory): string => {
    const icons = {
      development: 'fa-code',
      consulting: 'fa-lightbulb',
      training: 'fa-graduation-cap'
    };
    return icons[category] || 'fa-cog';
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    notificationManager.show({
      message: `${product.name} agregado al carrito`,
      type: 'success'
    });
  };

  const handleShowDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="services" id="servicios">
      <div className="container">
        <div className="section-header">
          <h2>Servicios Especializados</h2>
          <p>Ofrezco soluciones completas en desarrollo y consultoría tecnológica</p>
        </div>
        
        <div className="service-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filter-btn ${filter === 'development' ? 'active' : ''}`}
            onClick={() => setFilter('development')}
          >
            Desarrollo
          </button>
          <button 
            className={`filter-btn ${filter === 'consulting' ? 'active' : ''}`}
            onClick={() => setFilter('consulting')}
          >
            Consultoría
          </button>
          <button 
            className={`filter-btn ${filter === 'training' ? 'active' : ''}`}
            onClick={() => setFilter('training')}
          >
            Capacitación
          </button>
        </div>

        <div className="services-grid">
          {products.map(product => (
            <div 
              key={product.id} 
              className={`service-card product-card ${product.featured ? 'featured' : ''}`}
            >
              {product.featured && <div className="featured-badge">Más Popular</div>}
              <div className="service-icon">
                <i className={`fas ${getProductIcon(product.category)}`}></i>
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <ul className="service-features">
                {product.features.slice(0, 4).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
                {product.features.length > 4 && (
                  <li className="more-features">+{product.features.length - 4} características más</li>
                )}
              </ul>
              <div className="product-info">
                <div className="service-price">${product.price.toLocaleString()} {product.currency}</div>
                <div className="delivery-time">
                  <i className="fas fa-clock"></i>
                  {product.deliveryTime}
                </div>
              </div>
              <div className="product-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleShowDetails(product)}
                >
                  <i className="fas fa-info-circle"></i>
                  Ver Detalles
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="fas fa-shopping-cart"></i>
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalles del Producto */}
      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        product={selectedProduct}
      />
    </section>
  );
};

export default Services;
