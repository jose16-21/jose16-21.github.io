import React, { useState } from 'react';
import { useCart } from '../../application/hooks/useCart';
import { useAuth } from '../../application/hooks/useAuth';
import { useModal } from '../../application/context/ModalContext';
import { NotificationManager } from '../../infrastructure/services/NotificationManager';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { openLogin } = useModal();
  const [isProcessing, setIsProcessing] = useState(false);
  const notificationManager = new NotificationManager();

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      console.log('💳 Procesando orden...');
      console.log('Usuario:', user);
      console.log('Items:', items);
      console.log('Total:', totalAmount);
      
      // TODO: Enviar orden al backend
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      notificationManager.show({
        message: '¡Orden procesada exitosamente! Recibirás un email de confirmación.',
        type: 'success'
      });
      
      clearCart();
      onClose();
      
      // Mostrar resumen
      alert(`✅ Orden Confirmada\n\nTotal: $${totalAmount.toLocaleString()} USD\nItems: ${items.length}\n\nGracias por tu compra, ${user?.firstName}!`);
    } catch (error) {
      console.error('❌ Error al procesar la orden:', error);
      notificationManager.show({
        message: 'Error al procesar la orden. Intenta de nuevo.',
        type: 'error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-dark/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-lighter">
          <h2 className="text-2xl font-bold text-dark flex items-center gap-3">
            <i className="fas fa-shopping-cart text-primary"></i> Mi Carrito
          </h2>
          <button className="w-10 h-10 bg-gray-lighter hover:bg-gray-light rounded-full flex items-center justify-center text-gray-dark hover:text-dark transition-colors text-2xl" onClick={onClose}>&times;</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <i className="fas fa-shopping-cart text-8xl text-gray-light mb-6"></i>
              <p className="text-xl text-gray-medium mb-6">Tu carrito está vacío</p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all" onClick={onClose}>
                Explorar Servicios
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.product.id} className="bg-gray-lighter rounded-lg p-4 border border-gray-light">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-dark mb-1">{item.product.name}</h4>
                      <p className="text-primary font-semibold">
                        ${item.product.price.toLocaleString()} {item.product.currency}
                      </p>
                      {item.customizations && (
                        <p className="text-sm text-gray-medium mt-2">
                          Personalización: {item.customizations}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-light">
                      <button 
                        className="px-3 py-2 hover:bg-gray-lighter transition-colors text-gray-dark hover:text-dark font-bold"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="text-dark font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                      <button 
                        className="px-3 py-2 hover:bg-gray-lighter transition-colors text-gray-dark hover:text-dark font-bold"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="px-4 py-2 bg-danger/10 text-danger hover:bg-danger hover:text-white rounded-lg transition-all flex items-center gap-2"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-lighter p-6 bg-gray-lighter">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-light">
              <div className="text-lg font-medium text-gray-dark">Total:</div>
              <div className="text-3xl font-bold text-primary">${totalAmount.toLocaleString()} USD</div>
            </div>
            {!isAuthenticated ? (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                <div className="flex flex-col items-center gap-4">
                  <i className="fas fa-info-circle text-primary text-2xl"></i>
                  <p className="text-gray-dark">Inicia sesión para proceder con la compra</p>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all text-sm" onClick={openLogin}>
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button 
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-primary text-white font-semibold rounded-lg shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-credit-card"></i>
                      Proceder al Pago - ${totalAmount.toLocaleString()} USD
                    </>
                  )}
                </button>
                
                <div className="flex gap-2 justify-center mb-4 opacity-70">
                  <i className="fab fa-cc-visa text-3xl text-gray-dark"></i>
                  <i className="fab fa-cc-mastercard text-3xl text-gray-dark"></i>
                  <i className="fab fa-cc-paypal text-3xl text-gray-dark"></i>
                  <i className="fab fa-cc-amex text-3xl text-gray-dark"></i>
                </div>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-medium">
              <i className="fas fa-shield-alt text-success"></i>
              <span>Pago seguro - Simulación de checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
