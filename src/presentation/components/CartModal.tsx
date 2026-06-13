import React, { useState } from 'react';
import { useCart } from '../../application/hooks/useCart';
import { useAuth } from '../../application/hooks/useAuth';
import { useModal } from '../../application/context/ModalContext';
import { NotificationManager } from '../../infrastructure/services/NotificationManager';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { FaShoppingCart, FaList, FaCode, FaClock, FaTrash, FaEdit, FaFileInvoice, FaSpinner, FaCreditCard, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { openLogin } = useModal();
  const [isProcessing, setIsProcessing] = useState(false);
  const [comments, setComments] = useState('');
  const [isQuoteMode, setIsQuoteMode] = useState(false);
  const notificationManager = new NotificationManager();

  // Debug: Mostrar items en consola
  console.log('🛒 CartModal - Items:', items);
  console.log('🛒 CartModal - Total items:', items.length);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      const orderType = isQuoteMode ? 'cotización' : 'orden';
      const finalAmount = isQuoteMode ? 0 : totalAmount;
      
      console.log(`💳 Procesando ${orderType}...`);
      console.log('Usuario:', user);
      console.log('Items:', items);
      console.log('Total:', finalAmount);
      console.log('Comentarios:', comments);
      console.log('Es cotización:', isQuoteMode);
      
      // TODO: Enviar orden/cotización al backend
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (isQuoteMode) {
        notificationManager.show({
          message: '¡Cotización enviada exitosamente! Te contactaremos pronto con los detalles.',
          type: 'success'
        });
        
        alert(`✅ Cotización Enviada\n\nServicios solicitados: ${items.length}\nProductos totales: ${items.reduce((sum, item) => sum + item.quantity, 0)}\n\nComentarios: ${comments || 'Sin comentarios'}\n\nNos pondremos en contacto contigo pronto, ${user?.firstName}!`);
      } else {
        notificationManager.show({
          message: '¡Orden procesada exitosamente! Recibirás un email de confirmación.',
          type: 'success'
        });
        
        alert(`✅ Orden Confirmada\n\nTotal: $${totalAmount.toLocaleString()} USD\nItems: ${items.length}\nProductos: ${items.reduce((sum, item) => sum + item.quantity, 0)}\n\nComentarios: ${comments || 'Sin comentarios'}\n\nGracias por tu compra, ${user?.firstName}!`);
      }
      
      clearCart();
      setComments('');
      setIsQuoteMode(false);
      onClose();
    } catch (error) {
      console.error('❌ Error al procesar:', error);
      notificationManager.show({
        message: `Error al procesar la ${isQuoteMode ? 'cotización' : 'orden'}. Intenta de nuevo.`,
        type: 'error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-lighter flex-shrink-0">
          <h2 className="text-2xl font-bold text-dark flex items-center gap-3">
            <FaShoppingCart className="text-primary" /> Mi Carrito
            {items.length > 0 && (
              <span className="text-sm font-normal bg-primary text-white px-3 py-1 rounded-full">
                {items.length} {items.length === 1 ? 'servicio' : 'servicios'}
              </span>
            )}
          </h2>
          <button className="w-10 h-10 bg-gray-lighter hover:bg-gray-light rounded-full flex items-center justify-center text-gray-dark hover:text-dark transition-colors text-2xl" onClick={onClose}>&times;</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 min-h-0" style={{ flexBasis: '60%' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FaShoppingCart className="text-8xl text-gray-light mb-6" />
              <p className="text-xl text-gray-medium mb-6">Tu carrito está vacío</p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all" onClick={onClose}>
                Explorar Servicios
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Título de la sección */}
              <div className="flex items-center justify-between pb-2 border-b-2 border-primary/20 sticky top-0 bg-white z-10 -mx-6 px-6 py-2">
                <h3 className="text-base font-semibold text-dark flex items-center gap-2">
                  <FaList className="text-primary" />
                  Servicios ({items.length})
                </h3>
                <span className="text-xs text-gray-medium bg-gray-100 px-3 py-1 rounded-full">
                  {items.reduce((sum, item) => sum + item.quantity, 0)} items
                </span>
              </div>
              
              {items.map((item) => (
                <div key={item.product.id} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all">
                  <div className="flex gap-3 mb-3">
                    {/* Icono del servicio */}
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <FaCode className="text-lg text-white" />
                    </div>
                    
                    {/* Información principal */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-dark mb-1 line-clamp-1">{item.product.name}</h4>
                      {item.product.description && (
                        <p className="text-xs text-gray-600 leading-snug mb-2 line-clamp-2">
                          {item.product.description}
                        </p>
                      )}
                      
                      {/* Delivery time */}
                      {item.product.deliveryTime && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-medium">
                          <FaClock />
                          <span>{item.product.deliveryTime}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Botón eliminar */}
                    <button 
                      className="w-8 h-8 bg-danger/10 text-danger hover:bg-danger hover:text-white rounded-lg transition-all flex items-center justify-center flex-shrink-0 self-start"
                      onClick={() => removeFromCart(item.product.id)}
                      title="Eliminar"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                  
                  {/* Customizaciones */}
                  {item.customizations && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-2 mb-2">
                      <p className="text-xs text-gray-dark">
                        <FaEdit className="text-primary mr-1" />
                        <span className="font-medium">Personalización:</span> {item.customizations}
                      </p>
                    </div>
                  )}
                  
                  {/* Footer con precio y cantidad */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    {/* Cantidad */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-dark">Cant:</span>
                      <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-300 shadow-sm">
                        <button 
                          className="px-2 py-1 hover:bg-gray-100 transition-colors text-gray-dark hover:text-dark font-bold rounded-l-lg text-sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="text-dark font-bold min-w-[1.5rem] text-center text-sm">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 hover:bg-gray-100 transition-colors text-gray-dark hover:text-dark font-bold rounded-r-lg text-sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Precio */}
                    <div className="text-right">
                      <div className="text-base font-bold text-primary">
                        ${item.product.price.toLocaleString()}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-gray-medium">
                          Total: ${(item.product.price * item.quantity).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-gradient-to-br from-gray-50 to-white flex-shrink-0">
            {/* Resumen de la orden - Versión Ultra Compacta */}
            <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200 shadow-sm">
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="text-center">
                  <div className="text-xs text-gray-medium mb-1">Productos</div>
                  <div className="text-sm font-bold text-dark">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-medium mb-1">Servicios</div>
                  <div className="text-sm font-bold text-dark">{items.length}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-medium mb-1">Total</div>
                  <div className="text-sm font-bold text-primary">
                    ${isQuoteMode ? 0 : totalAmount.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Campo de comentarios - Ultra compacto */}
            <div className="bg-white rounded-lg p-2 mb-2 border border-gray-200">
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Comentarios (opcional)..."
                className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs resize-none focus:outline-none focus:ring-1 focus:ring-primary/50"
                rows={2}
                maxLength={500}
              />
              <div className="flex justify-end">
                <span className="text-xs text-gray-400">{comments.length}/500</span>
              </div>
            </div>

            {/* Toggle para modo cotización - Ultra compacto */}
            <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg p-2 mb-2 border border-secondary/30">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isQuoteMode}
                  onChange={(e) => setIsQuoteMode(e.target.checked)}
                  className="w-4 h-4 text-primary rounded cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-dark font-semibold text-xs">
                    <FaFileInvoice className="text-secondary text-xs" />
                    Solicitar cotización sin costo
                  </div>
                </div>
              </label>
            </div>
            
            {!isAuthenticated ? (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-2 text-center">
                <p className="text-gray-dark text-xs mb-2">Inicia sesión para proceder</p>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all text-xs" onClick={openLogin}>
                  Iniciar Sesión
                </button>
              </div>
            ) : (
              <div>
                <button 
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm ${
                    isQuoteMode 
                      ? 'bg-gradient-to-r from-secondary to-accent text-white' 
                      : 'bg-gradient-primary text-white'
                  }`}
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Procesando...
                    </>
                  ) : isQuoteMode ? (
                    <>
                      <FaFileInvoice />
                      Solicitar Cotización
                    </>
                  ) : (
                    <>
                      <FaCreditCard />
                      Pagar ${totalAmount.toLocaleString()}
                    </>
                  )}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-gray-medium mt-2">
                  {isQuoteMode ? <FaEnvelope className="text-secondary" /> : <FaShieldAlt className="text-success" />}
                  <span>{isQuoteMode ? 'Cotización por email' : 'Pago seguro'}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
