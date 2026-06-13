import React from 'react';
import { useTranslation } from 'react-i18next';
import { Service } from '../../domain/entities/Service';
import { faIconMap } from '../utils/faIconMap';
import { useFocusTrap } from '../../application/hooks/useFocusTrap';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onAddToCart?: (service: Service) => void;
}

import { FaStar, FaTimes, FaInfoCircle, FaCheckDouble, FaCheck, FaLayerGroup, FaClock, FaShoppingCart, FaPaperPlane, FaCheckCircle, FaTimesCircle, FaBullseye } from 'react-icons/fa';

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  onClose,
  service,
  onAddToCart
}) => {
  const { t } = useTranslation();
  const containerRef = useFocusTrap(isOpen, onClose);

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
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp flex flex-col"
      >
        {/* Header con imagen */}
        <div className="relative h-56 md:h-64 w-full overflow-hidden group flex-shrink-0">
          <div className="absolute inset-0 bg-gray-900">
            {service.imageUrl && (
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="w-16 h-16 md:w-18 md:h-18 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-2xl flex-shrink-0">
                { (() => { const I = faIconMap[service.icon]; return I ? <I className="text-3xl text-white" /> : null; })() }
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full">
                    {service.category.replace('-', ' ')}
                  </span>
                  {service.featured && (
                    <span className="px-2.5 py-1 bg-accent/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                      <FaStar className="text-[10px]" /> {t('services.popular')}
                    </span>
                  )}
                </div>
                <h2 id="service-modal-title" className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight leading-tight">{service.title}</h2>
                <p className="text-gray-300 text-sm md:text-base font-light max-w-2xl leading-relaxed">{service.shortDescription}</p>
              </div>
            </div>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            aria-label={t('common.close')}
            className="absolute top-6 right-6 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center transition-all text-white border border-white/10 z-20"
          >
            <FaTimes aria-hidden="true" className="text-lg" />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Resultado de negocio (enfoque gerencial) */}
              {service.businessOutcome && (
                <div className="bg-primary/5 border border-primary/15 rounded-xl p-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                    <FaBullseye className="text-primary" />
                    {t('serviceDetail.businessOutcome')}
                  </h3>
                  <p className="text-gray-dark leading-relaxed">{service.businessOutcome}</p>
                  {service.targetAudience && (
                    <p className="text-sm text-gray-medium mt-3">
                      <span className="font-semibold text-dark">{t('serviceDetail.audience')} </span>
                      {service.targetAudience}
                    </p>
                  )}
                </div>
              )}

              {/* Descripción completa */}
              <div>
                <h3 className="text-xl font-bold text-dark mb-3 flex items-center gap-2">
                  <FaInfoCircle className="text-primary" />
                  {t('serviceDetail.description')}
                </h3>
                <p className="text-gray-dark leading-relaxed">{service.description}</p>
              </div>

              {/* Características completas */}
              <div>
                <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                  <FaCheckDouble className="text-secondary" />
                  {t('serviceDetail.features')}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-dark bg-gray-50 p-3 rounded-lg border border-gray-100"
                    >
                      <FaCheck className="text-success mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tecnologías */}
              <div>
                <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                  <FaLayerGroup className="text-accent" />
                  {t('serviceDetail.technologies')}
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
                    <FaClock className="text-primary" />
                    <span className="font-medium">{t('serviceDetail.delivery')} {service.deliveryTime}</span>
                  </div>
                )}

                <div className="space-y-3">
                  {onAddToCart && (
                    <button
                      onClick={handleAddToCart}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <FaShoppingCart />
                      {t('serviceDetail.addToCart')}
                    </button>
                  )}

                  <button
                    onClick={handleContactService}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-primary font-semibold rounded-xl border-2 border-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300"
                  >
                    <FaPaperPlane />
                    {t('serviceDetail.contactNow')}
                  </button>
                </div>
              </div>

              {/* Disponibilidad */}
              <div className={`p-4 rounded-xl border-2 ${service.available ? 'bg-success/10 border-success/30' : 'bg-gray-100 border-gray-300'}`}>
                <div className="flex items-center gap-2 justify-center">
                  {service.available ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-gray-500" />}
                  <span className={`font-semibold ${service.available ? 'text-success' : 'text-gray-500'}`}>
                    {service.available ? t('serviceDetail.available') : t('serviceDetail.unavailable')}
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
