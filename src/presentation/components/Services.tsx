import React, { useState, useEffect } from 'react';
import { Service, ServiceCategory } from '../../domain/entities/Service';
import { ServiceRepositoryImpl } from '../../infrastructure/repositories/ServiceRepositoryImpl';
import { GetServicesUseCase } from '../../domain/use-cases/GetServicesUseCase';
import { Product } from '../../domain/entities/Product';
import { useCart } from '../../application/hooks/useCart';
import { NotificationManager } from '../../infrastructure/services/NotificationManager';
import ServiceDetailModal from './ServiceDetailModal';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [filter, setFilter] = useState<ServiceCategory | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const notificationManager = new NotificationManager();

  const serviceRepository = new ServiceRepositoryImpl();
  const getServicesUseCase = new GetServicesUseCase(serviceRepository);

  const loadServices = async (category: ServiceCategory | 'all') => {
    setLoading(true);
    try {
      const fetchedServices = category === 'all' 
        ? await getServicesUseCase.execute()
        : await getServicesUseCase.execute(category);
      setServices(fetchedServices);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const fetchedCategories = await getServicesUseCase.executeGetCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  useEffect(() => {
    loadCategories();
    loadServices(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleAddToCart = (service: Service) => {
    // Convertir Service a Product para el carrito
    const product: Product = {
      id: service.id,
      name: service.title,
      description: service.shortDescription,
      price: service.price.amount,
      currency: service.price.currency,
      category: 'consulting', // Mapear según corresponda
      features: service.features,
      deliveryTime: service.deliveryTime || 'A consultar',
      featured: service.featured || false
    };

    addToCart(product);
    notificationManager.show({
      message: `${service.title} agregado al carrito`,
      type: 'success'
    });
  };

  return (
    <section className="py-24 bg-white" id="servicios">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-dark mb-4">Servicios Profesionales</h2>
          <p className="text-lg text-gray-medium max-w-2xl mx-auto">
            Soluciones tecnológicas completas para impulsar tu negocio al siguiente nivel
          </p>
        </div>
        
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 ${
              filter === 'all' 
                ? 'bg-gradient-primary text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-dark hover:bg-gray-200'
            }`}
            onClick={() => setFilter('all')}
          >
            <i className="fas fa-th text-xs"></i>
            <span>Todos</span>
          </button>
          
          {categories.map((category) => {
            const categoryConfig: Record<ServiceCategory, { icon: string; label: string }> = {
              'web-development': { icon: 'fa-code', label: 'Web' },
              'mobile-development': { icon: 'fa-mobile-alt', label: 'Móvil' },
              'devops': { icon: 'fa-infinity', label: 'DevOps' },
              'cloud-architecture': { icon: 'fa-cloud', label: 'Cloud' },
              'consulting': { icon: 'fa-lightbulb', label: 'Consultoría' },
              'training': { icon: 'fa-graduation-cap', label: 'Formación' }
            };
            
            const config = categoryConfig[category];
            
            return (
              <button 
                key={category}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center gap-2 ${
                  filter === category 
                    ? 'bg-gradient-primary text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-dark hover:bg-gray-200'
                }`}
                onClick={() => setFilter(category)}
              >
                <i className={`fas ${config.icon} text-xs`}></i>
                <span>{config.label}</span>
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div 
                key={service.id} 
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 transition-all relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-primary/50"
              >
                {/* Header con gradiente e icono */}
                <div className="relative h-32 bg-gradient-to-br from-primary via-secondary to-accent p-6 flex items-center justify-between overflow-hidden">
                  {/* Patrón de fondo sutil */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                  </div>
                  
                  <div className="relative z-10 flex-1">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                      <i className={`fas ${service.icon} text-2xl text-white`}></i>
                    </div>
                  </div>
                  
                  {service.featured && (
                    <div className="relative z-10 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/30">
                      <i className="fas fa-star"></i>
                      Popular
                    </div>
                  )}
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-2 line-clamp-2 min-h-[3.5rem]">
                    {service.title}
                  </h3>
                  <p className="text-gray-medium text-sm mb-5 line-clamp-2 min-h-[2.5rem]">
                    {service.shortDescription}
                  </p>
                  
                  {/* Features - Solo las primeras 3 */}
                  <ul className="list-none mb-6 space-y-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-2 text-sm text-gray-dark"
                      >
                        <i className="fas fa-check text-success mt-1 text-xs flex-shrink-0"></i>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Precio y tiempo - Container con hover overlay */}
                  <div className="relative h-16">
                    {/* Precio normal - siempre visible */}
                    <div className="absolute inset-0 bg-gray-50 rounded-xl p-3 border border-gray-100 transition-opacity group-hover:opacity-0">
                      <div className="flex items-center justify-between h-full">
                        <div>
                          <div className="text-xl font-bold text-primary leading-tight">
                            ${service.price.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-medium">
                            {service.price.currency}
                          </div>
                        </div>
                        {service.deliveryTime && (
                          <div className="flex items-center gap-1.5 text-gray-medium text-xs bg-white px-2 py-1 rounded-lg border border-gray-200">
                            <i className="fas fa-clock"></i>
                            <span>{service.deliveryTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Botones de acción - aparecen en hover */}
                    <div className="absolute inset-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                      <button 
                        className="flex-1 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-white transition-colors text-xs"
                        onClick={() => handleViewDetails(service)}
                      >
                        Detalles
                      </button>
                      <button 
                        className="flex-1 bg-gradient-primary text-white font-semibold rounded-lg text-xs"
                        onClick={() => handleAddToCart(service)}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && services.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-inbox text-6xl text-gray-light mb-4"></i>
            <p className="text-xl text-gray-medium">No hay servicios disponibles en esta categoría</p>
          </div>
        )}
      </div>

      {/* Modal de Detalles del Servicio */}
      <ServiceDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
};

export default Services;
