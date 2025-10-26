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
    <section className="py-24 bg-white" id="servicios">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Servicios Especializados</h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">Ofrezco soluciones completas en desarrollo y consultoría tecnológica</p>
        </div>
        
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button 
            className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${filter === 'all' ? 'border-primary bg-primary text-white' : 'border-gray-light bg-transparent text-gray-dark hover:border-primary hover:bg-primary hover:text-white'}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${filter === 'development' ? 'border-primary bg-primary text-white' : 'border-gray-light bg-transparent text-gray-dark hover:border-primary hover:bg-primary hover:text-white'}`}
            onClick={() => setFilter('development')}
          >
            Desarrollo
          </button>
          <button 
            className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${filter === 'consulting' ? 'border-primary bg-primary text-white' : 'border-gray-light bg-transparent text-gray-dark hover:border-primary hover:bg-primary hover:text-white'}`}
            onClick={() => setFilter('consulting')}
          >
            Consultoría
          </button>
          <button 
            className={`px-6 py-3 border-2 rounded-lg font-medium transition-all ${filter === 'training' ? 'border-primary bg-primary text-white' : 'border-gray-light bg-transparent text-gray-dark hover:border-primary hover:bg-primary hover:text-white'}`}
            onClick={() => setFilter('training')}
          >
            Capacitación
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div 
              key={product.id} 
              className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-lighter transition-all relative overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:border-primary ${product.featured ? 'border-2 border-primary scale-105' : ''}`}
            >
              {product.featured && <div className="absolute top-4 right-4 bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-semibold">Más Popular</div>}
              <div className="w-15 h-15 bg-gradient-primary rounded-lg flex items-center justify-center mb-6">
                <i className={`fas ${getProductIcon(product.category)} text-2xl text-white`}></i>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">{product.name}</h3>
              <p className="text-gray-medium mb-6">{product.description}</p>
              <ul className="list-none mb-8">
                {product.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="relative pl-6 mb-2 text-gray-medium before:content-['✓'] before:absolute before:left-0 before:text-success before:font-bold">{feature}</li>
                ))}
                {product.features.length > 4 && (
                  <li className="italic text-primary">+{product.features.length - 4} características más</li>
                )}
              </ul>
              <div className="mb-6">
                <div className="text-2xl font-bold text-primary text-center p-4 bg-gray-lighter rounded-lg">${product.price.toLocaleString()} {product.currency}</div>
                <div className="flex items-center gap-2 text-gray-medium text-sm mt-4 justify-center">
                  <i className="fas fa-clock"></i>
                  {product.deliveryTime}
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 text-sm"
                  onClick={() => handleShowDetails(product)}
                >
                  <i className="fas fa-info-circle"></i>
                  Ver Detalles
                </button>
                <button 
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 text-sm"
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="fas fa-shopping-cart"></i>
                  Agregar
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
