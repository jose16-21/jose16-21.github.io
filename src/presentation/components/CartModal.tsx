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
    <div id="cart-modal" className={`cart-modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>
            <i className="fas fa-shopping-cart"></i> Mi Carrito
          </h2>
          <button className="cart-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <i className="fas fa-shopping-cart"></i>
              <p>Tu carrito está vacío</p>
              <button className="btn btn-primary" onClick={onClose}>
                Explorar Servicios
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.product.name}</h4>
                    <p className="cart-item-price">
                      ${item.product.price.toLocaleString()} {item.product.currency}
                    </p>
                    {item.customizations && (
                      <p className="cart-item-custom">
                        Personalización: {item.customizations}
                      </p>
                    )}
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-btn"
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
          <div className="cart-footer">
            <div className="cart-total-section">
              <div className="cart-total-label">Total:</div>
              <div className="cart-total">${totalAmount.toLocaleString()} USD</div>
            </div>
            {!isAuthenticated ? (
              <div className="cart-login-prompt">
                <div className="login-prompt-content">
                  <i className="fas fa-info-circle"></i>
                  <p>Inicia sesión para proceder con la compra</p>
                  <button className="btn btn-primary btn-sm" onClick={openLogin}>
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className="checkout-section">
                {/* Botón de Checkout */}
                <button 
                  className="btn btn-primary btn-full"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  style={{ marginTop: '1rem' }}
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
                
                {/* Métodos de pago aceptados */}
                <div className="payment-methods" style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  justifyContent: 'center',
                  marginTop: '1rem',
                  opacity: 0.7
                }}>
                  <i className="fab fa-cc-visa" style={{ fontSize: '2rem' }}></i>
                  <i className="fab fa-cc-mastercard" style={{ fontSize: '2rem' }}></i>
                  <i className="fab fa-cc-paypal" style={{ fontSize: '2rem' }}></i>
                  <i className="fab fa-cc-amex" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            )}
            <div className="cart-security">
              <i className="fas fa-shield-alt"></i>
              <span>Pago seguro - Simulación de checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
