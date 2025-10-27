import React from 'react';
import { Service } from '../../domain/entities/Service';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onAddToCart?: (service: Service) => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  onClose,
  service,
  onAddToCart
}) => {
  if (!isOpen || !service) return null;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(service);
    }
    onClose();
  };

  const handleContactService = () => {
    onClose();
    const contactSection = document.querySelector('#contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Header con gradiente */}
        <div className="relative h-48 bg-gradient-to-br from-primary via-secondary to-accent p-8 flex items-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>
          
          <div className="relative z-10 flex items-center gap-6 w-full">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg flex-shrink-0">
              <i className={`fas ${service.icon} text-4xl text-white`}></i>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">{service.title}</h2>
              <p className="text-white/90 text-sm">{service.shortDescription}</p>
            </div>
            {service.featured && (
              <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-white/30">
                <i className="fas fa-star"></i>
                Popular
              </div>
            )}
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all border border-white/30"
          >
            <i className="fas fa-times text-white text-lg"></i>
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto max-h-[calc(90vh-12rem)] p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Descripción completa */}
              <div>
                <h3 className="text-xl font-bold text-dark mb-3 flex items-center gap-2">
                  <i className="fas fa-info-circle text-primary"></i>
                  Descripción Detallada
                </h3>
                <p className="text-gray-dark leading-relaxed">{service.description}</p>
              </div>

              {/* Características completas */}
              <div>
                <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                  <i className="fas fa-check-double text-secondary"></i>
                  Características Incluidas
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-dark bg-gray-50 p-3 rounded-lg border border-gray-100"
                    >
                      <i className="fas fa-check text-success mt-0.5 flex-shrink-0"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tecnologías */}
              <div>
                <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                  <i className="fas fa-layer-group text-accent"></i>
                  Tecnologías Utilizadas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Precio */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-primary/20 shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    ${service.price.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-medium mt-1">
                    {service.price.currency} {service.price.period}
                  </div>
                </div>

                {service.deliveryTime && (
                  <div className="flex items-center justify-center gap-2 text-gray-dark text-sm bg-white p-3 rounded-lg border border-gray-200 mb-4">
                    <i className="fas fa-clock text-primary"></i>
                    <span className="font-medium">Entrega: {service.deliveryTime}</span>
                  </div>
                )}

                <div className="space-y-3">
                  {onAddToCart && (
                    <button 
                      onClick={handleAddToCart}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <i className="fas fa-shopping-cart"></i>
                      Agregar al Carrito
                    </button>
                  )}
                  
                  <button 
                    onClick={handleContactService}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-primary font-semibold rounded-xl border-2 border-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300"
                  >
                    <i className="fas fa-paper-plane"></i>
                    Contactar Ahora
                  </button>
                </div>
              </div>

              {/* Disponibilidad */}
              <div className={`p-4 rounded-xl border-2 ${service.available ? 'bg-success/10 border-success/30' : 'bg-gray-100 border-gray-300'}`}>
                <div className="flex items-center gap-2 justify-center">
                  <i className={`fas ${service.available ? 'fa-check-circle text-success' : 'fa-times-circle text-gray-500'}`}></i>
                  <span className={`font-semibold ${service.available ? 'text-success' : 'text-gray-500'}`}>
                    {service.available ? 'Disponible Ahora' : 'No Disponible'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
